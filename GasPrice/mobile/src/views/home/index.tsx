import { Text, TextInput, View, StyleSheet, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Map from "../../components/map";
import fetchGeoCode from "../../services/fetchGeoCode.service";
import { Views } from "../../types/views";
import fetchGasStationList from "../../services/fetchGasStationList.service";

const Home = (props: {
  itinerary;
  refineGasStations;
  camera;
  gasDataAvailableCallback;
  gasData;
  gasDataCallback;
  pushInGasDataCallback;
  departmentToLoadCallback;
  departmentToLoad;
  readyToFetchGasDataCallback;
  readyToFetchGasData;
  refineGasStationsCallback;
  viewCallback;
}) => {
  const [storeGasData, setStoreGasData] = useState(false);

  useEffect(() => {
    if (!props.camera.current) return;
    props.camera.current.setCamera({
      centerCoordinate: [2.2137, 46.2276],
      animationDuration: 0,
      zoomLevel: 3.5,
    });
    console.log("center cam to france");
  }, [props.camera.current]);

  useEffect(() => {
    console.log("stations a promximité: " + props.refineGasStations.length);
  }, [props.refineGasStations]);

  useEffect(() => {
    if (!props.itinerary) return;
    let elementId = 0;
    if (props.itinerary.geometry.type === "LineString") {
      let count =
        Math.floor(props.itinerary.geometry.coordinates.length / 100) + 1;
      for (let i = 0; i < props.itinerary.geometry.coordinates.length; i++) {
        const element = props.itinerary.geometry.coordinates[i];
        if (elementId % 100 == 0) {
          console.log(element);
          fetchGeoCode({ coords: [element[0], element[1]] })
            .catch(error => console.log("GeoCode: " + error))
            .then(res => {
              if (!res) return;
              console.log(typeof res.toString());
              props.departmentToLoadCallback([res.toString()]);
              console.log("ajout d'un element" + props.departmentToLoad);
            })
            .finally(() => {
              count--;
            });
        }
        elementId += 1;
      }
      const checkAllResolved = setInterval(() => {
        if (count === 0) {
          console.log("Set ready to true: " + props.departmentToLoad);
          props.readyToFetchGasDataCallback(true);
          clearInterval(checkAllResolved);
        }
      }, 100);
      return () => clearInterval(checkAllResolved);
    }
  }, [props.itinerary]);

  useEffect(() => {
    if (props.readyToFetchGasData == true) {
      console.log("ready to fetch");
      const uniqueDepartment = Array.from(new Set(props.departmentToLoad));
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
              if (
                props.gasData.some(item => item.recordid === element.recordid)
              )
                return;
              props.pushInGasDataCallback(element);
            });
          })
          .finally(() => {
            count--;
          });
      }
      const checkAllResolved = setInterval(() => {
        if (count === 0) {
          setStoreGasData(true);
          props.readyToFetchGasDataCallback(false);

          clearInterval(checkAllResolved);
        }
      }, 100);

      return () => clearInterval(checkAllResolved);
    }
  }, [props.readyToFetchGasData]);

  useEffect(() => {
    if (storeGasData == true) {
      let useFullRecordId = [];
      let incrementId = 0;
      if (props.itinerary.geometry.type == "LineString") {
        props.itinerary.geometry.coordinates.forEach(coords => {
          if (incrementId % 50 == 0) {
            props.gasData.forEach(gasStation => {
              if (
                coords[0] + 0.03 >= gasStation.geometry.coordinates[0] &&
                coords[0] - 0.03 <= gasStation.geometry.coordinates[0]
              ) {
                if (
                  coords[1] + 0.03 >= gasStation.geometry.coordinates[1] &&
                  coords[1] - 0.03 <= gasStation.geometry.coordinates[1]
                ) {
                  useFullRecordId.push(gasStation.recordid);
                }
              }
            });
          }
          incrementId += 1;
        });
      }
      let i = 0;
      let gasDataTemp = props.gasData;
      console.log(useFullRecordId);
      while (i < props.gasData.length) {
        const gasStations = props.gasData[i].recordid;
        if (
          useFullRecordId.some(recordIds => {
            return gasStations === recordIds;
          })
        ) {
          ++i;
        } else {
          gasDataTemp = props.gasData;
          gasDataTemp.splice(i, 1);
          props.gasDataCallback(gasDataTemp);
        }
      }
      props.refineGasStationsCallback(props.gasData);
      setStoreGasData(false);
    }
  }, [storeGasData]);
  const [value, onChangeText] = React.useState("");
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Départ"
          textAlign="center"
          onChangeText={text => onChangeText(text)}
          value={value}
          onFocus={() => {
            props.viewCallback(Views.SEARCH);
          }}
          style={styles.textInput}></TextInput>
      </View>
      <View style={styles.map}>
        <Map
          itinerary={props.itinerary}
          refineGasStations={props.refineGasStations}
          camera={props.camera}
          gasDataAvailableCallback={props.gasDataAvailableCallback}></Map>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  textInputContainer: {
    zIndex: 2,
  },
  textInput: {
    width: 300,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "gray",
    fontSize: 30,
    top: 50,
  },
  map: { width: "100%", height: "100%", position: "absolute", zIndex: 1 },
});

export default Home;
