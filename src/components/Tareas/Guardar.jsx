import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as tareasActions from "../../actions/tareasActions";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import { Navigate, useParams } from "react-router-dom";

const Guardar = (props) => {
  const params = useParams();
  const usu_id = params.usu_id;
  const tar_id = params.tar_id;

  useEffect(() => {
    const { tareas, cambioUsuarioId, cambioTitulo, limpiarForma } = props;

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    } else {
      limpiarForma();
    }
  }, [params]);
  const cambioUsuarioId = (event) => {
    props.cambioUsuarioId(event.target.value);
  };

  const cambioTitulo = (event) => {
    props.cambioTitulo(event.target.value);
  };

  const guardar = () => {
    const {
      tareas,
      usuario_id,
      titulo,
      agregar,
      editar,
    } = props;

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
    const { usuario_id, titulo, cargando } = props;
    if (cargando) return true;
    if (!usuario_id || !titulo) return true;
    return false;
  };

  const mostrarAccion = () => {
    const { error, cargando } = props;
    if (cargando) return <Spinner />;
    if (error) return <Fatal mensaje={error} />;
  };

  return (
    <div>
      {props.regresar ? <Navigate to="/tareas" /> : ""}
      <h1>Guardar Tarea</h1>
      Usuario id:
      <input
        type="number"
        value={props.usuario_id}
        onChange={cambioUsuarioId}
      />
      <br />
      <br />
      Titulo:
      <input value={props.titulo} onChange={cambioTitulo} />
      <br />
      <br />
      <button onClick={guardar} disabled={deshabilitar()}>
        Guardar
      </button>
      {mostrarAccion()}
    </div>
  );
};

const mapStateToProps = ({ tareasReducer }) => tareasReducer;
export default connect(mapStateToProps, tareasActions)(Guardar);
