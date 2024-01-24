export interface GeoCodingList {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: geoCodingData;
}

interface geoCodingData {
  label: string;
  score: number;
  id: string;
  type: string;
  name: string;
  postCode: string;
  cityCode: string;
  x: number;
  y: number;
  population: number;
  city: string;
  context: string;
  importance: number;
  municipality: string;
}
