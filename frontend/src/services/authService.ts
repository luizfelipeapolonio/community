import { api, requestConfig } from "../config/requestConfig";

// Types
import { 
    IUserRegisterBody, 
    IUserLoginBody 
} from "../types/auth.types";
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

const login = async (data: IUserLoginBody) => {
    const config = requestConfig<IUserLoginBody>("POST", data, null, false);

    try {
        const response = await fetch(api + "/users/login", config as RequestInit);
        const data: IApiResponse = await response.json();

        if(data.status === "success") {
            localStorage.setItem("user", JSON.stringify(data.payload));
        }

        console.log(data);

        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}

const logout = () => {
    localStorage.removeItem("user");
}

const authService = {
    register,
    login,
    logout
}

export default authService;