import { Request } from "express";

export interface ITypedRequestBody<T> extends Request {
    body: T;
}

export interface UserRegisterBody {
    name: string;
    email: string;
    password: string;
}