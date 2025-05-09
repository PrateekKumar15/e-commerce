import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

function ProductsList() {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  console.log("products", products);

  return (
    <motion.div
      className="bg-card dark:bg-dark-card shadow-lg rounded-xl overflow-hidden max-w-4xl mx-auto border border-border/50 dark:border-dark-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border dark:divide-dark-border">
          <thead className="bg-background/70 dark:bg-dark-background/70">
            <tr>
              <th
                className="px-4 py-4 text-left text-xs font-semibold text-foreground/80 dark:text-dark-foreground/80 uppercase tracking-wider w-2/5"
                scope="col"
              >
                Product
              </th>
              <th
                className="px-4 py-4 text-left text-xs font-semibold text-foreground/80 dark:text-dark-foreground/80 uppercase tracking-wider w-1/5"
                scope="col"
              >
                Price
              </th>
              <th
                className="px-4 py-4 text-left text-xs font-semibold text-foreground/80 dark:text-dark-foreground/80 uppercase tracking-wider w-1/5"
                scope="col"
              >
                Category
              </th>
              <th
                className="px-4 py-4 text-center text-xs font-semibold text-foreground/80 dark:text-dark-foreground/80 uppercase tracking-wider w-1/10"
                scope="col"
              >
                Featured
              </th>
              <th
                className="px-4 py-4 text-center text-xs font-semibold text-foreground/80 dark:text-dark-foreground/80 uppercase tracking-wider w-1/10"
                scope="col"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-card dark:bg-dark-card divide-y divide-border/60 dark:divide-dark-border/60">
            {products?.map((product) => (
              <tr key={product._id} className="hover:bg-background/70 dark:hover:bg-dark-background/70 transition-colors duration-200">
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-14 w-14 bg-background/50 dark:bg-dark-background/50 rounded-md p-1 border border-border/50 dark:border-dark-border/50 flex items-center justify-center">
                      <img
                        className="h-12 w-12 object-contain mix-blend-multiply dark:mix-blend-normal"
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 max-w-xs">
                      <div className="text-sm font-medium text-foreground dark:text-dark-foreground line-clamp-2">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-primary dark:text-primary">
                    ₹{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-foreground/90 dark:text-dark-foreground/90 truncate max-w-[120px] capitalize px-2 py-1 bg-border/30 dark:bg-dark-border/30 rounded-full inline-block">
                    {product.category}
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-card transform hover:scale-105 active:scale-95 ${product.isFeatured
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
                    className="text-destructive-text hover:text-destructive-text-hover dark:text-dark-destructive-text dark:hover:dark-destructive-text-hover p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-destructive-text dark:focus:ring-dark-destructive-text transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-destructive/10 dark:hover:bg-dark-destructive/10"
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
