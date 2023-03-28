import React, { useRef, useEffect } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import ENV from "../../env";
import MapboxGl from "@rnmapbox/maps";

const MapView = () => {
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

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGl.MapView style={styles.map} rotateEnabled={false}>
          <MapboxGl.Camera ref={camera} />
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
});
export default MapView;
