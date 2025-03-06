import express from "express"
import { logout, signin, signup, refreshToken } from "../controllers/auth.controller.js";
import { get } from "mongoose";
const router = express.Router();

router.post("/signup", signup );
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
// router.get("/profile", getProfile)


export default router;