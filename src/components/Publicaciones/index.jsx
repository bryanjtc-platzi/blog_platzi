import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import Comentarios from "./Comentarios";
import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const {
  traerPorUsuario: publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios,
} = publicacionesActions;

const Publicaciones = (props) => {
  const params = useParams();
  const key = params.key;

  useEffect(() => {
    const {
      usuariosTraerTodos,
      publicacionesTraerPorUsuario,
    } = props;

    if (!props.usuariosReducer.usuarios.length) {
      usuariosTraerTodos();
    }
    if (props.usuariosReducer.error) {
      return;
    }
    if (!("publicaciones_key" in props.usuariosReducer.usuarios[key]))
      publicacionesTraerPorUsuario(key);
  }, [params]);

  const ponerUsuario = () => {
    const {
      usuariosReducer,
    } = props;
    if (usuariosReducer.error) {
      return <Fatal mensaje={usuariosReducer.error} />;
    }
    if (!usuariosReducer.usuarios.length || usuariosReducer.cargando)
      return <Spinner />;
    const nombre = usuariosReducer.usuarios[key].name;
    return <h1>Publicaciones de {nombre}</h1>;
  };

  const ponerPublicaciones = () => {
    const {
      usuariosReducer,
      usuariosReducer: { usuarios },
      publicacionesReducer,
      publicacionesReducer: { publicaciones },
    } = props;
    if (!usuarios.length) return;
    if (usuariosReducer.error) return;
    if (publicacionesReducer.cargando) return <Spinner />;
    if (publicacionesReducer.error)
      return <Fatal mensaje={publicacionesReducer.error} />;
    if (!publicaciones.length) return;
    if (!("publicaciones_key" in usuarios[key])) return;
    const { publicaciones_key } = usuarios[key];
    return mostrarInfo(publicaciones[publicaciones_key], publicaciones_key);
  };

  const mostrarInfo = (publicaciones, pub_key) =>
    publicaciones.map((publicacion, com_key) => (
      <div
        className="pub_titulo"
        key={publicacion.id}
        onClick={() =>
          mostrarComentarios(pub_key, com_key, publicacion.comentarios)
        }
      >
        <h2>{publicacion.title}</h2>
        <h3>{publicacion.body}</h3>
        {publicacion.abierto ? (
          <Comentarios comentarios={publicacion.comentarios} />
        ) : (
          ""
        )}
      </div>
    ));

  const mostrarComentarios = (pub_key, com_key, comentarios) => {
    props.abrirCerrar(pub_key, com_key);
    if (!comentarios.length) {
      props.traerComentarios(pub_key, com_key);
    }
  };

  return (
    <div>
      {ponerUsuario()}
      {ponerPublicaciones()}
    </div>
  );
};

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return { usuariosReducer, publicacionesReducer };
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
