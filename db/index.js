import mongoose from 'mongoose'

export const connectDB = async () => {
await mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.wikgb.mongodb.net/graphqlNodeJS?retryWrites=true&w=majority')
console.log('DB connected')
}