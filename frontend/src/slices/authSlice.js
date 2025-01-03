import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/apiClient";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/users/login", userData);
      const { accessToken } = response.data;
      const  user  = response.data.data;
      return { accessToken, user };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/register",
        userData
      );
      const { accessToken } = response.data;
      const user = response.data.data
      return { accessToken, user };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logOutUser", async(_, {rejectWithValue})=> {
  try {
    const response = await axiosInstance.post("/api/users/logout");
    return response.data.message
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
}) 

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/users/refresh-token");
      const { accessToken } = response.data;
      return accessToken;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    accessToken: "",
    loginError: null,
    signUpError: null,
    error: null,
  },
 reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isAuthenticated = true),
          (state.accessToken = action.payload.accessToken),
          (state.user = action.payload.user);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isAuthenticated = true),
          (state.accessToken = action.payload.accessToken),
          (state.user = action.payload.user);
      })
      .addCase(logoutUser.fulfilled, (state)=>{
        state.accessToken = "",
        state.user = null,
        state.isAuthenticated = false
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      //errors
      .addCase(loginUser.rejected, (state, action) => {
        (state.isAuthenticated = false), (state.loginError = action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.isAuthenticated = false), (state.signUpError = action.payload);
      })
      .addCase(logoutUser.rejected, (state,action)=> {
        state.isAuthenticated = false,
        state.error = action.payload
      })
      .addCase(refreshToken.rejected, (state, action) => {
        (state.isAuthenticated = false), (state.error = action.payload);
      });
  },
});

export default authSlice.reducer;
