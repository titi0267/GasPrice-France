import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, Button, Alert } from "react-native";
import SearchBar from "../../components/searchBar";
import fetchGeoJsonResults from "../../services/fetchGeoJson.service";
import fetchGasStationList from "../../services/fetchGasStationList.service";
import { Views } from "../../types/views";

const Search = (props: {
  generateDepartmentToLoadCallback;
  departmentToLoad;
  generateItineraryCallback;
  geoCodingStartCallback;
  geoCodingEndCallback;
  geoCodingStart;
  geoCodingEnd;
  itinerary;
  gasData;
  gasDataCallback;
  pushInGasDataCallback;
  refineGasStationsCallback;
  readyToFetchGasDataCallback;
  readyToFetchGasData;
  viewCallback;
}) => {
  const [disable, setDisable] = useState(true);
  const [storeGasData, setStoreGasData] = useState(false);

  console.log("enter view");
  // useEffect(() => {
  //   if (storeGasData == true) {
  //     let useFullRecordId = [];
  //     let incrementId = 0;
  //     if (props.itinerary.geometry.type == "LineString") {
  //       props.itinerary.geometry.coordinates.forEach(coords => {
  //         if (incrementId % 50 == 0) {
  //           props.gasData.forEach(gasStation => {
  //             if (
  //               coords[0] + 0.03 >= gasStation.geometry.coordinates[0] &&
  //               coords[0] - 0.03 <= gasStation.geometry.coordinates[0]
  //             ) {
  //               if (
  //                 coords[1] + 0.03 >= gasStation.geometry.coordinates[1] &&
  //                 coords[1] - 0.03 <= gasStation.geometry.coordinates[1]
  //               ) {
  //                 useFullRecordId.push(gasStation.recordid);
  //               }
  //             }
  //           });
  //         }
  //         incrementId += 1;
  //       });
  //     }
  //     let i = 0;
  //     let gasDataTemp = props.gasData;
  //     console.log(useFullRecordId);
  //     while (i < props.gasData.length) {
  //       const gasStations = props.gasData[i].recordid;
  //       if (
  //         useFullRecordId.some(recordIds => {
  //           return gasStations === recordIds;
  //         })
  //       ) {
  //         ++i;
  //       } else {
  //         gasDataTemp = props.gasData;
  //         gasDataTemp.splice(i, 1);
  //         props.gasDataCallback(gasDataTemp);
  //       }
  //     }
  //     props.refineGasStationsCallback(props.gasData);
  //     setStoreGasData(false);
  //   }
  // }, [storeGasData]);

  // useEffect(() => {
  //   if (props.readyToFetchGasData == true) {
  //     console.log("ready to fetch");
  //     const uniqueDepartment = Array.from(new Set(props.departmentToLoad));
  //     let count = uniqueDepartment.length;
  //     for (let i = 0; i < uniqueDepartment.length; i++) {
  //       const element = uniqueDepartment[i];

  //       console.log("recherche sur : " + element);
  //       fetchGasStationList({
  //         code_department: element.toString(),
  //       })
  //         .catch(error => {
  //           console.log(error);
  //         })
  //         .then(prices => {
  //           if (!prices) {
  //             console.log("probleme sur " + element);
  //             return;
  //           }
  //           console.log("result nbr: " + prices.nhits + " for: " + element);
  //           if (!prices.records) {
  //             console.log("record is empty !");
  //             return;
  //           }
  //           prices.records.forEach(element => {
  //             if (
  //               props.gasData.some(item => item.recordid === element.recordid)
  //             )
  //               return;
  //             props.pushInGasDataCallback(element);
  //           });
  //         })
  //         .finally(() => {
  //           count--;
  //         });
  //     }
  //     const checkAllResolved = setInterval(() => {
  //       if (count === 0) {
  //         setStoreGasData(true);
  //         props.readyToFetchGasDataCallback(false);

  //         clearInterval(checkAllResolved);
  //       }
  //     }, 100);

  //     return () => clearInterval(checkAllResolved);
  //   }
  // }, [props.readyToFetchGasData]);

  if (
    disable == true &&
    props.geoCodingEnd &&
    props.geoCodingStart &&
    props.geoCodingEnd.length == 1 &&
    props.geoCodingStart.length == 1
  ) {
    setDisable(false);
  }
  if (
    disable == false &&
    (!props.geoCodingEnd ||
      !props.geoCodingStart ||
      props.geoCodingEnd.length != 1 ||
      props.geoCodingStart.length != 1)
  ) {
    setDisable(true);
  }

  return (
    <View>
      <View style={styles.startDropdown}>
        <SearchBar
          placeholder="Départ"
          geoCodingCallback={props.geoCodingStartCallback}
          geoCodingValue={props.geoCodingStart}></SearchBar>
      </View>
      <View style={styles.endDropdown}>
        <SearchBar
          placeholder="Arrivée"
          geoCodingCallback={props.geoCodingEndCallback}
          geoCodingValue={props.geoCodingEnd}></SearchBar>
      </View>
      <Button
        onPress={() => {
          props.viewCallback(Views.HOME);
          fetchGeoJsonResults({
            start:
              props.geoCodingStart[0].geometry[0].toString() +
              "," +
              props.geoCodingStart[0].geometry[1].toString(),
            end:
              props.geoCodingEnd[0].geometry[0].toString() +
              "," +
              props.geoCodingEnd[0].geometry[1].toString(),
          })
            .catch(error => console.log(error))
            .then(res => {
              if (!res) return;
              props.generateDepartmentToLoadCallback([]);
              props.generateItineraryCallback(res[0]);
            });
        }}
        title="Generer ce trajet"
        color="#841584"
        disabled={disable}
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

export default Search;
