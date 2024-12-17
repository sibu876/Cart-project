import { configureStore } from "@reduxjs/toolkit";
import CartSlice from './redux/CartSlice';
import authSlice from './redux/AuthSlice'

export const store = configureStore({
    reducer:{
        cart: CartSlice,
        auth: authSlice,

    },
});