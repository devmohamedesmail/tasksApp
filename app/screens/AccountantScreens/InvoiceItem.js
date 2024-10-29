import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PublicStyles } from "../../styles/PublicStyles";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import CustomActionButton from "../../customComponents/CustomActionButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from "react-i18next";
import { useTheme } from "../../ContextData/ThemeContext";

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

  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <View style={[PublicStyles.col, styles.item,theme==='light'? PublicStyles.backgroundlightColor : PublicStyles.backgroundwhiteColor ]} key={id}>
      <View
        style={[
          PublicStyles.row,
          PublicStyles.justifyBetween,
          PublicStyles.itemcenter,
          styles.itemInfo,

        ]}
      >
        <Text style={[styles.itemText,theme==='light'? PublicStyles.textLightMode : PublicStyles.textDarkMode]}>{name}</Text>
        <Text style={[styles.itemText,theme==='light'? PublicStyles.textLightMode : PublicStyles.textDarkMode]}>{carNo}</Text>
        <Text style={[styles.itemText,theme==='light'? PublicStyles.textLightMode : PublicStyles.textDarkMode]}>{carType}</Text>
        <Text style={[styles.itemText,theme==='light'? PublicStyles.textLightMode : PublicStyles.textDarkMode]}>{carService}</Text>
        <Text style={[styles.itemText,theme==='light'? PublicStyles.textLightMode : PublicStyles.textDarkMode]}>{price}</Text>
      </View>

      <View
        style={[
          PublicStyles.row,
          PublicStyles.justifyBetween,
          PublicStyles.itemcenter,
        ]}
      >


        <CustomActionButton title={t('addstage')} backgroundColor="green" onpress={addStage} />
        <CustomActionButton title={t('addproblem')} backgroundColor="red" onpress={addProblem} />
        <CustomActionButton icon={<Entypo name="edit" size={20} color="green" />} backgroundColor={PublicStyles.lightColor} onpress={onpressEdit} />
        <CustomActionButton icon={<AntDesign name="eyeo" size={20} color="black" />} backgroundColor={PublicStyles.lightColor} onpress={onpressShowInvoice} />
        <CustomActionButton icon={<EvilIcons name="trash" size={20} color="red" />} backgroundColor={PublicStyles.lightColor} onpress={onpressDeleteInvoice} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: PublicStyles.lightColor,
    borderWidth: 1,
    marginBottom: 10,
    padding: 20,
  },
  itemInfo: {
    marginBottom: 30,
    flexWrap: 'wrap'
  },
  itemText: {
    fontWeight: "normal",
    marginRight: 3,
  },

});
