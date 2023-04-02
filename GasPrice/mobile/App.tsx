import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import Main from "./src";

export default function App() {
  const { width, height } = Dimensions.get("window");
  return (
    <View style={styles(width, height).container}>
      <Main />
    </View>
  );
}

const styles = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
