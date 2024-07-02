import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Resumen = () => {
  const listaTransacciones = useSelector((state) => state.transacciones);
  const [ingresos, setIngresos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [total, setTotal] = useState(0);

  const ingresosTotales = () => {
    let ingresos = 0;
    const lista = listaTransacciones.map((t) => {
      if (t.tipoTransaccion === "ingreso") {
        const monto = parseFloat(t.monto);
        ingresos += monto;
      }
    });
    setIngresos(ingresos);
  };

  const gastosTotales = () => {
    let gastos = 0;
    listaTransacciones.map((t) => {
      if (t.tipoTransaccion === "gasto") {
        const monto = parseFloat(t.monto);
        gastos += monto;
      }
    });
    setGastos(gastos);
  };

  useEffect(() => {
    ingresosTotales();
    gastosTotales();
  }, []);

  return (
    <section className="container my-5 d-flex justify-content-center">
      {listaTransacciones.length > 0 ? (
        <article className="rounded-2 px-2 py-3 p-sm-4 shadow bg-white summary">
          <h1 className="mb-5">Resumen Actual</h1>
          <p className="sizeText d-flex justify-content-between">
            <span className="fw-bold me-2">Total de Ingresos:</span>
            <span>{ingresos}</span>
          </p>
          <p className="sizeText d-flex justify-content-between">
            <span className="fw-bold me-2">Total de Gastos:</span>
            <span>{gastos}</span>
          </p>
          <p className="mt-5 sizeText d-flex flex-column align-items-center justify-content-between">
            <span className="fw-bold">Balance:</span>
            <span
              className={ingresos >= gastos ? "text-success" : "text-danger"}
            >
              {ingresos - gastos}
            </span>
          </p>
        </article>
      ) : (
        <section className="d-flex flex-column justify-content-center mt-5">
          <h1 className="mb-5">Resumen Actual</h1>
          <p className="sizeText">Aún no tienes transacciones registradas</p>
        </section>
      )}
    </section>
  );
};

export default Resumen;
