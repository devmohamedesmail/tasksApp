import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
import StageProgressBar from "../../components/StageProgressBar";
import { PublicStyles } from "../../styles/PublicStyles";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomActionButton from "../../customComponents/CustomActionButton";

export default function CarStatusItem({
  name,
  worker,
  status,
  start,
  end,
  changeStatus,
  carNo,
}) {
  const { t } = useTranslation();
  return (
    <View style={[styles.stageItem]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/sportcar.png")}
        />
      </View>
      <Text style={styles.stage}>{name}</Text>
      
      <View>
        {worker.map((workerName)=>(<Text key={workerName.id} style={styles.workerName}>{workerName}</Text>))}
      </View>

      {status === "0" ? (
         <CustomActionButton onpress={changeStatus} icon={ <AntDesign name="closecircle" size={24} color="red" />} backgroundColor={PublicStyles.lightColor} />
      ) : ( 
        <CustomActionButton onpress={changeStatus} icon={<AntDesign name="checkcircle" size={24} color="green" />} backgroundColor={PublicStyles.lightColor} />
      )}
      <StageProgressBar start={start} end={end} carNo={carNo} />
    </View>
  );
}

const styles = StyleSheet.create({
  stageItem: {
    padding: 10,
    margin: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  stage: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  worker: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "bold",
  },
  workerName:{
    textAlign:'center',
    backgroundColor:PublicStyles.lightColor,
    marginBottom:5,
    padding:5,
    borderRadius:5,
    paddingLeft:10,
    paddingRight:10
  },
  start: {
    color: "green",
    marginBottom: 5,
  },
  end: {
    color: "red",
  },
  textBtn: {
    color: "white",
  },


  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  imageContainer: {
    borderRadius: 300,
    borderWidth: 1,
    borderColor: PublicStyles.lightColor,
    width: 90,
    height: 90,
    overflow: "hidden",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
