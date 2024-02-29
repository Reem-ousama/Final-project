import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify'
import { ColorRing } from 'react-loader-spinner'




export default function Cart() {
  const [data, setData] = useState([])
  const [cartPrice, setPrice] = useState([])
  let { getWish, deleteCart, addTocart, setCartNumber } = useContext(cartContext)

  useEffect(() => {
    (async () => {
      let data = await getWish();
      console.log(data)
      setData(data.data.data.products)
      setPrice(data.data.data.totalCartPrice)

    })()
  }, [])

  if(!data){
    return <div className=" vh-100 d-flex justify-content-center align-items-center">
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

  

  async function removeProduct(id) {
    let data = await deleteCart(id)
    setData(data.data.data.products)
    setPrice(data.data.data.totalCartPrice)
    setCartNumber(data.data.numOfCartItems)
  }

  async function addToMyCart(id) {
    let { data } = await addTocart(id);

    if (data.status == 'success') {
      toast.success(data.message)
      setCartNumber(data.numOfCartItems)
    }
  }
  return (
    <div className='container'>
      <h2 className='m-4 text-success'>Shopping Cart</h2>
      <div className="row " >
        <div className="col-md-11 bg-dark-subtle shadow p-5 m-auto my-5">
          <p className='fs-5'><span className='text-success fs-3'>Total Price : </span>{cartPrice}</p>


          {data.map((product) => {
            return <div className="row border-bottom py-5" key={product._id}>
              <div className="col-md-1">
                <img src={product.imageCover} alt="cover" className='w-100' />
              </div>
              <div className="col-md-11 d-flex justify-content-between align-items-center ">
                <div>
                  <h6 className=''>{product.product.title}</h6>
                  <p className=''>{product.price}</p>
                  <button onClick={() => removeProduct(product.product._id)} className='btn btn-outline-danger'><i className='mx-2 fa-regular fa-trash-can'></i>Remove</button>
                </div>
                <button onClick={() => { addToMyCart(product._id) }} className='btn btn1 bg-success text-light w-100'>Add to cart</button>

              </div>
            </div>
          })}
        </div>
      </div>

    </div>
  )
}
