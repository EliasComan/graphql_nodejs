import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    autorID:{type:String, required:true},
    title:{type:String, required:true},
    body:{type:String, required:true}
},
{
    timestamps:true,
    versionKey:false
})

export const postModel = mongoose.model('post', postSchema)

