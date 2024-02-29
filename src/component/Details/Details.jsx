import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { cartContext } from '../../context/cartContext'



export default function Details() {
let {addTocart ,setCartNumber}  =  useContext(cartContext)
async function addToMyCart(id){
  let {data} = await addTocart(id);
   
  if(data.status == 'success'){
    toast.success(data.message)
    setCartNumber(data.numOfCartItems)
  }
    }


const [productDetails,setDetails]=useState(null)

let params= useParams()
let productId=params.id
// console.log(params.id)

 async function getProduct(){
let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
// console.log(data)
setDetails(data.data)
}
useEffect(()=>{
  getProduct()
})

  return (
    <div className='container my-5'>
      <div className="row">
        <div className="col-md-3">
          <img className='w-100' src={productDetails?.imageCover} alt="cover" />
        </div>
        <div className="col-md-9 d-flex flex-column justify-content-around">
          <div>
            <h2>{productDetails?.title}</h2>
            <p>{productDetails?.description}</p>
          </div>
          <div>
            <p>{productDetails?.category.name}</p>
            <div className='d-flex justify-content-between'> 
            <p className='text-success'><span>Price :</span>{productDetails?.price}</p>
            <p>{productDetails?.ratingsAverage} <i className='fa-solid fa-star text-warning'></i></p>

            </div>
            <button onClick={()=>{addToMyCart(productDetails._id)}} className='btn btn-success text-light w-100 my-3'>Add to cart</button>
          </div>
        </div>
      </div>

    </div>
  )
}
