import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  agregarTransaccion,
  editarTransaccion,
} from "../slices/transaccionesSlice";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";

const FormularioTransaccion = ({ editar, crear, title }) => {
  const [transaccion, setTransaccion] = useState({
    descripcion: "",
    monto: "",
    categoria: "",
    tipoTransaccion: "",
    fecha: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const listaTransacciones = useSelector((state) => state.transacciones);

  useEffect(() => {
    if (editar) {
      const transaccionBuscada = listaTransacciones.find(
        (t) => t.id === parseInt(id)
      );
      if (transaccionBuscada) {
        setTransaccion(transaccionBuscada);
      }
    }
  }, [editar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaccion({
      ...transaccion,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  const handleTransaccion = (e) => {
    e.preventDefault();

    const nuevaTransaccion = {
      id: Math.floor(Math.random() * 1000),
      descripcion: transaccion.descripcion,
      monto: transaccion.monto,
      categoria: transaccion.categoria,
      tipoTransaccion: transaccion.tipoTransaccion,
      fecha: transaccion.fecha,
    };

    if (crear) {
      dispatch(agregarTransaccion(nuevaTransaccion));

      console.log("transaccion agregada");

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "La transacción fue registrada con éxito",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    if (editar) {
      dispatch(editarTransaccion({ ...transaccion, id: parseInt(id) }));
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "La transacción fue modificada con éxito",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/transacciones");
      editar = false;
    }
    setTransaccion({
      descripcion: "",
      monto: "",
      categoria: "",
      tipoTransaccion: "",
      fecha: "",
    });
  };

  return (
    <section className="container-fluid d-flex justify-content-center px-0">
      <article className="containerLeft mx-auto my-5 px-2 px-sm-5">
        <div className="d-flex justify-content-center">
          <Form
            className="row formTransaction pt-3 pt-lg-5 px-lg-3 bg-white rounded-2 shadow"
            onSubmit={handleTransaccion}
          >
            <h1 className="text-center mb-5">{title}</h1>
            <p className={crear ? "size text" : "d-none"}>
              Ingresa los datos de la transacción a continuación.
            </p>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Descripción:</Form.Label>
              <Form.Control
                className="inputDescription sizeText"
                type="text"
                as="textarea"
                name="descripcion"
                placeholder="descripcion"
                onChange={handleChange}
                value={transaccion.descripcion}
                minLength={10}
                maxLength={200}
                required
              />
            </Form.Group>

            <Form.Group className="col-md-6 col-xl-4 mb-3">
              <Form.Label className="fw-medium">Monto:</Form.Label>
              <Form.Control
                className="sizeText"
                type="number"
                name="monto"
                placeholder="100000"
                onChange={handleChange}
                value={transaccion.monto}
                min={200}
                max={100000}
                required
              />
            </Form.Group>
            <Form.Group className="col-md-6 col-xl-8 mb-3">
              <Form.Label className="fw-medium">Categoría:</Form.Label>
              <Form.Control
                className="sizeText"
                type="text"
                placeholder="categoría"
                name="categoria"
                onChange={handleChange}
                value={transaccion.categoria}
                minLength={2}
                maxLength={20}
                required
              />
            </Form.Group>
            <Form.Group className="col-md-6  mb-3">
              <Form.Label className="fw-medium">
                Tipo de transacción:
              </Form.Label>
              <Form.Select
                className="sizeText"
                name="tipoTransaccion"
                value={transaccion.tipoTransaccion}
                onChange={handleChange}
                required
              >
                <option value="">seleccione</option>
                <option value="Ingreso">Ingreso</option>
                <option value="Gasto">Gasto</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-6  mb-5">
              <Form.Label className="fw-medium">Fecha:</Form.Label>
              <Form.Control
                className="sizeText"
                type="date"
                name="fecha"
                value={transaccion.fecha}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-center gap-3 mb-3">
              <Button type="submit" className="px-5 btn btn-success sizeText">
                Confirmar
              </Button>
              <Link
                to={"/transacciones"}
                type="submit"
                className="px-5 btn btn-secondary sizeText"
              >
                Cancelar
              </Link>
            </div>
          </Form>
        </div>
      </article>
    </section>
  );
};

export default FormularioTransaccion;
