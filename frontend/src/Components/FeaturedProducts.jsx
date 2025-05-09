import React, { useEffect } from "react";
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
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-primary mb-4 sm:text-6xl">
          Featured
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)
                  }%)`,
              }}
            >
              {featuredProducts?.map((product) => (
                <div
                  key={product._id}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2 flex-shrink-0"
                >
                  <div className="bg-card/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-[400px] flex flex-col transition-all duration-300 hover:shadow-xl border border-primary/30 dark:border-primary/30">
                    <div className="overflow-hidden h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transition transform duration-300 ease-in-out hover:scale-110"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="min-h-[3rem]">
                        <h3 className="text-lg font-semibold text-foreground dark:text-dark-foreground mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                      </div>
                      <div className="mt-auto">
                        <p className="text-xl font-bold mb-3 text-primary">
                          ₹{product.price.toFixed(2)}
                        </p>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-primary hover:bg-secondary text-primary-foreground font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-card"
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
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background 
              ${isStartDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                : "bg-primary hover:bg-secondary text-primary-foreground"
              }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background 
              ${isEndDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                : "bg-primary hover:bg-secondary text-primary-foreground"
              }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
