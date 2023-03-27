import { api, requestConfig } from "../config/requestConfig";

// Types
import { IApiResponse } from "../types/shared.types";

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

const postService = {
    getUserPosts,
    getAllPosts
}

export default postService;