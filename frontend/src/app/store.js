import { configureStore } from "@reduxjs/toolkit";
import productSlice from '../features/productSlice'
import authSlice from '../features/authSlice';
import cartSlice from '../features/cartSlice';
import adminSlice from '../features/adminSlice';
import orderSlice from '../features/orderSlice';
import wishListSlice from '../features/wishlistSlice';

const store = configureStore({
    reducer: {
        products: productSlice,
        auth: authSlice,
        cart: cartSlice,
        admin: adminSlice,
        order:orderSlice,
        wishlist: wishListSlice
    }
})

export default store;