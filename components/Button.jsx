import React from 'react'

const Button = ({children,onClick,className,key}) => {
  return (
    <button onClick={onClick} className={`${className} `}>
{children}
    </button>
  )
}

export default Button
