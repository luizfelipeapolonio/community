export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    favoritePosts: string[];
    createdAt: string;
    updateAt: string;
    __v: number;
    bio?: string;
    profileImage?: string;
}