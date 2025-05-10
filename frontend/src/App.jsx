import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";
import { useEffect, lazy, Suspense } from "react"; // Import lazy and Suspense
import LoadingSpinner from "./components/LoadingSpinner";

// Dynamically import pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const PurchaseSuccessPage = lazy(() => import("./pages/PurchaseSuccessPage"));
const PurchaseCancelPage = lazy(() => import("./pages/PurchaseCancelPage"));
const ProductsPage = lazy(() => import("./pages/ProductPage"));

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden">
      {/* Simplified Background & Gradient Layer */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background dark:bg-dark-background">
        {/* Light mode gradient (subtle, less flashy) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(249,250,251,0.3)_0%,rgba(255,255,255,0)_70%)] dark:hidden" />
        {/* Dark mode gradient (MORE AGGRESSIVE dark, better contrast) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hidden dark:block bg-[radial-gradient(ellipse_at_top,rgba(116,58,173,0.1)_0%,rgba(13,17,23,0.95)_70%)]" />
      </div>

      <div className="relative z-0 pt-20"> {/* Adjusted z-index */}
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/signup"
              element={!user ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/secret-dashboard"
              element={
                user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
              }
            />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/cart"
              element={user ? <CartPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/purchase-success"
              element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/purchase-cancel"
              element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </Suspense>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
