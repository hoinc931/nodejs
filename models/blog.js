import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     trim: true,
    //     maxLength: 32,
    //     required: true
    // },
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
    image: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true});

module.exports = mongoose.model("Blog", blogSchema)