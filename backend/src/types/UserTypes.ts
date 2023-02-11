import { Request } from "express";

export interface TypedRequestBody<T> extends Request {
    body: T;
}

export interface UserBody {
    name: string;
    email: string;
    password: string;
}