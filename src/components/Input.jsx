import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    onchange,
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full flex flex-col '>
            {label && <label 
            className='block' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            onChange={(e)=>onchange(e)}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input