import axios from "axios";
import {
    TRAER_TODAS,
    CARGANDO,
    ERROR,
    CAMBIO_USUARIO_ID,
    CAMBIO_TITULO,
    GUARDAR,
    ACTUALIZAR,
    LIMPIAR,
} from "../slices/tareasSlices";
import { useSelector, useDispatch } from 'react-redux';

export const useCambioUsuarioId = () => {
    const dispatch = useDispatch();

    const cambioUsuarioId = (usuario_id) => {
        dispatch(CAMBIO_USUARIO_ID(usuario_id));
    };

    return cambioUsuarioId;
};

export const useCambioTitulo = () => {
    const dispatch = useDispatch();

    const cambioTitulo = (titulo) => {
        dispatch(CAMBIO_TITULO(titulo));
    };

    return cambioTitulo;
};

export const useLimpiarForma = () => {
    const dispatch = useDispatch();

    const limpiarForma = () => {
        dispatch(LIMPIAR());
    };

    return limpiarForma;
};

export const useAgregarTarea = () => {
    const dispatch = useDispatch();

    const agregar = async (nueva_tarea) => {
        dispatch(CARGANDO());
        try {
            await axios.post("https://jsonplaceholder.typicode.com/todos", nueva_tarea);
            dispatch(GUARDAR());
        } catch (error) {
            console.log(error.message);
            dispatch(ERROR("Intente mas tarde."));
        }
    };

    return agregar;
};

export const useEditarTarea = () => {
    const dispatch = useDispatch();

    const editar = async (tarea_editada) => {
        dispatch(CARGANDO());
        try {
            await axios.put(
                `https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
                tarea_editada
            );
            dispatch(GUARDAR());
        } catch (error) {
            console.log(error.message);
            dispatch(ERROR("Intente mas tarde."));
        }
    };

    return editar;
};

export const useTraerTodas = () => {
    const dispatch = useDispatch();
    const traerTodas = async () => {
        dispatch(CARGANDO());
        try {
            const respuesta = await axios.get(
                "https://jsonplaceholder.typicode.com/todos"
            );
            const tareas = {};
            respuesta.data.map(
                (tar) =>
                (tareas[tar.userId] = {
                    ...tareas[tar.userId],
                    [tar.id]: {
                        ...tar,
                    },
                })
            );
            dispatch(TRAER_TODAS(tareas));
        } catch (error) {
            console.log("Error: ", error.message);
            dispatch(ERROR("Informacion de tareas, no disponible."));
        }
    };

    return traerTodas;
};

export const useCambioCheck = () => {
    const dispatch = useDispatch();
    const tareas = useSelector(state => state.tareasReducer.tareas);

    const cambioCheck = (usu_id, tar_id) => {
        const seleccionada = tareas[usu_id][tar_id];
        const actualizadas = {
            ...tareas,
        };
        actualizadas[usu_id] = {
            ...tareas[usu_id],
        };
        actualizadas[usu_id][tar_id] = {
            ...tareas[usu_id][tar_id],
            completed: !seleccionada.completed,
        };

        dispatch(ACTUALIZAR(actualizadas));
    };

    return cambioCheck;
};

export const useEliminar = () => {
    const dispatch = useDispatch();

    const eliminar = async (tar_id) => {
        dispatch(CARGANDO());
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);
            dispatch(TRAER_TODAS({}));
        } catch (error) {
            console.log(error.message);
            dispatch(ERROR("Servicio no disponible."));
        }
    };

    return eliminar;
};