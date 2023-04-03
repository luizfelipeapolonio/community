import { IApiResponse } from "./shared.types";

export interface IAuthenticatedUser {
    _id: string;
    name: string;
    profileImage: string | undefined;
    token: string;
}

export interface IAuthInitialState {
    user: IAuthenticatedUser | null;
    payload: IApiResponse | null;
    error: boolean;
    success: boolean;
    loading: boolean;
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