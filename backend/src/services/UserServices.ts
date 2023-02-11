import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { config } from "../config/default";

import Logger from "../config/logger";

export class UserServices {
    generateToken(id: string): string | null {
        const jwtSecret: string | undefined = config.jwtSecret;
    
        if(jwtSecret === undefined) {
            Logger.error("JWT Secret não definido no arquivo .env");
            return null;
        }
    
        const token: string = jwt.sign({ id }, jwtSecret, {
            expiresIn: "7d"
        });
    
        return token;
    }

    async generatePasswordHash(password: string): Promise<string | null> {
        try {
            const salt: string = await bcrypt.genSalt();
            const passwordHash: string = await bcrypt.hash(password, salt);

            return passwordHash;

        } catch(error: any) {
            Logger.error("Ocorreu um erro --> " + `Erro: ${error}`);
            return null;
        }
    }
}