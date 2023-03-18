import { GasStationList } from "../types/gouvData.types";

const getData = async (limits: number): Promise<GasStationList> => {
  const fetchResult = await fetch(
    "https://data.economie.gouv.fr/api/v2/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?limit=10&offset=0&timezone=UTC",
    {
      method: "GET",
    },
  );
  const jsonResult: Promise<GasStationList> = await fetchResult.json();

  return jsonResult;
};

export default getData;
