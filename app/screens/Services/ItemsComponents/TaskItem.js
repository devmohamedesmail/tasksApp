import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { PublicStyles } from "../../../styles/PublicStyles";
import ProgressBar from "../../../components/ProgressBar";
import CustomActionButton from "../../../customComponents/CustomActionButton";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';



export default function TaskItem({
  id,
  image,
  carNo,
  carColor,
  description,
  carType,
  notes,
  carStatus,
  start,
  end,
  name,
  deleteTask,
  EditTask,
  chaneTaskStatus,
  fetchWorkertasks
}) {
  return (
    <View key={id} style={[PublicStyles.col, styles.item]}>
      <View style={[PublicStyles.row, PublicStyles.itemcenter,styles.infoSection]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `${image}`,
            }}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>{name}</Text>
          <Text style={styles.infoText}>{carNo}</Text>
          <Text style={styles.infoText}>{carType}</Text>
          <Text style={styles.infoText}>{carColor}</Text>
          <Text style={styles.infoText}>{description}</Text>
          <Text style={styles.infoText}>{carStatus}</Text>
          <Text style={styles.infoText}>{notes}</Text>
        </View>
      </View>
      <View
        style={[
          PublicStyles.row,
          PublicStyles.itemcenter,
          PublicStyles.justifyBetween,
        ]}
      >
        <Text>{start}</Text>
        <Text>{end}</Text>
      </View>
      <ProgressBar start={start} end={end} carNo={carNo} />
      <View
        style={[
          PublicStyles.row,
          PublicStyles.itemcenter,
          PublicStyles.justifyBetween,
        ]}
      >
        <CustomActionButton backgroundColor={PublicStyles.lightColor} icon={<FontAwesome name="trash-o" size={24} color="red" />} onpress={deleteTask} />
        <CustomActionButton 
        backgroundColor={PublicStyles.lightColor} 
        icon={<Entypo name="edit" size={24} color="green" />} 
        onpress={() => EditTask(fetchWorkertasks)} />
        {carStatus === "1" ? (
            <CustomActionButton backgroundColor={PublicStyles.lightColor} icon={<FontAwesome name="dot-circle-o" size={24} color="green" />} onpress={chaneTaskStatus} />

        ) : (
            <CustomActionButton backgroundColor={PublicStyles.lightColor} icon={<FontAwesome name="dot-circle-o" size={24} color="red" />} onpress={chaneTaskStatus} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  item: {
    borderColor: PublicStyles.lightColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoSection:{
    marginTop:10,
  },
  info:{
    flex:1,

  },
  imageContainer:{
    flex:1,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PublicStyles.lightColor,
  },
  infoText: {
    fontWeight: "bold",
    fontSize: 16,
    color: PublicStyles.primaryColor,
    marginBottom: 5,
  },
});
