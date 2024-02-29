import React from 'react'
import img from '../../assets/img/error.svg'
export default function Notfound() {
  return (
    <div className='py-4 text-center'>
      <h1 className='text-success my-5'>Not found page!</h1>
      <img src={img} alt="" />
    </div>
  )
}
