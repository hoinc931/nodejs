import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 32,
        required: true
    },
    // image: {
    //     data: Buffer,
    //     contentType: String
    // }
}, {timestamp: true});

module.exports = mongoose.model("Category", categorySchema)