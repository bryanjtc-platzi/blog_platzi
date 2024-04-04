import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import Comentarios from "./Comentarios";
import { useSelector } from 'react-redux';
import { useTraerTodos } from "../../hooks/usuariosHooks";
import { useAbrirCerrar, useTraerComentarios, useTraerPorUsuario } from "../../hooks/publicacionesHooks";

const Publicaciones = () => {
  const params = useParams();
  const { usuarios, error, cargando } = useSelector(state => state.usuariosReducer);
  const usuariosTraerTodos = useTraerTodos();
  const publicacionesTraerPorUsuario = useTraerPorUsuario();
  const abrirCerrar = useAbrirCerrar();
  const traerComentarios = useTraerComentarios();
  const { publicaciones, error: publicacionesError, cargando: publicacionesCargando } = useSelector(state => state.publicacionesReducer);
  const key = params.key;

  useEffect(() => {
    if (!usuarios.length) {
      usuariosTraerTodos();
    }
    if (error) {
      return;
    }
    if (!("publicaciones_key" in usuarios[key]))
      publicacionesTraerPorUsuario(key);
  }, [params]);

  const ponerUsuario = () => {
    if (error) {
      return <Fatal mensaje={error} />;
    }
    if (!usuarios.length || cargando)
      return <Spinner />;
    const nombre = usuarios[key].name;
    return <h1>Publicaciones de {nombre}</h1>;
  };

  const ponerPublicaciones = () => {
    if (!usuarios.length) return;
    if (error) return;
    if (publicacionesCargando) return <Spinner />;
    if (publicacionesError)
      return <Fatal mensaje={publicacionesError} />;
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
    abrirCerrar(pub_key, com_key);
    if (!comentarios.length) {
      traerComentarios(pub_key, com_key);
    }
  };

  return (
    <div>
      {ponerUsuario()}
      {ponerPublicaciones()}
    </div>
  );
};

export default Publicaciones;
