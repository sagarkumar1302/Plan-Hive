import { create } from "zustand";
import api from "../api/axios";

export const useAuthStore = create((set) => ({
    user: null,
    accessToken: null,
    loading: false,

    register: async (data) => {
        await api.post("/auth/register", data);
    },

    login: async (usernameOrEmail, password) => {
        const res = await api.post("/user/login", { username: usernameOrEmail, password });
        console.log("Login User Data ", res.data.data);
        set({
            user: res.data.data.user,
            accessToken: res.data.data.accessToken
        });
    },

    logout: async () => {
        await api.post("/user/logout");
        set({ user: null, accessToken: null });
    },

    setAccessToken: (token) => set({ accessToken: token })
}));
