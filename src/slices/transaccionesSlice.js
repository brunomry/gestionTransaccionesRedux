import { createSlice } from "@reduxjs/toolkit";

const cargarTransacciones = () => {
  const transaccionesAlmacenadas = localStorage.getItem("transacciones");
  return transaccionesAlmacenadas ? JSON.parse(transaccionesAlmacenadas) : [];
};

const guardarTransacciones = (transacciones) => {
  localStorage.setItem("transacciones", JSON.stringify(transacciones));
};

const transaccionesSlice = createSlice({
  name: "transacciones",
  initialState: cargarTransacciones(),
  reducers: {
    agregarTransaccion: (state, action) => {
      state.push(action.payload);
      guardarTransacciones(state);
    },
    eliminarTransaccion: (state, action) => {
      const id = action.payload;
      const transaccionesFiltradas = state.filter(
        (transaccion) => transaccion.id !== id
      );
      guardarTransacciones(state);
      return transaccionesFiltradas;
    },
    editarTransaccion: (state, action) => {
      const { id, descripcion, monto, categoria, tipoTransaccion, fecha } = action.payload;
      const transaccionFiltrada = state.find(
        (transaccion) => transaccion.id === id
      );
      if (transaccionFiltrada) {
        transaccionFiltrada.descripcion = descripcion;
        transaccionFiltrada.monto = monto;
        transaccionFiltrada.categoria = categoria;
        transaccionFiltrada.tipoTransaccion = tipoTransaccion;
        transaccionFiltrada.fecha = fecha;
      }

      guardarTransacciones(state);
    },
  },
});

export const { agregarTransaccion, eliminarTransaccion, editarTransaccion } =
  transaccionesSlice.actions;
export default transaccionesSlice.reducer;
