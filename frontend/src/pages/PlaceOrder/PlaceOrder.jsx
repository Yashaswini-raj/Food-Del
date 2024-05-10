//import React from 'react'
import { useContext } from 'react'
import './placeorder.css'
import { StoreContext } from '../../Context/StoreContext'
//import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {
  const {getTotalCartAmount}=useContext(StoreContext)
 // const navigate=useNavigate()
  return (
    <form className='place-order'>
    <div className="place-order-left">
      <p className="title">Delivery Info</p>

      <div className="multi-feilds">
        <input type="text" placeholder='First name' />
        <input type="text" placeholder='Last name' />
      </div>
     
      <input type="email" placeholder='Email address' />
      <input type="text" placeholder='Street' />
      <div className="multi-feilds">
        <input type="text" placeholder='City' />
        <input type="text" placeholder='State' />
      </div>
      <div className="multi-feilds">
        <input type="text" placeholder='Zip code' />
        <input type="text" placeholder='Country' />
      </div>
      <input type="tel" placeholder='Phone' />
    </div>


    <div className="place-order-right">
    <div className="cart-total">
        <h2>Cart Total</h2>
        <div className="">
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:20}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:+20}</b>
          </div>
        </div>
        <button>Proceed to payment</button>
      </div>
    </div>
    </form>
  )
}

export default PlaceOrder
