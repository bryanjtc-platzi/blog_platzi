import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import Usuarios from "./Usuarios/index.jsx";
import Publicaciones from "./Publicaciones";
import Tareas from "./Tareas";
import TareasGuardar from "./Tareas/Guardar";

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margen">
      <Routes>
        <Route exact path="/" element={<Usuarios/>} />
        <Route exact path="/tareas" element={<Tareas/>} />
        <Route exact path="/publicaciones/:key" element={<Publicaciones/>} />
        <Route exact path="/tareas/guardar" element={<TareasGuardar/>} />
        <Route
          exact
          path="/tareas/guardar/:usu_id/:tar_id"
          element={<TareasGuardar/>}
        />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
