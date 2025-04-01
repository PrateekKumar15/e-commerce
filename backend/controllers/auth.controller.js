// import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import{redis} from "../lib/redis.js";
import User from "../Models/user.model.js";

const generateToken = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});
    return {accessToken,refreshToken};

}

const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken,"EX", 7*24*60*60); // 7 days
}

const setCookies = (res, accessToken, refreshToken) => {
   res.cookie("accessToken", accessToken, {
       httpOnly: true,  // prevent xss attacks
       sameSite: "strict", // prevent csrf attacks, cross site forgery attacks
       secure: process.env.NODE_ENV === "production", // only send cookie over https in production
       maxAge: 15*60*1000 // 15 minutes
   });

   res.cookie("refreshToken", refreshToken, {
    httpOnly: true,  // prevent xss attacks
       sameSite: "strict", // prevent csrf attacks, cross site forgery attacks
       secure: process.env.NODE_ENV === "production", // only send cookie over https in production
       maxAge: 7*24*60*60*1000 // 7 days
   });
}

export const signup = async (req,res) =>{
    // desktop App => postman
    try{
    const {email,password,name} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({
            message: "User Already Exists"
        });
    }
    const user = new User({
        name,
        email,
        password
    });
    await user.save();
    // authenticate User
    const {accessToken,refreshToken} = generateToken(user._id);
    await storeRefreshToken(user._id,refreshToken);
    setCookies(res,accessToken,refreshToken);

    res.status(201).json({user:{
        name: user.name,
        email: user.email,
        _id: user._id,
        role: user.role
    }, "message":"User Created Successfully"});
    }
    catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}
export const login = async (req,res) =>{
    try{
        console.log("yes")
        const {email,password} = req.body;
        // console.log(email)
        const user = await User.findOne({email});
        if(user){
            
            const isMatch = await user.comparePassword(password);
            if(isMatch){
                const {accessToken,refreshToken} = generateToken(user._id);
                await storeRefreshToken(user._id,refreshToken);
                setCookies(res,accessToken,refreshToken);
                res.status(201).json({user:{
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    role: user.role
                }, "message":"User Logged In Successfully"});
            }else{
                
                res.status(400).json({message: "Invalid Credentials"});
            }
        }
    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Something went wrong",error:error.message});
    }
}
export const logout = async (req,res) =>{
    try{
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decode.userId}`);
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({message: "Logged Out Successfully"});
    }catch(error){
        res.status(500).json({message: "Something went wrong",error:error.message});
    }
} 

//  this will refresh the access token
export const refreshToken = async (req,res) =>{
    try{
       const refreshToken = req.cookies.refreshToken;
         if(!refreshToken){
              return res.status(401).json({message: "No Refresh Token Provided"});
         }
            const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            const storedToken = await redis.get(`refresh_token:${decode.userId}`);
            if(refreshToken !== storedToken){
                return res.status(401).json({message: "Invalid Refresh Token"});
            }

            const accessToken = jwt.sign({userId: decode.userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
            res.cookie("accessToken", accessToken, {
                httpOnly: true,  // prevent xss attacks
                sameSite: "strict", // prevent csrf attacks, cross site forgery attacks
                secure: process.env.NODE_ENV === "production", // only send cookie over https in production
                maxAge: 15*60*1000 // 15 minutes
            });
            res.status(200).json({message: "Access Token Refreshed Successfully"});

    }catch(error){
        console.log("Error in refreshToken controller", error.message);
        res.status(500).json({message: "Something went wrong",error:error.message});
    }
}
// Todo: Create getProfile controller later
export const getProfile = async (req,res) =>{
    try {
        res.json(req.user);
        
    } catch (error) {
        console.log("Error in getProfile controller", error.message);
        res.status(500).json({message: "Something went wrong",error:error.message});
        
    }
}