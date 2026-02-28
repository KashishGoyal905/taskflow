import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>; // what type of our golbal state would be
export type AppDispatch = typeof store.dispatch; // what will be our type of dispatch function