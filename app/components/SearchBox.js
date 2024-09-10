import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { PublicStyles } from "../styles/PublicStyles";
import { useTranslation } from "react-i18next";

export default function SearchBox({ value, onchangetext }) {
    const{t}=useTranslation()
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onchangetext}
        cursorColor={PublicStyles.primaryColor}
        placeholder={t('search')}
      />
   
      <View>
      <EvilIcons name="search" size={30} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginBottom: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor:PublicStyles.lightColor,
    borderWidth:2,
  },
  input: {
    flex: 1,
     paddingHorizontal: 10,
  },
});
