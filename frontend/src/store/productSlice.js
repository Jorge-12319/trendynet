import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { URL_PRODUCTS } from "../utils/url";
import { STATUS } from "../utils/status";


const initialState = {
    products: [],
    productsStatus: STATUS.IDLE
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAsyncfindAllProducts.pending, (state, action) => {
            state.productsStatus = STATUS.LOADING
        })
        .addCase(fetchAsyncfindAllProducts.fulfilled, (state, action) => {
            state.products = action.payload
            state.productsStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchAsyncfindAllProducts.rejected, (state, action) => {
            state.productsStatus = STATUS.FAILED
        })


        .addCase(fetchAsyncCreateProduct.pending, (state, action) => {
            state.productsStatus = STATUS.LOADING
        })
        .addCase(fetchAsyncCreateProduct.fulfilled, (state, action) => {
            state.products.push(action.payload)
            state.productsStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchAsyncCreateProduct.rejected, (state, action) => {
            state.productsStatus = STATUS.FAILED
        })



        .addCase(fetchAsyncUpdateProduct.pending, (state, action) => {
            state.productsStatus = STATUS.LOADING
        })
        .addCase(fetchAsyncUpdateProduct.fulfilled, (state, action) => {
            const index = state.products.findIndex(p => p.id === action.payload.id)

            if(index !== -1){
                state.products[index] = action.payload;
            }

            state.productsStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchAsyncUpdateProduct.rejected, (state, action) => {
            state.productsStatus = STATUS.FAILED
        })



        .addCase(fetchAsyncDeleteProduct.pending, (state, action) => {
            state.productsStatus = STATUS.LOADING
        })
        .addCase(fetchAsyncDeleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(p => p.id !== action.payload.id);
            state.productsStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchAsyncDeleteProduct.rejected, (state, action) => {
            state.productsStatus = STATUS.FAILED
        })


    }
})

export const fetchAsyncfindAllProducts = createAsyncThunk(
    "products/fetchFindAll",
    async() => {
        return (await axios.get(URL_PRODUCTS)).data
    }
)

export const fetchAsyncCreateProduct = createAsyncThunk(
    "products/fetchCreateProduct",
    async ({image, product}) => {
        const imageData = new FormData();
        imageData.append('image', image);
        return (await axios.post(URL_PRODUCTS, imageData, {
            params: {
                model: JSON.stringify(product)
            }
        })).data
    }
)

export const fetchAsyncUpdateProduct = createAsyncThunk(
    "products/fetchUpdateProduct",
    async ({image, product, id}) => {
        const imageData = new FormData();
        imageData.append('image', image);
        return (await axios.put(`${URL_PRODUCTS}/${id}`, imageData, {
            params: {
                model: JSON.stringify(product)
            }
        })).data
    }
)

export const fetchAsyncDeleteProduct = createAsyncThunk(
    "products/fetchDeleteProduct",
    async (id) => {
        return (await axios.delete(`${URL_PRODUCTS}/${id}`)).data
    }
)




export const getProducts = (state) => state.product.products
export const getProductsStatus = (state) => state.product.productsStatus

export default productSlice.reducer