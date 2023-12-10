

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';


// Dashboard imports
import UsuarioFormPagina from "./dashboard/pages/UsuarioFormPagina"
import ProductoFormPagina from "./dashboard/pages/ProductoFormPagina"
import ListaUsuariosPagina from "./dashboard/pages/ListaUsuariosPagina"
import ListaProductosPagina from "./dashboard/pages/ListaProductosPagina"
import NavbarDashboard from "./dashboard/components/NavbarDashboard"

// Ecommerce imports
import HomePagina from "./ecommerce/pages/HomePagina"
import SobreNosotrosPagina from "./ecommerce/pages/SobreNosotrosPagina"
import ProductosPagina from "./ecommerce/pages/ProductosPagina"
import ContactenosPagina from "./ecommerce/pages/ContactenosPagina"
import IniciarSesionPagina from "./ecommerce/pages/IniciarSesionPagina"
import CarritoPagina from "./ecommerce/pages/CarritoPagina"
import { NavbarEcommerce } from "./ecommerce/components/NavbarEcommerce"
import Footer from "./ecommerce/components/Footer"
import RegistroPagina from './ecommerce/pages/RegistroPagina';
import PaginaProductoUnico from './ecommerce/pages/PaginaProductoUnico';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncfindAllProducts } from './store/productSlice';
import Success from './ecommerce/pages/Success';
import Failure from './ecommerce/pages/Failure';



function App() {
  const location = useLocation();

  // LISTAR PRODUCTS
  const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAsyncfindAllProducts())
  }, [])

  const usuarioString = sessionStorage.getItem('usuario');
  const usuario = JSON.parse(usuarioString)


  /*
  useEffect(() => {
    if(!(JSON.parse(sessionStorage.getItem('usuario')))){
      navigate('/ecommerce/iniciarsesion')
    }
  }, [])
*/

  return (
      <div className='bg-gray-200'>

        {/* Verificar los navbar tanto de dashboard como de ecommerce segun la url */}
        {location.pathname.startsWith('/dashboard') ?
          <NavbarDashboard />
          :
          <NavbarEcommerce />
        }

        {/* Enrutador de react */}
        <Routes>
          {/* Dashboard */}
          { (sessionStorage.getItem('usuario') && usuario.role === "Admin") && 
          <>
            <Route path='/dashboard/crear' element={<UsuarioFormPagina />} />
            <Route path='/dashboard/editar/:id' element={<UsuarioFormPagina />} />
            <Route path='/dashboard' element={<ListaUsuariosPagina />} />
            <Route path='/dashboard/productos' element={<ListaProductosPagina />} />
            <Route path='/dashboard/productos/crear' element={<ProductoFormPagina />} />
            <Route path='/dashboard/productos/editar/:id' element={<ProductoFormPagina />} />
          </>
          }

          {/* Ecommerce */}
          <Route path="/" element={<HomePagina />} />
          <Route path="/ecommerce" element={<HomePagina />} />
          <Route path="/ecommerce/:id" element={<PaginaProductoUnico />} />
          <Route path="/ecommerce/nosotros" element={<SobreNosotrosPagina />} />
          <Route path="/ecommerce/productos" element={<ProductosPagina />} />
          <Route path="/ecommerce/contactenos" element={<ContactenosPagina />} />
          <Route path="/ecommerce/iniciarsesion" element={<IniciarSesionPagina/>} />
          <Route path="/ecommerce/registro" element={<RegistroPagina/>} />
          <Route path="/ecommerce/iniciarsesion/:id" element={<IniciarSesionPagina />} />
          <Route path="/ecommerce/carrito" element={<CarritoPagina />} />
          <Route path="/dashboard/*" element={<Navigate to="/ecommerce/iniciarsesion" />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
        </Routes>

        {/* Usar solamente footer para ecommerce segun la url */}
        {location.pathname.startsWith('/dashboard') ?
          ""
          :
          <Footer />
        }
      </div>


  )
}

export default App
