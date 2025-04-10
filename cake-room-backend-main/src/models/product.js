import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    proteins:{
        type: Number,
        required: true,
        min: 0
    },
    fats:{
        type: Number,
        required: true,
        min: 0
    },
    carbohydrates:{
        type: Number,
        required: true,
        min: 0
    },
    photoPath:{
        type: String,
        required: true,
        trim: true
    },
    energy: {
        type: Number,
        required: true,
        min: 0
    },
    expiration: {
        type: Number,
        required: true,
        min: 0
    },
    price:{
        type: String,
        required: true,
        min: 0
    },
    composition:{
        type: String,
        required: true,
        trim: true
    },
    box_weight:{
        type: Number,
        required: true,
        min: 0
    },
    isActive:{
        type: Boolean,
        required: true,
        default: true
    },
    description:{
        type: String, 
        required: true,
        default: "Продукт"
    }

});

const Product = mongoose.model('Product',ProductSchema);

export {Product, ProductSchema}