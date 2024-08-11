import React from 'react'

function Container({children}) {
  return (
    <div className='w-full h-full  flex justify-center overflow-y-scroll items-center flex-col '>{children}</div>
  )
}

export default Container