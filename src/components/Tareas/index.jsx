import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import { useSelector } from 'react-redux';
import { useTraerTodas, useCambioCheck, useEliminar } from "../../hooks/tareasHooks";

const Tareas = () => {
  const { tareas, error, cargando } = useSelector(state => state.tareasReducer);
  const traerTodas = useTraerTodas();
  const cambioCheck = useCambioCheck();
  const eliminar = useEliminar();

  useEffect(() => {
    if (!Object.keys(tareas).length) traerTodas();
  }, [tareas, traerTodas]);

  const mostrarContenido = () => {
    if (cargando) return <Spinner />;
    if (error) return <Fatal mensaje={error} />;
    return Object.keys(tareas).map((usu_id) => (
      <div key={usu_id}>
        <h2>Usuario {usu_id}</h2>
        <div className="contenedor-tareas">{ponerTareas(usu_id)}</div>
      </div>
    ));
  };

  const ponerTareas = (usu_id) => {
    const por_usuario = {
      ...tareas[usu_id],
    };
    return Object.keys(por_usuario).map((tar_id) => (
      <div key={tar_id}>
        <input
          type="checkbox"
          defaultChecked={por_usuario[tar_id].completed}
          onChange={() => cambioCheck(usu_id, tar_id)}
        />
        {por_usuario[tar_id].title}
        <button className="m_left">
          <Link to={`/tareas/guardar/${usu_id}/${tar_id}`}>Editar</Link>
        </button>
        <button className="m_left" onClick={() => eliminar(tar_id)}>
          Eliminar
        </button>
      </div>
    ));
  };

  return (
    <div>
      <button>
        <Link to="/tareas/guardar">Agregar</Link>
      </button>
      {mostrarContenido()}
    </div>
  );
};

export default Tareas;
