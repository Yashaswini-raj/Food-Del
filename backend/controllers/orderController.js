import orderModel from "../models/orderModel.js";
import userModel from './../models/userModel.js';
//import paypal, { order } from  'paypal-rest-sdk';
import paypal from  'paypal-rest-sdk';
import cors from 'cors'
import crypto from 'crypto'
import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config();


paypal.configure({
    "mode":'sandbox',
    "client_id": process.env.PAYPAL_CLIENT_ID,
    "client_secret": process.env.PAYPAL_CLIENT_SECRET,
    // "client_id": "Aa7jSrvqxFhZFicIeNsaQWijhWZlnNxG8xkT44FlJHgGDkzV7ssBPfuXTGaV-h4QxcO2IG8dTqTgiszA",
    // "client_secret": 'EBtmO-_mNJ6oalDNF9Hc2WkyQC4PVVMlICfdPYKIzpyUXzwjX1DzmILyPbfnqEFdIjJgKNz8-eBejkZj',
});



//placeing user order for frontend
const placeOrder=async(req,res)=>{
    const frontend_url="http://localhost:5174" ;
    try {
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        let create_payment_json = {
                        "intent": "sale",
                        "payer": {
                            "payment_method": "paypal"
                        },
                        "redirect_urls": {
                            "return_url": `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                            "cancel_url": `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
                        },
                        "transactions": [{
                            "item_list": {
                                "items": [{
                                    "name": "item",
                                    "sku": "item",
                                    "price": "1.00",
                                    "currency": "USD",
                                    "quantity": 1
                                }]
                            },
                            "amount": {
                                "currency": "USD",
                                "total": "1.00"
                            },
                            "description": "This is the payment description."
                        }]
                    };
            
            
//                     await paypal.payment.create(create_payment_json, function (error, payment) {
//                             if(error) {
//                                 console.log(error);
//                                 throw error;
//                             } else {
//                                 console.log(payment);
            
//                                 let data = payment
//                                 res.json(data);
//                             }
            
//                     })
// res.json({success:true,session_url:create_payment_json.url,message:"order placed successfully"})

await paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating payment" });
    } else {
        console.log(payment);
        const session_url = payment.links.find(link => link.rel === 'approval_url').href;
        res.json({ success: true, session_url: session_url, message: "Order placed successfully" });
    }
});
      

    } catch (error) {
        console.log(error)
        res.json({sucess:false,message:"Error"});
    }
}
const verifyOrder=async (req,res)=>{
    
        const {orderId,success}=req.body;
        try {
            if(success==="true"){
                await orderModel.findByIdAndUpdate(orderId,{payment:true})
                res.json({success:true,message:"paid"})
            }
            else{
                await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Error"});
            }
        
    } catch (error) {
        console.log(error)
        res.json({sucess:false,message:"Error"});
    }
}

const userOrder=async(req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId,payment:true});
        res.json({success:true,data:orders,message:"success"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
const listOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({payment:true})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}
//api for updating order status
const updateStatus=async(req,res)=>{
try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"status updated"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}
export {placeOrder,verifyOrder,userOrder,listOrders,updateStatus};
