import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TRAER_TODOS } from './usuariosSlices';
import axios from 'axios';

const INITIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: "",
    com_cargando: false,
    com_error: "",
};

export const fetchCommentsByUser = createAsyncThunk(
    'comments/fetchCommentsByUser',
    async ({ userID, key }, { getState, dispatch }) => {
        const { usuarios } = getState().usuariosReducer;
        const { publicaciones } = getState().publicacionesReducer;
        try {
            const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`);
            const nuevas = respuesta.data.map((publicacion) => ({
                ...publicacion,
                comentarios: [],
                abierto: false,
            }));
            const publicaciones_actualizadas = [...publicaciones, nuevas];
            const publicaciones_key = publicaciones_actualizadas.length - 1;
            const usuarios_actualizados = [...usuarios];
            usuarios_actualizados[key] = {
                ...usuarios[key],
                publicaciones_key,
            };

            dispatch(TRAER_TODOS(usuarios_actualizados));
            return publicaciones_actualizadas;
        } catch (error) {
            console.log(error.message);
            return "Publicaciones no disponibles.";
        }
    }
);

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async ({ selectedID, pub_key, com_key }, { getState }) => {
        const { publicaciones } = getState().publicacionesReducer;
        const seleccionada = publicaciones[pub_key][com_key];
        try {
            const respuesta = await axios.get(
                `https://jsonplaceholder.typicode.com/comments?postId=${selectedID}`
            );
            const actualizada = {
                ...seleccionada,
                comentarios: respuesta.data,
            };
            const publicaciones_actualizadas = [...publicaciones];
            publicaciones_actualizadas[pub_key] = [...publicaciones[pub_key]];
            publicaciones_actualizadas[pub_key][com_key] = actualizada;
            return publicaciones_actualizadas;
        } catch (error) {
            console.log(error.message);
            return "Comentarios no disponibles.";
        }
    }
);

const publicacionesSlice = createSlice({
    name: 'publicaciones',
    initialState: INITIAL_STATE,
    reducers: {
        ACTUALIZAR(state, action) {
            state.publicaciones = action.payload
            state.cargando = false,
                state.error = ""
        },
        CARGANDO(state) {
            state.cargando = true
        },
        ERROR(state, action) {
            state.error = action.payload,
                state.com_cargando = false,
                state.com_error = ""
        },
        COM_ACTUALIZAR(state, action) {
            state.publicaciones = action.payload,
                state.com_cargando = false,
                state.com_error = ""
        },
        COM_CARGANDO(state) {
            state.com_cargando = true
        },
        COM_ERROR(state, action) {
            state.error = action.payload,
                state.com_cargando = false
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchCommentsByUser.pending, (state, action) => {
            state.cargando = true
        })
        builder.addCase(fetchCommentsByUser.fulfilled, (state, action) => {
            state.publicaciones = action.payload
            state.cargando = false,
                state.error = ""
        })
        builder.addCase(fetchCommentsByUser.rejected, (state, action) => {
            state.error = action.payload,
                state.com_cargando = false,
                state.com_error = ""
        })
        builder.addCase(fetchComments.pending, (state, action) => {
            state.com_cargando = true
        })
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.publicaciones = action.payload,
                state.com_cargando = false,
                state.com_error = ""
        })
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.error = action.payload,
                state.com_cargando = false
        })

    }
})

export const { ACTUALIZAR, CARGANDO, ERROR, COM_ACTUALIZAR, COM_CARGANDO, COM_ERROR } = publicacionesSlice.actions

export default publicacionesSlice.reducer