// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LogingPopup from './components/LoginPopup/LogingPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

import Policy from './components/Policy/Policy'

const App = () => {
  const [showlogin,setshowlogin]=useState(false);
  return (
    <>
    {showlogin?<LogingPopup setshowlogin={setshowlogin} />:<></>}
    
    <div className='app'>
    <Navbar setshowlogin={setshowlogin}/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={<PlaceOrder/>}/>
      <Route path='/verify' element={<Verify />}/>
      <Route path='/myorders' element={<MyOrders />}/>
      <Route path='/policy' element={<Policy/>}/>
     </Routes>
    </div>
<Footer/>
    </>
  )
}

export default App
