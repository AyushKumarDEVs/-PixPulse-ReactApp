import React from 'react'
import Container from './container/Container'
import { useSelector } from 'react-redux'
import Logo from './Logo';
import { Link } from 'react-router-dom';
import Logoutbtn from './Logoutbtn';
function Footer() {
  const islogedin=(useSelector((state)=>state.auth)).isLogedin;
  
    const navitems=[
      {
        name:"Home",
        link:"/home",
        active:true,
      },
  
     
      {
        name:"All Posts",
        link:"/all-posts",
        active:islogedin,
      },
  
      {
        name:"Add Post",
        link:"/add-post",
        active:islogedin,
      },
  
      {
        name:"Profile",
        
        link:`/profile`,
        active:islogedin,
      },
    ]
  return (
        <nav className='flex items-center justify-center absolute bottom-0 bg-black w-full h-fit py-1  text-white text-md'>
          

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
          </ul>
        </nav>
    
  )
}

export default Footer