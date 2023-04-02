import React, { useState, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Home from "./views/home";
import Search from "./views/search";
import { Views } from "./types/views";
import Table from "./views/table";

import { DatasetGasStation } from "./types/gouvData.types";
import { Camera } from "@rnmapbox/maps";
import { GeoCodingData } from "./types/geoCoding.type";

const Main = (props: { viewCallback; view: number }) => {
  const camera = useRef<Camera>(null);
  const [departmentToLoad, setDepartmentToLoad] = useState<string[]>([""]);
  const [gasData, setGasData] = useState<DatasetGasStation[]>([]);
  const [gasDataAvailable, setGasDataAvailable] = useState<DatasetGasStation[]>(
    [],
  );
  const [geoCodingStart, setGeoCodingStart] = useState<GeoCodingData[]>([]);
  const [geoCodingEnd, setGeoCodingEnd] = useState<GeoCodingData[]>([]);
  const [itinerary, setItinerary] = useState<GeoJSON.Feature>(null);
  const [readyToFetchGasData, setreadyToFetchGasData] = useState(false);
  const [refineGasStation, setRefineGasStation] = useState<DatasetGasStation[]>(
    [],
  );

  const departmentToLoadCallback = (departmentToLoadCb: string[]) => {
    if (departmentToLoadCb.length == 0) {
      setDepartmentToLoad([]);
    } else {
      setDepartmentToLoad(prevData => [...prevData, departmentToLoadCb[0]]);
    }
  };
  const gasDataCallback = gasDataCallback => {
    setGasData(gasDataCallback);
  };
  const pushInGasDataCallback = gasDataCallback => {
    setGasData(prevData => [...prevData, gasDataCallback]);
  };
  const gasDataAvailableCallback = (
    gasDataAvailableFromMapView: DatasetGasStation[],
  ) => {
    setGasDataAvailable(gasDataAvailableFromMapView);
  };
  const generateItineraryCallback = (generateItinerary: GeoJSON.Feature) => {
    setItinerary(generateItinerary);
  };
  const geoCodingStartCallback = (geoCoding: GeoCodingData[]) => {
    setGeoCodingStart(geoCoding);
  };

  const geoCodingEndCallback = (geoCoding: GeoCodingData[]) => {
    setGeoCodingEnd(geoCoding);
  };
  const readyToFetchGasDataCallback = (
    readyToFetchGasDataCallback: boolean,
  ) => {
    setreadyToFetchGasData(readyToFetchGasDataCallback);
  };
  const refineGasStationCallback = refineGasStationsCallback => {
    setRefineGasStation(refineGasStationsCallback);
  };

  switch (props.view) {
    case Views.HOME:
      return (
        <Home
          itinerary={itinerary}
          refineGasStations={refineGasStation}
          camera={camera}
          gasDataAvailableCallback={gasDataAvailableCallback}
          gasData={gasData}
          gasDataCallback={gasDataCallback}
          pushInGasDataCallback={pushInGasDataCallback}
          departmentToLoadCallback={departmentToLoadCallback}
          departmentToLoad={departmentToLoad}
          readyToFetchGasDataCallback={readyToFetchGasDataCallback}
          readyToFetchGasData={readyToFetchGasData}
          refineGasStationsCallback={refineGasStationCallback}
          viewCallback={props.viewCallback}></Home>
      );
    case Views.SEARCH:
      return (
        <Search
          generateDepartmentToLoadCallback={departmentToLoadCallback}
          departmentToLoad={departmentToLoad}
          generateItineraryCallback={generateItineraryCallback}
          geoCodingStartCallback={geoCodingStartCallback}
          geoCodingEndCallback={geoCodingEndCallback}
          geoCodingStart={geoCodingStart}
          geoCodingEnd={geoCodingEnd}
          itinerary={itinerary}
          gasData={gasData}
          gasDataCallback={gasDataCallback}
          pushInGasDataCallback={pushInGasDataCallback}
          refineGasStationsCallback={refineGasStationCallback}
          readyToFetchGasDataCallback={readyToFetchGasDataCallback}
          readyToFetchGasData={readyToFetchGasData}
          viewCallback={props.viewCallback}></Search>
      );
    case Views.TABLE:
      return (
        <Table gasDataAvailable={gasDataAvailable} camera={camera}></Table>
      );
    default:
      return <></>;
  }
};

export default Main;
