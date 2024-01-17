export interface GeoReverse {
  type: "Feature";
  properties: {
    citycode: [string | null, string | null];
    city: [string | null];
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}
