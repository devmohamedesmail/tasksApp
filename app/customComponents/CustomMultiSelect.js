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

export default function CustomMultiSelect(
    {
        items,
        selectedItems,  // Changed to plural to reflect multiple selections
        onSelect,        // Callback to update selected items
        displayKey,
        selectOption
    }
) {


    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();

    const handleSelect = (item) => {
        const itemId = item.id;
        const isSelected = selectedItems.some(selected => selected.id === itemId);

        if (isSelected) {
            // Remove item if it's already selected
            onSelect(selectedItems.filter(selected => selected.id !== itemId));
        } else {
            // Add item to selected items
            onSelect([...selectedItems, item]);
        }
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedItems.some(selected => selected.id === item.id);

        return (
            <TouchableOpacity
                style={[styles.item, isSelected && styles.itemSelected]}
                onPress={() => handleSelect(item)}
            >
                <Text style={isSelected && styles.itemTextSelected}>{item[displayKey]}</Text>
            </TouchableOpacity>
        );
    };


    return (
        <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          style={styles.selectedItem}
        >
          <Text>
            {selectedItems.length > 0
              ? selectedItems.map(item => item[displayKey]).join(', ')
              : selectOption}
          </Text>
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
                renderItem={renderItem}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
  
    )
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
    },
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "80%",
      backgroundColor: "#fff",
      borderRadius: 4,
      elevation: 5,
    },
    item: {
      padding: 15,
    },
    itemSelected: {
      backgroundColor: PublicStyles.primaryColor,  // Highlight selected item
    },
    itemTextSelected: {
      color: "#fff",  // Text color for selected item
    },
  });