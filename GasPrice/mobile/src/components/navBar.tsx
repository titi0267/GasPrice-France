import { View, Button, StyleSheet } from "react-native";

const Navbar = () => {
  const openMenu = () => {
    return (
      <View>
        <Button title="Rechercher"></Button>
        <Button title="Tableau des stations"></Button>
        <Button title="Carte"></Button>
      </View>
    );
  };
  return (
    <View>
      <Button
        title="Menu"
        onPress={() => {
          openMenu();
        }}></Button>
      <Button title="Redémarrer"></Button>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "10%",
    },
  });
