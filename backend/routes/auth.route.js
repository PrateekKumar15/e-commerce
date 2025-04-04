import express from "express"
import { logout, login, signup, refreshToken, getProfile } from "../controllers/auth.controller.js";

import { protectRoute } from "../Middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup );
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile)


export default router;