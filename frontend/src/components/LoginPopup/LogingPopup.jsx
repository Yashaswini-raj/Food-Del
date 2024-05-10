import { useContext, useState } from 'react'
import './loginpopup.css'
import { assets } from '../../assets/assets'
import PropTypes from 'prop-types';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios'

const LogingPopup = ({setshowlogin}) => {
    const {url,setToken} =useContext(StoreContext)

    const [currState,setcurrState]=useState("Sign-up")
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
        })

      const onChangeHandler =(event)=>{
        const name=event.target.name;
        const value=event.target.value;

        setData(data=>({...data,[name]:value}))
      }
const onLoging= async(event)=>{
  event.preventDefault();
  let newURL=url;
  if(currState==="Login"){
    newURL+="/api/user/login";
  }
  else{
    newURL+="/api/user/register";
  }

  const response=await axios.post(newURL,data);
  if(response.data.success){
    setToken(response.data.token);
    localStorage.setItem("token",response.data.token);
    setshowlogin(false)
  }
  else{
    alert(response.data.message);
  }

}

      
  return (
    <div className='login-popup'>
     <form onSubmit={onLoging} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setshowlogin(false)}src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
        {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required/>}
       
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required/>
            <input  name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
           
        </div>
        <button type='submit'>{currState==="Sign-up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, iagree to the terms of use & privacy policy</p>
        </div>
        {currState==='Login'?  <p>Create a new account ? <span onClick={()=>setcurrState('Sign-up')}>Click here</span></p>: 
          <p>Already have an account ? <span onClick={()=>setcurrState('Login')}>Login here</span></p>}
      
     
     </form>
    </div>
  )
}

LogingPopup.propTypes = {
  setshowlogin: PropTypes.func.isRequired, // Validate 'setshowlogin' prop as a required function
};


export default LogingPopup
