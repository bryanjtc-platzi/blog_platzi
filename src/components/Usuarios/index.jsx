import React, { useEffect } from "react";
import {  useSelector } from "react-redux";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import Tabla from "./Tabla";
import { useTraerTodos } from "../../hooks/usuariosHooks";

const Usuarios = (props) => {
  const { usuarios, cargando, error } = useSelector(state => state.usuariosReducer);
  const traerTodos = useTraerTodos();

  useEffect(() => {
    if (!usuarios.length) traerTodos();
  }, [usuarios, traerTodos]);

  const ponerContenido = () => {
    if (cargando) {
      return <Spinner />;
    }
    if (error) {
      return <Fatal mensaje={error} />;
    }
    return <Tabla />;
  };

  return (
    <div>
      <h1>Usuarios</h1>
      {ponerContenido()}
    </div>
  );
};

export default Usuarios;
