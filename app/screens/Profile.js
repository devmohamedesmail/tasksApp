import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { PublicStyles } from "../styles/PublicStyles";
import { useTranslation } from "react-i18next";
import { AuthContextData } from "../ContextData/AuthContext";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import BackendData from "../utilities/BackendData";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Profile() {
  const { t } = useTranslation();
  const [info, setInfo] = useState(null);
  const [auth, setauth] = useContext(AuthContextData);
  const navigation = useNavigation();
  useEffect(() => {
    setInfo(auth);
  }, [auth]);

  




  const handlelogout = async () => {
    try {
      
      const token = auth?.token; 
  
      if (!token) {
        navigation.navigate('Login');
        return;
      }
  
      // Make a POST request to the logout endpoint
      const response = await axios.post(
        `${BackendData.url}logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        // Clear auth state or context
        setauth(null);
  
        
        await AsyncStorage.removeItem('userAuth');
  
        navigation.navigate('Login');
        
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };




  return (
    <ScrollView style={PublicStyles.screen}>
      <View style={PublicStyles.container}>
        <Text style={PublicStyles.screenTitle}>{t("profile")}</Text>
        <Image
          style={styles.image}
          source={require("../../assets/images/profile.png")}
        />

        <View style={styles.iteminfo}>
          {info ? (
            <Text style={styles.text}>{info.user.name}</Text> // Display info.name when info is available
          ) : (
            <Text>Loading...</Text> // Display a loading text or a placeholder when info is not available
          )}
        </View>
        <View style={styles.iteminfo}>
          {info ? (
            <Text style={styles.text}>{info.user.email}</Text> // Display info.name when info is available
          ) : (
            <Text>Loading...</Text> // Display a loading text or a placeholder when info is not available
          )}
        </View>
        <View style={{marginTop:30}}>
        <CustomButton title={t('logout')} onpress={()=>handlelogout()} />
       
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  iteminfo:{
    textAlign:'center',

    alignSelf:"center",
    marginTop:20,
    fontWeight:'bold',
    fontSize:20
  },
  text:{
    fontWeight:'bold'
  }
});