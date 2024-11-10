import React from "react";
import {


  I18nManager,
} from "react-native";
import { useTranslation } from "react-i18next";
import "../../translation/i18n";
import { Button,Text } from "react-native-magnus";
import Colors from "../../config/Colors";

export default function ToggleLangButton() {
  const { t, i18n } = useTranslation();
  

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    I18nManager.forceRTL(newLang === "ar");
  };

  return (
    <Button bg={Colors.primary} onPress={toggleLanguage} >
      <Text color="white" fontWeight="bold">{i18n.language === "en" ? "عربي" : "English"}</Text>
    </Button>
  );
}


