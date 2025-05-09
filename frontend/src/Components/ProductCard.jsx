import React from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

function ProductCard({ product }) {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please Login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-border dark:border-dark-border bg-card dark:bg-dark-card shadow-lg h-[450px] transition-all duration-300 hover:shadow-xl hover:border-primary/50 dark:hover:border-primary/50">
      <div className="relative mx-auto mt-4 flex justify-center items-center h-56 w-[90%] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-background/5 to-background/10 dark:from-dark-background/5 dark:to-dark-background/10 rounded-lg z-0" />
        <img
          className="relative z-10 object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </div>

      <div className="mt-4 px-5 pb-5 flex flex-col flex-1">
        <div className="min-h-[4rem]">
          <h5 className="text-xl font-semibold tracking-tight text-foreground dark:text-dark-foreground line-clamp-2">
            {product.name}
          </h5>
        </div>
        <div className="mt-auto mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-primary">
              ₹{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
            </span>
          </p>
        </div>
        <button
          className="flex items-center rounded-lg justify-center text-lg font-medium text-primary-foreground bg-primary hover:bg-secondary py-2.5 px-5 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 dark:focus:ring-offset-dark-card transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={20} className="mr-2" />
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
