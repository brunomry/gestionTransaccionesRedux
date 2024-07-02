import React from "react";
import { Card } from "react-bootstrap";

const CardTransaccion = ({ transaccion }) => {
  return (
    <Card className="py-2 cardTransaction shadow">
      <Card.Body>
        <div className="d-flex justify-content-center mb-3">
          <Card.Text className="fw-bold text-uppercase sizeText">{transaccion.categoria}</Card.Text>
        </div>
        <Card.Text className="sizeText">{transaccion.fecha}</Card.Text>
        <Card.Text className="sizeText">{transaccion.descripcion}</Card.Text>

        <div className="d-flex justify-content-between">
          <Card.Text className="sizeText">
            {" "}
            {transaccion.tipoTransaccion} - ${transaccion.monto}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardTransaccion;
