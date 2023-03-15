export interface IApiResponse {
    statusCode?: number;
    status: "success" | "error";
    message: string | object[];
    payload: object | null;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    favoritePosts: string[];
    createdAt: string;
    updateAt: string;
    __v: number;
    bio?: string;
    profileImage?: string;
}