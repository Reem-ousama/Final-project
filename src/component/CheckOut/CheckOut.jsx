import axios from 'axios'
import { useFormik } from 'formik'
import React, {  useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/cartContext'



export default function CheckOut() {
let{cheackoutPayment,getCart}= useContext(cartContext)

  const [isLoading , setLoading]=useState(false)
  const [errMsg,setErr]=useState(null)
 
  const[cardId,setCardId]=useState('')
 useEffect(() => {
  (async () => {
    let data = await getCart();
    // console.log(data)
setCardId(data.data.data._id)

  })()
}, [])

async function Payment(val){
// setLoading(true)
// console.log(formik)
let data=await cheackoutPayment(cardId,val)
// let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,val).catch((err)=>{
// console.log(err.response.data.message)
// setErr(err.response.data.message)
// setLoading(false)
console.log(data)
if(data.data.status == 'success'){
  window.location=data.data.session.url
}
}
// console.log(data)
// if(data.message == 'success'){
// setLoading(false)
// }


let formik = useFormik({
initialValues:{
  details:'',
 city:'',
 phone:'',
},

onSubmit:Payment
})

return (
  <div className='my-5'>
    <h1 className='text-success text-center'>Payment Form :</h1>
    <form onSubmit={formik.handleSubmit} >
      <div className="row m-auto w-50 bg-light shadow p-4 gy-4">
       
        <div className="col-md-12">
          <label htmlFor="userEmail">details :</label>
          <input id='userEmail' type="text" name='email' value={formik.values.detals} onChange={formik.handleChange} className='form-control' />
          
        </div>
        
        <div className="col-md-12">
          <label htmlFor="usercity">City</label>
          <input id='usercity' type="text" name='city' value={formik.values.city} onChange={formik.handleChange }  className='form-control'/>
          
        </div>
        <div className="col-md-12">
          <label htmlFor="userPho">Phone :</label>
          <input id='userPho' type="tel" name='password' value={formik.values.Phone} onChange={formik.handleChange }  className='form-control'/>
          
        </div>
        
        
        <div className="col-md-12 text-end my-3">
         <button type='submit' className='btn btn-success text-light '>Pay
         {/* {isLoading ? 
         <span>
         <i className='fa-solid fa-spinner fa-spin text-light mx-2'></i>
        </span>
         : ''} */}
         
         </button>
        </div>
       
      </div>
    </form>
  </div>
)
  
         }
