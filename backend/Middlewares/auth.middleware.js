
import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';


export const protectRoute = async (req, res, next) => {
    
    try {
        const {accessToken} = req.cookies;
        // console.log("Access Token", accessToken);
        if(!accessToken){
            return res.status(401).json({message: "Unauthenticated - No access token provided"});
        }
        try {
            const decode = jwt.verify(
              accessToken,
              process.env.ACCESS_TOKEN_SECRET
            );
            const user = await User.findById(decode.userId).select("-password");
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
            req.user = user;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({message: "Unauthorized - Access Token Expired"});
            }
            throw new Error(error.message);
        }
    } catch (error) {
        // console.log("Error in protectroute middleware", error.message);
        return res.status(401).json({message: "Unauthorized - Invalid access token"});
    }
};


export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({message: "Forbidden - Admin access only"});
    }
}