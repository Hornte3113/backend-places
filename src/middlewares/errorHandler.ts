// ============================================================
// MIDDLEWARE — Manejador Global de Errores
// Captura cualquier error no controlado y devuelve una
// respuesta JSON limpia. El frontend NUNCA debe recibir un
// stack trace en producción.
// ============================================================
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? 500;

  console.error(`[ERROR] ${err.message}`);

  res.status(statusCode).json({
    success: false,
    error:
      env.nodeEnv === "production"
        ? "Error interno del servidor"
        : err.message,
  });
}
