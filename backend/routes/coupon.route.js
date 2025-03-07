import express from express;
import { protectRoute } from "../Middlewares/auth.middleware";
const router = express.router();

router.get("/",protectRoute,getCoupon);
router.get("/",protectRoute,getCoupon);