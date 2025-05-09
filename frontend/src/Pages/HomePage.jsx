import  { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

function HomePage() {
  const { fetchFeaturedProducts, products, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    loading ? (
      <LoadingSpinner />
    ) : (
        <div className="relative min-h-screen text-foreground dark:text-dark-foreground overflow-hidden">
          <div className="relative z-10 max-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-5xl text-center sm:text-6xl font-bold text-primary mb-4">
              Silque – Wear Your Vibe
            </h1>
            <p className="text-xl text-center text-foreground/80 dark:text-dark-foreground/80 mb-12">
              Explore Our Categories
            </p>

            <motion.div
              className="flex justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to="/products"
                className="bg-primary hover:bg-secondary text-primary-foreground py-3 px-8 rounded-lg flex items-center font-bold transition-all"
              >
                <ShoppingBag className="mr-2" />
                View All Products
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <CategoryItem category={category} key={category.name} />
              ))}
            </div>

            {!loading && products.length > 0 && (
              <FeaturedProducts featuredProducts={products} />
            )}
          </div>
        </div>
      ) 
    ) 
}

export default HomePage;
