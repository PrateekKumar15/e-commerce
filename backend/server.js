 //We use type module in json file so that we can use import instead of require
//  We use "npm run dev" when we want to see changes live that we use while developing but during our production stage 
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";





dotenv.config(); // gives access to env values
 console.log(process.env.PORT)

 
 const app = express();
 const PORT = process.env.PORT || 5000 // We use process.env.PORT to get the PORT value from env 
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);
 app.use(express.json({limit:"10mb"})); // allows you to parse the body of the request
 app.use(cookieParser());
 app.use("/api/auth",authRoutes)
 app.use("/api/products",productRoutes)
 app.use("/api/cart",cartRoutes)
 app.use("/api/coupons",couponRoutes)
 app.use("/api/payment",paymentRoutes)
app.use("/api/analytics", analyticsRoutes);
 app.listen(PORT , ()=> {
    console.log("Server is running on port http://localhost:"+ PORT);
    connectDB();
 })