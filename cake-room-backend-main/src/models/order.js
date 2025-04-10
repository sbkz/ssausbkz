import { Schema, model } from "mongoose";
import {ProductSchema}  from "./product.js";

const OrderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    purchasedProducts: [{
        product: { type: ProductSchema, required: true }, 
        quantity: { type: Number, required: true, min: 1 } 
    }],
    orderTime: {type: Date, default: Date.now},
    totalPrice: {type: Number, required: true},
    status: {type: String, default: 'not confirmed'}
})

const Order = model('Order', OrderSchema);

export default Order;
