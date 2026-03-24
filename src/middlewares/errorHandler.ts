// Captura cualquier error no controlado y devuelve una
// respuesta JSON limpia

import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
 
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
