export const api = "http://localhost:5000/api";

type RequestMethods = "GET" | "POST" | "DELETE" | "PATCH";

type HeaderRequest = {
    authorization?: string;
    "Content-Type"?: "application/json";
}

type RequestObjectConfig<T> = {
    method: RequestMethods;
    body?: T | ReturnType<JSON["stringify"]>;
    headers: HeaderRequest;
}

export const requestConfig = <T extends object | null>(
    method: RequestMethods, 
    data: T, 
    token: string | null, 
    image: boolean
): RequestObjectConfig<T> => {
    let config: RequestObjectConfig<T> | null = null;

    if(image) {
        config = {
            method,
            body: data,
            headers: {}
        };
    }

    if(data === null) {
        config = {
            method,
            headers: {}
        };
    } else {
        config = {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }

    if(token) {
        config.headers.authorization = `Bearer ${token}`;
    }

    return config;
}