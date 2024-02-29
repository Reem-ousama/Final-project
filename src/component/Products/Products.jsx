import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { cartContext } from '../../context/cartContext';





export default function Products() {

  


let {addTocart,setCartNumber,addToWishlist}=  useContext(cartContext)

  const [productList, setProduct] = useState([])

  async function getProducts() {

    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    // console.log(data.data)
    setProduct(data.data)
  }

 async function addToMyCart(id){
let {data} = await addTocart(id);
// console.log(data)
 
if(data.status == 'success'){
  toast.success(data.message)
  setCartNumber(data.numOfCartItems)
}else{}
}

async function addToWhish(id){
let {data} = await addToWishlist(id);
// document.querySelector('.love-icon').classList.add('text-danger')
// document.querySelector('.love-icon').classList.remove('text-muted')
  toast.success(data.message)
  setCartNumber(data.numOfCartItems)

}
function colorOfHeart(id,e){
  e.target.classList.replace("text-muted","text-danger")
}

  useEffect(() => {
    getProducts()
  }, [])


  return (
    <div className='row'>
      <input className='form-control mt-5 searchInput' placeholder='search' type="text" name="" id="" />
      {productList.length > 0 ?
        <>
          {productList.map((product) => {
            return <div className='col-md-3' key={product._id}>
              <div className="product p-5">
                <Link className= 'text-dark text-decoration-none' to={`/details/${product._id}`}>
                <img src={product.imageCover} className='w-100' alt={product.title} />
                <p className='text-success'>{product.category.name}</p>
                <h6>{product.title}</h6>
                <div className='d-flex justify-content-between'>
                  <p>{product.price} EGP</p>
                  <p>{product.ratingsAverage}<i className='fa-solid fa-star text-warning'></i></p>
                </div>
                </Link>
                
                <button onClick={()=>{addToMyCart(product._id)}} className='btn btn1 bg-success text-light w-100'>Add to cart</button>
                <button onClick={()=>{addToWhish(product._id)}} className='btn btnw float-end  text-muted'><i onClick={(e)=> colorOfHeart(e , product._id)} className="fa-solid fa-heart fs-4 love-icon"></i></button>
              </div>
            </div>
          })}
        </>
        :

       <div className=" vh-100 d-flex justify-content-center align-items-center">
         <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
       </div>
      }


    </div>
  )
}
