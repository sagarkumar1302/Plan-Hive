import { create } from "zustand";
import api from "../api/axios";
import { persist } from "zustand/middleware";

export const useAuthStore = create(persist(
    (set) => ({
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

        setAccessToken: (token) => set({ accessToken: token }),
        updateUser: (updatedUserData) =>
            set((state) => ({
                user: {
                    ...state.user,
                    ...updatedUserData,
                },
            })),
    }),
    {
        name: "auth-storage", // key in localStorage
        getStorage: () => localStorage,
    }
));
