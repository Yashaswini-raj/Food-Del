import mongoose from 'mongoose'

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://yashaswiniraj:gtvilQ04Lh4dqmed@cluster0.owhytft.mongodb.net/food-del')
    .then(()=>console.log("DB connected"))
}