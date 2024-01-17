import { GeoReverse } from "../../constants/geoReverse";
import makeRequest from "../../services/request.services";

const getCodeFromCoords = async (coords: [number, number]): Promise<string> => {
  const res = await makeRequest<{ features: Array<GeoReverse> }>(
    `https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/reverse?lon=${coords[0].toString()}&lat=${coords[1].toString()}&index=poi&limit=5`,
    "GET",
    "GeoServices",
  );

  let departement_code = "01";
  if (res) {
    res.features.forEach(element => {
      if (
        element.properties.city &&
        element.properties.city.length > 0 &&
        element.properties.citycode &&
        element.properties.citycode.length > 0
      ) {
        element.properties.citycode.forEach(code => {
          if (code?.length == 2) {
            departement_code = code.toString();
          }
        });
      }
    });
  }
  return departement_code;
};

export default getCodeFromCoords;
