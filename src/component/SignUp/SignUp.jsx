import axios from 'axios'
import { useFormik } from 'formik'
// import * as Yup from 'yup'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {

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
  
  if(!values.name){
    errors.name='name is requierd'
  }else if(values.name.length < 3){
    errors.name='minlength 3'
  }else if(values.name.length > 10){
    errors.name='max length is 10 char'
  }

  if(!values.phone){
    errors.phone='Phone is requierd'
  }else if(!/^01[1250][0-9]{8}$/.test(values.phone)){
    errors.phone='Enter avalied phone number'
  }

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

  if (!values.rePassword) {
    errors.rePassword = 'Confirm password is Required';
  } else if (values.password !== values.rePassword) {
    errors.rePassword = 'Not match';
  }


  return errors
}

async function Signup(val){
setLoading(true)
  // console.log(formik)
let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',val).catch((err)=>{
  console.log(err.response.data.message)
  setErr(err.response.data.message)
  setLoading(false)
})
console.log(data)
if(data.message == 'success'){
navigate('/signin')
setLoading(false)
}
}

let formik = useFormik({
  initialValues:{
    name:'',
    email:'email@yahoo.com',
    password:'',
    rePassword:'',
    phone:''
  },
  validate ,
  // validationSchema:validationSchema,
  onSubmit:Signup
})

  return (
    <div className='my-5'>
      <h1 className='text-success text-center'>Register Form</h1>
      <form onSubmit={formik.handleSubmit} >
        <div className="row m-auto w-50 bg-light shadow p-4 gy-4">
          <div className="col-md-12">
            <label htmlFor="userName">name</label>
            <input id='userName' type="text" name='name' className='form-control' onBlur={formik.handleBlur}  onChange={formik.handleChange} />
            {formik.errors.name && formik.touched.name?
          <p className='text-danger'>{formik.errors.name}</p> : ''  
          }
          </div>
          <div className="col-md-12">
            <label htmlFor="userEmail">email</label>
            <input id='userEmail' type="email" name='email' className='form-control' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
            {formik.errors.email && formik.touched.email?
            <p className='text-danger'>{formik.errors.email}</p> :''
          }
          </div>
          <div className="col-md-12">
            <label htmlFor="userPhone">phone</label>
            <input id='userPhone' type="tel" name='phone' className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.errors.phone && formik.touched.phone?
            <p className='text-danger'>{formik.errors.phone}</p> :''
          }
          </div>
          <div className="col-md-12">
            <label htmlFor="userPassword">password</label>
            <input id='userPassword' type="password" name='password' className='form-control' onBlur={formik.handleBlur}  onChange={formik.handleChange}/>
            {formik.errors.password && formik.touched.password?
            <p className='text-danger'>{formik.errors.password}</p> :''
          }
          </div>
          <div className="col-md-12">
            <label htmlFor="userConfirm">rePassword</label>
            <input id='userConfirm' type="password" name='rePassword' className='form-control' onBlur={formik.handleBlur}  onChange={formik.handleChange}/>
            {formik.errors.rePassword && formik.touched.rePassword?
            <p className='text-danger'>{formik.errors.rePassword}</p> :''
          }
          </div>
          {errMsg !== null ?
          <p className='text-danger'>{errMsg}</p>
          : ''}
          <div className="col-md-12 text-end my-3">
           <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn btn-success text-light '>Register
           {isLoading ? 
           <span>
           <i className='fa-solid fa-spinner fa-spin text-light mx-2'></i>
          </span>
           : ''}
           
           </button>
          </div>
          <p className='text-muted'>I have an account <Link to="/signin" className=' fw-bold text-success'>Login</Link> </p>
        </div>
      </form>
    </div>
  )
}
