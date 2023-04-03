import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { IUserRegisterBody, IUserLoginBody, IAuthInitialState } from "../types/auth.types";
import { IApiResponse } from "../types/shared.types";

// Utils
import { getUserFromLocalStorage } from "../utils/getUserFromLocalStorage";

// Services
import authService from "../services/authService";

const initialState: IAuthInitialState = {
    user: getUserFromLocalStorage(),
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

export const login = createAsyncThunk(
    "auth/login",
    async (user: IUserLoginBody, thunkAPI) => {
        const data = await authService.login(user);

        if(data && data.status === "error") {
            return thunkAPI.rejectWithValue(data);
        }

        return data ? data : null
    }
);

export const logout = createAsyncThunk(
    "auth/logout", () => {
        authService.logout();
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
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;
        })
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
            state.payload = null;

            console.log("LOGIN PENDING USER: ", state.user);
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.payload = action.payload;
            state.user = getUserFromLocalStorage();

            console.log("LOGIN FULFILLED PAYLOAD: ", state.payload);
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
            state.payload = action.payload as IApiResponse;

            console.log("LOGIN REJECTED PAYLOAD: ", state.payload);
        })
        .addCase(logout.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;

            console.log("LOGOUT PENDING USER: ", state.user);
            console.log("LOGOUT PENDING LOADING: ", state.loading);
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.loading = false;
            state.success = true;
            state.error = false;

            console.log("LOGOUT FULFILLED USER: ", state.user);
            console.log("LOGOUT FULFILLED LOADING: ", state.loading);
        })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

