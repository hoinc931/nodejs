import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 32,
        required: true
    },
    description: {
        type: String,
        maxLength: 1800,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shipping: {
        type: Boolean
    },
    quantity: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0
    }
}, {timestamp: true});

module.exports = mongoose.model("Product", productSchema)