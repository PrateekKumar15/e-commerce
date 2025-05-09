import { useEffect } from "react";
import { useState } from "react";
import { ChevronLeft, ShoppingCart, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

function FeaturedProducts({ featuredProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  {
    /*current index pehle wala index matlab first product jiska index 0 hai phir jab slider wale arrow par click hoga tab currentIndex 4 ho jayega kyuki 4 wala first position par aa jayegaa */
  }
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex + itemsPerPage >= featuredProducts.length;

  return (
    <div className="py-16 bg-background/50 dark:bg-dark-background/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-primary mb-8 relative">
          <span className="relative inline-block">
            Featured
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-primary/30 rounded-full"></span>
          </span>
        </h2>
        <div className="relative px-6">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {featuredProducts?.map((product) => (
                <div
                  key={product._id}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2 flex-shrink-0"
                >
                  <div className="bg-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden h-[420px] flex flex-col transition-all duration-300 hover:shadow-xl border border-border dark:border-dark-border hover:border-primary/30 dark:hover:border-primary/30">
                    <div className="flex justify-center items-center p-4 h-52 bg-background/50 dark:bg-dark-background/50 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full object-contain mix-blend-multiply dark:mix-blend-normal transition transform duration-300 ease-in-out hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-transparent to-border/20 dark:to-dark-border/20" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold text-foreground dark:text-dark-foreground line-clamp-2">
                          {product.name}
                        </h3>
                      </div>
                      <div className="mt-auto">
                        <p className="text-xl font-bold mb-3 text-primary">
                          ₹{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                        </p>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-primary hover:bg-secondary text-primary-foreground font-medium py-2 px-4 rounded transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-card transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            className={`absolute top-1/2 -left-5 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background shadow-md hover:shadow-lg 
              ${isStartDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                : "bg-primary hover:bg-secondary text-primary-foreground"
              }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-5 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background shadow-md hover:shadow-lg 
              ${isEndDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                : "bg-primary hover:bg-secondary text-primary-foreground"
              }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
