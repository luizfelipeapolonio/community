import { api, requestConfig } from "../config/requestConfig";

// Types
import { IApiResponse } from "../types/shared.types";

const profile = async (token: string): Promise<IApiResponse | null> => {
    const config = requestConfig("GET", null, token, false);

    try {
        const response = await fetch(api + "/users/profile", config);
        const data: IApiResponse = await response.json();
        
        data.statusCode = response.status;

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const getUserById = async (id: string): Promise<IApiResponse | null> => {
    const config = requestConfig("GET", null, null, false);

    try {
        const response = await fetch(api + `/users/${id}`, config);
        const data: IApiResponse = await response.json();

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const userService = {
    profile,
    getUserById
}

export default userService;