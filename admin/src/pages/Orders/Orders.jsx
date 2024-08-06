import './orders.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

// eslint-disable-next-line react/prop-types
const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
      console.log("list of orders");
    } else {
      toast.error("Error");
    }
  };

  const statusHandler=async(e,orderId)=>{
// console.log(e,orderId)
const response=await axios.post(url+"/api/order/status",{
  orderId,
  status:e.target.value
})
if(response.data.success){
  await fetchAllOrders();
}
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="orders add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + " , ";
                  }
                })}
              </p>
              <h4 className="order-item-name">
               {order.address.firstName+" "+order.address.lastName}
              </h4>
              <div className="order-item-address">
              <p>{order.address.street}</p>
                <p>  {order.address.city+", "+ order.address.state+", "+order.address.country}</p>
              
              </div>
              <p className="order-item-phone">
                {order.address.phone}
              </p>
              </div>
              <p>Item:{order.items.length}</p>
              <p> $ {order.amount}</p>
              <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
        
        ))}
      </div>
    </div>
  );
};

export default Orders;
