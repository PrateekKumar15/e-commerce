import { useCartStore } from '../stores/useCartStore.js';
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem.jsx';
import PeopleAlsoBought from '../components/PeopleAlsoBought.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import GiftCouponCard from '../components/GiftCouponCard.jsx';

function CartPage() {
  const { cart } = useCartStore();
  console.log("cart:", cart);

  return (
    <div className='py-8 md:py-16'>
      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
        <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
          <motion.div
            className='flex-none mx-auto w-full lg:max-w-2xl xl:max-w-4xl'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length == 0 ? (<EmptyCartUI />) : (<div className='space-y-6'>
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
            )}
            {cart.length > 0 && <PeopleAlsoBought />}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummary />
              <GiftCouponCard />
            </motion.div>)}
        </div>
      </div>
    </div>
  )
}

export default CartPage;


const EmptyCartUI = () => (
  <motion.div
    className='flex flex-col items-center justify-center space-y-4 py-16 text-center'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className='w-24 h-24 text-foreground/50 dark:text-dark-foreground/50' />
    <h3 className='text-2xl font-semibold text-foreground dark:text-dark-foreground'>Your cart is empty</h3>
    <p className='text-foreground/70 dark:text-dark-foreground/70'>Looks like you haven&apos;t added anything to your cart yet.</p>
    <Link
      className='mt-4 rounded-md bg-primary hover:bg-secondary text-primary-foreground px-6 py-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background'
      to='/'
    >
      Start Shopping
    </Link>
  </motion.div>
);
