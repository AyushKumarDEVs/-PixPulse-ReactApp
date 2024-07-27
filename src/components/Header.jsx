import React from 'react'
import Container from './container/Container'
import { useSelector } from 'react-redux'
import Logo from './Logo';
import { Link } from 'react-router-dom';
import Logoutbtn from './Logoutbtn';
function Header() {
  const islogedin=useSelector((state)=>state.isLogedin);

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

    <header>
      
        <nav className='flex items-center justify-between px-2  bg-black w-full h-header  text-white text-md'>
          <div>
            <Link to={"/home"}>

            <Logo prop={'w-14  h-13 bg-slate-900'} />
            </Link>
          </div>

          <ul className=' flex gap-10'>
          {
              navitems.map((e)=>(
                e.active ? (
                <Link key={e.name} className='flex items-center gap-10 hover:text-blue-900'   to={e.link}>
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

    </header>
    
  )
}

export default Header