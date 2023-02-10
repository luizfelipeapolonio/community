import { model, Schema, Types } from "mongoose";

interface IUser {
    name: string;
    email: string;
    password: string;
    profileImage: string;
    favoritePosts: Types.ObjectId[];
    bio: string;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        profileImage: { type: String },
        favoritePosts: { type: [Schema.Types.ObjectId] },
        bio: { type: String }
    },
    {
        timestamps: true
    }
);

export const UserModel = model<IUser>("User", UserSchema);