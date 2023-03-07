import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import fs from "node:fs";

import Logger from "../config/logger";
import { UserModel } from "../models/User";
import {
    IUserRegisterBody, 
    IUserLoginBody,
    IUserUpdateBody,
    UserMongooseType 
} from "../types/UserTypes";
import { ITypedRequestBody } from "../types/SharedTypes";
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

        // Signed in user payload response
        const signedUser = {
            _id: user._id,
            name: user.name,
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
        const { user } = res.locals;

        return res.status(200).json({
            status: "success",
            message: "Usuário logado",
            payload: user
        });
    }

    // Update user data
    async update(req: ITypedRequestBody<IUserUpdateBody>, res: Response) {
        const { name, password, bio, error } = req.body;
        const utils = new UserUtils();

        let profileImage: string | null = null;

        if(req.file) {
            profileImage = req.file.filename;
        }

        if(!req.file && error) {
            return res.status(422).json({
                status: "error",
                message: "Por favor, envie apenas png ou jpg!",
                payload: null
            });
        }

        // Get the user passed by authGuard middleware
        const authUser: UserMongooseType = res.locals.user;

        const user = await UserModel.findById(authUser._id).select("-password");

        if(!user) {
            return res.status(404).json({
                status: "error",
                message: "Usuário não encontrado!",
                payload: null
            });
        }

        if(name) {
            user.name = name;
        }
        
        if(password) {
            const passwordHash: string | null = await utils.generatePasswordHash(password);

            if(passwordHash) {
                user.password = passwordHash;
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Ocorreu um erro! Tente mais tarde",
                    payload: null
                });
            }
        }

        if(bio) {
            user.bio = bio;
        }

        const currentProfileImage: string | undefined = user.profileImage;

        if(profileImage) {
            if(currentProfileImage) {
                // Remove the old profile image if it exists
                fs.unlink(`uploads/users/${currentProfileImage}`, (err) => {
                    if(err) {
                        Logger.error(
                            "Erro ao excluir imagem antiga de perfil --> " + `Erro: ${err}`
                        );
                    }
                    Logger.info(`Imagem antiga de perfil ${currentProfileImage} excluída com sucesso!`);
                });
            }

            user.profileImage = profileImage;
        }

        try {
            await user.save();
    
            return res.status(200).json({
                status: "success",
                message: "Usuário atualizado com sucesso!",
                payload: user
            });

        } catch(error: any) {
            Logger.error(
                "Não foi possível atualizar usuário --> " + `Erro: ${error}`
            );
            return res.status(422).json({
                status: "error",
                message: "Não foi possível atualizar usuário",
                payload: null
            });
        }
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await UserModel.findById(id).select("-password");

            if(!user) {
                return res.status(404).json({
                    status: "error",
                    message: "Usuário não encontrado!",
                    payload: null
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Usuário encontrado",
                payload: user
            });

        } catch(error: any) {
            Logger.error("Erro ao buscar usuário --> " + `Erro: ${error}`);
            return res.status(404).json({
                status: "error",
                message: "Erro ao buscar usuário!",
                payload: null
            });
        }
    }

}