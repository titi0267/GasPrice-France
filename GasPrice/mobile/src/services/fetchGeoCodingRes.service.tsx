import ENV from "../env";
import { GeoCodingData } from "@/types/geoCoding.type";

const fetchGeoCodingResults = async (body: {
  adress: string;
}): Promise<GeoCodingData[]> => {
  const res = await fetch(`http://${ENV.host}:${ENV.portBack}/geoCoding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw Error("Error on geocoding services");

  return await res.json();
};

export default fetchGeoCodingResults;
