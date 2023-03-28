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

const PathInput = () => {
  const [gasData, setGasData] = useState<DatasetGasStation[]>([]);
  const [geoCodingStart, setGeoCodingStart] = useState<GeoCodingData[]>([]);
  const [geoCodingEnd, setGeoCodingEnd] = useState<GeoCodingData[]>([]);
  const [disable, setDisable] = useState(true);

  const geoCodingStartCallback = (
    geoCodingStartFromSearchBar: GeoCodingData[],
  ) => {
    setGeoCodingStart(geoCodingStartFromSearchBar);
  };
  const geoCodingEndCallback = (geoCodingEndFromSearchBar: GeoCodingData[]) => {
    setGeoCodingEnd(geoCodingEndFromSearchBar);
  };
  useEffect(() => {
    console.log("fetch data");
    fetchGasStationList({
      region: "Grand+Est",
      department: "Bas-Rhin",
    })
      .catch(error => {
        console.log(error);
      })
      .then(prices => {
        if (!prices) return;
        prices.records.forEach(element => {
          if (
            gasData.find(alreadyIn => alreadyIn.recordid === element.recordid)
          )
            return;
          setGasData(prevData => [...prevData, element]);
        });
      });
  }, []);

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
  const departments = ["Bas-Rhin", "Haut-Rhin"];
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
          console.log(geoCodingStart);
          console.log(geoCodingEnd);
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
      {MapView()}
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
