import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { UserModel } from "../models/User";
import { config } from "../config/default";
import Logger from "../config/logger";

export class AuthGuard {
    async execute(req: Request, res: Response, next: NextFunction) {
        const authHeader: string | undefined = req.headers["authorization"];
        const token: string | undefined = authHeader ? authHeader.split(" ")[1] : undefined;
        const jwtSecret: string | undefined = config.jwtSecret;

        // Check if token exists
        if(!token) {
            return res.status(401).json({
                status: "error",
                message: "Acesso negado!",
                payload: null
            });
        }
        
        // Check if env jwt secret exists
        if(!jwtSecret) {
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Tente mais tarde",
                payload: null
            });
        }

        try{
            const verified = jwt.verify(token, jwtSecret) as JwtPayload;
            
            const user = await UserModel.findById(verified.id).select("-password");

            res.locals.user = user;

            return next();

        } catch(error: any) {
            Logger.error("Erro na validação do token --> " + `Erro: ${error}`);

            return res.status(401).json({
                status: "error",
                message: "Token inválido!",
                payload: null
            });
        }
    }
}