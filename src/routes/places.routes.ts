// ============================================================
// ROUTES — Places Router
// Define las rutas del recurso /places y las conecta
// con sus controllers correspondientes.
// ============================================================
import { Router } from "express";
import {
  searchPlacesController,
  getPlaceController,
  getPlacePhotoController,
} from "../controllers/places.controller";

const router = Router();

// POST /api/places/search → buscar lugares por texto
router.post("/search", searchPlacesController);

// GET /api/places/photo/places/:placeId/photos/:photoId?maxWidth=800 → imagen de un lugar
// Usa wildcard (*) para capturar el photoName completo (ej: "places/ChIJ.../photos/AXCi2Q...")
router.get("/photo/*", getPlacePhotoController);

// GET /api/places/:placeId → detalle de un lugar
router.get("/:placeId", getPlaceController);

export default router;
