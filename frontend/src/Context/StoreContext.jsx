import { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/assets";
import axios from 'axios'
export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{
    const [cartitem,setcartitem]=useState({});
    const url="http://localhost:4000";
    const [food_list,setFoodList]=useState([]);
    const [token,setToken]=useState("");

    const addtoCart= async (itemId)=>{
        if(!cartitem[itemId]){
            setcartitem((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setcartitem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeCart=async(itemId)=>{
        setcartitem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartitem){
                if(cartitem[item]>0){
                    let itemInfo=food_list.find((product)=>product._id==item)
                    totalAmount+=itemInfo.price+cartitem[item];
                }
        }
        return totalAmount;
    }

    const fetchFoodList=async()=>{
        const response =await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
      
    }
    const loadCartData=async(token)=>{
        const response=axios.post(url+"/api/cart/get",{},{headers:{token}})
        setcartitem((await response).data.cartData)
    }

    useEffect(()=>{
    
        async function loadData(){
            await fetchFoodList()
        
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"))
        }
    }
        loadData();
    },[])
    const contextValue={
     food_list,
     cartitem,
     setcartitem,
     addtoCart,
     removeCart,
     getTotalCartAmount,
     url,
     token,
     setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
        {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;