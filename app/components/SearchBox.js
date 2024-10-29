import React,{useState} from "react";
import { TextInput, View, StyleSheet } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { PublicStyles } from "../styles/PublicStyles";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ContextData/ThemeContext";

export default function SearchBox({ value, onchangetext }) {
  const { t } = useTranslation()
  const { theme } = useTheme();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onchangetext}
        cursorColor={PublicStyles.primaryColor}
        placeholder={t('search')}
        onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[theme === 'light' ? styles.inputLight : styles.inputDark]}
      />
        <EvilIcons name="search" size={20} color="black" />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: PublicStyles.lightColor,
    borderWidth: 2,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputDark:{
    color: 'black',
    flex:1,
    height:20
  },
  inputLight:{
    color: PublicStyles.primaryDarkColor,
    flex:1,
    height:20
  },
});
