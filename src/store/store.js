import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth.js";
export const store=configureStore({
    reducer:{
        "auth":authReducers
    }
});
