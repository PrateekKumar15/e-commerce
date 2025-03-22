import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios.js";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  setProducts: (products) => set({ products }),

  
  createProduct: async (newProduct) => {
    try {
        set({ loading: true });
      const res = await axios.post("/products", newProduct);
      set((prevState) => ({ products: [...prevState.products, res.data], loading: false }));
      toast.success("Product created successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Error creating product");
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      set({ loading: false });
      const res = await axios.get("/products");
      set({ products: res.data.products });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Error fetching products");
    }
  },
  toggleFeaturedProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/products/${id}`);
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === id
            ? { ...product, isFeatured: res.data.isFeatured }
            : product
        ),
      }));
      set({ loading: false });

    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Error toggling featured product"
      );
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${id}`);
      set((prevState) => ({
        products: prevState.products.filter((product) => product._id !== id),
      }));
      set({ loading: false });
      toast.success("Product deleted successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Error deleting product");
    }

  },
  fetchFeaturedProducts: async () => {},
  fetchProductsByCategory: async (category) => {
  set({ loading: true });
  try {
    const response = await axios.get(`/products/category/${category}`);
    set({ products: response.data.products });
    set({ loading: false });
  } catch (error) {
    set({ loading: false });
    toast.error(error.response.data.message || "Error fetching products by category");
    
  }    
  },
  fetchRecommendedProducts: async () => {},
}));
