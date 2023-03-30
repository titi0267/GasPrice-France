import { GasStationList } from "../types/gouvData.types";
import ENV from "../env";

const fetchGasStationList = async (body: {
  code_department: string;
}): Promise<GasStationList> => {
  const res = await fetch(`${ENV.host}/gasStations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw Error("Error on gas station services");

  return await res.json();
};

export default fetchGasStationList;
