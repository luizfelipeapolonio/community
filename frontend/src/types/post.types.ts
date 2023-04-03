import { IApiResponse } from "./shared.types";

export interface IPostInitialState {
    loading: boolean;
    success: boolean;
    error: boolean;
    payload: IApiResponse | null;
}

export interface IPostCreateBody {
    title: string;
    tags: string[];
    content: string;
    image: File | null;
}

export interface IPostEditBody {
    tags?: string[];
    content?: string;
}