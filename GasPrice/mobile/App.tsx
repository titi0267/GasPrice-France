import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import PathInput from "./src";
import MapboxGl from "@rnmapbox/maps";

export default function App() {


  return (
    <View style={styles.container}>
      <PathInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
