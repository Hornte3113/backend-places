//recibe la petición HTTP, valida los parámetros de entrada
// y deste solo le da la logica al service

import { Request, Response, NextFunction } from "express";
import { searchPlaces, getPlaceById, getPlacePhoto } from "../services/places.service";


// POST /api/places/search

 
export async function searchPlacesController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { textQuery, maxResultCount } = req.body as {
      textQuery?: string;
      maxResultCount?: number;
    };

    if (!textQuery || typeof textQuery !== "string" || textQuery.trim() === "") {
      res.status(400).json({
        success: false,
        error: "El campo 'textQuery' es requerido y no puede estar vacío.",
      });
      return;
    }

    const places = await searchPlaces({
      textQuery: textQuery.trim(),
      maxResultCount,
    });

    res.status(200).json({
      success: true,
      data: places,
    });
  } catch (error) {
    next(error);
  }
}


//GET /api/places/photo/*photoName?maxWidth=800

export async function getPlacePhotoController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    
    const photoName = (req.params as Record<string, string>)[0];
    const maxWidth = parseInt((req.query.maxWidth as string) ?? "800", 10);

    if (!photoName) {
      res.status(400).json({
        success: false,
        error: "El parámetro 'photoName' es requerido.",
      });
      return;
    }

    if (isNaN(maxWidth) || maxWidth < 1 || maxWidth > 4800) {
      res.status(400).json({
        success: false,
        error: "El parámetro 'maxWidth' debe ser un número entre 1 y 4800.",
      });
      return;
    }

    const { buffer, contentType } = await getPlacePhoto(photoName, maxWidth);

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400"); 
    res.status(200).send(buffer);
  } catch (error) {
    next(error);
  }
}


 //GET /api/places/:placeId

export async function getPlaceController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { placeId } = req.params;

    if (!placeId) {
      res.status(400).json({
        success: false,
        error: "El parámetro 'placeId' es requerido.",
      });
      return;
    }

    const place = await getPlaceById({ placeId });

    res.status(200).json({
      success: true,
      data: place,
    });
  } catch (error) {
    next(error);
  }
}
