import React, { useEffect } from "react";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useLimpiarForma, useCambioUsuarioId, useCambioTitulo, useAgregarTarea, useEditarTarea } from "../../hooks/tareasHooks";

const Guardar = () => {
  const params = useParams();
  const { tareas, error, cargando, usuario_id, titulo, regresar } = useSelector(state => state.tareasReducer);
  const limpiarForma = useLimpiarForma();
  const cambioUsuarioId = useCambioUsuarioId();
  const cambioTitulo = useCambioTitulo();
  const agregar = useAgregarTarea();
  const editar = useEditarTarea();
  const usu_id = params.usu_id;
  const tar_id = params.tar_id;

  useEffect(() => {
    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    } else {
      limpiarForma();
    }
  }, [params]);
  const cambiarUsuarioId = (event) => {
    cambioUsuarioId(event.target.value);
  };

  const cambiarTitulo = (event) => {
    cambioTitulo(event.target.value);
  };

  const guardar = () => {
    const nueva_tarea = {
      userID: usuario_id,
      title: titulo,
      completed: false,
    };

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id,
      };
      editar(tarea_editada);
    } else agregar(nueva_tarea);
  };

  const deshabilitar = () => {
    if (cargando) return true;
    if (!usuario_id || !titulo) return true;
    return false;
  };

  const mostrarAccion = () => {
    if (cargando) return <Spinner />;
    if (error) return <Fatal mensaje={error} />;
  };

  return (
    <div>
      {regresar ? <Navigate to="/tareas" /> : ""}
      <h1>Guardar Tarea</h1>
      Usuario id:
      <input
        type="number"
        value={usuario_id}
        onChange={cambiarUsuarioId}
      />
      <br />
      <br />
      Titulo:
      <input value={titulo} onChange={cambiarTitulo} />
      <br />
      <br />
      <button onClick={guardar} disabled={deshabilitar()}>
        Guardar
      </button>
      {mostrarAccion()}
    </div>
  );
};

export default Guardar;
