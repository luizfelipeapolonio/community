import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { IUserRegisterBody } from "../types/authService.types";
import { IAuthInitialState, IAuthenticatedUser } from "../types/authSlice.types";
import { IApiResponse } from "../types/shared.types";

// Services
import authService from "../services/authService";

// Get user from the Local Storage
const user: string | null = localStorage.getItem("user");
const parsedUser: IAuthenticatedUser | null = user ? JSON.parse(user) : null;

const initialState: IAuthInitialState = {
    payload: null,
    error: false,
    success: false,
    loading: false
}

export const register = createAsyncThunk(
    "auth/register",
    async (user: IUserRegisterBody, thunkAPI) => {
        const data = await authService.register(user);

        // Check for api errors
        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data ? data : null;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.error = false;
            state.success = false;
            state.loading = false;
            state.payload = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
            state.payload = null;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;

            console.log("FULFILLED PAYLOAD: ", state.payload);
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;

            console.log("REJECTED PAYLOAD: ", state.payload);
        })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

