import express from "express";
import { addToCart,getCartProducts,removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { protectRoute } from "../Middlewares/auth.middleware.js";

const router = express.Router();
router.post("/", protectRoute, addToCart);
router.post("/", protectRoute, getCartProducts);
router.delete("/", removeAllFromCart);
router.put("/:id",updateQuantity);


export default router;