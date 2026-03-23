
// MIDDLEWARE — Request Logger
// Registra cada petición entrante: método, ruta y tiempo de respuesta.

import { Request, Response, NextFunction } from "express";

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now();
  const { method, url } = req;

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const color =
      status >= 500 ? "\x1b[31m" // rojo
      : status >= 400 ? "\x1b[33m" // amarillo
      : "\x1b[32m"; // verde

    console.log(
      `${color}[${new Date().toISOString()}] ${method} ${url} → ${status} (${duration}ms)\x1b[0m`
    );
  });

  next();
}
