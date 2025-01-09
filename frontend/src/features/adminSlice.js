import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchAllUsers = createAsyncThunk(
    "admin/fetchAllUsers",
    async ({page = 1, limit = 10 }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/api/admin/users?page=${page}&limit=${limit}`);                
        return response.data.data;
      } catch (error) {
        rejectWithValue(error.response?.data.message);
      }
    }
  );

  export const fetchDashboardDetails = createAsyncThunk(
    "admin/fetchDashboard",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/api/admin/dashboard`);        
        return response.data.data;
      } catch (error) {
        rejectWithValue(error.response?.data.message);
      }
    }
  );

export const fetchUserById = createAsyncThunk(
    "admin/fetchUserById",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/api/admin/user/${id}`);        
        return response.data;
      } catch (error) {
        rejectWithValue(error.response?.data.message);
      }
    }
  );

  export const fetchAllOrders = createAsyncThunk(
    "admin/fetchAllOrders",
    async ({page = 1, limit = 10 }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/api/admin/orders?page=${page}&limit=${limit}`);                        
        return response.data;
      } catch (error) {
        rejectWithValue(error.response?.data.message);
      }
    }
  );

  export const blockOrUnblockUser = createAsyncThunk(
    "admin/blockOrUnblockUser",
    async (id, { rejectWithValue }) => {      
      try {
        const response = await axiosInstance.put(`/api/admin/user/${id}/block`);        
        return response.data.data;
      } catch (error) {        
        rejectWithValue(error.response?.data.message);
      }
    }
  );

  const adminSlice = createSlice({
    name:"admin",
    initialState:{
        loading:false,
        users:[],
        orders:[],
        user:null,
        totalUsers:0,
        totalOrders:0,
        totalIncome: 0,
        totalProducts:0,
        error:null
    },
    extraReducers: (buidlder)=> {
        buidlder
        //fetch dashboard
        .addCase(fetchDashboardDetails.pending, (state)=> {
          state.loading = true
          })
          .addCase(fetchDashboardDetails.fulfilled, (state,action)=> {
              state.loading = false
              state.totalIncome = action.payload.totalIncome
              state.totalUsers = action.payload.totalUsers
              state.totalOrders = action.payload.totalOrders
              state.totalProducts = action.payload.totalProducts
          })
          .addCase(fetchDashboardDetails.rejected ,(state,action)=> {
              state.loading = false
              state.error = action.payload
          })
        //fetch all users
        .addCase(fetchAllUsers.pending, (state)=> {
        state.loading = true
        })
        .addCase(fetchAllUsers.fulfilled, (state,action)=> {
            state.loading = false,
            state.users = action.payload.users
            state.totalUsers = action.payload.totalUsers
        })
        .addCase(fetchAllUsers.rejected ,(state,action)=> {
            state.loading = false,
            state.error = action.payload
        })
        //fetch userby id
        .addCase(fetchUserById.pending, (state)=> {
            state.loading = true
        })
        .addCase(fetchUserById.fulfilled, (state,action)=> {
            state.loading = false,
            state.user = action.payload.data
        })
        .addCase(fetchUserById.rejected ,(state,action)=> {
            state.loading = false,
            state.error = action.payload
        })
        //fetch all orders
        .addCase(fetchAllOrders.pending, (state)=> {
          state.loading = true
        })
        .addCase(fetchAllOrders.fulfilled, (state,action)=> {
              state.loading = false,
              state.orders = action.payload.data
              state.totalOrders = action.payload.totalOrders
              state.totalIncome = action.payload.totalIncome
        })
        .addCase(fetchAllOrders.rejected ,(state,action)=> {
              state.loading = false,
              state.error = action.payload
        })
        //block user
        .addCase(blockOrUnblockUser.pending, (state)=> {
          state.loading = true
        })
        .addCase(blockOrUnblockUser.fulfilled , (state,action)=> {
          state.loading = false;          
          state.user = action.payload
          state.error = null
        })
        .addCase(blockOrUnblockUser.rejected ,(state,action)=> {
          state.loading = false;
          state.error = action.payload
        })
    }
  })

  export default adminSlice.reducer;