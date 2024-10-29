import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PublicStyles } from "../styles/PublicStyles";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AuthContextData } from "../ContextData/AuthContext";
import { useTranslation } from "react-i18next";
import CustomBottomNavBtn from "../customComponents/CustomBottomNavBtn";
import { useTheme } from "../ContextData/ThemeContext";




export default function BottomNav() {

  const navigation = useNavigation();
  const [auth, setAuth] = useContext(AuthContextData);
  const { t } = useTranslation()
  const { theme } = useTheme()





  return (
    <View style={[styles.navBottom, theme === 'light' ? PublicStyles.backgroundlightColor : PublicStyles.backgroundDarkColor]}>
      <View
        style={[
          PublicStyles.container,
          PublicStyles.justifyBetween,
          PublicStyles.row,
          styles.btnContainer,
        ]}
      >

        <CustomBottomNavBtn
          icon={theme === 'light' ? <AntDesign name="home" size={20} color="white" /> : <AntDesign name="home" size={20} color="black" />}
          title={t('home')}
          onPress={() => {

            if (auth && auth.user) {

              if (auth.user.role === "user" || auth.user.role === null) {
                navigation.navigate("Login");
              } else {
                navigation.navigate("Home");
               
              }
            }

          }} />


        <CustomBottomNavBtn
          icon={theme === 'light' ? <FontAwesome6 name="file-invoice-dollar" size={24} color="white" /> : <FontAwesome6 name="file-invoice-dollar" size={24} color="black" />}
          title={t('invoices')}
          onPress={() => {

            if (auth && auth.user) {

              if (auth.user.role === "user" || auth.user.role === null) {
                navigation.navigate("Login");
              } else {
                navigation.navigate("Invoices");
              
              }
            }
          }}
        />



        <CustomBottomNavBtn
          icon={theme === 'light' ? <FontAwesome5 name="car-alt" size={24} color="white" /> : <FontAwesome5 name="car-alt" size={24} color="black" />}
          title={t('carsstatus')}
          onPress={() => {

            if (auth && auth.user) {

              if (auth.user.role === "user" || auth.user.role === null) {
                navigation.navigate("Login");
              } else {
                navigation.navigate("InvoicesData");
              
              }
            }
          }}
        />



        <CustomBottomNavBtn
          icon={theme === 'light' ? <AntDesign name="user" size={24} color="white" /> : <AntDesign name="user" size={24} color="black" />}
          title={t('profile')}
          onPress={() => {

            if (auth && auth.user) {

              if (auth.user.role === "user" || auth.user.role === null) {
                navigation.navigate("Login");
              } else {
                navigation.navigate("Profile");
                
              }
            }
          }}
        />





      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBottom: {
    height: 60,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    bottom: 0,
  },
  btnContainer: {
    position: "relative",
  },

});
