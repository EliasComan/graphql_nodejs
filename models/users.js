import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        reqired: true,
        unique: true,
    },
    displayName: {
        type:String,
        required:true
    }
},
{
    timestamps:true,
    versionKey:false
})

export const UserModel = mongoose.model('User', userSchema)