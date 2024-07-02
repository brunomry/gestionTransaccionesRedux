import React from "react";
import img from "../assets/imgHome.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="container-fluid d-flex px-0">
      <article className="w-50 d-none d-lg-block">
        <img src={img} alt="" className="imgHome" />
      </article>
      <article className="containerLeft mx-auto my-5 px-3 px-sm-5">
        <h1 className="text-center mb-5">Gestión de Transacciones</h1>

        <div className="d-flex justify-content-center">
          <article className="px-2 px-md-5 d-flex flex-column gap-3 justify-content-center align-items-center rounded-2 bg-white optionsManagement shadow">
            <Link
              to={"/crear"}
              className="btn px-2 px-md-5 btnOption sizeText w-75"
            >
              Nueva Transacción
            </Link>
            <Link
              to={"/transacciones"}
              className="btn px-2 px-md-5 btnOption sizeText w-75"
            >
              Transacciones realizadas
            </Link>
            <Link
              to={"/resumen"}
              className="btn px-2 px-md-5 btnOption sizeText w-75"
            >
              Resumen y Balance
            </Link>
            <Link
              to={"/categorias"}
              className="btn px-2 px-md-5 btnOption sizeText w-75"
            >
              Buscar por Categoría
            </Link>
          </article>
        </div>
      </article>
    </section>
  );
};

export default Home;
