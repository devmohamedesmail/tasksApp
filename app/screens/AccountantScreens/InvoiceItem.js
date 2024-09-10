import React from "react";
import {StyleSheet,Text,View} from "react-native";
import { PublicStyles } from "../../styles/PublicStyles";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import CustomActionButton from "../../customComponents/CustomActionButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from "react-i18next";

export default function InvoiceItem({
  id,
  name,
  carNo,
  carType,
  carService,
  price,
  onpressEdit,
  addStage,
  addProblem,
  onpressShowInvoice,
  onpressDeleteInvoice
}) {

  const{t}=useTranslation();
  return (
    <View style={[PublicStyles.col, styles.item]} key={id}>
      <View
        style={[
          PublicStyles.row,
          PublicStyles.justifyBetween,
          PublicStyles.itemcenter,
          styles.itemInfo,

        ]}
      >
        <Text style={styles.itemText}>{name}</Text>
        <Text style={styles.itemText}>{carNo}</Text>
        <Text style={styles.itemText}>{carType}</Text>
        <Text style={styles.itemText}>{carService}</Text>
        <Text style={styles.itemText}>{price}</Text>
      </View>

      <View
        style={[
          PublicStyles.row,
          PublicStyles.justifyBetween,
          PublicStyles.itemcenter,
        ]}
      >
        
        
        <CustomActionButton title={t('addstage')} backgroundColor={PublicStyles.primaryColor} onpress={addStage} />
        <CustomActionButton title={t('addproblem')} backgroundColor={PublicStyles.primaryColor} onpress={addProblem} />
        <CustomActionButton icon={ <Entypo name="edit" size={24} color="green" />} backgroundColor={PublicStyles.lightColor} onpress={onpressEdit} />
        <CustomActionButton icon={<AntDesign name="eyeo" size={24} color="black" />} backgroundColor={PublicStyles.lightColor} onpress={onpressShowInvoice} />
        <CustomActionButton icon={<EvilIcons name="trash" size={24} color="red" />} backgroundColor={PublicStyles.lightColor} onpress={onpressDeleteInvoice}  />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 20,
    borderColor: PublicStyles.lightColor,
    borderWidth: 1,
    marginBottom: 10,
    padding: 20,
  },
  itemInfo: {
    marginBottom: 30,
    flexWrap:'wrap'
  },
  itemText: {
    fontWeight: "bold",
    marginRight: 10,
  },
 
});
