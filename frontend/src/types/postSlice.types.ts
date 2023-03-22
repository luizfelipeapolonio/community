import { IApiResponse } from "./shared.types";

export interface IPostInitialState {
    loading: boolean;
    success: boolean;
    error: boolean;
    payload: IApiResponse | null;
}