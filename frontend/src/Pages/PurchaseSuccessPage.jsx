import { ArrowRight, CheckCircle, HandHeart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/useCartStore.js';
import axios from '../lib/axios.js';
import Confetti from 'react-confetti';


function PurchaseSuccessPage() {

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const { clearCart } = useCartStore();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post('/payments/checkout-success', {
          sessionId
        })
        clearCart();
      } catch (error) {
        console.log(error);

      } finally {
        setIsProcessing(false)
      }
    }

    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false)
      setError("No session ID found in the URL.");
    }
  }, [clearCart]);

  if (isProcessing) return <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">Processing...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark-background text-destructive dark:text-dark-destructive">{`Error: ${error}`}</div>;

  return (
    <div className="h-screen flex items-center justify-center px-4 bg-background dark:bg-dark-background">
      <Confetti
        width={
          window.innerWidth
        }
        height={
          window.innerHeight
        }
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <div className="max-w-md w-full bg-card dark:bg-dark-card rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-success dark:text-dark-success w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl font-bold text-success dark:text-dark-success text-center mb-2">
            {" "}
            Purchase Successful !
          </h1>

          <p className="text-foreground dark:text-dark-foreground text-center mb-2">
            Thank you for your order! We are processing your payment.
          </p>

          <p className="text-success dark:text-dark-success text-center mb-2">
            Check your email for order details and updates.
          </p>

          <div className="bg-border dark:bg-dark-border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground/80 dark:text-dark-foreground/80">Order number</span>
              <span className="text-sm font-semibold text-success dark:text-dark-success">
                #123456
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground/80 dark:text-dark-foreground/80">Estimated Delivery</span>
              <span className="text-sm font-semibold text-success dark:text-dark-success">
                3-5 buisness days
              </span>
            </div>

          </div>

          <div className='space-y-4'>
            <button className='w-full bg-success hover:bg-success-hover text-success-foreground dark:bg-dark-success dark:hover:bg-dark-success-hover dark:text-dark-success-foreground rounded-lg font-bold py-2 px-4 transition duration-300 flex items-center justify-center'>
              <HandHeart className='mr-2' size={18} />
              Thanks for trusting us!
            </button>
            <Link
              to={'/'}
              className='w-full bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-dark-primary dark:hover:bg-dark-primary/90 dark:text-dark-primary-foreground font-bold py-2 px-4 rounded-lg transition duration-300 flex flex-center justify-center'>
              Continue Shopping
              <ArrowRight className='ml-2' size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSuccessPage