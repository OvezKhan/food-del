import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {
  const {getTotalCartAmount , token , food_list , cartItems , url} = useContext(StoreContext);
  // const url = "http://localhost:3000";
  const navigate = useNavigate();


  const [data , setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:""

  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({...data , [name] : value}) 
    }

// placeOrder function
    const placeOrder = async(event) => {
event.preventDefault();
let orderItems = [];
food_list.map((item) => {
  if(cartItems[item._id] > 0){
    let itemInfo = item;
    itemInfo["quantity"] = cartItems[item._id];
    orderItems.push(itemInfo)
  }
})
console.log(orderItems);
let orderData = {
  address:data,
  items:orderItems,
  amount:getTotalCartAmount()+3,
}

console.log("Request Payload:", orderData);
try {
  console.log("Token:", token);
  console.log("Requesting to:", url + "/api/order/place");

  let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
  if (response.data.success) {
    const { session_url } = response.data;
    window.location.replace(session_url);
  } else {
    alert("Order failed: " + response.data.message);
  }
} catch (error) {
  console.error("Error placing order:", error);
  if (error.response) {
    console.log("Order failed: " + error.response.data.message);
  } else {
    console.log("An error occurred while placing the order. Please try again later.");
  }
}
    }
   

    useEffect(()=>{
      if(!token){
        navigate('/cart');
      }
      else if(getTotalCartAmount() === 0){
navigate('/cart');
      }
    },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
<p className='title'>Delevery Information</p>
<div className="multi-fields">
  <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
  <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
</div>

<input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
<input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
<div className="multi-fields">
  <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
  <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
</div>

<div className="multi-fields">
  <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip' />
  <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
</div>
<input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone Number' />

      </div>
      
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delevery Fee</p>
              <p>${getTotalCartAmount()===0 ? 0 : 3}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0 ? 0 :getTotalCartAmount()+3}</p>
            </div>

          </div>

            <button type='submit'>Proceed To Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
