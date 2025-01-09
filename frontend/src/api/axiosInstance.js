import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // Include cookies automatically
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
      if (error.response.data.message === "Invalid or expired token") {
        originalRequest._retry = true;

        try {
          // Attempt to refresh the token
          const { data } = await axiosInstance.post("/api/users/refresh-token", {}, { withCredentials: true });

          // Save the new access token
          const newAccessToken = data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          // Set the new token in the original request's headers and retry
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refresh fails, log out and redirect to login
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
