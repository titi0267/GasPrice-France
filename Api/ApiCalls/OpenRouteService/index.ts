import makeRequest from "../../services/request.services";
import ENV from "../../env";
import { GeoJsonType } from "../../constants/geoJson";

//coords format 8.681495,49.41461
const generateGeoJsonCoordinates = async (start: string, end: string) => {
  const generationResult = await makeRequest<{ features: Array<GeoJsonType> }>(
    `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ENV.openRouteServiceApiKey}&start=${start}&end=${end}`,
    "GET",
    "OpenRouteService",
  );

  return generationResult.features;
};
export { generateGeoJsonCoordinates };
