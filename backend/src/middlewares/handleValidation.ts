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
                Logger.error("User validation failed!");
                console.log(err);
                return res.status(422).json({ errors: err });
            } else {
                Logger.info("Validation succeed!");
                return next();
            }
        });
    }
}