import { IApiResponse } from "./shared.types";

export interface IUserInitialState {
    loading: boolean;
    success: boolean;
    error: boolean;
    payload: IApiResponse | null;
}

export interface IUpdateBody {
    name?: string;
    password?: string;
    bio?: string;
    profileImage?: File;
}