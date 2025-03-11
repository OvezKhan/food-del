import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {

  // const url = 'http://localhost:3000';
  const {url , token , setToken} = useContext(StoreContext);
  // console.log(url)
  

    const [currState , setCurrState] = useState('Login');
    const [data , setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData((prevData) => ({...prevData, [name]: value}));
    }


    const onLogin = async (event) => {
      event.preventDefault();
      try {
        let newUrl = url;
        let requestData;
        if (currState === 'Login') {
          // For login, send only email and password
          newUrl += '/api/user/login';
          requestData = {
            email: data.email,
            password: data.password,
          };
        } else {
          // For registration, send name, email, and password
          newUrl += '/api/user/register';
          requestData = {
            name: data.name,
            email: data.email,
            password: data.password,
          };
        }
      console.log("Sending Data : ", requestData);
      const response = await axios.post(newUrl, requestData);
        // const response = await axios.post(newUrl, data);
        console.log('Response:', response.data);
        if(response.data.success){
setToken(response.data.token);
localStorage.setItem("token", response.data.token);
setShowLogin(false);
        }
        else{
          alert(response.data.message);
      } 
      } catch (error) {
  console.error('Axios Error:', error.response ? error.response.data : error);
  alert(error.response?.data?.message || 'Error: Unable to connect to the server.');
}
    };
    

   
   

  return (
    <div className='login-popup'>
      <form action="" onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-inputs">
            
            {currState==="Login"?<></>:  <input type="text" name="name" onChange={onChangeHandler} value={data.name} id="name" placeholder='Your Name' required/> }
            <input type="email" placeholder='Email' name='email' onChange={onChangeHandler} value={data.email} required />
            <input type="password" name="password" onChange={onChangeHandler} value={data.password} id="password" placeholder='Password' required/>
        </div>

        <button type='submit'>{currState==="Sign Up"?"Create Account": "Login"}</button>

        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing , I agree to the terms of use & privacy policy.</p>
        </div>

        {currState==="Login"
        ?<p>Create a new account ? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
        :<p>Already have an account <span onClick={() => setCurrState("Login")}>Login Here</span></p> }
        
        
      </form>
    </div>
  )
}

export default LoginPopup
