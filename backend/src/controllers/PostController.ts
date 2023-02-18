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
        const { title, content, tags, error } = req.body;
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
                content,
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

    async deletePost(req: Request, res: Response) {
        const { id } = req.params;
        const authUser: UserMongooseType = res.locals.user;

        try {
            const post = await PostModel.findById(id);

            if(!post) {
                return res.status(404).json({
                    status: "error",
                    message: "Post não encontrado!",
                    payload: null
                });
            }

            // Check if the post belongs to the user
            if(!post.userId.equals(authUser._id)) {
                return res.status(406).json({
                    status: "error",
                    message: "Ocorreu um erro! Tente novamente mais tarde",
                    payload: null
                });
            }

            const deletedPost = await PostModel.findByIdAndDelete(post._id);

            // Delete the post image from upload directory
            fs.unlink(`uploads/posts/${post.image}`, (err) => {
                if(err) {
                    Logger.error(
                        "Erro ao excluir imagem do post deletado!" + `Erro: ${err}`
                    );
                }
                Logger.info(`Imagem ${post.image} do post deletado excluída com sucesso!`);
            });

            return res.status(200).json({
                status: "success",
                message: "Post excluído com sucesso!",
                payload: deletedPost
            });

        } catch(error: any) {
            Logger.error("Erro ao excluir post! --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Erro ao excluir post!",
                payload: null
            });
        }
    }
}