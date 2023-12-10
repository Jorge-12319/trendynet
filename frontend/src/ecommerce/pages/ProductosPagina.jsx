import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getProducts } from '../../store/productSlice'

const ProductosPagina = () => {

  //marcas
  //categorias
  //talla
  //color
  //precio

  const products = useSelector(getProducts)
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([])
  const [brands, setBrands] = useState([])
  const [colours, setColours] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColour, setSelectedColour] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const rangePrices = [
    {
      id: 1,
      minPrice: 10,
      maxPrice: 100,
      name: "10$ - 100$"
    },
    {
      id: 2,
      minPrice: 101,
      maxPrice: 150,
      name: "100$ - 150$"
    },
    {
      id: 3,
      minPrice: 151,
      maxPrice: 200,
      name: "150$ - 200$"
    },
    {
      id: 4,
      minPrice: 201,
      maxPrice: 250,
      name: "200$ - 250$"
    },
    {
      id: 5,
      minPrice: 251,
      maxPrice: 99999,
      name: "+250$"
    },
  ]


  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/categories")
      .then(response => setCategories(response.data))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/sizes")
      .then(response => setSizes(response.data))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/brands")
      .then(response => setBrands(response.data))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/colours")
      .then(response => setColours(response.data))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  const new_sizes = sizes.slice(0, 6);

  const handleFilterCategory = (id) => {
    setSelectedCategory(id);
    console.log(selectedCategory)
  };


  const handleFilterBrand = (id) => {
    setSelectedBrand(id);
    console.log(selectedBrand)
  };

  const handleFilterSize = (id) => {
    setSelectedSize(id);
    console.log(selectedSize)
  };

  const handleFilterColour = (id) => {
    setSelectedColour(id);
    console.log(selectedColour)
  };

  const handleFilterPrice = (id) => {
    if (id === 0) {
      setSelectedPrice(0);
    } else {
      setSelectedPrice(rangePrices.find(r => r.id === id))
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) => {
    const productTitle = product.title.toLowerCase();
    return productTitle.includes(searchTerm) &&
      (selectedCategory === "" || product.category === selectedCategory) &&
      (selectedBrand === "" || product.brand === selectedBrand) &&
      (selectedSize === "" || product.size === selectedSize) &&
      (selectedColour === "" || product.colour === selectedColour) &&
      (selectedPrice === 0 || (product.price >= selectedPrice.minPrice && product.price <= selectedPrice.maxPrice));
  });

  if (isLoading) {
    return <div role="status" className='w-full h-[50rem] flex justify-center items-center'> 
      <svg aria-hidden="true" className="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  }

  return (
    <div className='w-full'>
      <div className='w-full'>
        <h3 className='text-3xl px-2 py-2 my-2 font-bold text-center'>Nuestros Productos</h3>
        <div className='flex justify-center px-10 py-5'>
          <input type="text" onChange={handleSearchTermChange} placeholder='Buscar Producto' className='w-[14rem] bg-indigo-600 text-white px-10 py-2 border-2 border-slate-500 rounded-full text-center md:w-[25rem]' />
        </div>
        <h5 className='font-bold text-slate-900 px-2 text-2xl my-2 text-center'>Categorias:</h5>
        <ul className='flex justify-center flex-wrap'>
          <button onClick={() => handleFilterCategory("")}
            className={(selectedCategory === "") ?
              "w-[8rem] text-center font-bold text-xs bg-yellow-600 px-10 py-5 my-2 mx-2 text-white hover:bg-yellow-800 rounded-md md:text-sm md:w-[10rem]"
              : "w-[8rem] text-center font-bold text-xs bg-slate-600 px-10 py-5 my-2 mx-2 text-black hover:bg-slate-800 rounded-md md:text-sm md:w-[10rem]"
            }>Todas</button>
          {categories.map(c => (
            <button onClick={() => handleFilterCategory(c.name)}
              className={(selectedCategory === c.name) ?
                "w-[8rem] text-center font-bold text-xs bg-yellow-600 px-10 py-5 my-2 mx-2 text-white hover:bg-yellow-800 rounded-md md:text-sm md:w-[10rem]"
                : "w-[8rem] text-center font-bold text-xs bg-slate-600 px-10 py-5 my-2 mx-2 text-black hover:bg-slate-800 rounded-md md:text-sm md:w-[10rem]"
              }

              key={c.id}>{c.name}</button>
          ))}

        </ul>


        <div className='flex flex-wrap mt-10 w-full justify-center'>
          <div className='mx-5 my-5 bg-gray-600 w-[30rem] h-1/2'>

            <div className='flex justify-around px-5'>

              <div className='flex flex-col justify-center items-center'>
                <h4 className='text-center text-white font-bold py-5'>Marcas</h4>
                <button onClick={() => handleFilterBrand("")}
                  className={(selectedBrand === "") ?
                    "w-[8rem] text-center font-bold text-xs bg-yellow-600 px-10 py-5 my-2 mx-2 text-white hover:bg-yellow-800 rounded-md md:text-sm md:w-[10rem]"
                    : "w-[8rem] text-center font-bold text-xs bg-orange-600 px-10 py-5 my-2 mx-2 text-black hover:bg-orange-800 rounded-md md:text-sm md:w-[10rem]"
                  }>Todas</button>
                {brands.map(b => (
                  <button onClick={() => handleFilterBrand(b.name)}
                    className={(selectedBrand === b.name) ?
                      "w-[8rem] text-center font-bold text-xs bg-yellow-600 px-10 py-5 my-2 mx-2 text-white hover:bg-yellow-800 rounded-md md:text-sm md:w-[10rem]"
                      : "w-[8rem] text-center font-bold text-xs bg-orange-600 px-10 py-5 my-2 mx-2 text-black hover:bg-orange-800 rounded-md md:text-sm md:w-[10rem]"
                    }
                    key={b.id}>{b.name}</button>
                ))}

              </div>


              <div className='flex flex-col items-center'>
                <h4 className='text-center text-white font-bold py-5'>Tallas</h4>
                <button onClick={() => handleFilterSize("")}
                  className={(selectedSize === "") ?
                    "w-[8rem] text-center font-bold text-xs bg-yellow-600 px-10 py-5 my-2 mx-2 text-white hover:bg-yellow-800 rounded-md md:text-sm md:w-[10rem]"
                    : "w-[8rem] text-center font-bold text-xs bg-green-600 px-10 py-5 my-2 mx-2 text-black hover:bg-green-800 rounded-md md:text-sm md:w-[10rem]"
                  }>Todas</button>
                {new_sizes.map(s => (
                  <button
                    onClick={() => handleFilterSize(s.name)}
                    className={(selectedSize === s.name) ?
                      "w-[8rem] text-center font-bold text-xs bg-yellow-600 px-10 py-5 my-2 mx-2 text-white hover:bg-yellow-800 rounded-md md:text-sm md:w-[10rem]"
                      : "w-[8rem] text-center font-bold text-xs bg-green-600 px-10 py-5 my-2 mx-2 text-black hover:bg-green-800 rounded-md md:text-sm md:w-[10rem]"
                    }
                    key={s.id}>{s.name}</button>
                ))}
              </div>

            </div>

            <div className='flex justify-around px-5 py-10'>

              <div className='flex flex-col justify-center items-center'>
                <h4 className='text-center text-white font-bold py-5'>Color</h4>
                <button onClick={() => handleFilterColour("")}
                  className={(selectedColour === "") ?
                    "w-[8rem] text-center font-bold text-xs bg-yellow-600 px-10 py-5 my-2 mx-2 text-white hover:bg-yellow-800 rounded-md md:text-sm md:w-[10rem]"
                    : "w-[8rem] text-center font-bold text-xs bg-red-600 px-10 py-5 my-2 mx-2 text-black hover:bg-red-800 rounded-md md:text-sm md:w-[10rem]"
                  }>Todas</button>

                {colours.map(c => (
                  <button
                    onClick={() => handleFilterColour(c.name)}
                    className={(selectedColour === c.name) ?
                      "w-[8rem] text-center font-bold text-xs bg-yellow-600 px-10 py-5 my-2 mx-2 text-white hover:bg-yellow-800 rounded-md md:text-sm md:w-[10rem]"
                      : "w-[8rem] text-center font-bold text-xs bg-red-600 px-10 py-5 my-2 mx-2 text-black hover:bg-red-800 rounded-md md:text-sm md:w-[10rem]"
                    }
                    key={c.id}>{c.name}</button>
                ))}
              </div>

              <div className='flex flex-col items-center'>
                <h4 className='text-center text-white font-bold py-5'>Precios</h4>
                <button onClick={() => handleFilterPrice(0)}
                  className={(selectedPrice === 0) ?
                    "w-[8rem] text-center font-bold text-xs bg-yellow-600 px-10 py-5 my-2 mx-2 text-white hover:bg-yellow-800 rounded-md md:text-sm md:w-[10rem]"
                    : "w-[8rem] text-center font-bold text-xs bg-indigo-600 px-10 py-5 my-2 mx-2 text-black hover:bg-indigo-800 rounded-md md:text-sm md:w-[10rem]"
                  }>Todas</button>

                {
                  rangePrices.map(r => (
                    <button
                      onClick={() => handleFilterPrice(r.id)}
                      className={(selectedPrice.id === r.id) ?
                        "w-[8rem] text-center font-bold text-xs bg-yellow-600 px-10 py-5 my-2 mx-2 text-white hover:bg-yellow-800 rounded-md md:text-sm md:w-[10rem]"
                        : "w-[8rem] text-center font-bold text-xs bg-indigo-600 px-10 py-5 my-2 mx-2 text-black hover:bg-indigo-800 rounded-md md:text-sm md:w-[10rem]"
                      }
                      key={r.id}
                    >{r.name}</button>
                  ))
                }
              </div>


            </div>







          </div>


          {/**Productos */}
          <div className="flex flex-col">
          <div className='justify-center grid 2xl:grid-cols-4 lg:grid-cols-3 2xl:gap-8 lg:gap-3 py-2'>
            {
              filteredProducts.map((product) => (
                <div className='w-[18rem] h-[21.5rem] bg-black text-white mx-4 my-3' key={product.id}>
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
    </div>
  )
}

export default ProductosPagina;