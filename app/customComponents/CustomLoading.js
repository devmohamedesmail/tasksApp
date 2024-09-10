import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import { PublicStyles } from "../styles/PublicStyles";

export default function CustomLoading({ text }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000);
  }, []);
  return (
    <View style={PublicStyles.container}>
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1}
      >
        <Text>{text}</Text>
      </AnimatedLoader>
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
