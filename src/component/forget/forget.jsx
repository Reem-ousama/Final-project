import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigation } from 'react-router-dom'
import * as Yup from 'yup'


export default function Forget() {
 
  let validationShema= Yup.object({
    email:Yup.string().required('email is required').email('enter a valid email')

  })

async function SendCode(values){
let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
console.log(data)
if(data.statusMsg == 'success'){
document.querySelector('.forgotpassword').classList.add('d-none')
document.querySelector('.verfiyCode').classList.remove('d-none')
}
}
let formik=  useFormik({
  initialValues:{
    email:''
  },
  validationSchema:validationShema,
  onSubmit:SendCode
})
  let validationShema2= Yup.object({
    resetCode:Yup.string().required('email is required')

  })

let navigate=useNavigation

async function SendData(values){
let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
console.log(data)
if(data.status == 'Success'){
// navigate('/resetpassword')
window.location="/resetpassword"
}
}
let verfiyFormik=  useFormik({
  initialValues:{
    resetCode:''
  },
  validationSchema:validationShema2,
  onSubmit:SendData
})

  return (
   <>
    <div className='forgotpassword'>
      <h3>Resate Password</h3>
      <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-5'> 
        <label>email:</label>
        <input onBlur={formik.handleBlur} type="email" value={formik.values.email} onChange={formik.handleChange} name="email" id="email" className='form-control' />
        {formik.touched.email && formik.errors.email ? <p className='text-danger my-3'>{formik.errors.email}</p> :''}
        <button  type='submit' className='btn bg-success text-light my-3'>Send Code</button>
      </form>
    </div>
   
    <div className='verfiyCode d-none'>
      <h3>VerfiyCode</h3>
      <form onSubmit={verfiyFormik.handleSubmit} className='w-75 mx-auto my-5'> 
        <label className='my-3'> Enter your Code:</label>
        <input onBlur={verfiyFormik.handleBlur} type="text" value={verfiyFormik.values.resetCode} onChange={verfiyFormik.handleChange} name="resetCode" id="resetCode" className='form-control' />
        {/* {verfiyFormik.touched.resetCode && verfiyFormik.errors.resetCode ? <p className='text-danger my-3'>{verfiyFormik.errors.resetCode}</p> :''} */}
        <button  type='submit' className='btn bg-success text-light my-3'>Verify Code</button>
      </form>
    </div>
    </>
  )
}
