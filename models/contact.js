import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 32,
        required: true
    },
    title: {
        type: String,
        trim: true,
        require: true
    },
    content: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true
    },
    phone: {
        type: Number,
        trim: true,
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Contact", contactSchema)