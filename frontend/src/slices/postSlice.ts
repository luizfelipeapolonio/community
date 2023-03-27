import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Types
import { IApiResponse } from "../types/shared.types";
import { IPostInitialState } from "../types/postSlice.types";
import { RootState } from "../config/store";

// Service
import postService from "../services/postService";

const initialState: IPostInitialState = {
    loading: false,
    success: false,
    error: false,
    payload: null
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
)

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
    }
});

export const { resetPostStates } = postSlice.actions;
export default postSlice.reducer;