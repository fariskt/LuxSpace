import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Fetch Cart Data
export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/users/cart/${userId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Add Item to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/users/cart", {
        productId,
        quantity,
      });
      
      return response.data.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// Remove Item from Cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/api/users/cart/remove", {
        productId,
      });
      console.log(response.data);
      return response.data.data;
      
    } catch (error) {
      console.log(error.response);
      
      return rejectWithValue(error.response.data);
    }
  }
);

// Increase Quantity in Cart
export const increaseCartQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/api/users/cart/increase`, {
        productId,
      });
      return response.data.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// Decrease Quantity in Cart
export const decreaseCartQuantity = createAsyncThunk(
  "cart/decreaseCartQuantity",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch( `/api/users/cart/decrease`, {
        productId,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalAmount: 0,
    cartLoading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
    },
    updateCartLocally: (state, action) => {
      state.cart = action.payload;
      state.totalAmount = state.cart?.reduce(
        (sum, item) => sum + item?.productId?.price * item.quantity,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchUserCart.pending, (state) => {
        state.cartLoading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cart = action.payload.cart.items;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartLoading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.error = action.payload.message;
      })


      // Increase Quantity
      .addCase(increaseCartQuantity.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(increaseCartQuantity.fulfilled, (state, action) => {
        state.cartLoading = false;
      })
      .addCase(increaseCartQuantity.rejected, (state, action) => {
        state.cartLoading = false;
        state.error = action.payload.message;
      })

      // Decrease Quantity
      .addCase(decreaseCartQuantity.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(decreaseCartQuantity.fulfilled, (state, action) => {
        state.cartLoading = false;
      })
      .addCase(decreaseCartQuantity.rejected, (state, action) => {
        state.cartLoading = false;
        state.error = action.payload.message;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartLoading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearCart, updateCartLocally } = cartSlice.actions;
export default cartSlice.reducer;
