import  { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import Contact from './components/contact';
import BookPage from './components/books';

import { Outlet } from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import RegisterPage from './pages/register';
import { callFetchAccount } from './services/api.service';
import { useDispatch } from 'react-redux';
import { dogetAccountAction } from './redux/account/accountSlice';

const Layout = () =>{
  return (
    <div className='layout-app'>      
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default function App() {
  const dispatch = useDispatch();
  const getAccount = async () =>{
    const res = await callFetchAccount()
    if(res && res.data){
      dispatch(dogetAccountAction(res.data))
    }
  }
  useEffect(()=>{
    getAccount();


  },[])
  const router = createBrowserRouter([
    {
      
      path: "/",
      element: <Layout/>,
      errorElement: <>404 not found</>,
      children: [
        { index: true, element: <Home /> },

        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "books",
          element: <BookPage />,
        }
      ],
  
    },
    {
      path: "/login",
      element: <LoginPage/>,
      
  
    },
    {
      path: "/register",
      element: <RegisterPage/>,
      
  
    },
  ]);
  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}
