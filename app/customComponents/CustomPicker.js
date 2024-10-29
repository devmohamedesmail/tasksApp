import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { PublicStyles } from "../styles/PublicStyles";
import { useTranslation } from "react-i18next";

export default function CustomPicker({
  items,
  selectedItem,
  onSelect,
  displayKey,
  selectoption,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();

  const handleSelect = (item) => {
    onSelect(item);
    setIsVisible(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        onPressIn={() => setIsFocused(true)}
        onPressOut={() => setIsFocused(false)}
        style={[styles.selectedItem,isFocused && styles.focusedBorder]}
      >
        <Text style={styles.textBtn}>{selectedItem ? selectedItem[displayKey] : selectoption}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                >
                  <Text  style={styles.textBtn}>{item[displayKey]}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  selectedItem: {
    padding: 15,
    borderWidth: 2,
    borderColor: PublicStyles.lightColor,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontWeight:'bold',
    marginBottom:20,
  },
  textBtn:{
    fontWeight:'bold',
  },
  focusedBorder:{
    borderColor:PublicStyles.primaryColor,
    borderWidth:2
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius:5,
    paddingTop:10,
    paddingBottom:10,
    borderColor:'black',
    borderWidth:.2,
    overflow:'hidden',
    backgroundColor:'#fdfdfd',
  },
  item: {
    padding: 15,
    alignSelf:'center',
    color:'white'
  },
});
