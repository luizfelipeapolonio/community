import { api, requestConfig } from "../config/requestConfig";

// Types
import { 
    IUserRegisterBody, 
    IUserLoginBody 
} from "../types/authService.types";
import { IApiResponse } from "../types/shared.types";

const register = async (data: IUserRegisterBody): Promise<IApiResponse | null> => {
    const config = requestConfig<IUserRegisterBody>("POST", data, null, false);

    try {
        const response = await fetch(api + "/users/register", config as RequestInit);
        const data: IApiResponse = await response.json();

        console.log(data);

        return data;

    } catch(error) {
        console.log(error);
        return null
    }
}

const login = async (data: IUserLoginBody): Promise<void | null> => {
    const config = requestConfig<IUserLoginBody>("GET", data, null, false);

    try {
        const response = await fetch(api + "/users/login" + config);
        const data: IApiResponse = await response.json();

        if(data.status === "success") {
            localStorage.setItem("user", JSON.stringify(data.payload));
        }

    } catch(error) {
        console.log(error);
        return null;
    }
}

const authService = {
    register,
    login
}

export default authService;