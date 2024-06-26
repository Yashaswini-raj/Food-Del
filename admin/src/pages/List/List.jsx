import { useEffect, useState } from 'react'
import './list.css'
import axios from 'axios'
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const List = ({url}) => {

  const [list,setList]=useState([])
 // const url="http://localhost:4000";

  const fetchList=async()=>{
    const response=await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if(response.data.success){
      setList(response.data.data)
     // toast.success(response.data.message);
    }
    else{
      toast.error("error");
    }
  }
  const removeFood=async(foodId)=>{
const response=await axios.post(`${url}/api/food/remove`,{id:foodId});
await fetchList();
  
  if(response.data.success){
    toast.success(response.data.message)
  }
  else{
    toast.error("Error")
  }

}
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list add flex-col'>
      <p>All fodd list</p>
      <div className="list-tables">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
             
              <p onClick={()=>removeFood(item._id)}className='cursor'>x</p>
             
            </div>
          )
        })}
      </div>
    </div>
  )
}
List.propTypes = {
  url: PropTypes.string.isRequired, // Validate 'url' prop as a required string
};
export default List
