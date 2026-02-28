import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Role } from "../../types/auth";

interface User {
    id: string;
    name: string;
    role: Role;
}

interface AuthState {
    user: User | null;
    loading: boolean,
    error: string | null,
}

const storedUser = localStorage.getItem("user");
const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
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
            state.loading = false;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;