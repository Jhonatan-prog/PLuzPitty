import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

type UserState = {
    NombreUsuario: string;
    Correo: string;
    NombreRol: string;
} | { Correo: string };

export type InitialState = {
    user: UserState | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    serverError: boolean;
}

export const initialState: InitialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    serverError: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.serverError = false;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.serverError = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setErrorServer: (state, action: PayloadAction<boolean>) => {
            state.serverError = action.payload;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
