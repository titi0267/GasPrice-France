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
  };

  const addItem = (newItem: DatasetGasStation) => {
    const doesExist = gasData.some(item => item.recordid === newItem.recordid);
    console.log("is it in ? " + doesExist);
    if (!doesExist) {
      setGasData([...gasData, newItem]);
      console.log(gasData.length);
    }
  };
  useEffect(() => {
    if (itinerary && itinerary.geometry.type == "LineString") {
      if (
        itinerary.geometry.coordinates.length / 100 <=
        departmentToLoad.length
      ) {
        const uniqueDepartment = Array.from(new Set(departmentToLoad));
        uniqueDepartment.forEach(element => {
          fetchGasStationList({
            code_department: element.toString(),
          })
            .catch(error => {
              console.log(error);
            })
            .then(prices => {
              if (!prices) return;
              if (!prices.records) return;
              prices.records.forEach(element => {
                const doesExist = gasData.some(
                  item => item.recordid === element.recordid,
                );
                console.log("is it in ? " + doesExist + " " + element.recordid);
                if (!doesExist) {
                  setGasData(prevData => [...prevData, element]);
                }
              });
            });
        });
      }
    }
  }, [departmentToLoad]);

  useEffect(() => {
    console.log(gasData.length);
  }, [gasData]);

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
