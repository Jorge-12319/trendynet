import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es'
import { Link, useNavigate } from 'react-router-dom'
import { fetchAsyncCrearUsuarios, fetchAsyncListarUsuarios, obtenerUsuarios } from '../../store/usuarioSlice'
import Swal from 'sweetalert2'

const RegistroPagina = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
    password: "",
    role: {
      id: 2,
      name: "User"
    }
})

  const usuarios = useSelector(obtenerUsuarios)


  useEffect(() => {
        dispatch(fetchAsyncListarUsuarios())
  }, [])


  const registrarUsuario = () => {
    dispatch(fetchAsyncCrearUsuarios(usuario))
    Swal.fire('Exito', `Usuario creado Con Exito`, 'success')
    navigate('/ecommerce/iniciarsesion')
  }

  const handleChange = (e) => {
    setUsuario(
        {
            ...usuario,
            [e.target.name]: e.target.value
        }
    )

  }



  return (
    <div className='flex flex-col my-20'>

      <h2 className='text-center my-10 text-2xl font-bold'>Registro de Usuario</h2>
      <div className='flex justify-center'>


        <form className='flex flex-col' onSubmit={registrarUsuario}>

          <input value={usuario.username} onChange={handleChange} name='username' type="text" className='px-10 py-2 border-2 border-slate-500 rounded-full w-full my-10 text-center' placeholder='Ingrese su username' />
          <input value={usuario.email} onChange={handleChange} name='email' type="text" className='px-10 py-2 border-2 border-slate-500 rounded-full w-full my-10 text-center' placeholder='Ingrese su correo' />
          <input value={usuario.password} onChange={handleChange} name='password' type="password" className='px-10 py-2 border-2 border-slate-500 rounded-full w-full my-10 text-center' placeholder='Ingrese su password' />
          
          <button type='submit' className='w-[10rem] mx-auto py-3 px-1 my-10 bg-indigo-600 text-white rounded-full hover:bg-indigo-800'>Registrarse</button>
        </form>

      </div>

      <span className='text-center'>Ya tienes cuenta?
      <Link className='font-bold' to="/ecommerce/iniciarsesion">  Inicia Sesion desde Aqui</Link>
      </span>
    </div>
  )
}

export default RegistroPagina