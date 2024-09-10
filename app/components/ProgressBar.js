import React, { useState, useEffect, useRef } from "react";
import {View,Text,StyleSheet,Animated,Alert} from "react-native";
import { useTranslation } from "react-i18next";
import * as Speech from "expo-speech";
import { PublicStyles } from "../styles/PublicStyles";

// Improved parseDate function to handle various formats and edge cases
const parseDate = (dateString) => {
  if (!dateString) return new Date(NaN);

  // Define a regex to parse the date string
  const regex =
    /^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{2}):(\d{2}) (AM|PM)$/;
  const match = dateString.match(regex);

  if (!match) {
    console.error("Invalid date format");
    return new Date(NaN);
  }

  const [, month, day, year, hours, minutes, seconds, period] = match;

  let hour = parseInt(hours, 10);
  if (period === "PM" && hour < 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return new Date(year, month - 1, day, hour, minutes, seconds);
};

export default function ProgressBar({ start, end, carNo }) {
  const [progress, setProgress] = useState(0);
  const alertShown = useRef(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const startDate = parseDate(start);
      const endDate = parseDate(end);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error("Invalid date format");
        return;
      }

      if (now < startDate) {
        setProgress(0);
        return;
      }
      if (now > endDate) {
        setProgress(100);
        return;
      }

      const totalDuration = endDate - startDate;
      const elapsed = now - startDate;
      const progressPercent = (elapsed / totalDuration) * 100;

      if (totalDuration <= 0) {
        console.error("Invalid total duration");
        return;
      }

      setProgress(progressPercent);

      if (progressPercent >= 75 && !alertShown.current) {
        alertShown.current = true;
        Alert.alert(t("progressalert"), t("progressratio"), [
          { text: "OK", onPress: () => {} },
        ]);
        const message =
          i18n.language === "ar"
            ? `الرجاء فحص السيارة فإنها على وشك التسليم رقم ${carNo}`
            : `Please check car number ${carNo}`;
        Speech.speak(message, {
          language: i18n.language === "ar" ? "ar" : "en",
          pitch: 1,
          rate: 0.4,
        });
      }
    };

    calculateProgress(); // Initial calculation
    const interval = setInterval(calculateProgress, 1000);
    return () => clearInterval(interval);
  }, [start, end, t, carNo, i18n.language]);

  return (
    <View style={styles.container}>
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[styles.progressBar, { width: `${progress}%` }]}
        />
      </View>
      <Text>
        {t("progress")} {isNaN(progress) ? "0" : Math.round(progress)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#e0e0df",
    borderRadius: 5,
    overflow: "hidden",
    height: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: PublicStyles.primaryColor,
    borderRadius: 5,
    position: "absolute",
    height: 20,
    left: 0,
    top: 0,
  },
});
