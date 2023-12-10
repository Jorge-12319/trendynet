import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { AiOutlineShoppingCart, AiOutlineLogin } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { obtenerCarrito } from '../../store/carritoSlice';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Swal from 'sweetalert2';


export const NavbarEcommerce = () => {

  const location = useLocation()
  const [url, setUrl] = useState(null)
  const carrito = useSelector(obtenerCarrito)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  //Verificar sesion de usuario
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));

  const handleCerrarSesion = () => {

    Swal.fire({
      title: "Estas seguro?",
      text: "Desea cerrar sesion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cerrar sesion!"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('usuario');
        Swal.fire({
          title: "Cerrar Sesion!",
          text: "Ha cerrado la sesion con exito.",
          icon: "success"
        });
        navigate("/ecommerce/iniciarsesion")
      }
    });
  }

  useEffect(() => {
    setUrl(location.pathname)
  }, [location])


  const handleMenu = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
<nav className="w-full bg-slate-900">
  <div className="flex items-center justify-around py-5">
    <NavLink to='/ecommerce' className="flex items-center">
        <img src="logo.svg" className="h-8 mr-3" alt="" />
        <span className="text-white text-2xl">TrendyNet</span>
    </NavLink>

    <div className="hidden md:block">
      <ul className="flex items-center items-center px-2">
        <li className='px-5 font-bold text-1xl'>
          <NavLink to='/ecommerce' 
          className={(url === '/ecommerce') ? "text-red-600" : "text-sky-500"}
          aria-current="page">Home</NavLink>
        </li>
        <li className='px-5 font-bold text-1xl'>
          <NavLink to='/ecommerce/nosotros'
          className={(url === '/ecommerce/nosotros') ? "text-red-600" : "text-sky-500"}
          >Sobre Nosotros</NavLink>
        </li>
        <li className='px-5 font-bold text-1xl'>
          <NavLink to='/ecommerce/productos' 
          className={(url === '/ecommerce/productos') ? "text-red-600" : "text-sky-500"}
          >Productos</NavLink>
        </li>
        <li className='px-5 font-bold text-1xl'>
        <NavLink to='/ecommerce/contactenos' 
          className={(url === '/ecommerce/contactenos') ? "text-red-600" : "text-sky-500"}
          >Contactenos</NavLink>
        </li>
        <li className='px-5 font-bold text-1xl'>
          {
            usuario?
            <NavLink onClick={handleCerrarSesion} className="text-sky-500" to="/ecommerce">
                  <BiLogOutCircle className='text-2xl'/>
            </NavLink>
            :
              <NavLink to='/ecommerce/iniciarsesion' 
              className={(url === '/ecommerce/iniciarsesion') ? "text-red-600" : "text-sky-500"}
              ><AiOutlineLogin className='text-2xl'/></NavLink>
          }

        </li>
        <li className='px-5 font-bold text-1xl'>
        <NavLink to='/ecommerce/carrito' 
          className={(url === '/ecommerce/carrito') ? "text-red-600" : "text-sky-500"}
          ><AiOutlineShoppingCart className='text-3xl mx-3'/><p className='absolute rounded-full px-1 bg-white top-4 right-45 z-50 text-black'>{carrito.length}</p></NavLink>
        </li>
      </ul>
    </div>

    {/* hamburguer button */}
    <div className='mr-2 flex md:hidden'>
          <button onClick={handleMenu} type='button' className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white'>
            {open == true ? <IoMdClose /> : <GiHamburgerMenu />}
          </button>
    </div>
  </div>
</nav>
<div>
    {/* Mobile */}
    { open == true && (
      <div className="w-full bg-slate-600 md:hidden">
      <ul className="h-[20rem] flex flex-col justify-around items-center px-2">
        <li className='px-5 font-bold text-1xl'>
          <NavLink to='/ecommerce' 
          className={(url === '/ecommerce') ? "text-red-600" : "text-sky-500"}
          aria-current="page">Home</NavLink>
        </li>
        <li className='px-5 font-bold text-1xl'>
          <NavLink to='/ecommerce/nosotros'
          className={(url === '/ecommerce/nosotros') ? "text-red-600" : "text-sky-500"}
          >Sobre Nosotros</NavLink>
        </li>
        <li className='px-5 font-bold text-1xl'>
          <NavLink to='/ecommerce/productos' 
          className={(url === '/ecommerce/productos') ? "text-red-600" : "text-sky-500"}
          >Productos</NavLink>
        </li>
        <li className='px-5 font-bold text-1xl'>
        <NavLink to='/ecommerce/contactenos' 
          className={(url === '/ecommerce/contactenos') ? "text-red-600" : "text-sky-500"}
          >Contactenos</NavLink>
        </li>
        <li className='px-5 font-bold text-1xl'>
          {
            usuario?
            <NavLink onClick={handleCerrarSesion} className="text-sky-500" to="/ecommerce">
                  <BiLogOutCircle className='text-2xl'/>
            </NavLink>
            :
              <NavLink to='/ecommerce/iniciarsesion' 
              className={(url === '/ecommerce/iniciarsesion') ? "text-red-600" : "text-sky-500"}
              ><AiOutlineLogin className='text-2xl'/></NavLink>
          }

        </li>
        <li className='px-5 font-bold text-1xl'>
        <NavLink to='/ecommerce/carrito' 
          className={(url === '/ecommerce/carrito') ? "text-red-600" : "text-sky-500"}
          ><AiOutlineShoppingCart className='text-3xl mx-3'/><p className='absolute rounded-full px-1 bg-white top-[21.5rem] right-50 z-50 text-black'>{carrito.length}</p></NavLink>
        </li>
      </ul>
      </div>
    )}
</div>
</>

  )
}
