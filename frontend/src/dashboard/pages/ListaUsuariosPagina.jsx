import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncEliminarUsuarios, fetchAsyncListarUsuarios, obtenerUsuarios, obtenerUsuariosEstados } from '../../store/usuarioSlice'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { STATUS } from '../../utils/status'

const ListaUsuariosPagina = () => {

  const usuarios = useSelector(obtenerUsuarios)
  const usuariosStates = useSelector(obtenerUsuariosEstados)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchAsyncListarUsuarios())
  }, [])

  const handleBorrar = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No seras capaz de revertirlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(fetchAsyncEliminarUsuarios(id))
        Swal.fire({
          title: "Eliminado!",
          text: "Usuario ha sido eliminado exitosamente.",
          icon: "success"
        });
      }
    });
  }

  const handleGenerateReport = async (format) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/reports/user-report/${format}`, {
        responseType: 'arraybuffer', // Important for binary data
      });
  
      const blob = new Blob([response.data], { type: `application/${format}` });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `user-report.${format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error al generar el informe ${format}:`, error);
    }
  };

  return (
    <div className='w-full px-5'>

      <h3 className='font-bold text-2xl mt-5 mb-5'>Lista de Usuarios</h3>

      {usuariosStates === STATUS.LOADING ?
              <div role="status" className='w-full h-[25rem] flex justify-center items-center'>
                  <svg aria-hidden="true" className="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div>
        :
        <>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr className="bg-white border-b dark:bg-gray-800 border-gray-700" key={usuario.id}>
                <th scope="row" className="px-6 py-4 font-medium text-white">
                  {usuario.id}
                </th>
                <td className="px-6 py-4">
                  {usuario.email}
                </td>
                <td className="px-6 py-4">
                  {usuario.username}
                </td>
                <td className="px-6 py-4">
                  {usuario.role}
                </td>
                <td className="px-6 py-4">
                  <Link to={`/dashboard/editar/${usuario.id}`} className='text-xs bg-green-400 text-white my-2 mx-2 px-4 py-2 rounded-md hover:bg-green-700 sm:px-4'>Editar</Link>
                 <button onClick={() => handleBorrar(usuario.id)} type='button' className='text-xs bg-red-400 text-white my-2 mx-2 px-4 py-2 rounded-md hover:bg-red-700'>Eliminar</button>
                </td>

              </tr>

            ))}

          </tbody>
        </table>
      </div>

      <button type='button' onClick={() => handleGenerateReport("pdf")} className='my-2 px-10 py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-800'>GENERAR REPORTE PDF</button>
      <button type='button' onClick={() => handleGenerateReport("xlsx")} className='my-2 px-10 py-3 font-bold text-white bg-green-600 hover:bg-green-800'>GENERAR REPORTE EXCEL</button>




      <div className='my-10'>
        {(usuarios.length === 0 && usuariosStates === STATUS.SUCCEEDED) && <div className='my-40 text-center font-bold text-2xl'>No hay usuarios Aun</div>}
        <Link to="/dashboard/crear" className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'>Crear un Usuario</Link>
      </div>
      </>
  }
    </div>
  )
}

export default ListaUsuariosPagina