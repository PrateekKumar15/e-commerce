 import Product from "../Models/product.modal.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";


export const getAllProducts = async (req, res) => {
try {
    const products = await Product.find({}); // Fetch all products
    res.status(200).json({products});

} catch (error) {
    console.log("Error in get All Products Controller", error.message)
        res.status(500).json({message:"Server Error", error: error.message})
    
}
};

export const getFeaturedProducts= async (req,res)=>{
    try {
      let featuredProducts = await redis.get("featured_products")
      if(featuredProducts){
        return res.json(JSON.parse(featuredProducts))
      };

    //   If it is not in redis fetch it from MongoDB
    // .lean is going to returen a plain js object instead od mongoDb document which ic goood for performance
    featuredProducts = await Product.find({isfeatured:true}).lean();
    if(!featuredProducts){
        return res.status(404).json({message:"No Featured Products Found"});

        // store in redis for future quick access
    }
    await redis.set("featured_products",JSON.stringify("featured_products"))
    res.JSON(featuredProducts);


} catch (error) {
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({message:"Server Error ", error: error.message});

    }
};



export const createProduct = async (req,res)=>{
    try {
        const {name, description, image, price, category} = req.body;
        let cloudinaryResponse = null;
        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image,{folder:"products"})
        }
        const product = await Product.Create({
            name,
            description,
            price,
            image:cloudinaryResponse?.secure_url?cloudinaryResponse.secure_url:"",
            category

         })
         res.status(201).json(product);




    } catch (error) {
        console.log("Error in create Product Controller",error.message)
        res.status(500).json({message:"Server Error",error:error.message})

    }
};


export const deleteProduct = async (req,res)=>{
try {
    const product  = await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
        if(Product.image){
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                    cloudinary.uploader.destroy(`products/${publicId}`)           
                    console.log("deleted image from Clouidnary")

            } catch (error) {
                console.log("error in deleting image from clouidnary",error);
            }
            await Product.findByIdAndDelete(req.params.id)
            res.json({message:"Product is deleted successfully from database"})

        }
} catch (error) {
    console.log("error in delete product controller ")
    res.status(500).json({message:"server error",error: error.message})
}
} ;


export const getRecommendedProducts = async (req,res) => {
    try {
        const products = await Product.aggregate([
            {$sample:{size:3}},
            {
                $project:{
                    _id:1,
                    name:1,
                    description:1,
                    image:1,
                    price:1

                }
            },

        ])
        res.json(products)
    } catch (error) {
    console.log("Error in recommendedProducts controller")    
    req.status(500).json({message:"Server Error",error:error.message})

    }
};

export const getProductsByCategory = async (req,res)=>{
    const {category} = req.params;
    try {
        const products = await Product.find({category})
        res.json(products)
    } catch (error) {
        console.log("error in get products by category controller ", error.message)
        req.status(500).json({message:"server error",error:error.message})
    }
}

export const  toggleFeaturedProduct = async (req,res) => {
 try {
    const product = await Product.findById(req.params.body);
    if (product) { 
        product.isFeatured = !product.isFeatured;
        const updatedProduct = await product.save();
        await updateFeaturedProductsCache();
        res.json(updatedProduct)
    } else {
        res.status(404).json({message:"Product Not Found"});
    }
 } catch (error) {
    console.log("Error in toggle Featured Product Controller");
    res.status(500).json({message:"Server Error",error:error.message});
 }
}

 async function updateFeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({isFeatured:true}).lean();
        await redis.set("featured_proucts",  Json.stringify(featuredProducts))
    } catch (error) {
        console.log("Error in Updating Featured Product in Redis");

    }
}


