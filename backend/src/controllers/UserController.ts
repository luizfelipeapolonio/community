import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import Logger from "../config/logger";
import { UserModel } from "../models/User";
import { 
    ITypedRequestBody, 
    IUserRegisterBody, 
    IUserLoginBody 
} from "../types/UserTypes";
import { UserUtils } from "../utils/UserUtils";

export class UserController {
    async register(req: ITypedRequestBody<IUserRegisterBody>, res: Response) {
        const { name, email, password } = req.body;
        const utils = new UserUtils();

        // Check if user exists
        const user = await UserModel.findOne({ email });

        if(user) {
            return res.status(422).json({
                status: "error" , 
                message: "E-mail já cadastrado!",
                payload: null
            });
        }

        try {
            const passwordHash: string | null = await utils.generatePasswordHash(password);
            
            if(!passwordHash) {
                return res.status(500).json({
                    status: "error",
                    message: "Ocorreu um erro! Tente mais tarde",
                    payload: null
                });
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

    async login(req: ITypedRequestBody<IUserLoginBody>, res: Response) {
        const { email, password } = req.body;
        const utils = new UserUtils();

        const user = await UserModel.findOne({ email });

        // Check if user exists
        if(!user) {
            return res.status(404).json({
                status: "error",
                message: "Usuário não encontrado!",
                payload: null
            });
        }

        // Check if password matches
        if(!(await bcrypt.compare(password, user.password))) {
            return res.status(422).json({
                status: "error",
                message: "Senha inválida!",
                payload: null
            });
        }

        const token: string | null = utils.generateToken(user._id);

        // Check if token creation failed
        if(!token) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao gerar token de acesso!",
                payload: null
            });
        }

        // Signed user payload response
        const signedUser = {
            _id: user._id,
            profileImage: user?.profileImage,
            token
        }

        return res.status(201).json({
            status: "success",
            message: "Login realizado com sucesso!",
            payload: signedUser
        });
    }

    // Get current signed in user
    getCurrentUser(req: Request, res: Response) {
        const { user } = req.body;

        return res.status(200).json({
            status: "success",
            message: "Usuário logado",
            payload: user
        });
    }

}