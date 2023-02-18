export interface ICreatePostBody {
    title: string;
    tags: string[];
    content: string;
    error?: boolean | undefined;
}