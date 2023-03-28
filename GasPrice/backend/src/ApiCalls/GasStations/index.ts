import makeRequest from "../../services/request.services";
import {
  GasStationList,
  DatasetGasStation,
} from "../../constants/gasStationList";

const fetchGasStations = async (region: string, department: string) => {
  const fetchNumberOfResult = await makeRequest<{
    nhits: number;
  }>(
    `https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&q=&rows=0&facet=departement&facet=region&refine.region=${region}&refine.departement=${department}`,
    "GET",
    "gouv.data gas stations",
  );
  const fetchGasStations = await makeRequest<{
    nhits: number;
    //parameters: [];
    records: [DatasetGasStation];
  }>(
    `https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&q=&rows=${fetchNumberOfResult.nhits}&facet=departement&facet=region&refine.region=${region}&refine.departement=${department}`,
    "GET",
    "gouv.data gas stations",
  );

  return { nhits: fetchGasStations.nhits, records: fetchGasStations.records };
};

export default fetchGasStations;
