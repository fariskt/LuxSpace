import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response, // For successful responses
  async (error) => {
    const originalRequest = error.config;

    // If we have already tried refreshing, reject the request
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // If the error status is 401 or 403 (token expired or invalid)
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (error.response.data.message === "Access token required" || error.response.data.message === "Invalid or expired token") {
        originalRequest._retry = true;

        try {
          // Attempt to refresh the token
          const { data } = await axiosInstance.post("/api/users/refresh-token", {}, { withCredentials: true });
          
          // Save the new access token
          const newAccessToken = data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("isUserLogin");
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
