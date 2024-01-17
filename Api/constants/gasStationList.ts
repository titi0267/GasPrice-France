export interface GasStationList {
  nhits: number;
  //parameters: [];
  records: [DatasetGasStation];
}

export interface DatasetGasStation {
  datasetid: string;
  recordid: string;
  fields: GasStationData;
  geometry: {
    type: string;
    coordinates: [];
  };
  record_timestamp: string;
}

export interface GasStationData {
  id: number;
  latitude: string;
  longitude: number;
  // cp: string;
  // pop: string;
  adresse: string;
  ville: string;
  // horaires: string | null;
  // services: string | null;
  // prix: string | null;
  // geom: {
  //   lon: number;
  //   lat: number;
  // };
  gazole_maj: string | null;
  gazole_prix: string | null;
  sp95_maj: string | null;
  sp95_prix: string | null;
  e85_maj: string | null;
  e85_prix: string | null;
  gplc_maj: string | null;
  gplc_prix: string | null;
  e10_maj: string | null;
  e10_prix: string | null;
  sp98_maj: string | null;
  sp98_prix: string | null;
  carburants_disponibles: [string];
  carburants_indisponibles: [string];
  // horaires_automate_24_24: string;
  // services_service: [string];
  departement: string;
  code_departement: string;
  region: string;
  // code_region: string;
}
