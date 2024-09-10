import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { PublicStyles } from "../../../styles/PublicStyles";
import { Entypo } from "@expo/vector-icons";
import CustomActionButton from "../../../customComponents/CustomActionButton";

export default function WorkerItem({
  navigateToTasks,
  name,
  onpressAddTask,
  id,
  onpressDeleteWorker,
  index,
  
}) {
  return (
    <View key={id} style={styles.item}>
      <TouchableOpacity style={{ flex: 1 }} onPress={navigateToTasks}>
        <Text style={{ fontWeight: "bold" }}>{index} - {name}</Text>
      </TouchableOpacity>

      <View style={[PublicStyles.row, PublicStyles.justifyBetween]}>
        <View style={{ margin: 5 }}>
          <CustomActionButton
            icon={<AntDesign name="pluscircle" size={20} color="green" />}
            onpress={onpressAddTask}
            backgroundColor={PublicStyles.lightColor}
          />
        </View>
        <View style={{ margin: 5 }}>
          <CustomActionButton
            icon={<Entypo name="trash" size={20} color="red" />}
            onpress={onpressDeleteWorker}
            backgroundColor={PublicStyles.lightColor}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: PublicStyles.lightColor,
    borderWidth: 2,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
