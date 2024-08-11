import React from 'react'
import Container from './container/Container'
import { useSelector } from 'react-redux'
import Logo from './Logo';
import { Link } from 'react-router-dom';
import Logoutbtn from './Logoutbtn';
function Header() {
  const islogedin=(useSelector((state)=>state.auth)).isLogedin;
  

  const navitems=[
  
    {
      name:"Login",
      link:"/login",
      active:!islogedin,
    },

    {
      name:"Signup",
      link:"/signup",
      active:!islogedin,
    },

  
  ]
  return (

      
        <nav className='flex items-center justify-between  bg-black w-full h-10 px-1 text-white text-md'>
          <div>
            <Link to={"/home"}>

            <Logo prop={'w-14  h-13 bg-slate-900'} />
            </Link>
          </div>

          <ul className=' flex gap-10'>
          {
              navitems.map((e)=>(
                e.active ? (
                <Link key={e.name} className='flex items-center  text-lg gap-10 hover:text-blue-900 sm:text-sm'   to={e.link}>
                  {e.name }
                </Link>
                )
                 : 
                null
                
              ))
            }
            {
              islogedin &&(
                
                  <Logoutbtn />
               
              )
            }
          </ul>
        </nav>

   
    
  )
}

export default Header