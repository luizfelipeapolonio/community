export interface ICreatePostBody {
    title: string;
    tags: string[];
    error?: boolean | undefined;
}