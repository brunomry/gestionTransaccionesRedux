import { configureStore } from "@reduxjs/toolkit";
import transaccionesSlice from "../slices/transaccionesSlice";

export const store = configureStore({
    reducer:{
        transacciones: transaccionesSlice
    }
})