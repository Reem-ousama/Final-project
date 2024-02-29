import axios from 'axios'
import { useFormik } from 'formik'
// import * as Yup from 'yup'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/Tokencontext'


export default function Signin() {

let {userToken,setToken}=  useContext(userContext)

  const [isLoading , setLoading]=useState(false)
  const [errMsg,setErr]=useState(null)

let navigate = useNavigate()
  // let validationSchema= Yup.object({
  //   name:Yup.string().min(3,'minlength is 3 char').max(15,'maxlength is 15 char').required('Name is Reqired'),
  //   email:Yup.string().required('email is Required').email('enter avalid email'),
  //   phone:Yup.string().required('phone is Required').match(/^01[1250][0-9]{8}$/,'phone is Required'),
  //   password:Yup.string().required('password is Required').matches(/^[A-Z][a-z0-9]{6,8}$/,'enter avalid password'),
  //   rePassword:Yup.string().required('confirm is Required').oneOf(([Yup.ref('password')],'not mutch'))
  // })

function validate(values){
  let errors={}
  
  

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (!/^[A-Z][a-z0-9]{6,8}$/.test(values.password)) {
    errors.password = 'Invalid Password';
  }



  return errors
}

async function Signin(val){
setLoading(true)
  // console.log(formik)
let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',val).catch((err)=>{
  console.log(err.response.data.message)
  setErr(err.response.data.message)
  setLoading(false)
})
console.log(data)
if(data.message == 'success'){
navigate('/home')
localStorage.setItem('userToken',data.token)
setToken(data.token)
setLoading(false)
}
}

let formik = useFormik({
  initialValues:{
    email:'email@yahoo.com',
    password:'',
  },
  validate ,
  // validationSchema:validationSchema,
  onSubmit:Signin
})

  return (
    <div className='my-5'>
      <h1 className='text-success text-center'>Login Form</h1>
      <form onSubmit={formik.handleSubmit} >
        <div className="row m-auto w-50 bg-light shadow p-4 gy-4">
         
          <div className="col-md-12">
            <label htmlFor="userEmail">email</label>
            <input id='userEmail' type="email" name='email' className='form-control' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
            {formik.errors.email && formik.touched.email?
            <p className='text-danger'>{formik.errors.email}</p> :''
          }
          </div>
          
          <div className="col-md-12">
            <label htmlFor="userPassword">password</label>
            <input id='userPassword' type="password" name='password' className='form-control' onBlur={formik.handleBlur}  onChange={formik.handleChange}/>
            {formik.errors.password && formik.touched.password?
            <p className='text-danger'>{formik.errors.password}</p> :''
          }
          </div>
          
          {errMsg !== null ?
          <p className='text-danger'>{errMsg}</p>
          : ''}
          <div className="col-md-12 text-end my-3">
           <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn btn-success text-light '>Login
           {isLoading ? 
           <span>
           <i className='fa-solid fa-spinner fa-spin text-light mx-2'></i>
          </span>
           : ''}
           
           </button>
          </div>
          <p className='text-muted'>Dont have an account ? <Link to='/signup' className=' fw-bold text-success'>Register now..</Link> </p>
          <p className='text-muted'>Dont have an account ? <Link to='/forgotpassword' className=' fw-bold text-success'>Forgot password?</Link> </p>
        </div>
      </form>
    </div>
  )
}
