import mongoose, { isValidObjectId } from 'mongoose';
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 32,
        required: true
    },
    category: {
        type: ObjectId,
        ref:'categories',
        required: true
    },
    description: {
        type: String,
        maxLength: 1800,
        required: true, 
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    shipping: {
        type: Boolean
    },
    quantity: {
        type: Number,
        trim: true
    },
    sold: {
        type: Number,
        default: 0
    },
    image:{
        data: Buffer,
        contentType: String
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema)