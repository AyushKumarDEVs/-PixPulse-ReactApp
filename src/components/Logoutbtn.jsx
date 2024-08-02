import React from 'react'
import authservice from '../appwrite/auth'
import { userLogout } from '../features/authslice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Logoutbtn() {
    const dispatch=useDispatch();
    const Navigate=useNavigate();
    function onLogoutbtnClick(){
        authservice.Logout().then((data)=>{
            if(data){
                dispatch(userLogout());
                console.log("logoutsucces");
                Navigate("/home");
                
            }
        }).catch((error)=>{
          console.log("logout error :"+error)
        })
    }
  return (
    <button className='hover:text-red-700 text-lg' onClick={onLogoutbtnClick}>Logout</button>
  )
}

export default Logoutbtn