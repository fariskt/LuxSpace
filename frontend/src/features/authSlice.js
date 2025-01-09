import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

// Handle login
export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/users/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/users/register", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/users/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Refresh token
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/users/refresh-token");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Fetch user details
export const fetchUserDetails = createAsyncThunk(
  "auth/getUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/users/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    isUserAuthenticated: false,
    isAdminAuthenticated:sessionStorage.getItem("isAdminLogin")|| false,
    authUser: null,
    loginError: null,
    signUpError: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(handleLogin.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {        
        const {data,accessToken} = action.payload;
        const user = data
        if (user.role == "user") {
          state.isUserAuthenticated = true;
        }
        if(user.role == "admin"){
          state.isAdminAuthenticated = true;
          sessionStorage.setItem("isAdminLogin", true);
        }
        state.authUser = user
        state.accessToken = accessToken;
        state.loading = false;
        localStorage.setItem("accessToken", accessToken);
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loginError = action.payload;
        state.loading = false;
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload.data
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.signUpError = action.payload;
        state.loading = false;
      })
      // get user info
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.authUser = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // logout user
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.authUser = null;
        state.accessToken = null;
        state.isAdminAuthenticated = false;
        state.isUserAuthenticated = false;
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("isAdminLogin");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // refresh token
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.accessToken = null;
      })
  },
});

export default authSlice.reducer;
