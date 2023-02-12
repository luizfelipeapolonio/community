import { Response } from "express";

import Logger from "../config/logger";
import { UserModel } from "../models/User";
import { ITypedRequestBody, UserRegisterBody } from "../types/UserTypes";
import { UserServices } from "../services/UserServices";

export class UserController {
    async register(req: ITypedRequestBody<UserRegisterBody>, res: Response) {
        const { name, email, password } = req.body;
        const services = new UserServices();

        // Check if user exists
        const user = await UserModel.findOne({ email });

        if(user) {
            res.status(422).json({
                status: "error" , 
                message: "E-mail já cadastrado!",
                payload: null
            });
            return;
        }

        try {
            const passwordHash: string | null = await services.generatePasswordHash(password);
            
            if(!passwordHash) {
                res.status(500).json({
                    status: "error",
                    message: "Ocorreu um erro! Tente mais tarde",
                    payload: null
                });
                return;
            };

            const newUser = await UserModel.create({
                name,
                email,
                password: passwordHash
            });

            return res.status(201).json({
                status: "success",
                message: "Usuário criado com sucesso!",
                payload: newUser
            });

        } catch(error: any) {
            Logger.error(
                "Não foi possível criar usuário --> " + `Erro: ${error}`
            );
            return res.status(422).json({
                status: "error",
                message: "Não foi possível criar usuário",
                payload: null
            });
        }
    }

}