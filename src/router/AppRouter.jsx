import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transacciones from "../pages/Transacciones";
import Categorias from "../pages/BuscadorCategorias";
import Menu from "../components/common/Menu";
import FormularioTransaccion from "../components/FormularioTransaccion";
import BuscadorCategorias from "../pages/BuscadorCategorias";
import Home from "../pages/Home";
import Resumen from "../pages/Resumen";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Menu></Menu>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/transacciones"
          element={<Transacciones></Transacciones>}
        ></Route>
        <Route
          
          path="/crear"
          element={
            <FormularioTransaccion
              title="Agregar Transacción"
              crear="true"
            ></FormularioTransaccion>
          }
        ></Route>

        <Route
          path="/editar/:id"
          element={
            <FormularioTransaccion
              title="Editar Transacción"
              editar="true"
            ></FormularioTransaccion>
          }
        ></Route>
        <Route
          path="/categorias"
          element={<BuscadorCategorias></BuscadorCategorias>}
        ></Route>
        <Route
          path="/resumen"
          element={<Resumen></Resumen>}
        ></Route>
        <Route path="/categorias" element={<Categorias></Categorias>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
