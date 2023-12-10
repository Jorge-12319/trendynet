import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black text-white w-full'>
        <div className='py-10 px-20'>
            <p className='text-center text-1xl font-bold md:text-2xl '>Todos los derechos Reservados &copy; {new Date().getFullYear()}</p>
        </div>
    </div>
  )
}

export default Footer