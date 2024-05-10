//import React from 'react'
import './exploremenu.css'
import { menu_list } from '../../assets/assets'
const Exploremenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu" id='explore-menu'>
      <h1>Explore our Menu</h1>
      <div className="explore-menu-text">
      <p>Choose from a diverse menu featuring a delecatable array
      of dishes. Our mission is to satisfy your carvings and elevate your
      dining experiences, one delicious meal at a time.</p></div>
      <div className="explore-menu-list">
        { menu_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index}className="explore-menu-list-items">
                    <img className={category==item.menu_name?"active":""}src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })

        }
        <hr />
      </div>
    </div>
  )
}

export default Exploremenu
