import { Request } from "express";

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