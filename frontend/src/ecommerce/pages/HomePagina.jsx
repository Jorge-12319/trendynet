import React from 'react'
import { useEffect, useState } from 'react'
import { Banner } from '../components/Banner';
import { AiOutlineLock } from 'react-icons/ai';
import { TbHandFinger } from 'react-icons/tb';
import { GrDeliver, GrLocation } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAsyncfindAllProducts, getProducts, getProductsStatus } from '../../store/productSlice';
import { STATUS } from '../../utils/status';



const HomePagina = () => {


    const products = useSelector(getProducts)
    const productsStatus = useSelector(getProductsStatus)

    return (
        <div className=''>
            <Banner />
            <div className='w-full'>
                <h2 className='text-2xl font-bold text-center my-5 py-5 md:text-3xl'>Nuestros servicios</h2>
                <div className='flex flex-wrap justify-center'>
                    <div className='px-10 flex flex-col justify-center items-center'>
                        <AiOutlineLock className='text-3xl text-center my-2' />
                        <p>Pagos 100% seguros</p>
                    </div>
                    <div className='px-10 flex flex-col justify-center items-center'>
                        <TbHandFinger className='text-3xl text-center my-2' />
                        <p>Compra fácil 3 pasos</p>
                    </div>
                    <div className='px-10 flex flex-col justify-center items-center'>
                        <GrDeliver className='text-3xl text-center my-2' />
                        <p>Envia a lima y provincias</p>
                    </div>
                    <div className='px-10 flex flex-col justify-center items-center'>
                        <GrLocation className='text-3xl text-center my-2' />
                        <p>Retiro en tienda gratis</p>
                    </div>
                </div>
            </div>

            <div className='w-full my-10'>
                <div>
                    <h2 className='text-3xl text-center my-5 py-5 font-bold'>Nuevos Modelos</h2>
                    <div className='flex flex-wrap justify-center'>
                        {
                            productsStatus === STATUS.LOADING ?
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                :
                                products.map((product) => (
                                    <div className='w-[18rem] bg-black text-white mx-4 my-3' key={product.id}>
                                        <Link to={`/ecommerce/${product.id}`}><img src={product.url} className='w-[18rem] h-[15rem]' alt={product.title} /></Link>
                                        <p className='text-start text-green-500 text-sm font-bold mx-2'>{product.brand}</p>
                                        <p className='text-start text-1xl font-bold mx-2 my-2'>{product.title}</p>
                                        <div className='flex justify-between my-2'>
                                            <p className='mx-2 font-bold text-indigo-600'>Online</p>
                                            <p className='mx-2 text-red-600 text-2xl'>${product.price}</p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomePagina