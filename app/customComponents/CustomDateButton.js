import React from "react";
import { Button, Icon, Div, Text } from "react-native-magnus";

export default function CustomDateButton({ onpress, title, bg }) {
  return (

    <Button bg={bg} h={50} w='45%' rounded="lg" onPress={onpress}>
      <Text color="white" fontWeight="bold" mx={5}>{title}</Text>
    </Button>

  );
}

