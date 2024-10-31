import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, enum:['customer','admin'], default:'customer'},
    address:{
        street:String,
        city:String,
        state:String,
        zip:String,
        country:String
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;