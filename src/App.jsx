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
import { useDispatch, useSelector } from 'react-redux';
import { dogetAccountAction } from './redux/account/accountSlice';
import Loading from './components/loading';
import ErrorPage from './components/ErrorPage';
import AdminPage from './pages/admin';
import ProtectedRoute from './components/protectedRoute';

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
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)
  const getAccount = async () =>{
    if(window.location.pathname === '/login') return; // neu là trang login thì không gọi api này
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
      errorElement: <ErrorPage/>,
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
      
      path: "/admin",
      element: <Layout/>,
      errorElement: <ErrorPage/>,
      children: [
        { 
          index: true, 
          element: 
          <ProtectedRoute>
          <AdminPage /> 
          </ProtectedRoute>
          
        },

        {
          path: "user",
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
    {isAuthenticated === true || 
    window.location.pathname === '/login' ||
    window.location.pathname === '/admin'
     ?
      <RouterProvider router={router} />
      :
      <Loading/>
    }
    
      {/* <RouterProvider router={router} /> */}
    </>
  )
}
