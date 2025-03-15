import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  signup: async ({ name, email, password, confirmPassword }) => {
    // console.log("Hiii")
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      // console.log("Passwords do not match")
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data.user, loading: false });
      toast.success(res.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Something went wrong");
    }
  },
  login: async (email, password) => {
    set({ loading: true });
    // console.log(email,password)
    try {
      const res = await axios.post("/auth/login", { email, password });
      //   console.log(email, password);
      console.log(res.data);
      set({ user: res.data.user, loading: false });
      toast.success(res.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occured");
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/logout");
      set({ user: null, loading: false });
      toast.success(res.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occured");
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false , user: null});
      
    }
  },
}));

// TODO implement the axios interprretors for refreshing the access token in 15min and handling errors
