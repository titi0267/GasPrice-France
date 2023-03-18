import getData from "./services/dataPricesFetch.service";
import { DatasetGasStation, GasStationList } from "./types/gouvData.types";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

const PathInput = () => {
  const [startPoint, setStartPoint] = useState("");
  const [data, setData] = useState<DatasetGasStation[]>([]);

  useEffect(() => {
    getData(6).then(prices => {
      prices.records.forEach(element => {
        if (data.find(alreadyIn => alreadyIn.id === element.record.id)) return;
        setData(prevData => [...prevData, element.record]);
      });
    });
  }, []);

  return (
    <View>
      <TextInput
        style={{ height: 40 }}
        placeholder="Départ ?"
        onChangeText={newText => setStartPoint(newText)}
        defaultValue={startPoint}></TextInput>
      <Text>
        {data.map(item => {
          return (
            <View key={item.id} style={styles.container}>
              <Text> {item.fields.departement} </Text>
            </View>
          );
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PathInput;
