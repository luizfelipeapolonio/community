import { Request } from "express";
import { Document, Types } from "mongoose";
import { IUser } from "../models/User";

export interface ITypedRequestBody<T> extends Request {
    body: T;
}

export interface IUserRegisterBody {
    name: string;
    email: string;
    password: string;
}

export interface IUserLoginBody {
    email: string;
    password: string;
}

export interface IUserUpdateBody {
    name?: string | undefined;
    password?: string | undefined;
    bio?: string | undefined;
}

export type UserMongooseType = Document<unknown, any, IUser> & IUser & { _id:Types.ObjectId };