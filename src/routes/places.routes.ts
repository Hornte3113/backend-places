//es donde defino las rutas del recurso /places y conecta
// con sus controllers correspondientes.

import { Router } from "express";
import {
  searchPlacesController,
  getPlaceController,
  getPlacePhotoController,
} from "../controllers/places.controller";

const router = Router();


router.post("/search", searchPlacesController);

router.get("/photo/*", getPlacePhotoController);

router.get("/:placeId", getPlaceController);

export default router;
