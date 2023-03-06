import { IApiResponse } from "./shared.types";

export interface IAuthenticatedUser {
    _id: string;
    profileImage: string | undefined;
    token: string;
}

export interface IAuthInitialState {
    payload: IApiResponse | null;
    error: boolean;
    success: boolean;
    loading: boolean;
}