// ============================================================
// APP — Configuración central de Express
// Aquí se registran middlewares globales y rutas.
// Separado de server.ts para facilitar pruebas unitarias.
// ============================================================
import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";
import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";
import placesRouter from "./routes/places.routes";

const app = express();

// ── Middlewares globales ─────────────────────────────────────
app.use(cors(corsOptions));          // Control de orígenes permitidos
app.use(express.json());             // Parsear body JSON
app.use(requestLogger);              // Log de cada petición

// ── Health check ─────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "act6-c2-backend",
    timestamp: new Date().toISOString(),
  });
});

// ── Rutas de la API ───────────────────────────────────────────
app.use("/api/places", placesRouter);

// ── Ruta no encontrada ────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada",
  });
});

// ── Manejador global de errores (siempre al final) ────────────
app.use(errorHandler);

export default app;
