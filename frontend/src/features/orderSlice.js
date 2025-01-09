import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchUserOrder = createAsyncThunk(
  "order/fetchUserOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance(`/api/users/orders/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/users/orders/create-order`,
        orderData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/users/orders/${orderId}/cancel`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const paymentVerify = createAsyncThunk(
  "order/paymentVerify",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/orders/payment-verify",
        paymentData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    paymentStatus: null,
    orderStatus:"pending",
    orderData: null,
    error: null,
    userOrders: null,
  },
  extraReducers: (builder) => {
    builder
      //fetch user order
      .addCase(fetchUserOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload.data;
      })
      .addCase(fetchUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload.data;
        state.paymentStatus = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //payment verify
      .addCase(paymentVerify.pending, (state) => {
        state.loading = true;
      })
      .addCase(paymentVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = "success";
        state.error = null;
      })
      .addCase(paymentVerify.rejected, (state, action) => {
        state.loading = false;
        state.paymentStatus = "failed";
        state.error = action.payload;
      })

      //cancel order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.loading = false;
        state.orderStatus = "cancelled";
        state.error = null;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
