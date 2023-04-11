import { IApiResponse, IPost } from "./shared.types";

export interface IPostInitialState {
    favoritePosts: string[];
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

export interface ILikeDislikeResponse extends IApiResponse {
    payload: {
        userId: string;
        userName: string;
        postId: string;
    };
}

export interface IFavoritePostResponse {
    postId: string;
    title: string;
}