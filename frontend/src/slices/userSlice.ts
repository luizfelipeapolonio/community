import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { IUserInitialState } from "../types/userSlice.types";
import { IUpdateBody } from "../types/userService.types";
import { IApiResponse } from "../types/shared.types";
import { RootState } from "../config/store";

// Service
import userService from "../services/userService";

const initialState: IUserInitialState = {
    loading: false,
    success: false,
    error: false,
    payload: null
}

export const getCurrentUser = createAsyncThunk<IApiResponse | null, void, {state: RootState}>(
    "user/profile",
    async (_, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;

        if(!token) return null;

        const data = await userService.profile(token);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const getUserById = createAsyncThunk(
    "user/getById",
    async (id: string, thunkAPI) => {
        const data = await userService.getUserById(id);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
);

export const updateProfile = createAsyncThunk<IApiResponse| null, IUpdateBody, {state: RootState}>(
    "user/update",
    async (body: IUpdateBody, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;

        if(!token) return null;

        const data = await userService.updateProfile(body, token);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }
        
        return data;
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUserStates: (state) => {
            state.loading = false;
            state.success = false;
            state.error = false;
            state.payload = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;
        })
        .addCase(getCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(getUserById.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;
        })
        .addCase(getUserById.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
    }
})

export const { resetUserStates } = userSlice.actions;
export default userSlice.reducer;