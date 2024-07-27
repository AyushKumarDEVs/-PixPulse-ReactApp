import React, { useState } from 'react'
import {useSelector} from "react-redux"
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"

function AuthLayout({childern}) {
    const Navigate=useNavigate();

    const [loader, setloader] = useState(true);
    const islogedin=useSelector((state)=>state.isLogedin);
    useEffect(()=>{
        if(islogedin){
          
        }else{
          Navigate("/login");
        }

        setloader(false);
    },[islogedin])
  return (loader? (
    <h1>Loading</h1>
  ):(
    {childern}
  ))
}

export default AuthLayout