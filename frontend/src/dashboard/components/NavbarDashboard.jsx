import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { BiLogOutCircle } from 'react-icons/bi';
import Swal from 'sweetalert2';
const NavbarDashboard = () => {

  const location = useLocation()
  const [url, setUrl] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    setUrl(location.pathname)
  }, [location])

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
      }else if(result.isDismissed){
        navigate("/dashboard/")
      }
    });
  }

  return (
    <nav className='w-full bg-slate-700 px-10 py-5'>
        <div className='flex mx-10 text-white'>
            <Link className={(url === '/dashboard') ? "text-red-600 font-bold mx-10 cursor-pointer" : "text-sky-500 font-bold mx-10 cursor-pointer"} to="/dashboard">Usuarios</Link>
            <Link className={(url === '/dashboard/productos') ? "text-red-600 font-bold mx-10 cursor-pointer" : "text-sky-500 font-bold mx-10 cursor-pointer"} to="/dashboard/productos">Productos</Link>
            {
              usuario && (
                <Link onClick={handleCerrarSesion} className='text-sky-500 font-bold mx-10 cursor-pointer' to="/ecommerce">
                  <BiLogOutCircle className='text-2xl'/>
                </Link>
              )
            }
            
        </div>
    </nav>
  )
  
}

export default NavbarDashboard