//import React from 'react'
import { useContext, useEffect } from "react";
import "./placeorder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
//import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {
  const { getTotalCartAmount,token,food_list,cartitem,url } = useContext(StoreContext);
  
  
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",


  })


  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}))
  }

  // const navigate=useNavigate()
  const handleClick=async(e)=>{
    e.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartitem[item._id]>0){
        let itemInfo =item;
        itemInfo["quantity"]=cartitem[item._id]
        orderItems.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+20
    }
    //let res = await axios.post('http://localhost:4000/place',orderData )
    let res = await axios.post(url+"/api/order/place",orderData,{headers:{token}} )
        console.log(res)
        if (res.data.success) {
          const { session_url } = res.data;
          window.location.replace(session_url);
      }
          else {alert("error")}
  }

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 20;
  const totalPrice = subtotal + deliveryFee;
  const navigate=useNavigate();
  useEffect(()=>{
    if(!token){
        navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])
  return (
    <form  onSubmit={handleClick} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Info</p>

        <div className="multi-feilds">
          <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>

        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-feilds">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input name="state" onChange={onChangeHandler} value={data.state}  type="text" placeholder="State" />
        </div>
        <div className="multi-feilds">
          <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone}  type="tel" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="">
            <div className="cart-total-details">
              <p>Subtotal</p>
              {/* <p>${getTotalCartAmount()}</p> */}
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              {/* <p>${getTotalCartAmount() === 0 ? 0 : 20}</p> */}
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              {/* <b>${getTotalCartAmount() === 0 ? 0 : +20}</b> */}
              <b>${totalPrice}</b>
            </div>
          </div>
          <button type="submit">Proceed to payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
