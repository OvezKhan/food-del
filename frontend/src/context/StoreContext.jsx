import { createContext, useEffect, useState } from "react";
import axios from "axios";
import React from 'react';



export const StoreContext = createContext(null);


const StoreContextProvider = ( props ) => {

    const url = "https://food-del-backend-ig5f.onrender.com";

    const [cartItems , setCartItems] = useState({});
    const [token,setToken] = useState("");
    const [food_list , setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        // Add item to cart 
        
            if(!cartItems[itemId]){
                setCartItems((prev) => ({...prev,[itemId]:1}))
            }
            else{
                setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
            }
            if(token){
                await axios.post(url + "/api/cart/add" , {itemId} , {headers:{token}})
            }
    }

    const removeFromCart = async(itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}));

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
        
       
            
    }
    

    // useEffect(() => {
    //     console.log(cartItems);
    // },[cartItems])

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){

                let itemInfo = food_list.find((product) => product._id === item);

                if (itemInfo) { //  Ensure item exists before accessing properties
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.warn(`Item with ID ${item} not found in food_list`);
                }
            }
        }
        return totalAmount;
    }


    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
        }

        const loadCardData = async(token) =>{
            const response = await axios.get(url + "/api/cart/get"  , {headers:{token}});
            setCartItems(response.data.cartData);
        }
    
    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCardData(localStorage.getItem("token"));
            }
            
        }
        loadData();
        
    },[])

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};


export default StoreContextProvider;
