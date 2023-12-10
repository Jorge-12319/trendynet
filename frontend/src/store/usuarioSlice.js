import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import axios from "axios";
import { URL_USUARIOS } from "../utils/url";
import { STATUS } from "../utils/status";

const initialState = {
    usuarios: [],
    usuariosEstados: STATUS.IDLE
}

export const usuarioSlice = createSlice({
    name: "usuario",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // LISTAR
        .addCase(fetchAsyncListarUsuarios.pending, (state, action) => {
            state.usuariosEstados = STATUS.LOADING
        })
        .addCase(fetchAsyncListarUsuarios.fulfilled, (state, action) => {
            state.usuarios = action.payload
            state.usuariosEstados = STATUS.SUCCEEDED
        })
        .addCase(fetchAsyncListarUsuarios.rejected, (state, action) => {
            state.usuariosEstados = STATUS.FAILED
        })

        //CREAR
        .addCase(fetchAsyncCrearUsuarios.pending, (state, action) => {
            state.usuariosEstados = STATUS.LOADING
        })
        .addCase(fetchAsyncCrearUsuarios.fulfilled, (state, action) => {
            state.usuarios.push(action.payload)
            state.usuariosEstados = STATUS.SUCCEEDED
        })
        .addCase(fetchAsyncCrearUsuarios.rejected, (state, action) => {
            state.usuariosEstados = STATUS.FAILED
        })


        // ACTUALIZAR
        .addCase(fetchAsyncActualizarUsuarios.pending, (state, action) => {
            state.usuariosEstados = STATUS.LOADING
        })
        .addCase(fetchAsyncActualizarUsuarios.fulfilled, (state, action) => {
            const index = state.usuarios.findIndex(u => u.id === action.payload.id)

            if(index !== -1){
                state.usuarios[index] = action.payload;
            }


            state.usuariosEstados = STATUS.SUCCEEDED
        })
        .addCase(fetchAsyncActualizarUsuarios.rejected, (state, action) => {
            state.usuariosEstados = STATUS.FAILED
        })



        // ELIMINAR
        .addCase(fetchAsyncEliminarUsuarios.pending, (state, action) => {
            state.usuariosEstados = STATUS.LOADING
        })
        .addCase(fetchAsyncEliminarUsuarios.fulfilled, (state, action) => {
            state.usuarios = state.usuarios.filter(usuario => usuario.id !== action.payload.id)
            state.usuariosEstados = STATUS.SUCCEEDED
        })
        .addCase(fetchAsyncEliminarUsuarios.rejected, (state, action) => {
            state.usuariosEstados = STATUS.FAILED
        })


    }
})


export const fetchAsyncListarUsuarios = createAsyncThunk(
    "usuarios/fetchListar",
    async () => {
        return (await axios.get(URL_USUARIOS)).data
    }
)


export const fetchAsyncCrearUsuarios = createAsyncThunk(
    "usuarios/fetchCrear",
    async (usuario) => {
        return (await axios.post(URL_USUARIOS, usuario)).data
    }
)


export const fetchAsyncActualizarUsuarios = createAsyncThunk(
    "usuarios/fetchActualizar",
    async ({usuario, id}) => {
        return (await axios.put(`${URL_USUARIOS}/${id}`, usuario)).data
    }
)


export const fetchAsyncEliminarUsuarios = createAsyncThunk(
    "usuarios/fetchEliminar",
    async (id) => {
        return (await axios.delete(`${URL_USUARIOS}/${id}`)).data
    }
)

export const obtenerUsuarios = (state) => state.usuario.usuarios
export const obtenerUsuariosEstados = (state) => state.usuario.usuariosEstados

export default usuarioSlice.reducer

