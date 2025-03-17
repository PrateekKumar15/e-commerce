import express from 'express';
import { protectRoute, adminRoute } from '../Middlewares/auth.middleware.js';
import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts, toggleFeaturedProduct, getProductsByCategory } from '../controllers/product.controller.js';
const router = express.Router();

router.get("/",protectRoute,adminRoute,getAllProducts);
router.get("/featured",getFeaturedProducts);
router.get("/category/:category",getProductsByCategory);
router.get("/recommendations",getRecommendedProducts);
router.post("/",protectRoute,adminRoute,createProduct);
router.post("/:id",protectRoute,adminRoute,deleteProduct);
router.patch("/:id",protectRoute,adminRoute,toggleFeaturedProduct);




export default router;