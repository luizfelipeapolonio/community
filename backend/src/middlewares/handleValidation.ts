import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import Logger from "../config/logger";

import { UserRegisterSchemaValidation } from "../validation/UserRegisterSchemaValidation";
import { UserLoginSchemaValidation } from "../validation/UserLoginSchemaValidation";

export class HandleValidation {
    async userRegisterValidation(req: Request, res: Response, next: NextFunction) {
        const bodyObject = plainToInstance(UserRegisterSchemaValidation, req.body);

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

    async userLoginValidation(req: Request, res: Response, next: NextFunction) {
        const bodyObject = plainToInstance(UserLoginSchemaValidation, req.body);

        await validate(bodyObject).then((err) => {
            if(err.length > 0) {
                const messages = err.map((item) => {
                    return { [item.property]: item.constraints };
                });

                Logger.error("Dados de login inválidos! --> " + err);
                console.log(err);

                return res.status(422).json({ 
                    status: "error",
                    message: messages,
                    payload: null 
                });
            } else {
                Logger.info("Dados de login validados com sucesso!");
                return next();
            }
        });
    }
}