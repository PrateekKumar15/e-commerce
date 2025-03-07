 //We use type module in json file so that we can use import instead of require
//  We use "npm run dev" when we want to see changes live that we use while developing but during our production stage 
 import express from "express"
 import dotenv from "dotenv"; // Required to access env values 
 import authRoutes from "./routes/auth.route.js"
 import productRoutes from "./routes/product.route.js"
import { connectDB } from "./lib/db.js";
 dotenv.config(); // gives access to env values
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupon.route.js"


 console.log(process.env.PORT)

 
 const app = express();
 const PORT = process.env.PORT || 5000 // We use process.env.PORT to get the PORT value from env 

 app.use(express.json()); // allows you to parse the body of the request
 app.use(cookieParser());
 app.use("/api/auth",authRoutes)
 app.use("/api/products",productRoutes)
 app.use("/api/cart",cartRoutes)
 app.use("/api/coupons",couponRoutes)

 app.listen(PORT , ()=> {
    console.log("Server is running on port http://localhost:"+ PORT);
    connectDB();
 })