import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const INITIAL_STATE = {
    usuarios: [],
    cargando: false,
    error: "",
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        try {
            const respuesta = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
            );
            return respuesta.data
        } catch (error) {
            console.log("Error: ", error.message);
            return "Informacion de usuarios, no disponible.";
        }
    }
);

const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState: INITIAL_STATE,
    reducers: {
        TRAER_TODOS(state, action) {
            state.usuarios = action.payload
            state.cargando = false,
            state.error = ""
        },
        CARGANDO(state) {
            state.cargando = true
        },
        ERROR(state, action) {
            state.error = action.payload,
            state.cargando = false
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.cargando = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.usuarios = action.payload
            state.cargando = false,
            state.error = ""
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.error = action.payload,
            state.cargando = false
        })
    }
})

export const { TRAER_TODOS, CARGANDO, ERROR } = usuariosSlice.actions

export default usuariosSlice.reducer