import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { agregarAlCarrito } from '../../store/carritoSlice'
import { getProducts } from '../../store/productSlice'
import Swal from 'sweetalert2'


const PaginaProductoUnico = () => {

  const params = useParams()
  const { id } = params

  const [cantidad, setCantidad] = useState(1)

  const products = useSelector(getProducts)
  const dispatch = useDispatch()

  

  const productoEncontrado = products.find(product => product.id === Number(id));
  

  const aumentarCantidad = () => {
    setCantidad((cantidadPrevia) => {
        let tempCantidad = cantidadPrevia + 1;
        if(tempCantidad > productoEncontrado.stock){
            tempCantidad = productoEncontrado.stock
        }
        return tempCantidad;
    })
  }

  const disminuirCantidad = () => {
    setCantidad((cantidadPrevia) => {
        let tempCantidad = cantidadPrevia - 1;
        if(tempCantidad < 1){
            tempCantidad = 1
        }
        return tempCantidad;
    })
  }

  const handlerAgregarAlCarrito = (producto) => {
    const totalPrecioCarrito = cantidad * producto.price
    dispatch(agregarAlCarrito({...producto, cantidadCarrito: cantidad, totalCarrito: totalPrecioCarrito}))
    Swal.fire('Exito', 'Producto Añadido al Carrito Exitosamente', 'success')
  }

  



  return (
    <div className='w-full my-[2.2rem]'>
    
        <div className='px-10 py-10 flex flex-col items-center justify-center flex-wrap md:flex-row'>
            
            <div className='w-[27rem] py-20 md:w-[35%]'>
                <img src={productoEncontrado.url} className='w-[100rem] h-[35rem]' alt="" />
            </div>

            <div className='bg-black text-white md:h-[35rem] md:w-[40rem]'>
                <p className='mx-5 my-5 text-1xl text-green-600 font-bold'>{productoEncontrado.brand}</p>
                <h2 className='text-2xl font-bold mx-5'>{productoEncontrado.title}</h2>
                <p className='text-3xl mx-5 py-2 font-bold text-orange-600'>
                    ${productoEncontrado.price}
                </p>
                <p className='text-xl mx-5 py-4 font-bold text-sky-400'>
                    {productoEncontrado.category}
                </p>
                <p className='text-md mx-5 py-4 font-bold'>
                    {productoEncontrado.stock} Disponibles
                </p>
                <p className='text-md mx-5 py-4 font-bold'>
                    Talla: {productoEncontrado.size}
                </p>
                <p className='text-md mx-5 py-4 font-bold'>
                    Descripcion: {productoEncontrado.description}
                </p>

                <div className='text-md mx-5 py-4'>
                    <div className='flex items-center flex-wrap'>
                        <div><p className='font-bold'>Cantidad:</p></div>
                        <div className='flex my-2 mx-2'>
                        <button className='mx-1 px-10 py-2 bg-red-800 text-white text-2xl font-bold cursor-pointer no-underline' onClick={disminuirCantidad}>-</button>
                        <div className='mx-1 px-10 py-2 bg-white text-black text-2xl font-bold no-underline'>{cantidad}</div>
                        <button className='mx-1 px-10 py-2 bg-red-800 text-white text-2xl font-bold cursor-pointer no-underline' onClick={aumentarCantidad}>+</button>
                        </div>
                    </div>
                </div>
                <button onClick={() => handlerAgregarAlCarrito(productoEncontrado)} className='mx-5 my-5 text-sm py-2 px-5 bg-indigo-600 text-white hover:bg-indigo-800'>Agregar al Carrito</button>
            </div>

        </div>



    </div>
  )
}

export default PaginaProductoUnico