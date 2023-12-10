import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carrito: [],
    total: 0
}


const carritoSlice = createSlice({
    name: "carrito",
    initialState,
    reducers: {

        agregarAlCarrito: (state, action) => {

            const { id, cantidadCarrito } = action.payload

            const prodEncontrado = state.carrito.find(c => c.id === id)
            
            if(prodEncontrado){
                prodEncontrado.cantidadCarrito = prodEncontrado.cantidadCarrito + cantidadCarrito
                prodEncontrado.totalCarrito = prodEncontrado.price * prodEncontrado.cantidadCarrito
            }else{
                state.carrito.push(action.payload)
            }
            
        },
        eliminarDelCarrito: (state, action) => {
            state.carrito = state.carrito.filter(c => c.id !== action.payload)
        },

        incrementarCantidad: (state, action) => {
            const prodEncontrado = state.carrito.find(c => c.id === action.payload)

            if(prodEncontrado){
                prodEncontrado.cantidadCarrito = prodEncontrado.cantidadCarrito + 1
                if(prodEncontrado.cantidadCarrito > prodEncontrado.stock){
                    prodEncontrado.cantidadCarrito = prodEncontrado.stock
                }else{
                    prodEncontrado.totalCarrito = prodEncontrado.price * prodEncontrado.cantidadCarrito
                }
            }
        },

        decrementarCantidad: (state, action) => {
            const prodEncontrado = state.carrito.find(c => c.id === action.payload)

            if(prodEncontrado){
                prodEncontrado.cantidadCarrito = prodEncontrado.cantidadCarrito - 1
                if(prodEncontrado.cantidadCarrito < 1){
                    prodEncontrado.cantidadCarrito = 1
                }else{
                    prodEncontrado.totalCarrito = prodEncontrado.price * prodEncontrado.cantidadCarrito
                }
                
            }
        },

        setTotal: (state, action) => {
            state.total = state.carrito.reduce((acum, c) => {
                return acum + c.totalCarrito
            }, 0)
        },

        limpiarCarrito: (state, action) => {
            state.carrito = []
        }


    }
})


export default carritoSlice.reducer
export const { agregarAlCarrito, eliminarDelCarrito, incrementarCantidad, decrementarCantidad, setTotal, limpiarCarrito} = carritoSlice.actions
export const obtenerCarrito = (state) => state.carrito.carrito
export const obtenerTotal = (state) => state.carrito.total
