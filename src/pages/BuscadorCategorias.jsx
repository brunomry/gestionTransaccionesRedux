import React, { useState, useEffect } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import CardTransaccion from "../components/CardTransaccion";

const BuscadorCategorias = () => {
  const listaTransacciones = useSelector((state) => state.transacciones);

  const [categoria, setCategoria] = useState();
  const [transaccionesFiltradas, setTransaccionesFiltradas] = useState([]);

  const handleCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const filtrarPorCategoria = () => {
    const transaccionesEncontradas = listaTransacciones.filter(
      (t) => t.categoria === categoria
    );
    setTransaccionesFiltradas(transaccionesEncontradas);
  };

  useEffect(() => {
    filtrarPorCategoria();
  }, [categoria]);

  return (
    <section className="my-5 container d-flex flex-column align-items-center">
      <h1 className="text-center mb-5">Buscar por Categoría</h1>
      <Form className="formCategory d-flex justify-content-center sizeText">
        <FormGroup>
          <Form.Label htmlFor="categoria">Selecciona una categoría</Form.Label>
          <Form.Select
            id="categoria"
            value={categoria}
            onChange={handleCategoria}
            className="selectCategory"
          >
            <option value="">seleccione</option>
            {listaTransacciones.length > 0 &&
              listaTransacciones.map((t, i) => (
                <option key={i} value={t.categoria}>
                  {t.categoria}
                </option>
              ))}
          </Form.Select>
        </FormGroup>
      </Form>
      <article className="mt-3 rounded-2 px-2 py-3 p-sm-5">
        <h2 className="mb-4 text-center">
          {categoria ? `Resultados de categoría "${categoria}"` : "Resultados"}
        </h2>
        <p className={categoria ? `d-none` : `d-block text-center sizeText`}>
          Aún no seleccionaste ninguna categoría
        </p>
        <div className="d-flex gap-3 flex-wrap">
          {transaccionesFiltradas.map((t) => (
            <CardTransaccion key={t.id} transaccion={t}></CardTransaccion>
          ))}
        </div>
      </article>
    </section>
  );
};

export default BuscadorCategorias;
