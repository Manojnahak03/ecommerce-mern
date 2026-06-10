import React from 'react'
import { useState } from 'react'
import api from "../api/axios.js";
import {useNavigate} from "react-dom";

const AddProduct = () => {
    const [form,setForm]=useState({
        title:"",
        description:"",
        price:"",
        category:"",
        image:"",
        stock:"",
    });

    const navigate = useNavigate();

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            await api.post("/products/add",form);
            alert("Product added sucessfully !!");
            navigate("/admin/products");
        } catch (error) {
            console.log("Error adding product",error);
        }
    }

  return (
    <div className='max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md mt-10'>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className='space-y-3'>
            {
                Object.keys(form).map((key)=>{
                    return (
                        <div key={key} className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2' htmlFor={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                                type="text"
                                id={key}
                                name={key}
                                value={form[key]}
                                onChange={handleChange}
                                placeholder={key}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                    );
                })
            }
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Add Product
        </button>
        </form>
        
    </div>
  )
}

export default AddProduct
