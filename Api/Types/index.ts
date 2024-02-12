interface CustomGeoJson {
  type: "Feature";
  geometry: {
    coordinates: [number, number][];
    type: string;
  };
  legs?: {}[];
  weight_name?: string;
  weight?: number;
  duration?: number;
  distance?: number;
}

export interface OsrmType {
  code: "OK" | unknown;
  routes: CustomGeoJson[];
  waypoints: [];
}
