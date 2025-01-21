import User from "../Models/user.model.js";
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

    res.status(400).json({"message":"Sign Up Route called"});
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            message: "Something went wrong"
        });
    }
}
export const signin = async (req,res) =>{
    res.send("Sign In Route called");
}
export const logout = async (req,res) =>{
    res.send("Log Out Route called");
} 