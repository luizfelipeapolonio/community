import { IApiResponse } from "./shared.types";

export interface IUserInitialState {
    loading: boolean;
    success: boolean;
    error: boolean;
    payload: IApiResponse | null;
}