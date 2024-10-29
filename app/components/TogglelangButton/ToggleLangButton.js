import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  I18nManager,
} from "react-native";
import { useTranslation } from "react-i18next";
import "../../translation/i18n";
import { useTheme } from "../../ContextData/ThemeContext";
import { PublicStyles } from "../../styles/PublicStyles";

export default function ToggleLangButton() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    I18nManager.forceRTL(newLang === "ar");
  };

  return (
    <TouchableOpacity onPress={toggleLanguage} style={[styles.button, theme === 'light' ? PublicStyles.backgroundlightColor : PublicStyles.backgroundDarkColor]}>
      <Text style={[styles.textBtn,theme==='light'? styles.lightText: styles.darkText]}>{i18n.language === "en" ? "عربي" : "English"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius:5,
    padding: 6,
  },
  darkText:{
    color:PublicStyles.primaryDarkColor
  },
  lightText:{
    color:PublicStyles.primaryLightColor
  }
});
