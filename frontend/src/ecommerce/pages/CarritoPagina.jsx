import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementarCantidad, eliminarDelCarrito, incrementarCantidad, limpiarCarrito, obtenerCarrito, obtenerTotal, setTotal } from '../../store/carritoSlice'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const CarritoPagina = () => {

  const usuarioString = sessionStorage.getItem('usuario');
  const usuario = JSON.parse(usuarioString)

  const carrito = useSelector(obtenerCarrito)
  const totalPrecios = useSelector(obtenerTotal) 
  const dispatch = useDispatch()
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState(usuario?.email)

  
  const handleEliminarDelCarrito = (id) => {
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
        dispatch(eliminarDelCarrito(id))
        Swal.fire({
          title: "Eliminado!",
          text: "Producto ha sido eliminado exitosamente del carrito.",
          icon: "success"
        });
      }
    });
  }

  const handleIncrementarCantidad = (id) => {
    dispatch(incrementarCantidad(id))
  }

  const handleDecrementarCantidad = (id) => {
    dispatch(decrementarCantidad(id))
  }

  useEffect(() => {
    dispatch(setTotal())
  }, [carrito])


  console.log(carrito.map(elem => (elem.cantidadCarrito)))


  const handleComprar = () => {
    if(!(JSON.parse(sessionStorage.getItem('usuario')))){
      Swal.fire('Advertencia', 'No puede realizar compras necesecita iniciar sesion', 'error')
    }else{

      fetch("http://localhost:8080/checkout/hosted", {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          items: carrito.map(elem => ({name: elem.title, id: elem.id})),
          customerName: customerName,
          customerEmail: customerEmail,
          quantities: carrito.map(elem => (elem.cantidadCarrito))
        })
      }).then(r => r.text())
      .then(r => {
          window.location.href = r
      })

      //Swal.fire('Exito', 'La compra ha sido exitosa', 'success')
      //dispatch(limpiarCarrito())
    }
  }

  const handleChangeName = (e) => {
    setCustomerName(e.target.value)
  }

  const handleChangeEmail = (e) => {
    setCustomerEmail(e.target.value)
  }





  return (
    <div className='h-[45rem] my-[2.1rem]'>
      { carrito.length === 0 ? (
        <>
        <div className='text-center items-center text-3xl font-bold'>No hay productos en el Carrito</div>
        <div className='text-center my-10'><Link className='bg-indigo-700 px-10 py-2 font-bold text-white hover:bg-indigo-800' to="/ecommerce/productos">Seguir Comprando</Link>
        </div>
        </>
      ):
      (
        <div className="relative overflow-x-auto mx-5 mt-[1rem] mb-[35rem]">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Producto
              </th>
              <th scope="col" className="px-6 py-3">
                Precio Unitario
              </th>
              <th scope="col" className="px-6 py-3">
                Cantidad
              </th>
              <th scope="col" className="px-6 py-3">
                Precio Total
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((c) => (
              <tr className="bg-white border-b dark:bg-gray-800 border-gray-700" key={c.id}>
                <th scope="row" className="px-6 py-4 font-medium text-white">
                  {c.id}
                </th>
                <td className="px-6 py-4">
                  {c.title}
                </td>
                <td className="px-6 py-4">
                  {c.price}
                </td>
                <td className="px-6 py-4">
                  <div className='flex'>
                    <button className='mx-1 px-10 py-2 bg-green-800 text-white text-2xl font-bold cursor-pointer no-underline' onClick={() => handleDecrementarCantidad(c.id)}>-</button>
                    <div className='mx-1 px-10 py-2 bg-white text-black text-2xl font-bold no-underline'>{c.cantidadCarrito}</div>
                    <button className='mx-1 px-10 py-2 bg-sky-800 text-white text-2xl font-bold cursor-pointer no-underline' onClick={() => handleIncrementarCantidad(c.id)}>+</button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {c.totalCarrito.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <button type='button' onClick={() => handleEliminarDelCarrito(c.id)} className='text-xs bg-red-400 text-white my-2 mx-2 px-4 py-2 rounded-md hover:bg-red-700'>Eliminar</button>
                </td>

              </tr>

            ))}

          </tbody>
        </table>

        <div>
          <h2 className='text-2xl my-10'>(Cantidad de Productos: {carrito.length})</h2>
          <h2 className='text-2xl font-bold my-10'>Total Precio: ${totalPrecios.toFixed(2)}</h2>
          <div className='text-center my-10'><Link className='bg-indigo-700 px-10 py-2 font-bold text-white hover:bg-indigo-800' to="/ecommerce/productos">Seguir Comprando</Link>
        </div>
        </div>

        {(JSON.parse(sessionStorage.getItem('usuario'))) && (
          <div className='flex flex-col justify-center items-center my-5'>
            <label htmlFor="customerName">Ingrese Nombre del Cliente:</label>
            <input type="text" name='customerName' id='customerName' className='px-10 py-3 w-[20rem]' value={customerName} onChange={handleChangeName}/>

            <label htmlFor="customerName">Ingrese Email del Cliente:</label>
            <input type="text" name='customerEmail' id='customerEmail' className='px-10 py-3 w-[20rem]' value={customerEmail} onChange={handleChangeEmail}/>
          </div>
        )
        }
        
        

        <button onClick={() => handleComprar()} className='bg-slate-700 text-white my-2 px-7 py-3 font-bold'>Comprar</button>

      </div>
      )
      }

    </div>
  )
}

export default CarritoPagina