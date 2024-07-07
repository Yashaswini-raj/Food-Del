import orderModel from "../models/orderModel.js";
import userModel from './../models/userModel.js';
import cors from 'cors'
import crypto from 'crypto'
import axios from 'axios'
import {Cashfree} from 'cashfree-pg'
import dotenv from 'dotenv';
dotenv.config();


const CLIENT_ID = process.env.CLIENT_ID ;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

Cashfree.XClientId=CLIENT_ID;
Cashfree.XClientSecret=CLIENT_SECRET;
Cashfree.XEnvironment=Cashfree.Environment.SANDBOX;


function generateOrderId(){
    const uniqueId = crypto.randomBytes(16).toString('hex');

    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);

    const orderId = hash.digest('hex');

    return orderId.substr(0, 12);
}


//placeing user order for frontend
const placeOrder=async(req,res)=>{
    try {
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.nody.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(Req.body.userId,{cartData:{}});

        let request = {
            "order_amount": 1.00,
            "order_currency": "INR",
            "order_id": await generateOrderId(),
            "customer_details": {
                "customer_id": "webcodder01",
                "customer_phone": "9999999999",
                "customer_name": "Web Codder",
                "customer_email": "webcodder@example.com"
            },
        }

        Cashfree.PGCreateOrder("2023-08-01", request).then(response => {
            console.log(response.data);
            res.json(response.data);

        }).catch(error => {
            console.error(error.response.data.message);
        })

    } catch (error) {
        console.log(error)
    }
}


export {placeOrder};
