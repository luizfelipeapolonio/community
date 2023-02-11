import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { Types } from "mongoose";

import { config } from "../config/default";

import Logger from "../config/logger";

import { UserModel } from "../models/User";

import { TypedRequestBody, UserBody } from "../types/UserTypes";

import { UserServices } from "../services/UserServices";

export class UserController {
    async register(req: TypedRequestBody<UserBody>, res: Response) {
        // const services = new UserServices();
        
        // const token = services.generateToken("ayuhd7ad38");
        // const passwordHash = await services.generatePasswordHash("teste");
        const { name, email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if(user) {
            res.status(422).json({ errors: "E-mail já cadastrado!"});
            return;
        }

        // return res.json({ token, passwordHash });
    }

}