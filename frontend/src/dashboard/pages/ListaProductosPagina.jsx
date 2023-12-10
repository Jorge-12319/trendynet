import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAsyncDeleteProduct, fetchAsyncfindAllProducts, getProducts, getProductsStatus } from '../../store/productSlice'
import Swal from 'sweetalert2'
import { STATUS } from '../../utils/status'

const ListaProductosPagina = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAsyncfindAllProducts())
  }, [])

  const products = useSelector(getProducts)
  const productsStatus = useSelector(getProductsStatus)

  const handleDeleteProduct = (id) => {

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
        dispatch(fetchAsyncDeleteProduct(id))
        Swal.fire({
          title: "Eliminado!",
          text: "Producto ha sido eliminado exitosamente.",
          icon: "success"
        });
      }
    });
  } 


  
  /*       
  if (!products || products.length === 0) {
    return (
        <div className='flex justify-center items-center h-full my-[380px]'>
            <img src="Loading.gif" alt="" />
        </div>
    )
  }*/


  return (
    <div>


    <div>
        <h3 className='font-bold my-3 text-2xl text-center'>Lista de Ropas</h3>
      
       {productsStatus === STATUS.LOADING ?
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
              Titulo
              </th>
              <th scope="col" className="px-6 py-3">
              Descripcion
              </th>
              <th scope="col" className="px-6 py-3">
              Categoria
              </th>
              <th scope="col" className="px-6 py-3">
              Marca
              </th>
              <th scope="col" className="px-6 py-3">
              Talla
              </th>
              <th scope="col" className="px-6 py-3">
              color
              </th>
              <th scope="col" className="px-6 py-3">
              Imagen
              </th>
              <th scope="col" className="px-6 py-3">
              Genero
              </th>
              <th scope="col" className="px-6 py-3">
              Precio
              </th>
              <th scope="col" className="px-6 py-3">
              Stock
              </th>
              <th scope="col" className="px-6 py-3">
              Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
            products.map((product) => (
              <tr className="bg-white border-b dark:bg-gray-800 border-gray-700" key={product.id}>
                <th scope="row" className="px-6 py-4 font-medium text-white">
                  {product.id}
                </th>
                <td className="px-6 py-4">
                  {product.title}
                </td>
                <td className="px-6 py-4">
                  {product.description}
                </td>
                <td className="px-6 py-4">
                  {product.category}
                </td>
                <td className="px-6 py-4">
                  {product.brand}
                </td>
                <td className="px-6 py-4">
                  {product.size}
                </td>
                <td className="px-6 py-4">
                  {product.colour}
                </td>
                <td className="px-6 py-4">
                  <img src={`${product.url}?${Date.now()}`} className='w-20 h-20' alt=""/>
                </td>
                <td className="px-6 py-4">
                  {product.genre}
                </td>
                <td className="px-6 py-4">
                  {product.price}
                </td>
                <td className="px-6 py-4">
                  {product.stock}
                </td>
                <td className="px-6 py-4">
                <button type='button' onClick={() => handleDeleteProduct(product.id)} className='text-xs bg-red-400 text-white my-2 mx-2 px-4 py-2 rounded-md hover:bg-red-700'>Eliminar</button>
                  <Link to={`/dashboard/productos/editar/${product.id}`} className='text-xs bg-green-400 text-white my-2 mx-2 px-4 py-2 rounded-md hover:bg-green-700 sm:px-4'>Actualizar</Link>
                </td>

              </tr>

            ))}

          </tbody>
        </table>
      </div>

        <div className='my-10'>
          {(products.length === 0 && productsStatus === STATUS.SUCCEEDED) && <div className='my-40 text-center font-bold text-2xl'>No hay productos Aun</div> }
            <Link to="/dashboard/productos/crear" className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 mb-2'>Crear un Producto</Link>
        </div>
        </>
        }
    </div>
    </div>
  )

  

}

export default ListaProductosPagina