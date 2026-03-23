// ============================================================
// CONFIGURACIÓN DE CORS
// Solo el frontend autorizado puede consumir este backend.
// Esto protege contra peticiones desde orígenes no permitidos.
// ============================================================
import { CorsOptions } from "cors";
import { env } from "./env";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Permitir peticiones sin origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      env.frontendUrl,
      "http://localhost:3000",
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origen no permitido → ${origin}`));
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
