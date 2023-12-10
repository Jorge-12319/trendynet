import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./usuarioSlice";
import productReducer from "./productSlice"
import carritoReducer from "./carritoSlice"


export const store = configureStore({
    reducer: {
        usuario: usuarioReducer,
        carrito: carritoReducer,
        product: productReducer
    }
})

