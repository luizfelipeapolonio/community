export interface IUserRegisterBody {
    name: string;
    email: string;
    password: string;
}

export interface IUserLoginBody {
    email: string;
    password: string;
}