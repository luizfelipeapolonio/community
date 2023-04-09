export interface IPostCreateBody {
    title: string;
    tags: string[];
    content: string;
    error?: boolean | undefined;
}

export interface IPostUpdateBody {
    content?: string | undefined;
    tags?: string[] | undefined;
}

export interface IPostDeleteBody {
    id: string;
}

export interface IPostCommentBody {
    content: string;
}

export interface ICommentDeleteBody {
    commentId: string;
}

export interface IRequestQuery {
    q: string;
}

