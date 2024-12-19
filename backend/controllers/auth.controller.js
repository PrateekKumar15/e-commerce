export const signup = async (req,res) =>{
    // desktop App => postman
    const {email,password,name} = req.body;
    res.send("Sign Up Route called");
}
export const signin = async (req,res) =>{
    res.send("Sign In Route called");
}
export const logout = async (req,res) =>{
    res.send("Log Out Route called");
}