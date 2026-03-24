
// aqui esta la cofiguracion cde express
// se registran middlewares globales y rutas.

import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";
import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";
import placesRouter from "./routes/places.routes";

const app = express();


app.use(cors(corsOptions));          // primero valida el origen de la peticio
app.use(express.json());             // parsear body JSON
app.use(requestLogger);              // Loggea cada peticion
//  Health check 
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "act6-c2-backend",
    timestamp: new Date().toISOString(),
  });
});

//  Rutas de la API 
app.use("/api/places", placesRouter);

// Ruta no encontrada 
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada",
  });
});

//Manejador global de errores 
app.use(errorHandler);

export default app;
