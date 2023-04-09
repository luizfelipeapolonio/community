import { Request, Response } from "express";
import fs from "node:fs";
import { Types } from "mongoose";

import Logger from "../config/logger";

// Models
import { UserModel } from "../models/User";
import { PostModel } from "../models/Post";

// Types
import { ITypedRequestBody } from "../types/SharedTypes";
import { 
    IPostCreateBody, 
    IPostUpdateBody, 
    IPostCommentBody,
    IPostDeleteBody,
    IRequestQuery,
    ICommentDeleteBody
} from "../types/PostTypes";
import { UserMongooseType } from "../types/UserTypes";
import { IComment } from "../models/Post";

export class PostController {
    async createPost(req: ITypedRequestBody<IPostCreateBody>, res: Response) {
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

    async deletePost(req: ITypedRequestBody<IPostDeleteBody>, res: Response) {
        const { id } = req.body;
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

    async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await PostModel.find({}).sort([["createdAt", -1]]).exec();

            return res.status(200).json({
                status: "success",
                message: "Posts encontrados",
                payload: posts
            });

        } catch(error: any) {
            Logger.error("Erro ao buscar todos os posts! --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro inesperado! Por favor, volte mais tarde",
                payload: null
            });
        }
    }

    async getUserPosts(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const posts = await PostModel.find({ userId: id }).sort([["createdAt", -1]]).exec();

            return res.status(200).json({
                status: "success",
                message: "Posts do usuário",
                payload: posts
            });

        } catch(error: any) {
            Logger.error("Erro ao buscar posts do usuário! --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    async getPostById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const post = await PostModel.findById(id);

            if(!post) {
                return res.status(404).json({
                    status: "error",
                    message: "Post não encontrado!",
                    payload: null
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Post encontrado",
                payload: post
            });

        } catch(error: any) {
            Logger.error("Erro ao buscar post! --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde!",
                payload: null
            });
        }
    }

    async updatePost(req: ITypedRequestBody<IPostUpdateBody>, res: Response) {
        const { id } = req.params;
        const { content, tags } = req.body;
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

            // Check if the post belongs to the authenticated user
            if(!post.userId.equals(authUser._id)) {
                return res.status(406).json({
                    status: "error",
                    message: "Ocorreu um erro! Tente novamente mais tarde",
                    payload: null
                });
            }

            if(content) {
                post.content = content;
            }

            if(tags) {
                post.tags = tags;
            }

            await post.save();

            return res.status(200).json({
                status: "success",
                message: "Post atualizado com sucesso!",
                payload: post
            });

        } catch(error: any) {
            Logger.error("Erro ao atualizar post! --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Erro ao atualizar post!",
                payload: null
            });
        }
    }

    async likePost(req: Request, res: Response) {
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

            const likedPostData = {
                userId: authUser._id,
                userName: authUser.name,
                postId: post._id
            }

            // Check if user have already disliked the post, if so, remove it and
            // insert like on the post
            if(post.dislikes.includes(authUser._id)) {
                post.dislikes = post.dislikes.filter((id) => {
                    return !id.equals(authUser._id);
                });
                post.likes.push(authUser._id);

                await post.save();

                return res.status(200).json({
                    status: "success",
                    message: "Dislike removido, like adicionado",
                    payload: likedPostData
                });
            }

            // Check if user have already liked the post, if so, remove it
            if(post.likes.includes(authUser._id)) {
                post.likes = post.likes.filter((id) => {
                    return !id.equals(authUser._id);
                });

                await post.save();

                return res.status(200).json({
                    status: "success",
                    message: "Like removido do post",
                    payload: likedPostData
                });

            } else {
                // If user haven't liked the post yet, insert the like on the post
                post.likes.push(authUser._id);

                await post.save();

                return res.status(200).json({
                    status: "success",
                    message: "Like adicionado no post",
                    payload: likedPostData
                });
            }

        } catch(error: any) {
            Logger.error("Erro ao adicionar ou remover like do post! --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    async dislikePost(req: Request, res: Response) {
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

            const dislikedPostData = {
                userId: authUser._id,
                userName: authUser.name,
                postId: post._id
            }

            // Check if user have already liked the post, if so, remove it and
            // insert dislike on the post
            if(post.likes.includes(authUser._id)) {
                post.likes = post.likes.filter((id) => {
                    return !id.equals(authUser._id);
                });
                post.dislikes.push(authUser._id);

                await post.save();

                return res.status(200).json({
                    status: "success",
                    message: "Like removido, dislike adicionado",
                    payload: dislikedPostData
                });
            }

            // Check if user have already disliked the post, if so, remove it
            if(post.dislikes.includes(authUser._id)) {
                post.dislikes = post.dislikes.filter((id) => {
                    return !id.equals(authUser._id);
                });

                await post.save();

                return res.status(200).json({
                    status: "success",
                    message: "Dislike removido do post",
                    payload: dislikedPostData
                });

            } else {
                // If user haven't disliked the post yet, insert the dislike on the post
                post.dislikes.push(authUser._id);

                await post.save();

                return res.status(200).json({
                    status: "success",
                    message: "Dislike adicionado no post",
                    payload: dislikedPostData
                });
            }

        } catch(error: any) {
            Logger.error("Erro ao adicionar ou remover dislike do post --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    async insertComment(req: ITypedRequestBody<IPostCommentBody>, res: Response) {
        const { id } = req.params;
        const { content } = req.body;
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

            const userComment = {
                userId: authUser._id,
                userName: authUser.name,
                content,
                profileImage: authUser.profileImage
            }

            post.comments.unshift(userComment);

            await post.save();

            const commentAdded = post.comments.at(0);
            
            return res.status(200).json({
                status: "success",
                message: "Comentário adicionado com sucesso!",
                payload: commentAdded
            });

        } catch(error: any) {
            Logger.error("Erro ao adicionar comentário no post --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    async deleteComment(req: ITypedRequestBody<ICommentDeleteBody>, res: Response) {
        const { id } = req.params;
        const { commentId } = req.body;
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

            const deletedComment = post.comments.filter((comment) => {
                if(comment.userId.equals(authUser._id)) {
                    return comment._id.equals(commentId);
                }
            });

            if(deletedComment.length === 0) {
                return res.status(500).json({
                    status: "error",
                    message: "Ocorreu um erro! Tente mais tarde",
                    payload: null
                });
            }

            const newCommentsArray = post.comments.filter((comment) => {
                return !comment._id.equals(commentId);
            });

            post.comments = newCommentsArray as Types.DocumentArray<IComment>;

            await post.save();

            return res.status(200).json({
                status: "success", 
                message: "Comentário excluído com sucesso!",
                payload: deletedComment
            });
           
        } catch(error: any) {
            Logger.error("Erro ao excluir comentário do post --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    async searchPost(req: Request<{}, {}, {}, IRequestQuery>, res: Response) {
        const { q } = req.query;

        try {
            // Search posts by title or tag field
            const posts = await PostModel.find({$or: [
                    {title: new RegExp(q, "i")}, 
                    {tags: new RegExp(q, "i")}
                ]
            }).exec();

            return res.status(200).json({
                status: "success",
                message: "Posts encontrados",
                payload: posts
            });

        } catch(error: any) {
            Logger.error("Erro ao buscar posts --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar posts! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    async favoritePost(req: Request, res: Response) {
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

            const user = await UserModel.findById(authUser._id);

            if(!user) {
                return res.status(404).json({
                    status: "error",
                    message: "Usuário não encontrado!",
                    payload: null
                });
            }

            const favoritePost = {
                postId: post._id,
                title: post.title
            }

            // Check if user have already added the post to the favorites, 
            // if so, remove it
            if(user.favoritePosts.includes(post._id)) {
                user.favoritePosts = user.favoritePosts.filter((id) => {
                    return !id.equals(post._id);
                });

                await user.save();

                return res.status(200).json({
                    status: "success",
                    message: "Post removido dos favoritos",
                    payload: favoritePost
                });

            } else {
                // If user haven't added the post to favorites yet, 
                // insert the post to the favorites list
                user.favoritePosts.push(post._id);

                await user.save();

                return res.status(200).json({
                    status: "success",
                    message: "Post adicionado aos favoritos",
                    payload: favoritePost
                });
            }

        } catch(error: any) {
            Logger.error(
                "Erro ao adicionar ou remover post dos favoritos --> " + `Erro: ${error}`
            );
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    async getFavoritePosts(req: Request, res: Response) {
        const authUser: UserMongooseType = res.locals.user;

        try {
            const user = await UserModel.findById(authUser._id);

            if(!user) {
                return res.status(404).json({
                    status: "error", 
                    message: "Usuário não encontrado!"
                });
            }

            const favoritePosts = {
                userId: user._id,
                userName: user.name,
                favoritePosts: user.favoritePosts
            }

            return res.status(200).json({
                status: "success",
                message: "Posts favoritos",
                payload: favoritePosts
            });

        } catch(error: any) {
            Logger.error("Erro ao buscar posts favoritos --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }
}