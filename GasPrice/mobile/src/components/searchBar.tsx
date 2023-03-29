import { Text, TextInput, View, StyleSheet } from "react-native";
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import { useState, useEffect, useRef } from "react";
import { GeoCodingData } from "../types/geoCoding.type";
import fetchGeoCodingResults from "../services/fetchGeoCodingRes.service";

const SearchBar = (props: {
  placeholder: string;
  geoCodingCallback: React.Dispatch<React.SetStateAction<GeoCodingData[]>>;
  geoCodingValue: GeoCodingData[];
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [point, setPoint] = useState("");
  const [dropDownValues, setDropdownValues] = useState<
    TAutocompleteDropdownItem[]
  >([]);
  const previousPointRef = useRef("");

  useEffect(() => {
    //console.log("start point change " + point);
    if (!previousPointRef != undefined && point.length >= 3) {
      console.log("Loading autocomplete");
      fetchGeoCodingResults({ adress: point })
        .catch(error => {
          console.log(error);
        })
        .then(res => {
          if (!res) return;
          if (
            selectedItem &&
            props.geoCodingValue.find(element => {
              element.label != selectedItem.title ||
                element.id != selectedItem.id;
            })
          )
            return;
          props.geoCodingCallback([]);

          res.forEach(element => {
            // if (
            //   props.geoCodingValue.find(
            //     alreadyIn => alreadyIn.label == element.label,
            //   )
            // )
            //   return;
            props.geoCodingCallback(prevValue => [...prevValue, element]);
          });
        });
    }
    previousPointRef.current = point;
  }, [point]);
  useEffect(() => {
    setDropdownValues([]);
    props.geoCodingValue.forEach(element => {
      if (dropDownValues.find(alreadyIn => alreadyIn.id === element.id)) return;
      setDropdownValues(prevValues => [
        ...prevValues,
        { id: element.id, title: element.label },
      ]);
    });
  }, [props.geoCodingValue]);
  useEffect(() => {
    setPoint("");
    props.geoCodingValue.forEach(element => {
      if (!selectedItem) {
        props.geoCodingCallback([]);
        return;
      }
      if (element.id == selectedItem.id) {
        props.geoCodingCallback([element]);
        console.log("Element correspond a la recherrche " + element.label);
      }
    });
  }, [selectedItem]);
  return (
    <View>
      <AutocompleteDropdown
        onChangeText={newText => setPoint(newText)}
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        onSelectItem={newItem => setSelectedItem(newItem)}
        dataSet={dropDownValues}
        textInputProps={{
          placeholder: props.placeholder,
        }}
      />
    </View>
  );
};

export default SearchBar;
