import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './fooditem.css'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {
    //const [itemCount,setitemCount]=useState(0);
    const {cartitem,addtoCart,removeCart,url}=useContext(StoreContext)
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={url+"/images/"+image} className='food-item-img' alt="" />
        {
            !cartitem[id]?
            <img className="add" onClick={()=>addtoCart(id)}src={assets.add_icon_white} alt="" />
            :<div className='food-item-counter'>
            <img onClick={()=>removeCart(id)}src={assets.remove_icon_red} alt="" />
            <p>{cartitem[id]}</p>
            <img onClick={()=>addtoCart(id)}src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      
      <div className="food-item-info">
        <div className="food-item-namr-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
