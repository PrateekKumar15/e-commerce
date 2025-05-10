import { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore.js'
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

function CategoryPage() {
  const { fetchProductsByCategory, products, loading } = useProductStore();

  const { category } = useParams();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category])

  console.log("products:", products);

  return (
    <div className='min-h-screen'>
      <div className='relative z-50 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <motion.h1
          className='text-4xl font-bold text-center text-primary mb-8 sm:text-5xl'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category'}
        </motion.h1>

        {loading ? (
          <div className="flex justify-center items-center w-full h-64">
            <LoadingSpinner fullscreen={false} />
          </div>
        ) : (
          <motion.div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {products.length === 0 ? (
              <h2 className='text-2xl font-semibold text-foreground dark:text-dark-foreground text-center col-span-full py-10'>
                No products found in this category.
              </h2>
            ) : (
              products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage