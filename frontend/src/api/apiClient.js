import axios from "axios";
import { refreshToken, logoutUser } from "../slices/authSlice";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosMiddleware = (storeAPI) => (next) => async (action) => {
  if (action.type.endsWith('/pending')) {
    // Add token to request if available
    const token = storeAPI.getState().auth.accessToken;
    if (token) {
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const result = next(action);

  if (result.error?.status === 401 && !action.meta?._retry) {
    try {
      const refreshResponse = await storeAPI.dispatch(refreshToken()).unwrap();
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${refreshResponse}`;
    } catch {
      storeAPI.dispatch(logoutUser());
    }
  }

  return result;
};

export default axiosInstance;
