import { IAuthenticatedUser } from "../types/authSlice.types";

export const getUserFromLocalStorage = (): IAuthenticatedUser | null => {
    const user: string | null = localStorage.getItem("user");
    const parsedUser: IAuthenticatedUser | null = user ? JSON.parse(user) : null;
    
    return parsedUser;
}