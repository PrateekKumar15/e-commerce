import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is Required"],
        trim: true,
    },
    description:{
        type: String,
        required: [true, "Description is Required"],
    },
    price:{
        type: Number,
        required: [true, "Price is Required"],
    },
    image:{
        type: String,
        required: [true, "Image is Required"],
    },
    category:{
        type: String,
        required: [true, "Category is Required"],
    },
    isFeatured:{
        type: Boolean,
        default: false,
    },

},{timestamps: true,});

const Product = mongoose.model("Product", productSchema);

export default Product;