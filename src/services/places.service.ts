// aqui esta toda la lógica de comunicación con  la api de Goolge
//llama a este servicio y espera el resultado.
import { env } from "../config/env";
import {
  GooglePlace,
  GoogleSearchResponse,
  SearchPlacesParams,
  GetPlaceParams,
} from "../types/places.types";

const GOOGLE_PLACES_BASE_URL = "https://places.googleapis.com/v1";

// Campos que solicitamos a Google 
const SEARCH_FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.rating",
  "places.userRatingCount",
  "places.types",
  "places.regularOpeningHours",
  "places.photos",
  "places.priceLevel",
  "places.businessStatus",
  "places.internationalPhoneNumber",
  "places.websiteUri",
].join(",");

const DETAIL_FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "location",
  "rating",
  "userRatingCount",
  "types",
  "regularOpeningHours",
  "photos",
  "priceLevel",
  "businessStatus",
  "internationalPhoneNumber",
  "websiteUri",
].join(",");


//Busca lugares por texto usando Google Places Text Search

export async function searchPlaces(
  params: SearchPlacesParams
): Promise<GooglePlace[]> {
  const { textQuery, maxResultCount = 12, languageCode = "es" } = params;

  const response = await fetch(`${GOOGLE_PLACES_BASE_URL}/places:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": env.googlePlacesApiKey,
      "X-Goog-FieldMask": SEARCH_FIELD_MASK,
    },
    body: JSON.stringify({ textQuery, maxResultCount, languageCode }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Google Places API error [${response.status}]: ${errorBody}`
    );
  }

  const data = (await response.json()) as GoogleSearchResponse;
  return data.places ?? [];
}

//Obtiene los detalles de un lugar por su ID
export async function getPlaceById(
  params: GetPlaceParams
): Promise<GooglePlace> {
  const { placeId } = params;

  const response = await fetch(
    `${GOOGLE_PLACES_BASE_URL}/places/${placeId}`,
    {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": env.googlePlacesApiKey,
        "X-Goog-FieldMask": DETAIL_FIELD_MASK,
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Google Places API error [${response.status}]: ${errorBody}`
    );
  }

  return (await response.json()) as GooglePlace;
}

// Obtiene la imagen de una foto de Google Places y la retorna como buffer
export async function getPlacePhoto(
  photoName: string,
  maxWidthPx = 800
): Promise<{ buffer: Buffer; contentType: string }> {
  const url =
    `${GOOGLE_PLACES_BASE_URL}/${photoName}/media` +
    `?maxWidthPx=${maxWidthPx}&skipHttpRedirect=true&key=${env.googlePlacesApiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Google Places API error [${response.status}]: ${errorBody}`
    );
  }

  // La API devuelve un JSON con photoUri 
  const data = (await response.json()) as { photoUri: string };

  if (!data.photoUri) {
    throw new Error("Google Places API no devolvió photoUri");
  }

  // Descargamos la imagen real desde photoUri
  const imageResponse = await fetch(data.photoUri);

  if (!imageResponse.ok) {
    throw new Error(`Error al descargar la imagen [${imageResponse.status}]`);
  }

  const arrayBuffer = await imageResponse.arrayBuffer();
  const contentType = imageResponse.headers.get("content-type") ?? "image/jpeg";

  return { buffer: Buffer.from(arrayBuffer), contentType };
}
