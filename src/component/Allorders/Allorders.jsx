import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'



export default function Allorders() {
  const [orders,setOrders] = useEffect([])

  async function getAllOrders(id){
    const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' +id)
    setOrders(data)
  }

  useEffect(()=>{
    const {id} = jwtDecode(localStorage.getItem('userToken'));
  console(id)

    getAllOrders(id)
  },[])
  return (
    <>
    <h1>your orders</h1>
    {orders.map((order)=>{
      return <div className='order shadow rounded p-4 my-5'>
        <div className='d-flex align-items-center'>
          <h2 className='fw-bolder h1'>{order.id}</h2>
          <h4 className='fw-bolder text-primary mx-4'>Processing</h4>
        </div>
        <p>You have ordered {order.cartItems.length}</p>
        <div className='d-flex'>
          {order.cartItems.map((item)=>{
            return <img src={item.product.imgCover} alt="" key={item.id}  style={{width:150}}/>
          })}
        </div>
        <hr/>
        <p><strong>Total amount :</strong></p>
      </div>
    })}
    </>
  )
}

