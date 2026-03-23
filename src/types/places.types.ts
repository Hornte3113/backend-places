
// TIPOS Y CONTRATOS DE DATOS — Google Places API (New)

/** Parámetros que acepta nuestro endpoint de búsqueda */
export interface SearchPlacesParams {
  textQuery: string;
  maxResultCount?: number;
  languageCode?: string;
}

/** Parámetros para obtener detalles de un lugar */
export interface GetPlaceParams {
  placeId: string;
}

/** Estructura de un lugar que devuelve Google */
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
