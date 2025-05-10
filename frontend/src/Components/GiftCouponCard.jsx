import  { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { useCartStore } from '../stores/useCartStore.js';

function GiftCouponCard() {
  const [userInputCode, setUserInputCode] = useState("");

  const { coupon, isCouponApplied, applyCoupon, removeCoupon, getMyCoupon } =
    useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
    else setUserInputCode(""); // Clear input if coupon is removed externally
  }, [coupon])

  const handleApplyCoupon = () => {
    if (!userInputCode) return;
    applyCoupon(userInputCode);

  }

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");


  }

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-border dark:border-dark-border bg-card dark:bg-dark-card p-4 shadow-lg sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-foreground dark:text-dark-foreground"
          >
            Do you have a voucher or Gift card?
          </label>
          <input
            type="text"
            id="voucher"
            className="block w-full rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background p-2.5 text-sm text-foreground dark:text-dark-foreground placeholder-foreground/50 dark:placeholder-dark-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            placeholder="Enter code here"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
            required
            disabled={isCouponApplied}
          />
        </div>

        <motion.button
          type="button"
          className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 dark:focus:ring-offset-dark-card transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isCouponApplied ? 1 : 1.02 }}
          whileTap={{ scale: isCouponApplied ? 1 : 0.98 }}
          onClick={handleApplyCoupon}
          disabled={isCouponApplied || !userInputCode}
        >
          Apply Code
        </motion.button>
      </div>
      {isCouponApplied && coupon && (
        <div className='mt-4 border-t border-border/70 dark:border-dark-border/70 pt-4'>
          <h3 className='text-lg font-medium text-foreground dark:text-dark-foreground'>
            Applied Coupon
          </h3>
          <p className='mt-2 text-sm text-foreground/70 dark:text-dark-foreground/70'>
            {coupon.code}-{coupon.discountPercentage}%off
          </p>

          <motion.button
            type='button'
            className='mt-4 flex w-full items-center justify-center rounded-lg bg-destructive px-5 py-2.5 text-sm font-medium text-destructive-foreground hover:bg-destructive-hover focus:outline-none focus:ring-2 focus:ring-destructive/70 focus:ring-offset-2 dark:bg-dark-destructive dark:hover:bg-dark-destructive-hover dark:text-dark-destructive-foreground dark:focus:ring-dark-destructive/70 dark:focus:ring-offset-dark-card transition-colors duration-300'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}

      {coupon && (
        <div className='mt-4'>
          <h3 className='text-lg font-medium text-foreground dark:text-dark-foreground'>Your Available Coupons</h3>
          <p className='mt-2 text-sm text-foreground/70 dark:text-dark-foreground/70'>
            {coupon.code}-{coupon.discountPercentage}%off
          </p>
        </div>
      )}

    </motion.div>
  );
}

export default GiftCouponCard