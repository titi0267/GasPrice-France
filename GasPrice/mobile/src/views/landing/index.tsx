import React, { useRef, useEffect } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import ENV from "../../env";
import MapboxGl from "@rnmapbox/maps";
import fetchGeoCode from "../../services/fetchGeoCode.service";
import { DatasetGasStation } from "@/types/gouvData.types";

const MapView = (props: {
  itinerary: GeoJSON.Feature;
  departmentToLoadCallback: React.Dispatch<React.SetStateAction<string[]>>;
  readyToFetchGasDataCallback: React.Dispatch<React.SetStateAction<boolean>>;
  refineGasStations: DatasetGasStation[];
}) => {
  MapboxGl.setWellKnownTileServer("Mapbox");
  MapboxGl.setAccessToken(ENV.mapboxApiKey);
  MapboxGl.setConnected(true);

  const camera = useRef<MapboxGl.Camera>(null);
  useEffect(() => {
    if (!camera.current) return;
    camera.current.setCamera({
      centerCoordinate: [2.2137, 46.2276],
      animationDuration: 0,
      zoomLevel: 3.5,
    });
    console.log("center cam to france");
  }, [camera.current]);

  useEffect(() => {
    console.log("stations a promximité: " + props.refineGasStations.length);
  }, [props.refineGasStations]);
  const renderSinglePoint = (recordId: string, coords: number[]) => {
    return (
      <MapboxGl.PointAnnotation
        key={recordId}
        id={recordId}
        coordinate={coords}>
        <View style={styles.annotationContainer}></View>
      </MapboxGl.PointAnnotation>
    );
  };
  const loopOnPointsRendering = () => {
    const allMarkers = [];
    for (let i = 0; i < props.refineGasStations.length; i++)
      allMarkers.push(
        renderSinglePoint(
          props.refineGasStations[i].recordid,
          props.refineGasStations[i].geometry.coordinates,
        ),
      );
    return allMarkers;
  };
  useEffect(() => {
    if (!props.itinerary) return;
    let elementId = 0;
    if (props.itinerary.geometry.type === "LineString") {
      let count =
        Math.floor(props.itinerary.geometry.coordinates.length / 100) + 1;
      for (let i = 0; i < props.itinerary.geometry.coordinates.length; i++) {
        const element = props.itinerary.geometry.coordinates[i];
        if (elementId % 100 == 0) {
          fetchGeoCode({ coords: [element[0], element[1]] })
            .catch(error => console.log("GeoCode: " + error))
            .then(res => {
              if (!res) return;
              console.log("ajout d'un element");
              props.departmentToLoadCallback([res]);
            })
            .finally(() => {
              count--;
            });
        }
        elementId += 1;
      }
      const checkAllResolved = setInterval(() => {
        console.log("Autre count a 0?");
        if (count === 0) {
          props.readyToFetchGasDataCallback(true);
          clearInterval(checkAllResolved);
        }
      }, 100);
      return () => clearInterval(checkAllResolved);
    }
  }, [props.itinerary]);
  const renderItinerary = () => {
    if (props.itinerary) {
      return (
        <MapboxGl.ShapeSource id="source" shape={props.itinerary}>
          <MapboxGl.LineLayer
            id="line"
            style={{ lineColor: "blue", lineWidth: 3 }}
          />
        </MapboxGl.ShapeSource>
      );
    } else {
      return <></>;
    }
  };
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGl.MapView style={styles.map} rotateEnabled={false}>
          <MapboxGl.Camera ref={camera} />
          {loopOnPointsRendering()}
          {renderItinerary()}
        </MapboxGl.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 300,
    width: 380,
  },
  map: {
    flex: 1,
  },
  annotationContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.45)",
    borderRadius: 40 / 2,
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    justifyContent: "center",
    overflow: "hidden",
    width: 40,
  },
});
export default MapView;
