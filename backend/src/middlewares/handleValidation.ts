import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import Logger from "../config/logger";

import { UserRegisterSchemaValidation } from "../validation/user/UserRegisterSchemaValidation";
import { UserLoginSchemaValidation } from "../validation/user/UserLoginSchemaValidation";
import { UserUpdateSchemaValidation } from "../validation/user/UserUpdateSchemaValidation";
import { PostCreateSchemaValidation } from "../validation/post/PostCreateSchemaValidation";
import { PostUpdateSchemaValidation } from "../validation/post/PostUpdateSchemaValidation";
import { PostCommentSchemaValidation } from "../validation/post/PostCommentSchemaValidation";

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

    async userUpdateValidation(req: Request, res: Response, next: NextFunction) {
        const bodyObject = plainToInstance(UserUpdateSchemaValidation, req.body);

        await validate(bodyObject).then((err) => {
            if(err.length > 0) {
                const messages = err.map((item) => {
                    return { [item.property]: item.constraints };
                });

                Logger.error("Dados de atualização inválidos! --> " + err);
                console.log(err);

                return res.status(422).json({ 
                    status: "error",
                    message: messages,
                    payload: null 
                });
            } else {
                Logger.info("Dados de atualização validados com sucesso!");
                return next();
            }
        });
    }

    async postCreateValidation(req: Request, res: Response, next: NextFunction) {
        const bodyObject = plainToInstance(PostCreateSchemaValidation, req.body);

        await validate(bodyObject).then((err) => {
            if(err.length > 0) {
                const messages = err.map((item) => {
                    return { [item.property]: item.constraints };
                });

                Logger.error("Dados de criação do post inválidos! --> " + err);
                console.log(err);

                return res.status(422).json({ 
                    status: "error",
                    message: messages,
                    payload: null 
                });
            } else {
                Logger.info("Dados de criação de post validados com sucesso!");
                return next();
            }
        });
    }

    async postUpdateValidation(req: Request, res: Response, next: NextFunction) {
        const bodyObject = plainToInstance(PostUpdateSchemaValidation, req.body);

        await validate(bodyObject).then((err) => {
            if(err.length > 0) {
                const messages = err.map((item) => {
                    return { [item.property]: item.constraints };
                });

                Logger.error("Dados de atualização do post inválidos! --> " + err);
                console.log(err);

                return res.status(422).json({ 
                    status: "error",
                    message: messages,
                    payload: null 
                });
            } else {
                Logger.info("Dados de atualização de post validados com sucesso!");
                return next();
            }
        });
    }

    async postCommentValidation(req: Request, res: Response, next: NextFunction) {
        const bodyObject = plainToInstance(PostCommentSchemaValidation, req.body);

        await validate(bodyObject).then((err) => {
            if(err.length > 0) {
                const messages = err.map((item) => {
                    return { [item.property]: item.constraints };
                });

                Logger.error("Dados do comentário do post inválidos! --> " + err);
                console.log(err);

                return res.status(422).json({ 
                    status: "error",
                    message: messages,
                    payload: null 
                });
            } else {
                Logger.info("Dados do comentário do post validados com sucesso!");
                return next();
            }
        });
    }
}