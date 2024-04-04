import React from "react";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import { useSelector } from 'react-redux';

const Comentarios = (props) => {
  const error = useSelector(state => state.publicacionesReducer.com_error);
  const cargando = useSelector(state => state.publicacionesReducer.com_cargando);
  if (error) return <Fatal mensaje={error} />;
  if (cargando && !props.comentarios.length) return <Spinner />;
  const ponerComentarios = () =>
    props.comentarios.map((comentario) => (
      <li key={comentario.id}>
        <b>
          <u>{comentario.email}</u>
        </b>
        <br />
        {comentario.body}
      </li>
    ));
  return <ul>{ponerComentarios()}</ul>;
};

export default Comentarios;
