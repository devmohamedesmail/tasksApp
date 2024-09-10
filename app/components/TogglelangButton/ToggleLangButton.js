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

export default function ToggleLangButton() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    I18nManager.forceRTL(newLang === "ar");
  };

  return (
    <TouchableOpacity onPress={toggleLanguage} style={styles.button}>
      <Text>{i18n.language === "en" ? "عربي" : "English"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {},
});
