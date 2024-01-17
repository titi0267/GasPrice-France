import { GeoCodingList } from "../../constants/geoCodingList";
import makeRequest from "../../services/request.services";

const autoCompleteAdress = async (adress: string) => {
  const autoCompleteResult = await makeRequest<{
    features: Array<GeoCodingList>;
  }>(
    `https://api-adresse.data.gouv.fr/search/?q=${adress}&limit=20`,
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

export { autoCompleteAdress };
