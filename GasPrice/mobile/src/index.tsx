import fetchGasStationList from "./services/fetchGasStationList.service";
import { DatasetGasStation, GasStationList } from "./types/gouvData.types";
import React, { useEffect, useState, useRef } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";

import MapView from "./views/landing";
import fetchGeoCodingResults from "./services/fetchGeoCodingRes.service";
import { GeoCodingData } from "./types/geoCoding.type";
import SearchBar from "./components/searchBar";
import fetchGeoJsonResults from "./services/fetchGeoJson.service";

const PathInput = () => {
  const [gasData, setGasData] = useState<DatasetGasStation[]>([]);
  const [geoCodingStart, setGeoCodingStart] = useState<GeoCodingData[]>([]);
  const [geoCodingEnd, setGeoCodingEnd] = useState<GeoCodingData[]>([]);
  const [disable, setDisable] = useState(true);
  const [itinerary, setItinerary] = useState<GeoJSON.Feature>(null);
  const [departmentToLoad, setDepartmentToLoad] = useState<string[]>([]);
  const [readyToFetchGasData, setreadyToFetchGasData] = useState(false);
  const [storeGasData, setStoreGasData] = useState(false);
  const [refineGasStation, setrefineGasStation] = useState<DatasetGasStation[]>(
    [],
  );

  const geoCodingStartCallback = (
    geoCodingStartFromSearchBar: GeoCodingData[],
  ) => {
    setGeoCodingStart(geoCodingStartFromSearchBar);
  };
  const geoCodingEndCallback = (geoCodingEndFromSearchBar: GeoCodingData[]) => {
    setGeoCodingEnd(geoCodingEndFromSearchBar);
  };
  const departmentToLoadCallback = (departmentToLoadFromMapView: string[]) => {
    setDepartmentToLoad(prevData => [
      ...prevData,
      departmentToLoadFromMapView[0],
    ]);
    console.log("add dep: " + departmentToLoadFromMapView);
  };
  const readyToFetchGasDataCallback = (
    readyToFetchGasDataFromMapView: boolean,
  ) => {
    setreadyToFetchGasData(readyToFetchGasDataFromMapView);
    console.log("Set new state: " + readyToFetchGasDataFromMapView);
  };

  const addItem = (newItem: DatasetGasStation) => {
    if (gasData.some(item => item.recordid === newItem.recordid)) return;
    setGasData([...gasData, newItem]);
    console.log(gasData.length);
  };
  useEffect(() => {
    if (readyToFetchGasData == true) {
      const uniqueDepartment = Array.from(new Set(departmentToLoad));
      let count = uniqueDepartment.length;
      for (let i = 0; i < uniqueDepartment.length; i++) {
        const element = uniqueDepartment[i];

        console.log("recherche sur : " + element);
        fetchGasStationList({
          code_department: element.toString(),
        })
          .catch(error => {
            console.log(error);
          })
          .then(prices => {
            if (!prices) {
              console.log("probleme sur " + element);
              return;
            }
            console.log("result nbr: " + prices.nhits + " for: " + element);
            if (!prices.records) {
              console.log("record is empty !");
              return;
            }
            prices.records.forEach(element => {
              if (gasData.some(item => item.recordid === element.recordid))
                return;
              setGasData(prevData => [...prevData, element]);
            });
          })
          .finally(() => {
            count--;
          });
      }
      const checkAllResolved = setInterval(() => {
        if (count === 0) {
          setStoreGasData(true);
          setreadyToFetchGasData(false);

          clearInterval(checkAllResolved);
        }
      }, 100);

      return () => clearInterval(checkAllResolved);
    }
  }, [readyToFetchGasData]);
  useEffect(() => {
    if (storeGasData == true) {
      let useFullRecordId = [];
      let incrementId = 0;
      if (itinerary.geometry.type == "LineString") {
        itinerary.geometry.coordinates.forEach(coords => {
          if (incrementId % 50 == 0) {
            gasData.forEach(gasStation => {
              if (
                coords[0] + 0.04 >= gasStation.geometry.coordinates[0] &&
                coords[0] - 0.04 <= gasStation.geometry.coordinates[0]
              ) {
                if (
                  coords[1] + 0.04 >= gasStation.geometry.coordinates[1] &&
                  coords[1] - 0.04 <= gasStation.geometry.coordinates[1]
                ) {
                  console.log("Add a gas station: " + gasStation.recordid);
                  useFullRecordId.push(gasStation.recordid);
                }
              }
            });
          }
          incrementId += 1;
        });
      }
      let i = 0;
      let gasDataTemp = gasData;
      console.log(useFullRecordId);
      while (i < gasData.length) {
        const gasStations = gasData[i].recordid;
        if (
          useFullRecordId.some(recordIds => {
            return gasStations === recordIds;
          })
        ) {
          ++i;
        } else {
          gasDataTemp = gasData;
          gasDataTemp.splice(i, 1);
          setGasData(gasDataTemp);
        }
      }
      setrefineGasStation(gasData);
      setStoreGasData(false);

      //console.log("Remaining gas stations : " + gasData.length);
    }
  }, [storeGasData]);

  if (
    disable == true &&
    geoCodingEnd &&
    geoCodingStart &&
    geoCodingEnd.length == 1 &&
    geoCodingStart.length == 1
  ) {
    setDisable(false);
  }
  if (
    disable == false &&
    (!geoCodingEnd ||
      !geoCodingStart ||
      geoCodingEnd.length != 1 ||
      geoCodingStart.length != 1)
  ) {
    setDisable(true);
  }

  return (
    <View>
      <View style={styles.startDropdown}>
        <SearchBar
          placeholder="Départ"
          geoCodingCallback={geoCodingStartCallback}
          geoCodingValue={geoCodingStart}></SearchBar>
      </View>
      <View style={styles.endDropdown}>
        <SearchBar
          placeholder="Arrivée"
          geoCodingCallback={geoCodingEndCallback}
          geoCodingValue={geoCodingEnd}></SearchBar>
      </View>
      <Button
        onPress={() => {
          fetchGeoJsonResults({
            start:
              geoCodingStart[0].geometry[0].toString() +
              "," +
              geoCodingStart[0].geometry[1].toString(),
            end:
              geoCodingEnd[0].geometry[0].toString() +
              "," +
              geoCodingEnd[0].geometry[1].toString(),
          })
            .catch(error => console.log(error))
            .then(res => {
              if (!res) return;
              setDepartmentToLoad([]);
              setItinerary(res[0]);
            });
        }}
        title="Generer ce trajet"
        color="#841584"
        disabled={disable}
      />
      {/* <Text>
        {gasData.map(item => {
          return (
            <View key={item.recordid} style={styles.container}>
              <Text>
                {item.fields.ville} {item.fields.e10_prix}
              </Text>
            </View>
          );
        })}
      </Text> */}
      <MapView
        itinerary={itinerary}
        departmentToLoadCallback={departmentToLoadCallback}
        readyToFetchGasDataCallback={readyToFetchGasDataCallback}
        refineGasStations={refineGasStation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  startDropdown: {
    zIndex: 2,
  },
  endDropdown: {
    zIndex: 1,
  },
});

export default PathInput;
