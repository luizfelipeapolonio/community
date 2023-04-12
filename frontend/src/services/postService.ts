import { api, requestConfig } from "../config/requestConfig";

// Types
import { IApiResponse } from "../types/shared.types";
import { IPostCreateBody, IPostEditBody } from "../types/post.types";

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

const likePost = async (id: string, token: string): Promise<IApiResponse | null> => {
    const config = requestConfig("PATCH", null, token, false);

    try {
        const response = await fetch(api + `/posts/like/${id}`, config);
        const data: IApiResponse = await response.json();

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const dislikePost = async (id: string, token: string): Promise<IApiResponse | null> => {
    const config = requestConfig("PATCH", null, token, false);

    try {
        const response = await fetch(api + `/posts/dislike/${id}`, config);
        const data: IApiResponse = await response.json();

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const insertComment = async (id: string, { content }: { content: string }, token: string): Promise<IApiResponse | null> => {
    const config = requestConfig("PATCH", { content }, token, false);

    try {
        const response = await fetch(api + `/posts/comment/${id}`, config as RequestInit);
        const data: IApiResponse = await response.json();

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const deleteComment = async (id: string, { commentId }: { commentId: string }, token: string): Promise<IApiResponse | null> => {
    const config = requestConfig("PATCH", { commentId }, token, false);

    try {
        const response = await fetch(api + `/posts/comment/${id}/remove`, config as RequestInit);
        const data: IApiResponse = await response.json();

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const addFavoritePost = async (id: string, token: string): Promise<IApiResponse | null> => {
    const config = requestConfig("PATCH", null, token, false);

    try {
        const response = await fetch(api + `/posts/favorites/${id}`, config);
        const data: IApiResponse = await response.json();

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const getFavoritePosts = async (token: string): Promise<IApiResponse | null> => {
    const config = requestConfig("GET", null, token, false);

    try {
        const response = await fetch(api + "/posts/favorites", config);
        const data: IApiResponse = await response.json();

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const searchPost = async (query: string): Promise<IApiResponse | null> => {
    const config = requestConfig("GET", null, null, false);

    try {
        const response = await fetch(api + `/posts/search?q=${query}`, config);
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
    deletePost,
    likePost,
    dislikePost,
    insertComment,
    deleteComment,
    addFavoritePost,
    getFavoritePosts,
    searchPost
}

export default postService;