import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { PublicStyles } from "../styles/PublicStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CustomInput({
  value,
  placeholder,
  onchangetext,
  secureTextEntry = false,
}) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={[
        styles.inputContainer,
        PublicStyles.row,
        PublicStyles.itemcenter,
        PublicStyles.justifyBetween,
        {
          borderColor: isFocused
            ? PublicStyles.primaryColor
            : PublicStyles.lightColor,
        },
        { borderWidth: isFocused ? 1 : 1 },
      ]}
    >
      <TextInput
        value={value}
        onChangeText={onchangetext}
        cursorColor={PublicStyles.primaryColor}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        style={{ flex: 1,fontWeight:'bold',color:'black' ,height:30}}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.toggleVisibilityButton}
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <FontAwesome name="eye-slash" size={24} color="black" />
          ) : (
            <FontAwesome name="eye" size={24} color="black" />
          )}
        </TouchableOpacity>
      )}

      <Text style={[styles.label,{
          borderColor: isFocused
            ? PublicStyles.primaryColor
            : PublicStyles.lightColor,
        },
        { borderWidth: isFocused ? 1 : 2 }]}>{placeholder}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    borderColor: 'black',
    borderWidth: 2,
    width: "100%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 40,
    backgroundColor: "white",
    position:'relative'
  },
  label:{
    position:'absolute',
    top:-22,
    left:10,
    borderWidth:1,
    borderColor:PublicStyles.lightColor,
    borderRadius:10,
    paddingBottom:5,
    paddingTop:5,
    paddingRight:10,
    paddingLeft:10,
    backgroundColor:'white',
    fontWeight:'bold'
  }
});
