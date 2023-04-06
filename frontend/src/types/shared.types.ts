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

export interface IComment {
    userId: string;
    userName: string;
    profileImage?: string;
    content: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IPost {
    _id: string;
    image: string;
    title: string;
    content: string;
    likes: string[];
    dislikes: string[];
    tags: string[];
    userId: string;
    userName: string;
    comments: IComment[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}