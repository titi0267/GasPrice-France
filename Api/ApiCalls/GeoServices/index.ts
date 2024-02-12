import { DepartmentCodes } from "../../constants/departmentCodes";
import { GeoCodingList } from "../../constants/geoCodingList";
import { GeoReverse } from "../../constants/geoReverse";
import makeRequest from "../../services/request.services";

const getCodeFromCoords = async (coords: [number, number]): Promise<string> => {
  const res = await makeRequest<Array<DepartmentCodes>>(
    `https://geo.api.gouv.fr/communes?lon=${coords[1].toString()}&lat=${coords[0].toString()}`,
    "GET",
    "GeoServices",
  );
  let departement_code = "01";

  if (res && res.length == 1) {
    departement_code = res[0].codeDepartement;
  }

  return departement_code;
};

export default getCodeFromCoords;
