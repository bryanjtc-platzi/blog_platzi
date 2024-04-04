import { fetchUsers } from "../slices/usuariosSlices";
import { useDispatch } from "react-redux";

export const useTraerTodos = () => {
    const dispatch = useDispatch();

    const traerTodos = () => {
        dispatch(fetchUsers());
    };

    return traerTodos;
};
