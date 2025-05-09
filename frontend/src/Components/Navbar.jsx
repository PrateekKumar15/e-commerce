import { useState, useEffect } from "react";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Search,
  Package,
  X,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { toggleTheme, getInitialTheme } from "../lib/theme.js";
import { motion } from "framer-motion";

/**
 * Navbar Component
 *
 * Provides navigation, search functionality, and authentication options.
 * Includes responsive design for both mobile and desktop views.
 */

function Navbar() {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(getInitialTheme());
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false); // Close mobile menu on search submit
    }
  };

  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    setCurrentTheme(newTheme);
  };

  return (
    // Header: Added higher z-index (z-50 was used in App.jsx for content below)
    <header className="fixed top-0 left-0 w-full bg-background/90 dark:bg-dark-background/90 backdrop-blur-sm shadow-lg z-[100] transition-all duration-300 border-b border-dark-border dark:border-dark-border">
      {/* Main container for nav items */}
      <div className=" mx-5 px-4 py-2"> {/* Use container for centering, adjust padding */}
        <div className="flex items-center justify-between w-full">
          {/* Left Section: Hamburger, Logo, Nav Links */}
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Button */}
            <button
              className="text-foreground hover:text-primary dark:text-dark-foreground/80 dark:hover:text-primary lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-primary"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on logo click
            >
              <img src="/logo.png" className="h-10 w-10" alt="logo" /> {/* Adjusted path, ensure correct */}
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-4 ml-4">
              <Link
                to={"/"}
                className="text-foreground hover:text-primary dark:text-dark-foreground/80 dark:hover:text-primary transition duration-300 ease-in-out"
              >
                Home
              </Link>
              <Link
                to={"/products"}
                className="textforeground hover:text-primary dark:text-dark-foreground/80 dark:hover:text-primary transition duration-300 ease-in-out flex items-center"
              >
                Products
              </Link>
            </nav>
          </div>

          {/* Right Section: Search, Actions */}
          <div className="flex items-center gap-3 md:gap-4 lg:flex-nowrap">
            {/* Desktop Search Form */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex relative w-full max-w-52" // Adjusted max-width
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-background dark:bg-dark-card border border-dark-border text-foreground rounded-md py-1 px-3 pl-8 focus:outline-none focus:ring-1 focus:ring-primary" // Added pl-8 for icon
              />
              <button
                type="submit"
                className="absolute left-0 top-0 h-full px-2 flex items-center justify-center text-dark-foreground/70 hover:text-primary dark:text-dark-foreground/70 dark:hover:text-primary"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Theme Toggle Button */}
            <button
              onClick={handleThemeToggle}
              className="p-1.5 rounded-md text-foreground hover:text-primary dark:text-dark-foreground dark:hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-300"
              aria-label={currentTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            >
              {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Cart Icon */}
            {user && (
              <Link
                to={"/cart"}
                className="relative p-1.5 rounded-md text-primary hover:text-primary/70  transition duration-300 ease-in-out group"
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-foreground  dark:text-dark-foreground text-[10px] rounded-full px-1.5 py-0.5 group-hover:bg-secondary transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {/* Auth Buttons/Links - Desktop */}
            <nav className="hidden lg:flex items-center gap-3">
              {isAdmin && (
                <Link
                  className="p-1.5 rounded-md text-foreground hover:text-primary dark:text-dark-foreground border-2 border-border dark:border-dark-border dark:hover:text-primary transition duration-300 ease-in-out flex items-center"
                  to={"/secret-dashboard"}
                  title="Admin Dashboard"
                  aria-label="Admin Dashboard"
                >
                  Dashboard<Lock size={20} />
                </Link>
              )}
              {user ? (
                <button
                  className="p-1.5 rounded-md text-foreground hover:text-primary dark:text-dark-foreground 
                  border-2 border-border dark:border-dark-border dark:hover:text-primary transition duration-300 ease-in-out flex items-center"
                  onClick={logout}
                  title="Log Out"
                  aria-label="Log Out"
                >
                  <LogOut size={20} />Logout
                </button>
              ) : (
                <>
                  <Link
                    to={"/signup"}
                    className="text-sm font-medium bg-primary hover:bg-secondary text-primary-foreground py-1.5 px-3 rounded-md flex flex-nowrap items-center transition duration-300 ease-in-out"
                  >
                    Sign-Up
                  </Link>
                  <Link
                    to={"/login"}
                    className="text-sm font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground py-1.5 px-3 rounded-md flex items-center transition duration-300 ease-in-out"
                  >
                    Login
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.nav
          className="absolute top-full left-0 right-0 lg:hidden bg-card dark:bg-dark-card p-4 border-t border-dark-border dark:border-dark-border shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background dark:bg-dark-background border border-dark-border text-dark-foreground rounded-md py-2 px-3 pl-10 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute left-0 top-0 h-full px-3 flex items-center justify-center text-foreground hover:text-primary dark:text-dark-foreground dark:hover:text-primary"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Mobile Nav Links */}
          <Link to="/" className="block py-2 text-foreground  dark:text-dark-foreground/80 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/products" className="flex items-center gap-2 py-2 text-foreground  dark:text-dark-foreground/80 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>

          {/* Mobile Admin Link */}
          {isAdmin && (
            <Link to="/secret-dashboard" className="flex items-center gap-2 py-2 text-foreground  dark:text-dark-foreground/80 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}><Lock size={18} /> Dashboard</Link>
          )}

          <hr className="border-dark-border/50 my-2" />

          {/* Mobile Auth Buttons */}
          {user ? (
            <button
              className="w-full text-left flex items-center gap-2 py-2 dark:text-dark-foreground text-foreground hover:text-primary"
              onClick={() => { logout(); setIsMobileMenuOpen(false); }}
            >
              <LogOut size={18} /> Log Out
            </button>
          ) : (
            <>
                <Link to="/signup" className="flex items-center gap-2 py-2 dark:text-dark-foreground text-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}><UserPlus size={18} /> Sign Up</Link>
              <Link to="/login" className="flex items-center gap-2 py-2 text-dark-foreground/80 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}><LogIn size={18} /> Login</Link>
            </>
          )}

          {/* Mobile Theme Toggle is part of Right Section */}
          {/* Re-adding it here for mobile menu convenience */}
          <button
            onClick={() => { handleThemeToggle(); /* Don't close menu */ }}
            className="w-full flex items-center justify-between dark:text-dark-foreground text-foreground hover:text-primary transition duration-300 ease-in-out py-2 mt-2"
            aria-label={currentTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            <span>Switch Theme</span>
            {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </motion.nav>
      )}
    </header>
  );
}

export default Navbar;
