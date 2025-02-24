import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import * as Speech from "expo-speech";
import { PublicStyles } from "../styles/PublicStyles";
import * as Notifications from "expo-notifications";
import { Div, Text } from "react-native-magnus";
import Colors from "../config/Colors";

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

export default function StageProgressBar({ start, end, carNo }) {
  const [progress, setProgress] = useState(0);
  const alertShown = useRef(false);
  const { t, i18n } = useTranslation();


  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Notification permissions not granted');
      }
    };

    requestPermissions();
  }, []);


  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const startDate = parseDate(start);
      const endDate = parseDate(end);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.log("Invalid date format");
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

        return;
      }

      setProgress(progressPercent);

      if (progressPercent >= 75 && !alertShown.current) {
        alertShown.current = true;

        // text alert
        Alert.alert(t("progressalert"), t(`progressratio ${carNo}`), [
          { text: "OK", onPress: () => { } },
        ]);
      }
    };

    calculateProgress(); // Initial calculation
    const interval = setInterval(calculateProgress, 1000);
    return () => clearInterval(interval);
  }, [start, end, t, i18n.language, carNo]);

  return (
    <Div my={6}>
      <Div style={styles.progressBarBackground}>
        <Animated.View
          style={[styles.progressBar, { width: `${progress}%` }]}
        />
      </Div>

      <Text color="black" fontWeight="bold" >{t("progress")} {isNaN(progress) ? "0" : Math.round(progress)}%</Text>
    </Div>
  );
}

const styles = StyleSheet.create({

  progressBarBackground: {
    height: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    overflow: "hidden",
    height: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 5,
    position: "absolute",
    height: 20,
    left: 0,
    top: 0,
  },
});
