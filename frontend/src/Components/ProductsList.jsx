import React from "react";
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

function ProductsList() {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  console.log("products", products);

  return (
    <motion.div
      className="bg-card dark:bg-dark-card shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border dark:divide-dark-border">
          <thead className="bg-border/10 dark:bg-dark-border/10">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-foreground/70 dark:text-dark-foreground/70 uppercase tracking-wider w-2/5"
                scope="col"
              >
                Product
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-foreground/70 dark:text-dark-foreground/70 uppercase tracking-wider w-1/5"
                scope="col"
              >
                Price
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-foreground/70 dark:text-dark-foreground/70 uppercase tracking-wider w-1/5"
                scope="col"
              >
                Category
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-foreground/70 dark:text-dark-foreground/70 uppercase tracking-wider w-1/10"
                scope="col"
              >
                Featured
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-foreground/70 dark:text-dark-foreground/70 uppercase tracking-wider w-1/10"
                scope="col"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-card dark:bg-dark-card divide-y divide-border dark:divide-dark-border">
            {products?.map((product) => (
              <tr key={product._id} className="hover:bg-border/50 dark:hover:bg-dark-border/50 transition-colors duration-150">
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4 max-w-xs">
                      <div className="text-sm font-medium text-foreground dark:text-dark-foreground truncate">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground/80 dark:text-dark-foreground/80">
                    ₹{product.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground/80 dark:text-dark-foreground/80 truncate max-w-[120px]">
                    {product.category}
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-1.5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-card ${product.isFeatured
                      ? "bg-primary text-primary-foreground focus:ring-primary hover:brightness-110"
                      : "bg-border/50 dark:bg-dark-border/50 text-foreground/70 dark:text-dark-foreground/70 focus:ring-primary/50 hover:brightness-110"
                      }`}
                    title={product.isFeatured ? "Remove from featured" : "Add to featured"}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-destructive-text hover:text-destructive-text-hover dark:text-dark-destructive-text dark:hover:dark-destructive-text-hover p-1.5 rounded-full focus:outline-none focus:ring-1 focus:ring-destructive-text dark:focus:ring-dark-destructive-text transition-colors duration-150"
                    title="Delete product"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default ProductsList;
