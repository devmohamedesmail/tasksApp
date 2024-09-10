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

export default function BottomNav() {
  const [activeScreen, setActiveScreen] = useState("Home");
  const navigation = useNavigation();
  const [auth, setAuth] = useContext(AuthContextData);
  const {t}=useTranslation()


  

  return (
    <View style={styles.navBottom}>
      <View
        style={[
          PublicStyles.container,
          PublicStyles.justifyBetween,
          PublicStyles.row,
          styles.btnContainer,
        ]}
      >
        <TouchableOpacity
          style={[
            PublicStyles.col,
            PublicStyles.itemcenter,
            styles.btn,
            activeScreen === "Home" && styles.activeBtn,
          ]}
          onPress={() => {
            
            if (auth && auth.user) {
              // Navigate to Login if role is 'user' or null
              if (auth.user.role === "user" || auth.user.role === null) {
                navigation.navigate("Login");
              } else {
                navigation.navigate("Home");
                if (setActiveScreen) {
                  setActiveScreen("Home");
                }
              }
            }
          }}
        >
          <AntDesign name="home" size={20} color="white" />
          <Text style={styles.btnText}>{t('home')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            PublicStyles.col,
            PublicStyles.itemcenter,
            styles.btn,
            activeScreen === "Accountant" && styles.activeBtn,
          ]}
          onPress={() => {
            
            if (auth && auth.user) {
             
              if (auth.user.role === "user" || auth.user.role === null) {
                navigation.navigate("Login");
              } else {
                navigation.navigate("Accountant");
                if (setActiveScreen) {
                  setActiveScreen("Accountant");
                }
              }
            } 
          }}
        >
          <MaterialIcons name="category" size={24} color="white" />
          <Text style={styles.btnText}>{t('categories')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            PublicStyles.col,
            PublicStyles.itemcenter,
            styles.btn,
            activeScreen === "Add Service" && styles.activeBtn,
          ]}
          onPress={() => {
           
            if (auth && auth.user) {
             
              if (auth.user.role === "user" || auth.user.role === null) {
                navigation.navigate("Login");
              } else {
                navigation.navigate("Add Service");
                if (setActiveScreen) {
                  setActiveScreen("Add Service");
                }
              }
            } 
          }}
        >
          <AntDesign
            name="pluscircle"
            size={24}
            color={PublicStyles.lightColor}
          />
          <Text style={styles.btnText}>{t('add')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            PublicStyles.col,
            PublicStyles.itemcenter,
            styles.btn,
            activeScreen === "Tasks" && styles.activeBtn,
          ]}
          onPress={() => {
            
            if (auth && auth.user) {
             
              if (auth.user.role === "user" || auth.user.role === null) {
                navigation.navigate("Login");
              } else {
                navigation.navigate("Tasks");
                if (setActiveScreen) {
                  setActiveScreen("Tasks");
                }
              }
            } 
          }}
        >
          <FontAwesome5 name="tasks" size={20} color="white" />
          <Text style={styles.btnText}>{t('tasks')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            PublicStyles.col,
            PublicStyles.itemcenter,
            styles.btn,
            activeScreen === "Setting" && styles.activeBtn,
          ]}
          onPress={() => {
            
            if (auth && auth.user) {
             
              if (auth.user.role === "user" || auth.user.role === null) {
                navigation.navigate("Login");
              } else {
                navigation.navigate("Setting");
                if (setActiveScreen) {
                  setActiveScreen("Setting");
                }
              }
            } 
          }}
        >
          <AntDesign name="setting" size={20} color="white" />
          <Text style={styles.btnText}>{t('setting')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBottom: {
    height: 70,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 0,
    bottom: 0,
    width: "100%",
    alignSelf: "center",
    paddingBottom: 10,
    paddingTop: 30,
  },
  btnContainer: {
    position: "relative",
  },
  btn: {
    // flex:1
  },
  btnText: {
    fontSize: 12,
    color: "white",
  },
  activeBtn: {
    backgroundColor: PublicStyles.primaryColor,
    bottom: 30,
    borderRadius: 100,
    height: 65,
    width: 65,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 2,
    borderColor: "white",
  },
});
