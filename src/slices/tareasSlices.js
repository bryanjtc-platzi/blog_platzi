import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    tareas: {},
    cargando: false,
    error: "",
    usuario_id: "",
    titulo: "",
    regresar: false,
};

const tareasSlice = createSlice({
    name: 'usuarios',
    initialState: INITIAL_STATE,
    reducers: {
        TRAER_TODAS(state, action) {
            state.tareas = action.payload
            state.cargando = false,
            state.error = "",
            state.regresar = false
        },
        CARGANDO(state) {
            state.cargando = true
        },
        ERROR(state, action) {
            state.error = action.payload,
            state.cargando = false
        },
        CAMBIO_USUARIO_ID(state, action) {
            state.usuario_id = action.payload
        },
        CAMBIO_TITULO(state, action) {
            state.titulo = action.payload
        },
        GUARDAR(state) {
            state.tareas = {},
            state.cargando = false,
            state.error = "",
            state.regresar = true,
            state.usuario_id = "",
            state.titulo = ""
        },
        ACTUALIZAR(state, action) {
            state.tareas = action.payload
        },
        LIMPIAR(state) {
            state.usuario_id = "",
            state.titulo = ""
        },
    }
})

export const { TRAER_TODAS, CARGANDO, ERROR, CAMBIO_USUARIO_ID, CAMBIO_TITULO, GUARDAR, ACTUALIZAR, LIMPIAR } = tareasSlice.actions

export default tareasSlice.reducer