// import { create } from 'zustand';
// import axios from 'axios';

// axios.defaults.withCredentials = true;

// const API_URL = "https://popcornai-9i2s.onrender.com/api";

// export const useAuthStore = create((set) => ({
//     //initial state
//     user: null,
//     isLoading: false,
//     error: null,
//     message: null,
//     fetchingUser: false,


//     // functions

//     signUp: async (username, email, password) => {
//         set({ isLoading: true, message: null });
//         try {
//             const res = await axios.post(`${API_URL}/signup`, {
//                 username, email, password
//             })
//             set({
//                 user: res.data.user,
//                 isLoading: false,
//                 error: null,
//                 message: res.data.message,
//                 fetchingUser: false
//             })
//         }
//         catch (err) {
//             set({
//                 isLoading: false,
//                 error: err.response?.data?.message || "Error Signing Up",
//             })
//             throw err;
//         }

//     },
//     login: async (username, password) => {
//         set({ isLoading: true, message: null });
//         try {
//             const res = await axios.post(`${API_URL}/login`, { username, password })
//             const {message } = res.data;
//             set({
//                 user: res.data.user,
//                 isLoading: false,
//                 error: null,
//                 message,
//                 fetchingUser: false
//             })
//             return message;
//         }
//         catch (err) {
//             set({
//                 isLoading: false,
//                 error: err.response?.data?.message || "Error Logging In",
//             })
//             throw err;
//         }
//     },
//     // fetchUser: async () => {
//     //     set({ fetchingUser: true, error: null });
//     //     try {
//     //         const res = await axios.get("http://localhost:5000/api/fetch-user");
//     //         set({
//     //             user: res.data.user,
//     //             fetchingUser: false,
//     //             error: null,
//     //         })
//     //     }
//     //     catch (err) {
//     //         set({
//     //             fetchingUser: false,
//     //             error: err.response?.data?.message || "Error Fetching User",
//     //         })
//     //         throw err;
//     //     }
//     // },
//     fetchUser: async () => {
//         set({ fetchingUser: true, error: null });
//         try {
//             const res = await axios.get(`${API_URL}/fetch-user`);
//             set({
//                 user: res.data.user,
//                 fetchingUser: false,
//                 error: null,
//             });
//         } catch (err) {
//             const status = err.response?.status;

//             // 👇 If 401, it just means no token / logged out. Don’t throw.
//             if (status === 401) {
//                 set({ user: null, fetchingUser: false, error: null });
//                 return; // <-- important: stop here
//             }

//             // For other errors (500, 404, etc), keep error
//             set({
//                 fetchingUser: false,
//                 error: err.response?.data?.message || "Error Fetching User",
//             });
//             throw err; // only rethrow if it’s not 401
//         }
//     },

//     logout: async () => {
//         set({ isLoading: true, error: null, message: null });
//         try {
//             const res = await axios.post(`${API_URL}/logout`);
//             const { message } = res.data;
//             set({
//                 user: null,
//                 isLoading: false,
//                 error: null,
//                 message

//             })
//             return { message };
//         }
//         catch (err) {
//             set({
//                 isLoading: false,
//                 error: err.response?.data?.message || "Error Logging Out",
//             })
//             throw err;
//         }
//     }
// }))




import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "https://popcornai-9i2s.onrender.com/api";

export const useAuthStore = create((set) => ({
  // initial states
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

  // functions

  signup: async (username, email, password) => {
    set({ isLoading: true, message: null });

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
      });

      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error Signing up",
      });

      throw error;
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, message: null, error: null });

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      const { user, message } = response.data;

      set({
        user,
        message,
        isLoading: false,
      });

      return { user, message };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error logging in",
      });

      throw error;
    }
  },

  fetchUser: async () => {
    set({ fetchingUser: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/fetch-user`);
      set({ user: response.data.user, fetchingUser: false });
    } catch (error) {
      set({
        fetchingUser: false,
        error: null,
        user: null,
      });

      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_URL}/logout`);
      const { message } = response.data;
      set({
        message,
        isLoading: false,
        user: null,
        error: null,
      });

      return { message };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error logging out",
      });

      throw error;
    }
  },
}));