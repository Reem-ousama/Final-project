import { Component } from "react";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Layout from "./component/Layout/Layout"
import Home from "./component/Home/Home"
import Product from "./component/Products/Products"
import Brands from './component/Brands/Brands'
import Catrgories from "./component/Catrgories/Catrgories"
import Signin from "./component/Signin/Signin"
import SignUp from "./component/SignUp/SignUp"
import Notfound from "./component/Notfound/Notfound"
import Cart from "./component/Cart/Cart"
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import Details from "./component/Details/Details";
import { ToastContainer } from "react-toastify";
import Forget from "./component/forget/forget";
import ResetPassword from "./component/ResetPassword/ResetPassword";
import UserContextProvider from "./context/Tokencontext";
import CartContextProvider from "./context/cartContext";
import WishList from "./component/WishList/WishList"
import CheckOut from "./component/CheckOut/CheckOut";
import Allorders from "./component/Allorders/Allorders";


const router = createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {path:'',element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'product',element:<ProtectedRoute><Product/></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Catrgories/></ProtectedRoute>},
      {path:'cheakout',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
      {path:'allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
      {path:'whishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'details/:id',element:<ProtectedRoute><Details/></ProtectedRoute>},
      {path:'forgotpassword',element:<Forget/>},
      {path:'resetpassword',element:<ResetPassword/>},
      {path:'signin',element:<Signin/>},
      {path:'signup',element:<SignUp/>},
      {path:'*',element:<Notfound/>},
  
    ]}
  ])

export default class App extends Component{
    render(){
        return<>
        <CartContextProvider>
          <UserContextProvider>
          <RouterProvider router={router}/>
          <ToastContainer theme="colored">

          </ToastContainer>
          </UserContextProvider> 
        </CartContextProvider>
              
        </> 
    }
}