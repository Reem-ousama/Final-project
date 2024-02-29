import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import { Link } from 'react-router-dom'




export default function Cart() {
  const [data, setData] = useState([])
  const [cartPrice, setPrice] = useState([])


  let { getCart, deleteCart, updateCart, setCartNumber,clearCart } = useContext(cartContext)
  useEffect(() => {
    (async () => {
      let data = await getCart();
      console.log(data)
      setData(data.data.data.products)
      setPrice(data.data.data.totalCartPrice)

    })()
  }, [])

 async function clear(){
   let data= await clearCart()
   console.log(data)
  
    setData([null])
    setPrice(0)
    setCartNumber(0)
  
   }

  async function removeProduct(id) {
    let data = await deleteCart(id)
    setData(data.data.data.products)
    setPrice(data.data.data.totalCartPrice)
    setCartNumber(data.data.numOfCartItems)
    
  }

  async function updateProuduct(id,count) {
    if (count == 0) {
      removeProduct(id)
    }else{
      let data = await updateCart(id,count)
      setData(data.data.data.products)
      setPrice(data.data.data.totalCartPrice)
      setCartNumber(data.data.numOfCartItems)
      
    }
  }

  return (
    <>
    {data.length ?
     <div className='container'>
     <h2 className='m-4 text-success'>Shopping Cart</h2>
     <div className="row " >
       <div className="col-md-11 bg-dark-subtle shadow p-5 m-auto my-5">
         <div className='d-flex justify-content-end'>
         <button onClick={() => clear()} className='btn btn-danger '>Clear your cart</button>

         </div>
         <p className='fs-5'><span className='text-success fs-3'>Total Price : </span>{cartPrice}</p>
         {data.map((product) => {
           return <div className="row border-bottom py-5" key={product._id}>
             <div className="col-md-1">
               <img src={product.product.imageCover} alt="cover" className='w-100' />
             </div>
             <div className="col-md-11 d-flex justify-content-between align-items-center ">
               <div>
                 <h6 className=''>{product.product.title}</h6>
                 <p className=''>{product.price}</p>
                 <button onClick={() => removeProduct(product.product._id)} className='btn  text-danger'><i className='mx-2 fa-solid fa-trash-can text-danger'></i>Remove</button>
               </div>
               <div>
                 <button onClick={() => { updateProuduct(product.product._id, product.count + 1) }} className='btn btn-outline-success mx-2'>+</button>
                 <span className='mx-2'>{product.count}</span>
                 <button onClick={() => { updateProuduct(product.product._id, product.count - 1) }} className='btn btn-outline-success mx-2'>-</button>

               </div>

             </div>
           </div>
         })}
       </div>
       <Link className='text-center' to="/cheakout">
       <button className=' w-75 btn btn-outline-success text-dark my-5'>Online Payment</button>
     </Link>
     </div>

   </div>
    : 
    <h1 className='text-success'>Cart is empty..</h1>}
    
    </>
   
  )
}
