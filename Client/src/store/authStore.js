import { create } from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    //initial state
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: false,


    // functions

    signUp: async (username, email, password) => {
        set({ isLoading: true, message: null });
        try {
            const res = await axios.post("http://localhost:5000/api/signup", {
                username, email, password
            })
            set({
                user: res.data.user,
                isLoading: false,
                error: null,
                message: res.data.message,
                fetchingUser: false
            })
        }
        catch (err) {
            set({
                isLoading: false,
                error: err.response?.data?.message || "Error Signing Up",
            })
            throw err;
        }

    },
    login: async (username, password) => {
        set({ isLoading: true, message: null });
        try {
            const res = await axios.post("http://localhost:5000/api/login", { username, password })
            const {message } = res.data;
            set({
                user: res.data.user,
                isLoading: false,
                error: null,
                message,
                fetchingUser: false
            })
            return message;
        }
        catch (err) {
            set({
                isLoading: false,
                error: err.response?.data?.message || "Error Logging In",
            })
            throw err;
        }
    },
    // fetchUser: async () => {
    //     set({ fetchingUser: true, error: null });
    //     try {
    //         const res = await axios.get("http://localhost:5000/api/fetch-user");
    //         set({
    //             user: res.data.user,
    //             fetchingUser: false,
    //             error: null,
    //         })
    //     }
    //     catch (err) {
    //         set({
    //             fetchingUser: false,
    //             error: err.response?.data?.message || "Error Fetching User",
    //         })
    //         throw err;
    //     }
    // },
    fetchUser: async () => {
        set({ fetchingUser: true, error: null });
        try {
            const res = await axios.get("http://localhost:5000/api/fetch-user");
            set({
                user: res.data.user,
                fetchingUser: false,
                error: null,
            });
        } catch (err) {
            const status = err.response?.status;

            // 👇 If 401, it just means no token / logged out. Don’t throw.
            if (status === 401) {
                set({ user: null, fetchingUser: false, error: null });
                return; // <-- important: stop here
            }

            // For other errors (500, 404, etc), keep error
            set({
                fetchingUser: false,
                error: err.response?.data?.message || "Error Fetching User",
            });
            throw err; // only rethrow if it’s not 401
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null, message: null });
        try {
            const res = await axios.post("http://localhost:5000/api/logout");
            const { message } = res.data;
            set({
                user: null,
                isLoading: false,
                error: null,
                message

            })
            return { message };
        }
        catch (err) {
            set({
                isLoading: false,
                error: err.response?.data?.message || "Error Logging Out",
            })
            throw err;
        }
    }
}))