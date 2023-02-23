import { model, Schema, Types } from "mongoose";

export interface IComment {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    userName: string;
    profileImage?: string | undefined;
    content: string;
}

interface IPost {
    image: string;
    title: string;
    content: string;
    likes: Types.ObjectId[];
    dislikes: Types.ObjectId[];
    comments: Types.DocumentArray<IComment>;
    tags: string[];
    userId: Types.ObjectId;
    userName: string;
}

const CommentSchema = new Schema<IComment>(
    {
        userId: { type: Schema.Types.ObjectId },
        userName: { type: String },
        profileImage: { type: String },
        content: { type: String }
    },
    {
        timestamps: true
    }
)

const PostSchema = new Schema<IPost>(
    {
        image: { type: String },
        title: { type: String },
        content: { type: String },
        likes: { type: [Schema.Types.ObjectId] },
        dislikes: { type: [Schema.Types.ObjectId] },
        comments: { type: [{ type: CommentSchema }] },
        tags: { type: [String] },
        userId: { type: Schema.Types.ObjectId} ,
        userName: { type: String }
    },
    {
        timestamps: true
    }
);

export const PostModel = model<IPost>("Post", PostSchema);