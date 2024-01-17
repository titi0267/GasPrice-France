import makeRequest from "../../services/request.services";
import ENV from "../../env";
import { GeoCodingList } from "../../constants/geoCodingList";
import { GeoJsonType } from "../../constants/geoJson";

const autoCompleteAdress = async (adress: string) => {
  const autoCompleteResult = await makeRequest<{
    features: Array<GeoCodingList>;
  }>(
    `https://api-adresse.data.gouv.fr/search/?q=${adress}&limit=100`,
    "GET",
    "api-adresse.data.gouv.fr",
  );

  const refineResult: {
    id: string;
    name: string;
    country: string;
    label: string;
    geometry: [number, number];
  }[] = [];

  let maxResult = 0;

  autoCompleteResult.features.map(loc => {
    if (maxResult > 50) return;
    refineResult.push({
      id: loc.properties.id,
      name: loc.properties.name,
      country: loc.properties.country,
      label: loc.properties.label,
      geometry: [loc.geometry.coordinates[0], loc.geometry.coordinates[1]],
    });
    maxResult += 1;
  });
  return refineResult;
};

//coords format 8.681495,49.41461
const generateGeoJsonCoordinates = async (start: string, end: string) => {
  const generationResult = await makeRequest<{ features: Array<GeoJsonType> }>(
    `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ENV.openRouteServiceApiKey}&start=${start}&end=${end}`,
    "GET",
    "OpenRouteService",
  );

  return generationResult.features;
};
export { autoCompleteAdress, generateGeoJsonCoordinates };
