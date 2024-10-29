import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { PublicStyles } from "../../styles/PublicStyles";
import { useTheme } from "../../ContextData/ThemeContext";
export default function InvoiceDetailsItem({ title, value }) {
  const {theme}=useTheme()
  return (
    <View
      style={[
        PublicStyles.row,
        PublicStyles.itemcenter,
        PublicStyles.row,
        PublicStyles.justifyBetween,
        styles.item,
        theme==='light'? PublicStyles.backgroundwhiteColor : PublicStyles.backgroundDarkColor
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
    item: {
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: PublicStyles.lightColor,
      marginBottom: 10,
    },
    title: {
      fontWeight: "bold",
      color: PublicStyles.textLightMode,
    },
    value: {},
  });
