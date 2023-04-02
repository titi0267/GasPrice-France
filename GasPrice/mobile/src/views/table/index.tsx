import { DataTable } from "react-native-paper";
import { Text, TextInput, View, StyleSheet, Button, Alert } from "react-native";
import { DatasetGasStation } from "@/types/gouvData.types";
import { Camera } from "@rnmapbox/maps";

const Table = (props: {
  gasDataAvailable: DatasetGasStation[];
  camera: React.MutableRefObject<Camera>;
}) => {
  const goToLocation = (coords: number[]) => {
    props.camera.current.setCamera({
      centerCoordinate: coords,
      animationDuration: 2000,
      zoomLevel: 12,
    });
  };
  const renderSingleRow = (
    selectedPrice: string,
    city: string,
    coords: number[],
  ) => {
    return (
      <DataTable.Row>
        <DataTable.Cell>{city}</DataTable.Cell>
        <View>
          <Button
            color={"blue"}
            title={"Localiser"}
            onPress={() => {
              goToLocation(coords);
            }}></Button>
        </View>
        <DataTable.Cell>{selectedPrice}</DataTable.Cell>
      </DataTable.Row>
    );
  };

  const renderRows = () => {
    const tableRows = [];
    for (let i = 0; i < props.gasDataAvailable.length && i < 5; i++) {
      tableRows.push(
        renderSingleRow(
          props.gasDataAvailable[i].fields.e10_prix,
          props.gasDataAvailable[i].fields.ville,
          props.gasDataAvailable[i].geometry.coordinates,
        ),
      );
    }
    if (tableRows.length == 0) tableRows.push(<></>);
    return tableRows;
  };

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Ville</DataTable.Title>
          <DataTable.Title>Adresse</DataTable.Title>
          <DataTable.Title>Prix</DataTable.Title>
        </DataTable.Header>
        {renderRows()}
      </DataTable>
    </View>
  );
};

export default Table;
