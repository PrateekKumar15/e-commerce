import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Loader, PlusCircle } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "jackets",
  "bags",
  "suits",
  "glasses",
];

function CreateProductForm() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
      toast.success("Product created successfully");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(error.message || "Failed to create product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="bg-card dark:bg-dark-card shadow-xl rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-primary">
        Create a New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-foreground dark:text-dark-foreground text-sm font-medium"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block py-2 px-3 w-full bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-md shadow-sm 
                    focus:outline-none text-foreground dark:text-dark-foreground focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-foreground dark:text-dark-foreground text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows="3"
            className="mt-1 block py-2 px-3 w-full bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-md shadow-sm 
                    focus:outline-none text-foreground dark:text-dark-foreground focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-foreground dark:text-dark-foreground text-sm font-medium"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step="0.01"
            className="mt-1 block py-2 px-3 w-full bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-md shadow-sm 
                    focus:outline-none text-foreground dark:text-dark-foreground focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-foreground dark:text-dark-foreground text-sm font-medium"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 block py-2 px-3 w-full bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-md shadow-sm 
                    focus:outline-none text-foreground dark:text-dark-foreground focus:ring-1 focus:ring-primary focus:border-primary"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-1 flex items-center space-x-3">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-border dark:bg-dark-border hover:bg-border/80 dark:hover:bg-dark-border-hover text-foreground dark:text-dark-foreground px-3 py-2 focus:outline-none shadow-sm text-sm font-medium border border-border dark:border-dark-border leading-4 rounded-md flex items-center focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-card transition-colors duration-150"
          >
            <Upload className="inline-block h-5 w-5 mr-2" size={18} />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="text-sm text-foreground/70 dark:text-dark-foreground/70">Image Selected</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
              Creating...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default CreateProductForm;
