import React from "react";
import { TouchableOpacity,StyleSheet ,Text} from "react-native";
import { PublicStyles } from "../styles/PublicStyles";

export default function CustomDateButton({ onpress ,title }) {
  return (
    <TouchableOpacity
      style={styles.dateBtn}
      onPress={onpress}
    >   
      <Text style={styles.dateBtnText}>{title} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    dateBtn: {
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      width: "45%",
      textAlign: "center",
      backgroundColor:PublicStyles.primaryColor
    },
    dateBtnText: {
      textAlign: "center",
      fontWeight:'bold',
      color:'white'
    },
  });
