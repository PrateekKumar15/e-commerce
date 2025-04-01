// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import SignupPage from './Pages/SignupPage.jsx'
import Navbar from './Components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './stores/useUserStore.js'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from './Components/LoadingSpinner.jsx'
import AdminPage from './Pages/AdminPage.jsx'
import CategoryPage from './Pages/CategoryPage.jsx'


function App() {
 const {user, checkAuth, checkingAuth} = useUserStore();
 useEffect(() => {
checkAuth();

 },[checkAuth])

 if (checkingAuth) {
   return <LoadingSpinner/>
 }

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      {/* Bg Gradient */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div>
      <div className='relative z-50 pt-20'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignupPage />} />  
          <Route path="/login" element={user ? <Navigate to="/" />:<LoginPage/>} />
          <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/" />} />
          <Route path="/category/:category" element={< CategoryPage /> } />
        
      </Routes> 
      </div>
      <Toaster position="top-center" reverseOrder={false}  />
    </div>
  )
}

export default App
