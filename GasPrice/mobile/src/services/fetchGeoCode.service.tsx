import ENV from "../env";

const fetchGeoCode = async (body: {
  coords: [number, number];
}): Promise<string> => {
  const res = await fetch(`http://${ENV.host}:${ENV.portBack}/geoCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  //   console.log(await res)
  if (!res.ok) throw Error("Error on Geo services");
  //   const test = await res.json()
  //   console.log("res = " + test)
  return await res.json();
};

export default fetchGeoCode;
