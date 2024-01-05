  import { useNavigate } from 'react-router-dom';
  import { useState } from 'react';
  import axios from 'axios';
  import React from 'react'
  import './authentication.css';
  import password_icon from '../assets/password.png'
  import user_icon from '../assets/person.png'
  import ReCAPTCHA from "react-google-recaptcha";
  const Authentication = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
  const [password, setPassword] = useState('');
    const onChange=()=>{};
    const handleAuthentication = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5001/login', {
        name: name,
        password: password,
        },{ withCredentials: true });

  
        if (response.status === 200) {
          // Authentication successful, redirect to CRM portal
          console.log('Authentication successful');
          navigate('/dashboard'); // Update the path as needed
        } else {
          // Handle authentication failure
          console.error('Authentication failed');
        }
      } catch (error) {
        console.error('authentication failed:', error);
      }
    };
    return (
     <div className="container">
      <div className="header">
        <div className="text">Welcome Rajasthan Police</div>
      </div>
     
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="capcha">
          <ReCAPTCHA sitekey="6Lfw2T0pAAAAAIaYv9PUcTqkUfewW7ZMwSvAhWb0" onChange={onChange} />
        </div>
      </div>
      <div className="submit-container">
        <button className="submit" onClick={handleAuthentication}>
          Submit
        </button>
      </div>
    </div>
  );
};

  export default Authentication