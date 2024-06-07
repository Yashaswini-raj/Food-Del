import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRouter.js"
import userRouter from "./routes/userRouter.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRouter.js"
//app config

const app=express()
const PORT=4000

//middlewares
app.use(express.json())
app.use(cors()) //access backend from any frontend

//db connection
connectDB();

//api end point
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)


app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`)
})

//mongodb+srv://yashaswiniraj:<password>@cluster0.owhytft.mongodb.net/?
