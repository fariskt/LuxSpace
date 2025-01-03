import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import productsReducer from './slices/productSlice'
import { axiosMiddleware } from "./api/apiClient";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer
    },
    middleware: (getDefaultMiddleware)=> {
       return getDefaultMiddleware().concat(axiosMiddleware)
    }
})

export default store;