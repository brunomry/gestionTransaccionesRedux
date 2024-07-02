import React from "react";
import { Table } from "react-bootstrap";
import ItemTransaccion from "../components/ItemTransaccion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Transacciones = () => {
  const listaTransacciones = useSelector((state) => state.transacciones);

  return (
    <section className="container-md my-5">
      <article className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-3">Transacciones</h1>
        <Link to={"/crear"} className="btn btn-primary" title="agregar">
          <i className="bi bi-plus-lg fs-5"></i>
        </Link>
      </article>

      <article className="rounded-2 px-2 py-3 p-sm-5 shadow bg-white ">
        <h3 className="mb-3">Gestión de transacciones</h3>
        <Table striped hover responsive className="text-center align-middle sizeText">
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listaTransacciones.map((transaccion) => (
              <ItemTransaccion
                key={transaccion.id}
                transaccion={transaccion}
              ></ItemTransaccion>
            ))}
          </tbody>
        </Table>
      </article>
    </section>
  );
};

export default Transacciones;
