import React from 'react'

function Container({children}) {
  return (
    <div className='w-screen h-full  flex justify-center items-center flex-col  '>{children}</div>
  )
}

export default Container