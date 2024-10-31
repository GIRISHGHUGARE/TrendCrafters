import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    product:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
    rating:{type:Number,enum: [0, 1, 2, 3, 4, 5], default: 0},
    comment:{type:String,required:true}
},{timestamps:true});

const Review = new mongoose.model('Review',reviewSchema);

export default Review;