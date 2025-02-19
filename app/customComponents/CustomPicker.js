import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Div, Dropdown } from "react-native-magnus";
import Colors from "../config/Colors";
import { ScrollView } from "react-native";

export default function CustomPicker({items,displayKey,selectedItem,onPress = () => {},selectoption}) {
  const { t } = useTranslation();
  const dropdownRef = React.createRef();

  // Handle item selection and close the dropdown
  const handleSelect = (item) => {
    dropdownRef.current.close();
    onPress(item);
  };

  return (
    <Div my={5}>
      <Button
        block
        
        bg='transparent'
        mt="sm"
        p="md"
        h={60}
        borderColor={Colors.primary}
        borderWidth={1}
        color={Colors.primary}
        fontWeight="semibold"
        onPress={() => dropdownRef.current.open()}
      >
        {selectedItem ? selectedItem[displayKey] : selectoption}
      </Button>

      <Dropdown
        ref={dropdownRef}
        mt="md"
        pb="2xl"
        showSwipeIndicator={true}
        roundedTop="xl"
      >
        
          {items && items.map((item) => (
            <Dropdown.Option py={0} px="xl" my={5} block key={item.id}>
              <Button
                bg="white"
                color={Colors.primary}
                borderBottomWidth={1}
                fontWeight="bold"
                w="100%"
                h={60}
                p={0}
                onPress={() => handleSelect(item)}
              >
                {item[displayKey]}
              </Button>
            </Dropdown.Option>
          ))}
     
      </Dropdown>
    </Div>
  );
}
