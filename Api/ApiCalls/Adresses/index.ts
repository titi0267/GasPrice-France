import { GeoCodingList } from "../../constants/geoCodingList";
import makeRequest from "../../services/request.services";
import * as fs from "fs";

interface Cities {
  cities: { departement: string; communes: string[] }[];
}

const rawData = fs.readFileSync("public/data/cities.json", "utf-8");
const data: Cities = JSON.parse(rawData);

const autoCompleteAdress = (adress: string) => {
  const filteredData = data.cities.map(departments =>
    departments.communes.filter((city, index) => {
      const queryString = adress
        .toLowerCase()
        .replace("-", " ")
        .replace("'", " ")
        .replace("è", "e")
        .replace("é", "e")
        .replace("ï", "i")
        .replace("î", "i")
        .replace("â", "a")
        .replace("ô", "o")
        .replace("ê", "e")
        .replace("ë", "e")
        .replace("œ", "oe");

      const initialString = city
        .replace("-", " ")
        .replace("'", " ")
        .replace("è", "e")
        .replace("é", "e")
        .replace("ï", "i")
        .replace("î", "i")
        .replace("â", "a")
        .replace("ô", "o")
        .replace("œ", "oe")
        .replace("ê", "e")
        .replace("ë", "e");
      if (initialString.startsWith(queryString))
        return departments.communes[index];
    }),
  );
  let combinedArray = ([] as string[]).concat(...filteredData);

  return combinedArray.slice(0, 20);
};

const getLocationByName = async (adress: string) => {
  const cityResult = await makeRequest<{
    features: Array<GeoCodingList>;
  }>(
    `https://api-adresse.data.gouv.fr/search/?q=${adress}&type=municipality&limit=20`,
    "GET",
    "api-adresse.data.gouv.fr",
  );

  const refineResult = cityResult.features.map((loc: GeoCodingList) => {
    return {
      label: loc.properties.label,
      geometry: `${loc.geometry.coordinates[0]},${loc.geometry.coordinates[1]}`,
    };
  });

  return refineResult[0];
};

export { autoCompleteAdress, getLocationByName };
