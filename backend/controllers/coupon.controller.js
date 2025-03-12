import Coupon from "../Models/coupon.modal.js"
export const getCoupon = async (req,res)=>{
    try {
        const coupon = await Coupon.findone({userId:req.user._id,isActive: true})
        res.json(coupon|| null)
    } catch (error) {
        console.log("Error in getCoupon Controller")
        res.status(500).json({message:"Server Error",error:error.message});

    }
}

export const validateCoupon = async (req,res)=> {
    try {
        const {code} = req.body;
        const coupon = await Coupon.findone({code:code,userId:req.user._id, isActive:true})
        if (!coupon) {
            res.status(400).json({
                message:"Coupon Not Found"
            })
        };

        if (coupon.expirationDate< new Date()) {
            coupon.isActive = false;
            return res.status(404).json({message:"Coupon Expired"})
        };

        res.json({
            message:"Coupon is Valid",
            code: Coupon.code,
            discountPercentage:coupon.discountPercentage
        })

    } catch (error) {
        console.log("error in coupon validation controller");
        res.status(500).json({message:"server error",error: error.message})
    }
}