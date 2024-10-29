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
import { useTheme } from "../ContextData/ThemeContext";

export default function CustomInput({
  value,
  placeholder,
  onchangetext,
  secureTextEntry = false,
}) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useTheme();


  return (
    <View >
      <Text style={[theme === 'light' ? styles.labelLight : styles.labelDark]}>{placeholder}</Text>
      <View
        style={[
          styles.inputContainer,
          PublicStyles.row,
          PublicStyles.itemcenter,
          PublicStyles.justifyBetween,
          {
            borderColor: isFocused
              ? PublicStyles.primaryDarkColor
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
          
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[theme === 'light' ? styles.inputLight : styles.inputDark]}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.toggleVisibilityButton}
            onPress={() => setPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <FontAwesome name="eye-slash" size={20} color="black" />
            ) : (
              <FontAwesome name="eye" size={20} color="black" />
            )}
          </TouchableOpacity>
        )}

      </View>
    </View>

  );
}
const styles = StyleSheet.create({

  inputContainer: {
    borderColor: 'black',
    borderWidth: 1,
    width: "100%",
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 20,
    backgroundColor: "transparent",
    position: 'relative',
    elevation: .6
  },

  toggleVisibilityButton: {
    marginRight: 5,
    marginLeft: 5,
  },
  labelLight: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    color: PublicStyles.primaryDarkColor
  },
  labelDark: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    color: PublicStyles.primaryLightColor
  },

  inputDark:{
    color: PublicStyles.primaryLightColor,
    flex:1,
    height:30
  },
  inputLight:{
    color: PublicStyles.primaryDarkColor,
    flex:1,
    height:30
  },


});
