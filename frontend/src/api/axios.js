import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Auto refresh token when access expires
// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const original = err.config;

//     // Token expired
//     if (err.response?.status === 401 && !original._retry) {
//       original._retry = true;

//       const res = await api.get("/auth/refresh");
//       const newToken = res.data.accessToken;

//       useAuthStore.getState().setAccessToken(newToken);

//       original.headers["Authorization"] = "Bearer " + newToken;
//       return api(original);
//     }

//     return Promise.reject(err);
//   }
// );

export default api;
