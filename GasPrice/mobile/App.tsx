import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import Main from "./src";
import Navbar from "./src/components/navBar";
export default function App() {
  const { width, height } = Dimensions.get("window");
  const [view, setView] = useState<number>(0);

  const viewCallback = (viewCallback: number) => {
    setView(viewCallback);
  };
  return (
    <View style={styles(width, height).container}>
      <View style={styles().navbar}>
        <Navbar viewCallback={viewCallback} />
      </View>
      <View style={styles().main}>
        <Main viewCallback={viewCallback} view={view} />
      </View>
    </View>
  );
}

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    navbar: {
      zIndex: 3,
      width: "100%",
      height: 100,
    },
    main: {
      width: "100%",
      height: "100%",
      zIndex: 2,
    },
  });
