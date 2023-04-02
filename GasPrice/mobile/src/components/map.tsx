import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  Alert,
  Platform,
  Linking,
  ColorValue,
} from "react-native";
import MapboxGl from "@rnmapbox/maps";
import { DatasetGasStation } from "@/types/gouvData.types";
import ENV from "../env";

const Map = (props: {
  itinerary: GeoJSON.Feature;
  refineGasStations: DatasetGasStation[];
  camera: React.MutableRefObject<MapboxGl.Camera>;
  gasDataAvailableCallback: React.Dispatch<
    React.SetStateAction<DatasetGasStation[]>
  >;
}) => {
  MapboxGl.setWellKnownTileServer("Mapbox");
  MapboxGl.setAccessToken(ENV.mapboxApiKey);
  MapboxGl.setConnected(true);

  const renderSinglePoint = (
    recordId: string,
    coords: number[],
    iconColor: string,
    city: string,
  ) => {
    {
      return (
        <MapboxGl.PointAnnotation
          key={recordId}
          id={recordId}
          coordinate={coords}
          onSelected={() => {
            Alert.alert("Station de " + city, "Ouvrir avec google maps ?", [
              {
                text: "Ouvrir",
                style: "default",
                onPress: () => {
                  const scheme = Platform.select({
                    ios: "maps:0,0?q=",
                    android: "geo:0,0?q=",
                  });
                  const latLng = `${coords[1]},${coords[0]}`;
                  const label = "Station de " + city;
                  const url = Platform.select({
                    ios: `${scheme}${label}@${latLng}`,
                    android: `${scheme}${latLng}(${label})`,
                  });

                  Linking.openURL(url);
                },
              },
              { text: "Annuler", style: "cancel" },
            ]);
          }}>
          <View style={styles(iconColor).annotationContainer}></View>
        </MapboxGl.PointAnnotation>
      );
    }
  };

  const loopOnPointsRendering = () => {
    if (props.refineGasStations) {
      const allMarkers = [];
      let sortByPrice = props.refineGasStations.sort((p1, p2) =>
        p1.fields.e10_prix > p2.fields.e10_prix
          ? 1
          : p1.fields.e10_prix < p2.fields.e10_prix
          ? -1
          : 0,
      );
      sortByPrice.map((value, index) => {
        console.log(props.refineGasStations[index].fields.e10_prix);
        const iconColor = setColorToMarker(index, sortByPrice.length);
        allMarkers.push(
          renderSinglePoint(
            value.recordid,
            value.geometry.coordinates,
            iconColor,
            value.fields.ville,
          ),
        );
      });
      props.gasDataAvailableCallback(sortByPrice);
      return allMarkers;
    }
  };

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
    <View style={styles().page}>
      <MapboxGl.MapView style={styles().map} rotateEnabled={false}>
        <MapboxGl.Camera ref={props.camera} />
        {loopOnPointsRendering()}
        {renderItinerary()}
      </MapboxGl.MapView>
    </View>
  );
};

const setColorToMarker = (index: number, length: number) => {
  const value = index / (length - 1);
  const red = value > 0.5 ? 255 : Math.round(value * 510);
  const green = value <= 0.5 ? 255 : Math.round((1 - value) * 510);
  return `rgb(${red},${green},0)`;
};

const styles = (iconColor?: ColorValue) =>
  StyleSheet.create({
    page: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {},
    map: {
      height: "100%",
      width: "100%",
    },
    annotationContainer: {
      alignItems: "center",
      backgroundColor: iconColor,
      borderColor: "rgba(0, 0, 0, 0.45)",
      borderRadius: 40 / 2,
      borderWidth: StyleSheet.hairlineWidth,
      height: 40,
      justifyContent: "center",
      overflow: "hidden",
      width: 40,
    },
  });

export default Map;
