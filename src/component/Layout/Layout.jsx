import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "./../Navbar/Navbar"
import { userContext } from '../../context/Tokencontext'


export default function Layout() {

  let {setToken}=useContext(userContext)
  useEffect(()=>{
if(localStorage.getItem('userToken') !== null){
  setToken(localStorage.getItem('userToken'))
}
  },[])

  return (
    <div>
        <Navbar/>
      <div className="container">
      <Outlet/>
      </div>
    </div>
  )
}
