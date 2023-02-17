import { Request, Response } from "express";
import fs from "node:fs";

import Logger from "../config/logger";

import { UserModel } from "../models/User";
import { PostModel } from "../models/Post";

import { ITypedRequestBody } from "../types/SharedTypes";
import { ICreatePostBody } from "../types/PostTypes";
import { UserMongooseType } from "../types/UserTypes";

export class PostController {
    async createPost(req: ITypedRequestBody<ICreatePostBody>, res: Response) {
        const { title, tags, error } = req.body;
        const image = req.file;
        
        const authUser: UserMongooseType = res.locals.user;
        
        if(!image && error) {
            return res.status(422).json({
                status: "error",
                message: "Por favor, envie apenas png ou jpg!",
                payload: null
            });
        }
        
        if(!image) {
            return res.status(422).json({
                status: "error",
                message: "A imagem é obrigatória",
                payload: null
            });
        }
        
        try {
            const user = await UserModel.findById(authUser._id).select("-password");

            if(!user) {
                return res.status(404).json({
                    status: "error",
                    message: "Usuário não encontrado!",
                    payload: null
                });
            }

            const newPost = await PostModel.create({
                image: image.filename,
                title,
                tags,
                userId: user._id,
                userName: user.name
            });

            return res.status(201).json({
                status: "success",
                message: "Post criado com sucesso!",
                payload: newPost
            });
            
        } catch(error: any) {
            Logger.error("Erro ao criar post --> " + `Erro: ${error}`);

            // Remove image from the upload folder when post creation fails  
            fs.unlink(image.path, (err) => {
                if(err) {
                    Logger.error(
                        "Erro ao excluir imagem do post que falhou!" + `Erro: ${err}`
                    );
                }
                Logger.info("Imagem do post que falhou excluída com sucesso!");
            });

            return res.status(422).json({
                status: "error",
                message: "Erro ao criar post! Tente novamente mais tarde",
                payload: null
            });
        }
    }
}