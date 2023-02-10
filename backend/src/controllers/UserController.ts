import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import { config } from "../../config/default";

import Logger from "../../config/logger";

export class UserController {
    generateToken(id: string): string | void {
        const jwtSecret: string | undefined = config.jwtSecret;

        if(jwtSecret === undefined) {
            Logger.error("JWT Secret não definido no arquivo .env");
            return;
        }

        const token: string = jwt.sign(id, jwtSecret, {
            expiresIn: "7d"
        });

        return token;
    }

    async register(req: Request, res: Response) {
        return res.send("Register");
    }
}