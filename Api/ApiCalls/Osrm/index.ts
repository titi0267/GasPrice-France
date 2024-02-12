import makeRequest from "../../services/request.services";
import ENV from "../../env";
import { GeoJsonType } from "../../constants/geoJson";
import { OsrmType } from "../../Types";

const generateGeoJsonCoordinates = async (start: string, end: string) => {
  const generationResult = await makeRequest<OsrmType>(
    `http://router.project-osrm.org/route/v1/driving/${start};${end}?alternatives=2&geometries=geojson&overview=full`,
    "GET",
    "osrm",
  );

  generationResult.routes.forEach(route => {
    route.type = "Feature";
    delete route?.legs;
  });

  return generationResult.routes;
};
export { generateGeoJsonCoordinates };
