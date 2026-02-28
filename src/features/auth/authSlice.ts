import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Role } from "../../types/auth";

interface User {
    id: string;
    name: string;
    role: Role;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean,
    error: string | null,
}

const storedUser = localStorage.getItem("user");
const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: storedUser ? true : false,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            console.log("insode login function");
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;