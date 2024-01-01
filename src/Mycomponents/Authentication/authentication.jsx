import React from 'react'
import './authentication.css';
import password_icon from '../assets/password.png'
import user_icon from '../assets/person.png'
import ReCAPTCHA from "react-google-recaptcha";
const authentication = () => {
  const onChange=()=>{};
  return (
    
    <div className='container'>
       <div className="header">
        <div className="text">Welcome Rajasthan Police</div>
       </div>
       <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder='Name'/>
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Password'/>
        </div>
        <div className="capcha">
        <ReCAPTCHA
        sitekey="6Lfw2T0pAAAAAIaYv9PUcTqkUfewW7ZMwSvAhWb0"
        onChange={onChange}
        />
        </div>
       </div>
       <div className="submit-container">
        <button className='submit'>Submit</button>
       </div>
    </div>
  )
}

export default authentication