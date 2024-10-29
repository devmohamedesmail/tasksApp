import React from "react";
import {StyleSheet,Text,TouchableOpacity,Image} from "react-native";
import { PublicStyles } from "../styles/PublicStyles";
import DefaultImage from '../../assets/images/image.png';
export default function AccountantCustomButton({
  icon,
  image,
  title,
  onpress,
}) {
  
    const imageSource = image ? image : DefaultImage;


    return (
    <TouchableOpacity style={styles.btn} onPress={onpress}>
      <Image style={styles.image} source={imageSource} />
      <Text numberOfLines={1} style={styles.textBtn}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: PublicStyles.lightColor,
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    width: "43%",
    height:160,
    margin: 10,
  },
  textBtn: {
    marginTop: 10,
    fontWeight: "bold",
    
  },
  image: {
    width: "100%",
    height:'100%',
  },
});
