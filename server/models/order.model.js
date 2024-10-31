import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'canceled'], default: 'pending' },
});

const Order = new mongoose.model("Order",orderSchema);

export default Order;