import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import axios from "../lib/axios.js";
// import LoadingSpinner from "../components/LoadingSpinner";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "newest",
    search: searchParams.get("search") || "",
  });

  // Fetch products with current filters
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Build query string from filters
      const params = new URLSearchParams();
      if (filters.category && filters.category !== "all")
        params.append("category", filters.category);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sort) params.append("sort", filters.sort);
      if (filters.search) params.append("search", filters.search);

      // Update URL with filters
      setSearchParams(params);

      const response = await axios.get(`/products/shop?${params.toString()}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories and price range on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/products/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchPriceRange = async () => {
      try {
        const response = await axios.get("/products/price-range");
        setPriceRange(response.data);
      } catch (error) {
        console.error("Error fetching price range:", error);
      }
    };

    fetchCategories();
    fetchPriceRange();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      minPrice: "",
      maxPrice: "",
      sort: "newest",
      search: "",
    });
    setSearchParams({});
  };

  // Check if any filters are active
  const isFiltersActive =
    filters.category !== "all" ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.sort !== "newest" ||
    filters.search;

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        className="text-4xl font-bold mb-8 text-primary text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {filters.search
          ? `Search results for "${filters.search}"`
          : "All Products"}
      </motion.h1>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6 flex justify-between items-center">
        <button
          className="flex items-center gap-2 bg-primary hover:bg-secondary text-primary-foreground px-4 py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filters
        </button>

        {isFiltersActive && (
          <button
            className="flex items-center gap-2 bg-destructive hover:bg-destructive-hover text-destructive-foreground dark:bg-dark-destructive dark:hover:bg-dark-destructive-hover dark:text-dark-destructive-foreground px-4 py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-destructive dark:focus:ring-dark-destructive focus:ring-offset-2 dark:focus:ring-offset-background"
            onClick={clearFilters}
          >
            <X size={18} />
            Clear Filters
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <motion.div
          className={`lg:w-1/4 bg-card dark:bg-dark-card p-6 rounded-lg shadow-xl ${showFilters ? "block" : "hidden"
            } lg:block`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary flex items-center">
              <SlidersHorizontal className="mr-2" size={18} />
              Filters
            </h2>
            {isFiltersActive && (
              <button
                className="text-destructive-text hover:text-destructive-text-hover dark:text-dark-destructive-text dark:hover:dark-destructive-text-hover font-medium text-sm flex items-center focus:outline-none focus:ring-1 focus:ring-destructive-text dark:focus:ring-dark-destructive-text rounded transition-colors duration-150"
                onClick={clearFilters}
              >
                <X className="mr-1" size={16} />
                Clear All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-foreground dark:text-dark-foreground font-medium mb-2">
              Category
            </label>
            <select
              className="w-full bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-md p-2 text-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <label className="block text-foreground dark:text-dark-foreground font-medium mb-2">
              Price Range
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-full bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-md p-2 text-foreground dark:text-dark-foreground placeholder-foreground/50 dark:placeholder-dark-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Min"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              />
              <span className="text-foreground/70 dark:text-dark-foreground/70">to</span>
              <input
                type="number"
                className="w-full bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-md p-2 text-foreground dark:text-dark-foreground placeholder-foreground/50 dark:placeholder-dark-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Max"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              />
            </div>
          </div>

          {/* Sort Filter */}
          <div className="mb-6">
            <label className="block text-foreground dark:text-dark-foreground font-medium mb-2">
              Sort By
            </label>
            <select
              className="w-full bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-md p-2 text-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Hide filters button (mobile only) */}
          <button
            className="lg:hidden w-full bg-border dark:bg-dark-border hover:bg-border/80 dark:hover:bg-dark-border-hover text-foreground dark:text-dark-foreground py-2 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-card"
            onClick={() => setShowFilters(false)}
          >
            Close Filters
          </button>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="lg:w-3/4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {loading ? (
            <div className="flex justify-center items-center w-full h-64 text-foreground dark:text-dark-foreground">
              <div className="border-t-4 border-primary border-solid rounded-full h-12 w-12 animate-spin"></div>
              <span className="ml-3 text-primary">Loading products...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-10 text-foreground dark:text-dark-foreground">
              <Search size={48} className="mx-auto text-foreground/70 dark:text-dark-foreground/70 mb-4" />
              <p className="text-xl text-foreground/80 dark:text-dark-foreground/80">No products match your current filters.</p>
            </div>
          ) : (
            <>
              <p className="text-foreground dark:text-dark-foreground mb-4">
                Showing {products.length}{" "}
                {products.length === 1 ? "product" : "products"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsPage;
