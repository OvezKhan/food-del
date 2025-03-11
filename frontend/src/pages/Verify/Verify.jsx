import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
    // console.log(window.location.href);

    const [searchParams , setSearchParams] = useSearchParams();
    const {url} = useContext(StoreContext)
    const navigate = useNavigate()
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    console.log(success);
    console.log(orderId);

const verifyPayment = async() =>{
    const response = await axios.post(url + "/api/order/verify", { success: success === "true", orderId });

    if(response.data.success){
navigate("/myorders");
    }
    else{
        navigate("/");
        }
}

useEffect(()=>{
    verifyPayment();
},[])
    
    
  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
