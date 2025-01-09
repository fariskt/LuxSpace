import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (userId, { rejectWithError }) => {
    try {
      const response = await axiosInstance.get(`/api/users/cart/${userId}`);
      const { cart, totalAmount } = response.data.data;
      return { cart, totalAmount };
    } catch (error) {
      rejectWithError(error.response.data.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/users/cart", {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/api/users/cart/remove", {
        productId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const increaseCartQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/api/users/cart/increase", {
        productId,
      });
      console.log(response.data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const decreaseCartQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/api/users/cart/decrease", {
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
    cart: [], // cart.products is an array[]
    totalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        const { cart, totalAmount } = action.payload;
        state.cart = cart.products;
        state.totalAmount = totalAmount;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data?.products;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data?.products;
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      //increase
      .addCase(increaseCartQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(increaseCartQuantity.fulfilled, (state, action) => {
        const updatedProduct = action.payload; // The updated product object from API

        state.cart = state.cart.map((item) =>
          item.productId === updatedProduct.productId
            ? { ...item, ...updatedProduct }
            : item
        );
      })
      .addCase(increaseCartQuantity.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      //decrease
      .addCase(decreaseCartQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(decreaseCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const existingProduct = state.cart.find(
          (item) => item.productId === updatedProduct.productId
        );

        if (existingProduct) {
          existingProduct.quantity = updatedProduct.quantity;
        }
      })
      .addCase(decreaseCartQuantity.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
