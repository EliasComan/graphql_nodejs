import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    PostID: {
        type: String,
        required: true
    },

}, {
    timestamps: true,
    versionKey: false
})

export const comentModel =  mongoose.model('Comment', commentSchema)