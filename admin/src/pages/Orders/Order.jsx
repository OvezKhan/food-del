import React from 'react'
import './Order.css'
import { useState } from 'react'


import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { assets } from '../../assets/assets'
import axios from 'axios';


const Order = () => {
  const [orders , setOrders] = useState([]);
  const url = 'http://localhost:3000';// change this to your backend url
  

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("API Error:", error.message);
      toast.error("Server error. Please try again.");
    }
  };
  

  useEffect(()=>{
    fetchAllOrders()
  },[])


  const statusHandler = async(event , orderId) =>{
// console.log(event,orderId);
const response = await axios.post(url + "/api/order/status" , {
  status:event.target.value ,
  orderId:orderId

})
if(response.data.success){
  await fetchAllOrders();
}

  }


  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item,index)=>{
                  if(index === order.items.length-1){
                    return item.name + " x " + item.quantity
                  }
                  else{

                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city+"," + order.address.state+","+ order.address.country+"," + order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event , order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delevery">Out For Delevery</option>
              <option value="delivered">Delivered</option>

            </select>
        </div>
        ))}
      </div>
      
    </div>
  )
}

export default Order
