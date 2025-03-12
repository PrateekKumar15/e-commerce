import express from express;
import { protectRoute } from "../Middlewares/auth.middleware.js";
import { getCoupon } from "../controllers/coupon.controller.js";
const router = express.router();

router.get("/",protectRoute,getCoupon);
router.get("/validate",protectRoute,validateCoupon);


export default router