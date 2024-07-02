import React from "react";
import { useDispatch } from "react-redux";
import { eliminarTransaccion } from "../slices/transaccionesSlice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ItemTransaccion = ({ transaccion }) => {
  const dispatch = useDispatch();

  const borrarTransaccion = (id) => {
    Swal.fire({
      title: "¿Estás seguro que quieres eliminar la transacción?",
      text: "No podrás revertir esta operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarTransaccion(id));
        Swal.fire({
          title: "Transacción eliminada",
          text: "La transacción fue eliminada.",
          showConfirmButton: false,
          timer: 2000,
          icon: "success",
        });
      }
    });
  };

  return (
    <tr className="sizeText">
      <td>{transaccion.categoria}</td>
      <td>{transaccion.descripcion}</td>
      <td>{transaccion.tipoTransaccion}</td>
      <td>{transaccion.monto}</td>
      <td>{transaccion.fecha}</td>
      <td className="d-flex flex-column flex-lg-row gap-2 justify-content-center align-items-center h-100">
        <Link
          className="btn btn-warning"
          title="editar"
          to={`/editar/${transaccion.id}`}
        >
          <i className="bi bi-pencil-square text-dark fs-5"></i>
        </Link>
        <button
          className="btn btn-danger"
          title="eliminar"
          onClick={() => borrarTransaccion(transaccion.id)}
        >
          <i className="bi bi-trash3 fs-5 text-white"></i>
        </button>
      </td>
    </tr>
  );
};

export default ItemTransaccion;
