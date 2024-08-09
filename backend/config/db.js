import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();
mongoose.set('strictQuery', false); 
export const connectDB=async()=>{
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("DB connected"))
}