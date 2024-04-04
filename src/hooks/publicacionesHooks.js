import { useDispatch, useSelector } from 'react-redux';
import { CARGANDO, ACTUALIZAR, fetchCommentsByUser, fetchComments } from '../slices/publicacionesSlices';

export const useTraerPorUsuario = () => {
    const dispatch = useDispatch();
    const usuarios = useSelector(state => state.usuariosReducer.usuarios);

    const traerPorUsuario = async (key) => {
        dispatch(CARGANDO());
        const usuario_id = usuarios[key].id;
        dispatch(fetchCommentsByUser({ userID: usuario_id, key }));
    };

    return traerPorUsuario;
};

export const useAbrirCerrar = () => {
    const dispatch = useDispatch();
    const publicaciones = useSelector(state => state.publicacionesReducer.publicaciones);

    const abrirCerrar = (pub_key, com_key) => {
        const seleccionada = publicaciones[pub_key][com_key];
        const actualizada = {
            ...seleccionada,
            abierto: !seleccionada.abierto,
        };
        const publicaciones_actualizadas = [...publicaciones];
        publicaciones_actualizadas[pub_key] = [...publicaciones[pub_key]];
        publicaciones_actualizadas[pub_key][com_key] = actualizada;
        dispatch(ACTUALIZAR(publicaciones_actualizadas));
    };

    return abrirCerrar;
};

export const useTraerComentarios = () => {
    const dispatch = useDispatch();
    const publicaciones = useSelector(state => state.publicacionesReducer.publicaciones);

    const traerComentarios = (pub_key, com_key) => {
        const seleccionada = publicaciones[pub_key][com_key];
        dispatch(fetchComments({ selectedID: seleccionada.id, pub_key, com_key }));
    };

    return traerComentarios;
};