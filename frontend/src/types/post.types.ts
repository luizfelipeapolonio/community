import { IApiResponse, IPost } from "./shared.types";

export interface IPostInitialState {
    post: IPost | null;
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

export interface ILikeResponse extends IApiResponse {
    payload: {
        userId: string;
        userName: string;
        postId: string;
    };
}