import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
const Add = () => {
    const url = "http://localhost:3000";

    const [image,setImage] = useState(null);
    const [data,setData] = useState({
        name: "",
        description:"",
        price: "",
        category:""
    })

    const onChangeHandler = (event) => {
       const name = event.target.name
       const value = event.target.value
        setData(data => ({...data,[name]:value}))
    }

    const onSubmitHandler = async(event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);

        
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {

                setData({ name: "", description: "", price: "", category: "" });
                setImage(null);
                toast.success(response.data.message);
            }
            else {
                console.log(response.data)
                toast.error(response.data.message);
                }
        
        
        
    }


  return (
    <div className='add'>
        <form className="flex-col" onSubmit={onSubmitHandler}>
<div className="add-img-upload flex-col">
<p>Upload Image</p>
<label htmlFor="image">
    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
</label>
<input onChange={(e) => setImage(e.target.files[0])} type="file" name='image' id='image' hidden required />
</div>

<div className="add-product-name flex-col">
    <p>Product Name</p>
    <input onChange={onChangeHandler} value={data.name} type="text" placeholder="Product Name" name='name'/>
</div>

<div className="add-product-description flex-col">
    <p>Product Description</p>
    <textarea onChange={onChangeHandler} value={data.description} name="description" rows={10} placeholder="Product Description"></textarea>
</div>

<div className="add-category-price">
    <div className="add-category">
        <p>Product Category</p>
        <select name="category" onChange={onChangeHandler} value={data.category}>
        <option value="" disabled>Select a category</option>  
            <option value="Salad">Salad</option>
           
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure-veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
        </select>
    </div>

    <div className="add-price">
        <p>Product Price</p>
        <input onChange={onChangeHandler} value={data.price} name='price' type="number" placeholder='$20' />
    </div>
</div>
<button type='submit' className='add-btn'>Add</button>
        </form>
      
    </div>
  )
}

export default Add
