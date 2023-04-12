import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Types
import { IApiResponse, IPost, IComment, IUser } from "../types/shared.types";
import { 
    IPostInitialState, 
    IPostCreateBody, 
    IPostEditBody, 
    ILikeDislikeResponse,
    IFavoritePostResponse
} from "../types/post.types";
import { RootState } from "../config/store";

// Service
import postService from "../services/postService";
import userService from "../services/userService";

const initialState: IPostInitialState = {
    favoritePosts: [],
    post: null,
    loading: false,
    success: false,
    error: false,
    payload: null
}

const posts: { postsId: string[] } = {
    postsId: []
}

export const getUserPosts = createAsyncThunk<IApiResponse | null, string, {state: RootState}>(
    "post/getUserPosts",
    async (id: string, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;

        if(!token) return null;

        const data = await postService.getUserPosts(id, token);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const getAllPosts = createAsyncThunk<IApiResponse | null, void, {state: RootState}>(
    "post/getAll",
    async (_, thunkAPI) => {
        const data = await postService.getAllPosts();

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const createPost = createAsyncThunk<IApiResponse | null, IPostCreateBody, {state: RootState}>(
    "post/create",
    async (body: IPostCreateBody, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;

        if(!token) return null;
        
        const data = await postService.createPost(body, token);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const getPostById = createAsyncThunk<IApiResponse | null, string, {state: RootState}>(
    "post/getById",
    async (id: string, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;
        const authUserId: string | undefined = thunkAPI.getState().auth.user?._id;

        if(!token) return null;
        if(!authUserId) return null;

        const authUser = await userService.getUserById(authUserId);

        if(authUser) {
            posts.postsId = (authUser.payload as IUser).favoritePosts;
        }

        const data = await postService.getPostById(id, token);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const updatePost = createAsyncThunk<IApiResponse | null, {id: string, body: IPostEditBody}, {state: RootState}>(
    "post/update",
    async ({ id, body }, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;

        if(!token) return null;

        const data = await postService.updatePost(id, body, token);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const deletePost = createAsyncThunk<IApiResponse | null, {id: string}, {state: RootState}>(
    "post/delete",
    async ({ id }, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;

        if(!token) return null;

        const data = await postService.deletePost({ id }, token);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const likePost = createAsyncThunk<IApiResponse | null, string, {state: RootState}>(
    "post/like",
    async (id, ThunkAPI) => {
        const token: string | undefined = ThunkAPI.getState().auth.user?.token;
        
        if(!token) return null;

        const data = await postService.likePost(id, token);

        if(data && data.status === "error") {
            return ThunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const dislikePost = createAsyncThunk<IApiResponse | null, string, {state: RootState}>(
    "post/dislike",
    async (id, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;

        if(!token) return null;

        const data = await postService.dislikePost(id, token);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const insertComment = createAsyncThunk<IApiResponse | null, {id: string, content: string}, {state: RootState}>(
    "post/insertComment",
    async ({ id, content }, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;

        if(!token) return null;

        const data = await postService.insertComment(id, { content }, token);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const deleteComment = createAsyncThunk<IApiResponse | null, {id: string, commentId: string}, {state: RootState}>(
    "post/deleteComment",
    async ({ id, commentId }, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;

        if(!token) return null;

        const data = await postService.deleteComment(id, { commentId }, token);
        
        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const addFavoritePost = createAsyncThunk<IApiResponse | null, string, {state: RootState}>(
    "post/addFavorite",
    async (id, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;
        
        if(!token) return null;

        const data = await postService.addFavoritePost(id, token);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const getFavoritePosts = createAsyncThunk<IApiResponse | null, void, {state: RootState}>(
    "post/getFavorites",
    async (_, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;

        if(!token) return null;

        const data = await postService.getFavoritePosts(token);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const searchPost = createAsyncThunk(
    "post/search",
    async (query: string, thunkAPI) => {
        const data = await postService.searchPost(query);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        resetPostStates: (state) => {
            state.loading = false;
            state.success = false;
            state.error = false;
            state.payload = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserPosts.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(getUserPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;
        })
        .addCase(getUserPosts.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(getAllPosts.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;
        })
        .addCase(getAllPosts.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(createPost.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;
        })
        .addCase(createPost.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(getPostById.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(getPostById.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;

            // Assign postsId array to favoritePosts state
            if(action.payload) {
                state.post = action.payload.payload as IPost;
                state.favoritePosts = posts.postsId;
            }
        })
        .addCase(getPostById.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(updatePost.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;
        })
        .addCase(updatePost.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(deletePost.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;
        })
        .addCase(deletePost.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(likePost.pending, (state) => {
            state.loading = false;
            state.success = false;
            state.error = false;
        })
        .addCase(likePost.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;

            // Adds or deletes user Id from likes array without making a new request
            if(state.post && action.payload) {
                if(state.post.likes.includes((action.payload as ILikeDislikeResponse).payload.userId)) {
                    state.post.likes = state.post.likes.filter((id) => {
                        return id !== (action.payload as ILikeDislikeResponse).payload.userId;
                    });
                } else {
                    state.post.likes.push((action.payload as ILikeDislikeResponse).payload.userId);
                }

                // Check if user have already disliked the post, if so, remove it
                if(state.post.dislikes.includes((action.payload as ILikeDislikeResponse).payload.userId)) {
                    state.post.dislikes = state.post.dislikes.filter((id) => {
                        return id !== (action.payload as ILikeDislikeResponse).payload.userId;
                    });
                }
            }
        })
        .addCase(likePost.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(dislikePost.pending, (state) => {
            state.loading = false;
            state.success = false;
            state.error = false;
        })
        .addCase(dislikePost.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;

            // Adds or deletes user Id from dislikes array without making a new request
            if(state.post && action.payload) {
                if(state.post.dislikes.includes((action.payload as ILikeDislikeResponse).payload.userId)) {
                    state.post.dislikes = state.post.dislikes.filter((id) => {
                        return id !== (action.payload as ILikeDislikeResponse).payload.userId;
                    });
                } else {
                    state.post.dislikes.push((action.payload as ILikeDislikeResponse).payload.userId);
                }

                // Check if user have already liked the post, if so, remove it
                if(state.post.likes.includes((action.payload as ILikeDislikeResponse).payload.userId)) {
                    state.post.likes = state.post.likes.filter((id) => {
                        return id !== (action.payload as ILikeDislikeResponse).payload.userId;
                    });
                }
            }
        })
        .addCase(insertComment.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(insertComment.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;

            // Add comment to post state comments array  
            if(state.post && action.payload) {
                state.post.comments.unshift(action.payload.payload as IComment);
            }
        })
        .addCase(insertComment.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(deleteComment.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(deleteComment.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;

            // Remove the deleted comment from post state comments array
            if(state.post) {
                state.post.comments = state.post.comments.filter((comment) => {
                    if(action.payload) {
                        return comment._id !== (action.payload.payload as IComment[])[0]._id;
                    }
                });
            }
        })
        .addCase(deleteComment.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(addFavoritePost.pending, (state) => {
            state.loading = false;
            state.success = false;
            state.error = false;
        })
        .addCase(addFavoritePost.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;

            // Check if user have already saved the post as favorite, if so, remove it
            if(action.payload) {
                if(state.favoritePosts.includes((action.payload.payload as IFavoritePostResponse).postId)) {
                    state.favoritePosts = state.favoritePosts.filter((id) => {
                        return id !== (action.payload?.payload as IFavoritePostResponse).postId
                    });
                } else {
                    state.favoritePosts.push((action.payload.payload as IFavoritePostResponse).postId);
                }
            }
        })
        .addCase(addFavoritePost.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(getFavoritePosts.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(getFavoritePosts.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;
        })
        .addCase(getFavoritePosts.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(searchPost.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(searchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;
        })
        .addCase(searchPost.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
    }
});

export const { resetPostStates } = postSlice.actions;
export default postSlice.reducer;