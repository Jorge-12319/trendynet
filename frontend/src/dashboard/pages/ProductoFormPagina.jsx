import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAsyncCreateProduct, fetchAsyncUpdateProduct, fetchAsyncfindAllProducts, getProducts } from '../../store/productSlice'
import axios from 'axios'

const initialProduct = {
  title: "",
  description: "",
  category: null,
  brand: null,
  size: null,
  colour: null,
  genre: null,
  price: 0.0,
  stock: 0,
};

const initialImage = "";

const ProductoFormPagina = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const products = useSelector(getProducts)

  const [image, setImage] = useState(initialImage);
  const [product, setProduct] = useState(initialProduct);

  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([])
  const [brands, setBrands] = useState([])
  const [colours, setColours] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    dispatch(fetchAsyncfindAllProducts())
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/categories")
      .then(response => setCategories(response.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/sizes")
      .then(response => setSizes(response.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/brands")
      .then(response => setBrands(response.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/colours")
      .then(response => setColours(response.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/genres")
      .then(response => setGenres(response.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (params.id) {
      const productoEncontrado = products.find((product) => product.id === Number(params.id));
  
      if (productoEncontrado) {
        console.log(productoEncontrado);
  
        const { title, description, category, brand, size, colour, genre, price, stock } = productoEncontrado;
  
        let categoryFound = categories.find((c) => c.name === category);
        let brandFound = brands.find((b) => b.name === brand);
        let colourFound = colours.find((c) => c.name === colour);
        let genreFound = genres.find((g) => g.name === genre);
        let sizeFound = sizes.find((s) => s.name === size);
  
        setProduct({
          ...product,
          title,
          description,
          category: categoryFound ? categoryFound.id : null,
          brand: brandFound ? brandFound.id : null,
          size: sizeFound ? sizeFound.id : null,
          colour: colourFound ? colourFound.id : null,
          genre: genreFound ? genreFound.id : null,
          price,
          stock,
        });
      }
    }
  }, [params.id, products, categories, brands, sizes, colours, genres]);


  const getObjectById = (id, array) => {
    let found = array.find(item => item.id === id)
    if(!found){
        return null;
    }
    if(array === sizes){
        return {
            id: found.id,
            size: found.name
        }
    }
    return {
        id: found.id,
        name: found.name
    }
    ;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
      setProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };



  const prepareProductForSubmit = (product) => {
    return {
      ...product,
      category: getObjectById(Number(product.category), categories),
      brand: getObjectById(Number(product.brand), brands),
      size: getObjectById(Number(product.size), sizes),
      colour: getObjectById(Number(product.colour), colours),
      genre: getObjectById(Number(product.genre), genres),
    };
  };

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const productForSubmit = prepareProductForSubmit(product);

    if (params.id) {
      dispatch(fetchAsyncUpdateProduct({ image, product: productForSubmit, id: params.id }))
    } else {
      dispatch(fetchAsyncCreateProduct({ image, product: productForSubmit }))
      setProduct(initialProduct)
      setImage(initialImage)
    }
    navigate('/dashboard/productos')
  };

  return (
    <div>
      <h2 className='mt-5 font-bold text-2xl text-center'>Gestion de Productos</h2>

      <form onSubmit={handleOnSubmit} className='flex flex-col items-center mt-7'>

        <div className='pb-7 flex flex-col'>
          <label htmlFor="title" className='mr-5'>Ingrese el titulo del producto: </label>
          <input value={product.title} onChange={handleChange} className='px-2 w-[20rem] py-1 border-2 border-black' type="text" name="title" id='title' />
        </div>
        <div className='pb-7 flex flex-col'>
          <label htmlFor="description" className='mr-5'>Ingrese la descripcion del producto: </label>
          <textarea value={product.description} onChange={handleChange} className='px-2 w-[20rem] py-5 border-2 border-black' rows={3} type="text" name="description" id='description'></textarea>
        </div>
        <div className='pb-7 flex flex-col'>
          <label htmlFor="category" className='mr-5 mb-5'>Ingrese la categoria del producto: </label>
          <select onChange={handleChange} value={product.category !== null ? product.category : 'DEFAULT'} name="category" id="category" className='bg-slate-700 text-white border border-black px-7 py-2 rounded-md focus:border-blue-500'>
            <option value="DEFAULT" disabled="disabled">-Ingrese una Categoria:</option>
            {categories.map(category => (
              <option key={category.id} className='font-bold' value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className='pb-7 flex flex-col'>
          <label htmlFor="brand" className='mr-5 mb-5'>Ingrese la marca del producto: </label>
          <select onChange={handleChange} name="brand" value={product.brand !== null ? product.brand : 'DEFAULT'} id="brand" className='bg-slate-700 text-white border border-black px-7 py-2 rounded-md focus:border-blue-500'>
            <option value="DEFAULT" disabled="disabled">-Ingrese una Marca:</option>
            {brands.map(brand => (
              <option key={brand.id} className='font-bold' value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>



        <div className='pb-7 flex flex-col'>
          <label htmlFor="size" className='mr-5 mb-5'>Ingrese la talla del producto: </label>
          <select onChange={handleChange} name="size" value={product.size !== null ? product.size : 'DEFAULT'} id="size" className='bg-slate-700 text-white border border-black px-7 py-2 rounded-md focus:border-blue-500'>
            <option value="DEFAULT" disabled="disabled">-Ingrese una Talla:</option>
            {sizes.map(size => (
              <option key={size.id} className='font-bold' value={size.id}>{size.name}</option>
            ))}
          </select>
        </div>


        <div className='pb-7 flex flex-col'>
          <label htmlFor="colour" className='mr-5 mb-5'>Ingrese el color del producto: </label>
          <select onChange={handleChange} value={product.colour !== null ? product.colour : 'DEFAULT'} name="colour" id="colour" className='bg-slate-700 text-white border border-black px-7 py-2 rounded-md focus:border-blue-500'>
            <option value="DEFAULT" disabled="disabled">-Ingrese un Color:</option>
            {colours.map(colour => (
              <option key={colour.id} className='font-bold' value={colour.id}>{colour.name}</option>
            ))}
          </select>
        </div>

        <div className='pb-7 flex flex-col'>
          <label htmlFor="image" className='mr-5 mb-2 text-center'>Ingrese Una imagen para el producto: </label>
          <input type="file" name='image' id='image' onChange={handleImageChange} encType="multipart/form-data" />
        </div>


        <div className='pb-7 flex flex-col'>
          <label htmlFor="genre" className='mr-5 mb-5'>Ingrese el genero del producto: </label>
          <select onChange={handleChange} value={product.genre !== null ? product.genre : 'DEFAULT'} name="genre" id="genre" className='bg-slate-700 text-white border border-black px-7 py-2 rounded-md focus:border-blue-500'>
            <option value="DEFAULT" disabled="disabled">-Ingrese un Genero:</option>
            {genres.map(genre => (
              <option key={genre.id} className='font-bold' value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>


        <div className='pb-7 flex flex-col'>
          <label htmlFor="price" className='mr-5 mb-5'>Ingrese un precio del producto: </label>
          <input value={product.price} onChange={handleChange} className='px-7 py-3 rounded-md border border-black text-center font-bold' type="number" min={10} max={999} name="price" id="price" placeholder='Ingrese un precio' />
        </div>

        <div className='pb-7 flex flex-col'>
          <label htmlFor="stock" className='mr-5 mb-5'>Ingrese el stock del producto: </label>
          <input value={product.stock} onChange={handleChange} className='px-7 py-3 rounded-md border border-black text-center font-bold' type="number" min={1} name="stock" id="stock" placeholder='Ingrese un stock' />
        </div>

        <div className='pb-7 flex flex-col'>
          <input type="submit" value="CREAR PRODUCTO" className='px-7 py-3 bg-green-400 text-white rounded-md cursor-pointer hover:bg-green-700' />
        </div>



      </form>




    </div>
  )
}

export default ProductoFormPagina