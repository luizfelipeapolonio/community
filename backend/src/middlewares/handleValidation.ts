import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import Logger from "../config/logger";

import { UserSchemaValidation } from "../validation/UserSchemaValidation";

export class HandleValidation {
    async userValidation(req: Request, res: Response, next: NextFunction) {
        const bodyObject = plainToInstance(UserSchemaValidation, req.body);

        await validate(bodyObject).then((err) => {
            if(err.length > 0) {
                const messages = err.map((item) => {
                   return { [item.property]: item.constraints } 
                });

                Logger.error("Dados de usuário inválidos! --> " + err);
                console.log(err);

                return res.status(422).json({ 
                    status: "error",
                    message: messages,
                    payload: null 
                });
            } else {
                Logger.info("Usuário validado com sucesso!");
                return next();
            }
        });
    }
}