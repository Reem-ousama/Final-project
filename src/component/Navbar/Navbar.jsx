import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cartContext } from '../../context/cartContext';
import { userContext } from '../../context/Tokencontext';





export default function Navbar() {

  
let {userToken,setToken}= useContext(userContext);
let {cartNumber,getCart,setCartNumber}= useContext(cartContext)

let navigate=useNavigate()
function logout(){
  localStorage.removeItem('userToken');
  setToken(null)
  navigate('./signin')
}

useEffect(()=>{
  (async ()=>{
    let data =await getCart();
    // console.log(data.data.data.totalCartPrice)
    setCartNumber(data.data.numOfCartItems)

  })()
},[])

  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="home">
            <i className="fa-solid fa-cart-shopping text-success"></i><span className='fw-bold'>FreshCart</span></Link>

          <div className="collapse navbar-collapse m-auto " id="navbarSupportedContent">
            {userToken !== null ?
          <div className=' d-flex justify-content-center align-content-center'>
               <ul className="navbar-nav  mb-2 mb-lg-0 ">
             <li className="nav-item">
               <Link className="nav-link active" aria-current="page" to="home">Home</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link active" aria-current="page" to="product">Products</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link active" aria-current="page" to="categories">Categories</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link active" aria-current="page" to="brands">Brands</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link active" aria-current="page" to="whishlist">Wish List</Link>
             </li>
             <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="allorders">Orders</Link>
              </li>

           </ul>
          </div>
            :''}
            

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
             
              {userToken == null ?
              <>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="signUp">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="signin">Login</Link>
              </li></>
              :''}
             {userToken !== null ? 
             <>
             <li className="nav-item d-flex align-items-center">
              <i className='fa-brands fa-facebook mx-3'></i>
              <i className='fa-brands fa-twitter mx-3'></i>
              <i className='fa-brands fa-instagram mx-3'></i>
              <i className='fa-brands fa-linkedin mx-3'></i>
            </li>
              <li className="nav-item">
               <Link className="nav-link active" aria-current="page" to="cart">
                <i className='fa-solid fa-shopping-cart text-success'></i>
                <span className='badge bg-success text-light mx-2'>{cartNumber}</span>
               </Link>
             </li>
              <li onClick={()=>(logout())} className="nav-item">
              <Link  className="nav-link active" aria-current="product" >Logout</Link>
            </li>
            
             </>
            :''}

            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}
