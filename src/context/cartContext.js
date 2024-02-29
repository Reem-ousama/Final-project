import axios from "axios";
import { createContext, useState } from "react";

export let cartContext =createContext()

export default function CartContextProvider(props){
 const [cartNumber,setCartNumber] = useState(0)

let BaseUrl =`https://ecommerce.routemisr.com`;
let headers={
    token:localStorage.getItem('userToken')
}
function addTocart(id){
    return axios.post(`${BaseUrl}/api/v1/cart`,
    {
    productId:id
    },
    {
     headers:headers
    }
    )
}

function getCart(){
    return axios.get(`${BaseUrl}/api/v1/cart`,
    {
     headers:headers
    }
    )
   
}

function updateCart(id,count){
    return axios.put(`${BaseUrl}/api/v1/cart/${id}`,
    {
    count:count
    },
    {
     headers:headers
    }
    )
}
function deleteCart(id){
    return axios.delete(`${BaseUrl}/api/v1/cart/${id}`,
   
    {
     headers:headers
    }
    )
}
function clearCart(){
    return axios.delete(`${BaseUrl}/api/v1/car1`,
    {
    headers:headers
    }
    )
}

function addToWishlist(id){
    return axios.post(`${BaseUrl}/api/v1/wishlist`,
    {
    productId:id
    },
    {
     headers:headers
    }
    )
}
function getWish(){
    return axios.get(`${BaseUrl}/api/v1/wishlist`,
   
    {
     headers:headers
    }
    )
}

function cheackoutPayment(id, formData){
    return axios.post(`${BaseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
    {
        shippingAddress:formData
    },   
    {
     headers:headers
    }
    )
}
    return <cartContext.Provider value={{cheackoutPayment,clearCart,addTocart, setCartNumber,cartNumber,getWish,addToWishlist,getCart,deleteCart,updateCart}}>
        {props.children}
    </cartContext.Provider>
}