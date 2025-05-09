import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
  "pk_test_51RMQsYDRVL6CeVZHPToQhWzXyhS3Fkc8tdrz972VHGsaLFV4r0rPlkGvion5hqHUKCXIQ9rtzeLjBWt8Om1RsjtY00TzLNgGM5"
);

function OrderSummary() {
  const { total, subTotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subTotal - total;

  const formattedSubTotal = subTotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });
      const session = res.data;
      if (!session || !session.id) {
        throw new Error("Failed to create checkout session.");
      }
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
        // Optionally show an error message to the user
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-border dark:border-dark-border bg-card dark:bg-dark-card p-4 shadow-lg sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-primary">Order summary</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-foreground/80 dark:text-dark-foreground/80">
              Original price
            </dt>
            <dd className="text-base font-medium text-foreground dark:text-dark-foreground">
              ₹{formattedSubTotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-foreground/80 dark:text-dark-foreground/80">Savings</dt>
              <dd className="text-base font-medium text-success-text dark:text-dark-success-text">
                -₹{formattedSavings}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-foreground/80 dark:text-dark-foreground/80">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-success-text dark:text-dark-success-text">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-border/70 dark:border-dark-border/70 pt-2">
            <dt className="text-base font-bold text-foreground dark:text-dark-foreground">Total</dt>
            <dd className="text-base font-bold text-primary">
              ₹{formattedTotal}
            </dd>
          </dl>
        </div>

        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 dark:focus:ring-offset-dark-card transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePayment}
        >
          Proceed to Checkout
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-foreground/60 dark:text-dark-foreground/60">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary underline hover:text-secondary hover:no-underline focus:outline-none focus:ring-1 focus:ring-primary rounded transition-colors duration-150"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default OrderSummary;
