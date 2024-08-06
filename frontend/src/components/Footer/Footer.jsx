import { assets } from '../../assets/assets'
import './footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className="footer-content">
      <div className="footer-content-left">
        <img src={assets.logo} alt="" />
        <p>Join us in celebrating the art of cuisine, where every dish tells a story and every meal creates memories. 
        Explore our culinary world and embark on a journey of taste and discovery. </p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
      </div>
      <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
     
            <li> <Link to='/' >Home</Link> </li>
            <li><Link to='/myorders'>My Orders</Link></li>
            <li> <Link to='/policy'>Privacy Policy</Link></li>
        </ul>
      </div>
      <div className="footer-content-right">
        <h2>
            GET IN TOUCH
        </h2>
        <ul>
        <li>+91-9611384688</li>
        <li>contact@tomato.com</li>
        </ul>
      </div>
      </div>
      <hr />
      <div className="copy">
      <p className='copy-right-text'>Copyright 2024 ©️ Tomato.com - All rights reserved.</p>

</div>
    </div>
  )
}

export default Footer
