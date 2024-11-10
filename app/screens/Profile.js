import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, } from "react-native";
import { PublicStyles } from "../styles/PublicStyles";
import { useTranslation } from "react-i18next";
import { AuthContextData } from "../ContextData/AuthContext";
import CustomButton from "../customComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import BackendData from "../utilities/BackendData";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from "../components/BottomNav";

import BackButton from "../components/BackButton";
import DrawerComponent from "../components/DrawerComponent";
import { Div, Text, Image, ScrollDiv } from "react-native-magnus";
import ItemSkeletion from "./Skeletons/ItemSkeletion";
import ToggleLangButton from "../components/TogglelangButton/ToggleLangButton";
import Colors from "../config/Colors";




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
    <Div flex={1}>
      <ScrollDiv bg={Colors.light} >
        <Div py={30} px={10}>

        
          <Image
            h={100}
            w={100}
            m={10}
            alignSelf="center"
            rounded="circle"
            source={require("../../assets/images/profile.png")}
          />

          <Div row justifyContent="center" my={10}>
            {info ? (
              <Text fontWeight="bold" fontSize={20}>{info.user.name}</Text>
            ) : (
              <ItemSkeletion />
            )}
          </Div>
          <Div row justifyContent="center" my={10}>
            {info ? (
              <Text fontWeight="bold" fontSize={15}>{info.user.email}</Text>
            ) : (
              <ItemSkeletion />
            )}
          </Div>

          <Div row justifyContent="center">
            <ToggleLangButton />
          </Div>

          <CustomButton title={t('logout')} onpress={() => handlelogout()} />


        </Div>
      </ScrollDiv>
      <BottomNav />
    </Div>
  );
}


