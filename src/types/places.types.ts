
// TIPOS Y CONTRATOS DE DATOS 

/** Parámetros de lo que acepta el endpoint de búsqueda */
export interface SearchPlacesParams {
  textQuery: string;
  maxResultCount?: number;
  languageCode?: string;
}

/** Parámetros para obtener detalles de un lugar */
export interface GetPlaceParams {
  placeId: string;
}

/** Estructura de un lugar que devuelve google */
export interface GooglePlace {
  id: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  rating?: number;
  userRatingCount?: number;
  types?: string[];
  regularOpeningHours?: {
    openNow: boolean;
    weekdayDescriptions?: string[];
  };
  photos?: Array<{
    name: string;
    widthPx: number;
    heightPx: number;
  }>;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  priceLevel?: string;
  businessStatus?: string;
}

/** Respuesta de Google para searchText */
export interface GoogleSearchResponse {
  places: GooglePlace[];
}

/** Respuesta que nuestro backend devuelve al frontend */
export interface PlacesApiResponse {
  success: boolean;
  data?: GooglePlace[];
  error?: string;
}

export interface PlaceDetailApiResponse {
  success: boolean;
  data?: GooglePlace;
  error?: string;
}
