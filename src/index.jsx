import React from "react";
import { createRoot } from 'react-dom/client';
import "./css/index.css";
import "./css/iconos.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import usuariosReducer from "./slices/usuariosSlices";
import publicacionesReducer from "./slices/publicacionesSlices";
import tareasReducer from "./slices/tareasSlices";

const store = configureStore(
  {
    reducer: {
      usuariosReducer,
      publicacionesReducer,
      tareasReducer,
    }
  }
)

const container = document.getElementById('root');
createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>
);
