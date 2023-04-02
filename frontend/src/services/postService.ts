import { api, requestConfig } from "../config/requestConfig";

// Types
import { IApiResponse } from "../types/shared.types";
import { IPostCreateBody, IPostEditBody } from "../types/postSlice.types";

const getUserPosts = async (id: string, token: string): Promise<IApiResponse | null> => {
    const config = requestConfig("GET", null, token, false);

    try {
        const response = await fetch(api + `/posts/user/${id}`, config);
        const data: IApiResponse = await response.json();

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const getAllPosts = async (): Promise<IApiResponse | null> => {
    const config = requestConfig("GET", null, null, false);

    try {
        const response = await fetch(api + "/posts/", config);
        const data: IApiResponse = await response.json();

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const createPost = async (body: IPostCreateBody, token: string): Promise<IApiResponse | null> => {
    const config = requestConfig<IPostCreateBody>("POST", body, token, true);

    try {
        const response = await fetch(api + "/posts/", config as RequestInit);
        const data: IApiResponse = await response.json();
        
        data.statusCode = response.status;

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const getPostById = async (id: string, token: string): Promise<IApiResponse | null> => {
    const config = requestConfig("GET", null, token, false);

    try {
        const response = await fetch(api + `/posts/${id}`, config);
        const data: IApiResponse = await response.json();

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const updatePost = async (id: string, body: IPostEditBody, token: string): Promise<IApiResponse | null> => {
    const config = requestConfig<IPostEditBody>("PATCH", body, token, false);

    try {
        const response = await fetch(api + `/posts/${id}`, config as RequestInit);
        const data: IApiResponse = await response.json();

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const deletePost = async ({ id }: {id: string}, token: string): Promise<IApiResponse | null> => {
    const config = requestConfig("DELETE", { id }, token, false);

    try {
        const response = await fetch(api + "/posts/", config as RequestInit);
        const data: IApiResponse = await response.json();

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const postService = {
    getUserPosts,
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
}

export default postService;