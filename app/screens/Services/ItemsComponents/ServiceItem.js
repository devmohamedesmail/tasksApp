import React from "react";
import { Text, TouchableOpacity,StyleSheet,Image ,View} from "react-native";
import { PublicStyles } from "../../../styles/PublicStyles";

export default function ServiceItem({id,onpress,image,name}) {
  return (
    <TouchableOpacity
      style={[PublicStyles.col, PublicStyles.itemcenter, styles.btn]}
      onPress={onpress}
    >
      <View style={styles.ImageContainer}>
      <Image
        style={styles.image}
        source={{
          uri: `${image}`,
        }}
      />
      </View>
   
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    btn: {
      width: "30%",
      borderWidth: 2,
      borderColor: PublicStyles.lightColor,
      margin: 2,
      marginBottom:10,
      borderRadius: 20,
      overflow: 'hidden',
    },
    text: {
      fontWeight: "bold",
      fontSize: 14,
      marginTop: 10,
      marginBottom: 10,
      fontWeight:'bold'
    },
    ImageContainer:{
      width: '100%',
      height: 100,
      overflow: 'hidden',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: PublicStyles.lightColor,
      backgroundColor: PublicStyles.lightColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },

    
  });
