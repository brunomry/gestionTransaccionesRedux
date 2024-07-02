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
import { useForm } from "react-hook-form";

const FormularioTransaccion = ({ editar, crear, title }) => {
  // const [transaccion, setTransaccion] = useState({
  //   descripcion: "",
  //   monto: "",
  //   categoria: "",
  //   tipoTransaccion: "",
  //   fecha: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setTransaccion({
  //     ...transaccion,
  //     [name]: value,
  //   });
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  const listaTransacciones = useSelector((state) => state.transacciones);

  useEffect(() => {
    if (editar) {
      cargarTransaccion();
    }
  }, []);

  const cargarTransaccion = () => {
    const transaccionBuscada = listaTransacciones.find(
      (t) => t.id === parseInt(id)
    );
    if (transaccionBuscada) {
      // setTransaccion(transaccionBuscada);
      setValue("descripcion", transaccionBuscada.descripcion);
      setValue("monto", transaccionBuscada.monto);
      setValue("categoria", transaccionBuscada.categoria);
      setValue("tipoTransaccion", transaccionBuscada.tipoTransaccion);
      setValue("fecha", transaccionBuscada.fecha);
    }
  };

  const dispatch = useDispatch();

  const handleTransaccion = () => {
    const transaccion = getValues();
    console.log(transaccion);
    const nuevaTransaccion = {
      id: Math.floor(Math.random() * 1000),
      ...transaccion,
    };

    if (crear) {
      dispatch(agregarTransaccion(nuevaTransaccion));

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
    reset();
  };

  return (
    <section className="container-fluid d-flex justify-content-center px-0">
      <article className="containerLeft mx-auto my-5 px-2 px-sm-5">
        <div className="d-flex justify-content-center">
          <Form
            className="row formTransaction pt-3 pt-lg-5 px-lg-3 bg-white rounded-2 shadow"
            onSubmit={handleSubmit(handleTransaccion)}
          >
            <h1 className="text-center mb-5">{title}</h1>
            <p className={crear ? "size text" : "d-none"}>
              Ingresa los datos de la transacción a continuación.
            </p>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium" htmlFor="descripcion">Descripción:</Form.Label>
              <Form.Control
                id="descripcion"
                className="inputDescription sizeText"
                type="text"
                as="textarea"
                name="descripcion"
                placeholder="descripcion"
                {...register("descripcion", {
                  required: "Campo obligatorio",
                  minLength: {
                    value: 10,
                    message:
                      "La descripción debe tener como mínimo 10 caracteres",
                  },
                  maxLength: {
                    value: 100000,
                    message:
                      "La descripción debe tener como máximo 200 caracteres",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.descripcion?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="col-md-6 col-xl-4 mb-3">
              <Form.Label className="fw-medium" htmlFor="monto">Monto:</Form.Label>
              <Form.Control
                id="monto"
                className="sizeText"
                type="number"
                name="monto"
                placeholder="100000"
                {...register("monto", {
                  required: "Campo obligatorio",
                  min: {
                    value: 500,
                    message: "El mínimo debe superar los 500",
                  },
                  max: {
                    value: 100000,
                    message: "El máximo no debe superar los 100000",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.monto?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="col-md-6 col-xl-8 mb-3">
              <Form.Label className="fw-medium" htmlFor="categoria">Categoría:</Form.Label>
              <Form.Control
                id="categoria"
                className="sizeText"
                type="text"
                placeholder="categoría"
                name="categoria"
                {...register("categoria", {
                  required: "Campo obligatorio",
                  min: {
                    value: 500,
                    message: "La categoría debe tener como mínimo 2 caracteres",
                  },
                  max: {
                    value: 200,
                    message:
                      "La categoría debe tener comó máximo 15 caracteres",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.categoria?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="col-md-6  mb-3">
              <Form.Label className="fw-medium" htmlFor="tipo">
                Tipo de transacción:
              </Form.Label>
              <Form.Select
                id="tipo"
                className="sizeText"
                name="tipoTransaccion"
                {...register("tipoTransaccion", {
                  required: "Campo obligatorio",
                })}
              >
                <option value="">seleccione</option>
                <option value="Ingreso">Ingreso</option>
                <option value="Gasto">Gasto</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.tipoTransaccion?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="col-md-6  mb-5">
              <Form.Label className="fw-medium" htmlFor="fecha">Fecha:</Form.Label>
              <Form.Control
                id="fecha"
                className="sizeText"
                type="date"
                name="fecha"
                {...register("fecha", {
                  required: "Campo obligatorio",
                })}
              />
              <Form.Text className="text-danger">
                {errors.fecha?.message}
              </Form.Text>
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
