import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchUserWishList = createAsyncThunk(
  "cart/fetchWishlist",
  async (userId, { rejectWithError }) => {
    try {
      const response = await axiosInstance.get(`/api/users/wishlist/${userId}`);              
      return response.data.data
    } catch (error) {      
      rejectWithError(error.response.data.message);
    }
  }
);
export const addToWishlist = createAsyncThunk(
  "cart/addToWishlists",
  async ({userId, productId}, { rejectWithError }) => {
    try {
      const response = await axiosInstance.post(`/api/users/wishlist/${userId}`, {productId});        
      return response.data
    } catch (error) {      
      rejectWithError(error.response.data.message);
    }
  }
);
export const removeWishlist = createAsyncThunk(
  "cart/removeWishlist",
  async ({userId, productId}, { rejectWithError }) => {
    try {
      const response = await axiosInstance.patch(`/api/users/wishlist/${userId}`, {productId});  
      console.log(response.data);
            
      return response.data
    } catch (error) {
      console.log(error.response);
      
      rejectWithError(error.response.data.message);
    }
  }
);

const wishListSlice = createSlice({
    name: "wishlist",
    initialState: {
    wishlist: [],
    loading: false,
    error: null,
    },
    extraReducers: (builder)=> {
        builder
        .addCase(fetchUserWishList.pending, (state)=> {
            state.loading = true;
        })
        .addCase(fetchUserWishList.fulfilled, (state,action)=> {          
            state.loading = false;            
            state.wishlist = action.payload.items
        })
        .addCase(fetchUserWishList.rejected, (state,action)=> {
            state.loading = false;
            state.error = action.payload
        })

        //add wishlist
        .addCase(addToWishlist.pending, (state)=> {
            state.loading = true;
        })
        .addCase(addToWishlist.fulfilled, (state,action)=> {
            state.loading = false;            
            state.wishlist = action.payload.products
        })
        .addCase(addToWishlist.rejected, (state,action)=> {
            state.loading = false;
            state.error = action.payload
        })

        //remove wishlist
        .addCase(removeWishlist.pending, (state)=> {
            state.loading = true;
        })
        .addCase(removeWishlist.fulfilled, (state,action)=> {
            state.loading = false;                        
            state.wishlist = action.payload.data.products
        })
        .addCase(removeWishlist.rejected, (state,action)=> {
            state.loading = false;
            state.error = action.payload
        })
    }
})
export default wishListSlice.reducer;