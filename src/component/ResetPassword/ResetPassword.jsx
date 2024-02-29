import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
// import { useNavigate } from 'react-router-dom'


export default function ResetPassword() {
  // let navigate = useNavigate
async function ResetPasswordd(values){
    let {data}=await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
    console.log(data)
    if(data.token){
      // navigate("/signin")
      window.location=('/signin')
    }
  }

  let formik=useFormik({
    initialValues:{
      email:'',
      newPassword:''
    },
    onSubmit:ResetPasswordd
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='w-75 my-5 m-auto'> 
        <label>email:</label>
        <input className='form-control' type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email" value={formik.values.email} />
        <label htmlFor='newpassword'>new Password:</label>
        <input className='form-control' type='password' onChange={formik.handleChange} onBlur={formik.handleBlur}  name="password" id="newpassword"  value={formik.values.password}/>
        <button type='submit' className='btn bg-success text-light my-3 '>Reset Password</button>
      </form>
    </div>
  )
}
