import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const IniciarSesionPagina = () => {

  const navigate = useNavigate()

  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  })


  const [usuarios, setUsuarios] = useState([])

    // Show categories
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/users/all")
            .then(response => setUsuarios(response.data))
            .catch(error => console.log(error));
    }, []);


  const handleIniciarSesion = (e) => {
    e.preventDefault()

    
    const usuarioExiste = usuarios.find(user => user.email === usuario.email && user.password === usuario.password)
    
    console.log(usuarioExiste)

    if(usuarioExiste){
      // verificar rol admin
      if(usuarioExiste.role === "Admin"){
        sessionStorage.setItem('usuario', JSON.stringify(usuarioExiste));
        Swal.fire('Exito', `Ha iniciado Sesion Con Exito ${usuarioExiste.username}`, 'success')
        navigate("/dashboard")
      }else{
        sessionStorage.setItem('usuario', JSON.stringify(usuarioExiste));
        Swal.fire('Exito', `Ha iniciado Sesion Con Exito ${usuarioExiste.username}`, 'success')
        navigate("/ecommerce")
      }
    }else{
      Swal.fire('Error Login', 'Email o password invalidos', 'error')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='h-full flex flex-col my-[8.6rem]'>

      <h2 className='text-center my-10 text-2xl font-bold'>Iniciar Sesion</h2>
      <div className='flex justify-center'>


        <form className='flex flex-col w-[20rem]' onSubmit={handleIniciarSesion}>

          <input value={usuario.email} onChange={handleChange} name='email' type="email" className='px-10 py-2 border-2 border-slate-500 rounded-full w-full my-10 text-center' placeholder='Ingrese su correo' />
          <input value={usuario.password} onChange={handleChange} name='password' type="password" className='px-10 py-2 border-2 border-slate-500 rounded-full w-full my-10 text-center' placeholder='Ingrese su password' />

          <button type='submit' className='py-3 px-1 my-10 bg-indigo-600 text-white rounded-full hover:bg-indigo-800'>Iniciar Sesion</button>
        </form>

      </div>

      <span className='text-center'>Aun no tienes cuenta?
      <Link className='font-bold' to="/ecommerce/registro">  Registrate Aqui</Link>
      </span>
    </div>
  )
}


export default IniciarSesionPagina;
