import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { IUserInitialState } from "../types/userSlice.types";
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

export const getUserProfile = createAsyncThunk<IApiResponse | null, void, {state: RootState}>(
    "user/profile",
    async (_, thunkAPI) => {
        const token: string | undefined = thunkAPI.getState().auth.user?.token;

        if(!token) return null;

        const data = await userService.profile(token);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data ? data : null;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = false;
            state.payload = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;
        })
        .addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
    }
})

export const { reset } = userSlice.actions;
export default userSlice.reducer;