// import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, ArrowRight, Loader, LogIn } from 'lucide-react'
import { motion } from "framer-motion"
import { useUserStore } from '../stores/useUserStore'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, loading } = useUserStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <motion.div className='sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='mt-6 text-center text-3xl font-extrabold text-primary'>Login</h2>
      </motion.div>

      <motion.div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='bg-card dark:bg-dark-card py-8 px-4 shadow-xl sm:rounded-lg sm:px-10'>
          <form onSubmit={handleSubmit} className='space-y-6'>


            <div>
              <label htmlFor='email' className='block text-sm font-medium text-foreground dark:text-dark-foreground'>
                Email address
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='h-5 w-5 text-foreground/70 dark:text-dark-foreground/70' aria-hidden='true' />
                </div>
                <input
                  id='email'
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=' block w-full px-3 py-2 pl-10 bg-background dark:bg-dark-background border border-border dark:border-dark-border 
									rounded-md shadow-sm placeholder-foreground/50 dark:placeholder-dark-foreground/50 text-foreground dark:text-dark-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                  placeholder='you@example.com'
                />
              </div>
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-foreground dark:text-dark-foreground'>
                Password
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-foreground/70 dark:text-dark-foreground/70' aria-hidden='true' />
                </div>
                <input
                  id='password'
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=' block w-full px-3 py-2 pl-10 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-md shadow-sm placeholder-foreground/50 dark:placeholder-dark-foreground/50 text-foreground dark:text-dark-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                  placeholder='••••••••'
                />
              </div>
            </div>

            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2
							 focus:ring-primary dark:focus:ring-offset-dark-card transition duration-150 ease-in-out disabled:opacity-50'
              disabled={loading}>
              {loading ? (
                <>
                  <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className=' mr-2 h-5 w-5 aria-hidden=true' />
                  Login
                </>
              )}

            </button>


          </form>

          <p className='mt-8 text-center text-sm text-foreground/70 dark:text-dark-foreground/70'>
            Not a member? {" "}
            <Link to='/signup' className='font-medium text-primary hover:text-secondary transition-colors duration-150 ease-in-out'>
              Sign up here
              <ArrowRight className='inline h-4 w-4 ml-1' />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage