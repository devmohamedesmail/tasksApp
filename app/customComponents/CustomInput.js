import React from "react";
import { Input, Icon } from "react-native-magnus";


import Colors from "../config/Colors";

export default function CustomInput({
  value,
  placeholder,
  onchangetext,
  secureTextEntry = false,
  icon
}) {



  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onchangetext}
      p={10}
      h={60}
      my={10}
      focusBorderColor={Colors.primary}
      secureTextEntry={secureTextEntry}
      suffix={<Icon name={icon} color="black" fontSize={15} fontFamily="Feather" />}
    />

  );
}
