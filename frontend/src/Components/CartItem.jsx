import { useCartStore } from "../stores/useCartStore.js";
import { Minus, Plus, Trash } from "lucide-react";

function CartItem({ item }) {
  const { removeAllFromCart, updateQuantity } = useCartStore();

  return (
    <div className="rounded-lg border border-border dark:border-dark-border bg-card dark:bg-dark-card p-4 shadow-sm md:p-6 transition-shadow duration-300 hover:shadow-md">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:space-y-0 md:gap-6">
        <div className="shrink-0 md:order-1 flex items-center justify-center bg-background/50 dark:bg-dark-background/50 rounded-lg p-2">
          <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center overflow-hidden rounded-md">
            <img
              src={item.image}
              alt={item.name}
              className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal"
              loading="lazy"
            />
          </div>
        </div>
        <label htmlFor={`quantity-${item._id}`} className="sr-only">Choose quantity</label>
        <div className="flex items-center justify-between md:justify-end md:order-3">
          <div className="flex items-center gap-2">
            <button
              id={`quantity-minus-${item._id}`}
              className="inline-flex items-center justify-center w-7 h-7 shrink-0 rounded-md border border-border dark:border-dark-border bg-background dark:bg-dark-background hover:bg-border dark:hover:bg-dark-border focus:outline-none focus:ring-1 focus:ring-primary text-foreground dark:text-dark-foreground transition-all duration-300"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <p className="text-foreground dark:text-dark-foreground w-6 text-center font-medium">{item.quantity}</p>
            <button
              id={`quantity-plus-${item._id}`}
              className="inline-flex items-center justify-center w-7 h-7 shrink-0 rounded-md border border-border dark:border-dark-border bg-background dark:bg-dark-background hover:bg-border dark:hover:bg-dark-border focus:outline-none focus:ring-1 focus:ring-primary text-foreground dark:text-dark-foreground transition-all duration-300"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-primary md:text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>

        <div className="w-full min-w-0 md:order-2 flex-1 space-y-2 md:max-w-md">
          <p className="text-base font-medium text-foreground dark:text-dark-foreground hover:text-primary hover:underline cursor-pointer transition-colors duration-300">
            {item.name}
          </p>
          <p className="text-sm text-foreground/70 dark:text-dark-foreground/70 line-clamp-2">{item.description}</p>

          <div className="flex items-center gap-4 pt-1">
            <button
              type="button"
              className="text-sm text-destructive-text hover:text-destructive-text-hover dark:text-dark-destructive-text dark:hover:dark-destructive-text-hover inline-flex items-center font-medium hover:underline focus:outline-none focus:ring-1 focus:ring-destructive-text dark:focus:ring-dark-destructive-text rounded p-1 transition-all duration-300"
              onClick={() => removeAllFromCart(item._id)}
            >
              <Trash className="w-4 h-4 mr-1" /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
