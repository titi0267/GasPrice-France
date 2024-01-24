export interface GeoCodingList {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: geoCodingData;
  score: number;
}

interface geoCodingData {
  id: string;
  gid: string;
  layer: string;
  source: string;
  source_id: string;
  name: string;
  accuracy: string;
  country: string;
  counrty_gid: string;
  country_a: string;
  region: string;
  region_gid: string;
  region_a: string;
  continent: string;
  continent_gid: string;
  label: string;
  addendum: {
    geonames: {
      feature_code: string;
    };
  };
}
