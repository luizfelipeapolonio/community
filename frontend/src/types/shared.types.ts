export interface IApiResponse {
    status: "success" | "error";
    message: string | object[];
    payload: object | null;
}