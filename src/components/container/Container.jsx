import React from 'react'

function Container({children}) {
  return (
    <div className='w-full h-full  flex justify-center items-center flex-col mb-16 '>{children}</div>
  )
}

export default Container