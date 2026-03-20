# act6-c2-backend

Backend proxy para Google Places API (New) — ACT6-C2 AWOS  
**Universidad Politécnica de Chiapas**

## Arquitectura

```
src/
├── config/
│   ├── env.ts          → Carga y valida variables de entorno
│   └── cors.ts         → Política CORS (orígenes permitidos)
├── controllers/
│   └── places.controller.ts  → Recibe req, valida, llama al service
├── services/
│   └── places.service.ts     → Toda la lógica con Google Places API
├── routes/
│   └── places.routes.ts      → Define rutas del recurso /places
├── middlewares/
│   ├── requestLogger.ts      → Log de peticiones entrantes
│   └── errorHandler.ts       → Manejador global de errores
├── types/
│   └── places.types.ts       → Interfaces y tipos TypeScript
├── app.ts             → Configuración de Express
└── server.ts          → Punto de entrada (levanta el HTTP server)
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Health check del servicio |
| POST | `/api/places/search` | Buscar lugares por texto |
| GET | `/api/places/:placeId` | Detalle de un lugar por ID |

### POST `/api/places/search`
```json
// Request body
{ "textQuery": "restaurantes en Tuxtla Gutiérrez", "maxResultCount": 12 }

// Response
{ "success": true, "data": [ ...lugares ] }
```

## Setup local

```bash
# 1. Clonar e instalar
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu API Key de Google Places

# 3. Correr en desarrollo
npm run dev
```

## Variables de entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `PORT` | Puerto del servidor (default: 3001) | No |
| `GOOGLE_PLACES_API_KEY` | API Key de Google Places (New) | **Sí** |
| `FRONTEND_URL` | URL del frontend permitido por CORS | No |
