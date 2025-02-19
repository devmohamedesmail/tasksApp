import React, { useState } from "react";
import {  TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { PublicStyles } from "../styles/PublicStyles";

import { Button, Div ,Text} from "react-native-magnus";
import Modal from "react-native-modal";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CustomMultiSelect({ items, selectedItems, onSelect, displayKey, selectOption }) {

  const [isVisible, setIsVisible] = useState(false);
 

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
    <Div >
      <Button
        onPress={() => setIsVisible(true)}
        w="100%"
        h={60}
        my={10}
        bg="white"
        borderColor={PublicStyles.primaryColor}
        borderWidth={1}
        color={PublicStyles.primaryColor}
        fontWeight="bold"
      >
        {selectedItems.length > 0
            ? selectedItems.map(item => item[displayKey]).join(', ')
            : selectOption}
      </Button>

    
      <Modal visible={isVisible} animationIn="slideInUp" animationOut="slideOutDown" animationInTiming={1000} animationOutTiming={1000}>
        <Div bg="white" shadow="lg" h={500}>
        
     
        <Div flexDir="row" justifyContent="flex-end">
        <Button
          h={50}
          w={50}
          rounded="circle"
          bg="red600"
          onPress={() => setIsVisible(false)}
        >
         <AntDesign name="close" size={24} color="white" />
        </Button>
        </Div>
         <Div overflow="hidden">
            <FlatList
              data={items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          </Div>
          
        </Div>
      </Modal>
    </Div>

  )
}



const styles = StyleSheet.create({

  selectedItem: {
    padding: 15,
    borderWidth: 2,
    borderColor: PublicStyles.lightColor,
    borderRadius: 10,
    backgroundColor: "#fff",
  },


  item: {
    padding: 15,
  },
  itemSelected: {
    backgroundColor: PublicStyles.primaryColor,  
  },
  itemTextSelected: {
    color: "#fff", 
  },
});