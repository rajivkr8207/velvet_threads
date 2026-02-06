import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Next.js app/api
});

// Request interceptor (token auto attach)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.message || "Something went wrong";
    return Promise.reject(message);
  }
);

export default api;
