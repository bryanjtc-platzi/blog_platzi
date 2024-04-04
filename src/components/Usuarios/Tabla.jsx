import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Tabla = () => {
  const { usuarios } = useSelector(state => state.usuariosReducer);
  const ponerfilas = () =>
    usuarios.map((usuario, key) => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
        <td>
          <Link to={`/publicaciones/${key}`}><div className="eye-solid icon"></div></Link>
        </td>
      </tr>
    ));
  return (
    <div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>{ponerfilas()}</tbody>
      </table>
    </div>
  );
};

export default Tabla;
