import fetchGasStationList from "./services/fetchGasStationList.service";
import { DatasetGasStation, GasStationList } from "./types/gouvData.types";
import React, { useEffect, useState, useRef } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";

import MapView from "./views/landing";
import fetchGeoCodingResults from "./services/fetchGeoCodingRes.service";
import { GeoCodingData } from "./types/geoCoding.type";

const PathInput = () => {
  const [startPoint, setStartPoint] = useState("");
  const [value, setValue] = useState(null);
  const [data, setData] = useState<DatasetGasStation[]>([]);
  const [textStartValue, setStartValue] = useState("");
  const [geoCodingValues, setGeoCodingValues] = useState<GeoCodingData[]>([]);

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
          if (data.find(alreadyIn => alreadyIn.recordid === element.recordid))
            return;
          setData(prevData => [...prevData, element]);
        });
      });
  }, []);

  const [selectedItem, setSelectedItem] = useState(null);
  const [dropDownValues, setDropdownValues] = useState<
    TAutocompleteDropdownItem[]
  >([]);
  //const dropDownValues: TAutocompleteDropdownItem[] = [];

  useEffect(() => {
    console.log("start point change " + startPoint);
    if (startPoint.length >= 3) {
      console.log("c'est superieur a 3 lettres");
      fetchGeoCodingResults({ adress: startPoint })
        .catch(error => {
          console.log(error);
        })
        .then(res => {
          if (!res) return;
          console.log(res);
          res.forEach(element => {
            if (
              geoCodingValues.find(
                alreadyIn => alreadyIn.label == element.label,
              )
            )
              return;
            setGeoCodingValues(prevValue => [...prevValue, element]);
          });
          geoCodingValues.forEach(element => {
            if (dropDownValues.find(alreadyIn => alreadyIn.id === element.id))
              return;
            setDropdownValues(prevValues => [
              ...prevValues,
              { id: element.id, title: element.label },
            ]);
          });
        });
    }
  }, [startPoint]);
  const departments = ["Bas-Rhin", "Haut-Rhin"];

  if (!geoCodingValues) {
  }

  return (
    <View>
      <View style={styles.dropdown}>
        <AutocompleteDropdown
          onChangeText={newText => setStartPoint(newText)}
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          onSelectItem={setSelectedItem}
          dataSet={
            dropDownValues
          } /*Doesn't rerender immediatly after getting values ???*/
          textInputProps={{
            placeholder: "Départ",
          }}
        />
      </View>

      {/* <Text>
        {data.map(item => {
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
  dropdown: {
    zIndex: 1,
  },
});

export default PathInput;
