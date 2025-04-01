import create from 'zustand';
import axios from '../lib/axios';
import toast from 'react-hot-toast';
import { sub } from 'framer-motion/client';

export const useCartStore = create((set,get) => ({ 
cart: [],
coupon: null,
total: 0,
subtotal: 0,

getCartItems: async () => {
    try {
        const response = await axios.get('/cart');
        set({ cart: response.data });
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}


}))