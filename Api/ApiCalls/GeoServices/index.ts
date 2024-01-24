import { GeoCodingList } from "../../constants/geoCodingList";
import { GeoReverse } from "../../constants/geoReverse";
import makeRequest from "../../services/request.services";

const getCodeFromCoords = async (coords: [number, number]): Promise<string> => {
  const res = await makeRequest<{ features: Array<GeoCodingList> }>(
    `https://api-adresse.data.gouv.fr/reverse?lon=${coords[0].toString()}&lat=${coords[1].toString()}&limit=1`,
    "GET",
    "GeoServices",
  );
  let departement_code = "01";

  if (res && res.features.length == 1) {
    departement_code = res.features[0].properties.id.substring(0, 2);
  }

  return departement_code;
};

export default getCodeFromCoords;
