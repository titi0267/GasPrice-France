import ENV from "@/env";
import { GeoJsonType } from "@/types/geoJson.type";

const fetchGeoJsonResults = async (body: {
  start: string;
  end: string;
}): Promise<GeoJsonType[]> => {
  const res = await fetch(`http://${ENV.host}:${ENV.portBack}/gasStations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw Error("Error on gas station services");

  return await res.json();
};

export default fetchGeoJsonResults;
