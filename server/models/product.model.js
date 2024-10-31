import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    imgUrl:{type:String, required:true},
    category:{type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    size:[String],
    color: [String],
    stock: { type: Number, default: 0 }
},{timestamps:true})

const Product = new mongoose.model("Products",productSchema)

export default Product;