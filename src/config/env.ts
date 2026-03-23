// ============================================================
// CONFIGURACIÓN DE VARIABLES DE ENTORNO
// Centraliza y valida todas las env vars en un solo lugar.
// El resto de la app importa desde aquí, NUNCA desde process.env
// ============================================================
import dotenv from "dotenv";

dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Variable de entorno requerida no encontrada: ${key}`);
  }
  return value;
}

export const env = {
  port: parseInt(process.env.PORT ?? "3001", 10),
  googlePlacesApiKey: requireEnv("GOOGLE_PLACES_API_KEY"),
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV ?? "development",
};
