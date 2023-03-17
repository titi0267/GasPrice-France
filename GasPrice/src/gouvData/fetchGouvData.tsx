import { GasStationList } from "@/types/gouvData.types";

const getData = async (): Promise<GasStationList> => {
    const fetchResult = await fetch('https://data.economie.gouv.fr/api/v2/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?limit=10&offset=0&timezone=UTC', {
        method: 'GET'
    });
    const jsonResult: GasStationList = await fetchResult.json();
    
    console.log(jsonResult.links)
    if (jsonResult.records)
        throw Error("Failed to fetch data !")

    return (jsonResult);
}

export default getData;