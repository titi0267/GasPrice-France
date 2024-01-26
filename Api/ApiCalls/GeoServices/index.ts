import { DepartmentCodes } from "../../constants/departmentCodes";
import { GeoCodingList } from "../../constants/geoCodingList";
import { GeoReverse } from "../../constants/geoReverse";
import makeRequest from "../../services/request.services";

const getCodeFromCoords = async (coords: [number, number]): Promise<string> => {
  console.log(coords);
  const res = await makeRequest<Array<DepartmentCodes>>(
    `https://geo.api.gouv.fr/communes?lon=${coords[0].toString()}&lat=${coords[1].toString()}`,
    "GET",
    "GeoServices",
  );
  let departement_code = "01";
  console.log(res);

  if (res && res.length == 1) {
    departement_code = res[0].codeDepartement;
  }

  return departement_code;
};

export default getCodeFromCoords;
