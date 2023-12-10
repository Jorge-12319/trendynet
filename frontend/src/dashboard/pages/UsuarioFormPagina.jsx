import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncActualizarUsuarios, fetchAsyncCrearUsuarios, fetchAsyncListarUsuarios, obtenerUsuarios } from '../../store/usuarioSlice'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UsuarioFormPagina = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const [usuario, setUsuario] = useState({
        username: "",
        email: "",
        password: "",
        role: null
    })

    const [roles, setRoles] = useState([])

     // Show roles
     useEffect(() => {
        axios.get("http://localhost:8080/api/v1/roles")
            .then(response => setRoles(response.data))
            .catch(error => console.log(error));
    }, []);

    

    const usuarios = useSelector(obtenerUsuarios)

    useEffect(() => {
        if(params.id){
            const usuarioEncontrado = usuarios.find((usuario) => usuario.id === Number(params.id))

            if(usuarioEncontrado){
                const {username, email, role} = usuarioEncontrado

                setUsuario({...usuario,
                    username,
                    email,
                    password: "",
                    role: (role==="Admin")?"1":"2"               
                })
            }else{
                console.log("No se encontro el usuario")
            }

            
            

        }
    }, [])


    const handleChange = (e) => {
        setUsuario(
            {
                ...usuario,
                [e.target.name]: e.target.value
            }
        )
        //console.log(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(params.id){
            let usuarioActualizado = {
                ...usuario,
                role: {
                    id: (usuario.role === "1") ? Number(1) : Number(2),
                    name: (usuario.role === "1") ? "Admin" : "User"
                }
            };
            
            dispatch(fetchAsyncActualizarUsuarios({usuario: usuarioActualizado, id: params.id}));
        }else{
            dispatch(fetchAsyncCrearUsuarios({
                ...usuario,
                role: {
                  id: (usuario.role === 1) ? Number(1) : Number(2),
                  name: (usuario.role === 1) ? "Admin" : "User"
                }
              }))
        }
        


        navigate("/dashboard")

    }


    return (
        <>

            <h2 className='my-10 text-center text-3xl font-bold'>Gestion de Usuarios</h2>

            <div className='flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='flex flex-col bg-slate-800 px-7 py-7 w-[20rem] rounded-md'>

                    <input
                        className='px-10 py-3 mb-5 rounded-md'
                        type="text"
                        name="username"
                        placeholder='Ingrese su username'
                        onChange={handleChange}
                        value={usuario.username}
                    />

                    <input
                        className='px-10 py-3 mb-5 rounded-md'
                        type="text"
                        name="email"
                        placeholder='Ingrese su correo'
                        onChange={handleChange}
                        value={usuario.email}
                    />


                    <input className='px-10 py-3 mb-5 rounded-md'
                        type="password"
                        name="password"
                        placeholder='Ingrese su password'
                        onChange={handleChange}
                        value={usuario.password}
                    />

                    <div className='pb-7 flex flex-col'>
                        <label htmlFor="role" className='mr-5 mb-5 text-white'>Ingrese el tipo de rol: </label>
                        <select onChange={handleChange} name="role" value={usuario.role !== null ? usuario.role : 'DEFAULT'} id="role" className='bg-slate-700 text-white border border-black px-7 py-2 rounded-md focus:border-blue-500'>
                            <option value="DEFAULT" disabled="disabled">-Ingrese un Rol:</option>

                            { roles.map(role => (
                            <option key={role.id} className='font-bold' value={role.id}>{role.name}</option>
                            ))}


                        </select>
                    </div>

                    <button className='px-10 py-3 bg-sky-400 hover:bg-sky-700 text-white rounded-md' type='submit'>{params.id? "Actualizar" : "Crear"} Usuario</button>

                </form>
            </div>
        </>
    )
}

export default UsuarioFormPagina