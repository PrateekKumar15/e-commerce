export const getCoupon = async (req,res)=>{
    try {
        const coupan = await Coupan.findone({userId:req.user._id,isActive: true})
        res.json(coupan|| null)
    } catch (error) {
        console.log("Error in getCoupon Controller")
        res.status(500).json({message:"Server Error",error:error.message});

    }
}