import makeRequest from "../../services/request.services";
import ENV from "../../env";
import { GeoCodingList } from "../../constants/geoCodingList";

const autoCompleteAdress = async (adress: string) => {
  const autoCompleteResult = await makeRequest<{
    features: Array<GeoCodingList>;
  }>(
    `https://api.openrouteservice.org/geocode/autocomplete?api_key=${ENV.openRouteServiceApiKey}&text=${adress}&boundary.country=FR`,
    "GET",
    "OpenRouteService",
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
    if (maxResult > 10) return;
    refineResult.push({
      id: loc.properties.id,
      name: loc.properties.name,
      country: loc.properties.country,
      label: loc.properties.label,
      geometry: [loc.geometry.coordinates[0], loc.geometry.coordinates[1]],
    });
    maxResult += 1;
  });
  console.log(refineResult);
  return refineResult;
};

export default autoCompleteAdress;
