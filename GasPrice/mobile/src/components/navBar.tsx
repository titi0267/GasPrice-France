import { View, Button, StyleSheet, Text, Dimensions } from "react-native";
import { useState } from "react";
import { Views } from "../types/views";

const Navbar = (props: { viewCallback }) => {
  const [triggerMenu, setTriggerMenu] = useState<boolean>(false);
  const { width, height } = Dimensions.get("window");
  const openMenu = () => {
    if (triggerMenu == true) {
      return (
        <View style={styles(height).sidebarContainer}>
          <View style={styles(height).menuButtons}>
            {/* </View> */}
            {/* <View> */}
            <Button
              title="Carte"
              onPress={() => {
                props.viewCallback(Views.HOME);
              }}></Button>
            <Button
              title="Rechercher"
              onPress={() => {
                props.viewCallback(Views.SEARCH);
              }}></Button>
            <Button
              title="Tableau des stations"
              onPress={() => {
                props.viewCallback(Views.TABLE);
              }}></Button>
          </View>
        </View>
      );
    } else {
      return <></>;
    }
  };
  return (
    <View style={styles(height).container}>
      {openMenu()}
      <View style={styles(height).navbarContainer}>
        {/* <View style={styles().menu}> */}
        <Button
          title="Menu"
          onPress={() => {
            setTriggerMenu(!triggerMenu);
          }}></Button>
        {/* </View> */}
        {/* <View style={styles().reload}> */}
        <Button title="Redémarrer"></Button>
        {/* </View> */}
      </View>
    </View>
  );
};

const styles = (height?: number) =>
  StyleSheet.create({
    container: {
      zIndex: 1,
      width: "100%",
      height: "100%",
      backgroundColor: "gray",
      flexDirection: "row",
      top: 0,
    },
    sidebarContainer: {
      zIndex: 3,
      height: height + 100,
      width: 150,
      backgroundColor: "gray",
    },
    navbarContainer: {
      zIndex: 1,
      // position: "absolute",
      flex: 1,
      // width: "100%",
      // height: "100%",
      // backgroundColor: "red",
      flexDirection: "row",
      top: 25,
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
    reload: {
      flex: 1,
      right: 0,
      // width: "100%",
      // height: "100%",
      // backgroundColor: "green",
      fontSize: 10,
    },
    menu: {
      // width: "100%",
      flex: 1,
      fontSize: 10,
      // height: "100%",
      // backgroundColor: "blue",
    },
    menuButtons: {
      padding: 18,
      top: 100,
      gap: 20,
    },
  });

export default Navbar;
