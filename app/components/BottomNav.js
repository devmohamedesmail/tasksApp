import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import CustomBottomNavBtn from "../customComponents/CustomBottomNavBtn";
import { Button, Div } from "react-native-magnus";
import Colors from "../config/Colors";
import Feather from '@expo/vector-icons/Feather';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



export default function BottomNav() {


  const navigation = useNavigation();
  const { t } = useTranslation()



  return (
    <Div h={70} bg="gray200" flexDir="row" justifyContent="space-between" px={10}>

      <CustomBottomNavBtn
        title={t('invoices')}
        icon={<FontAwesome5 name="file-invoice" size={24} color="black" />}
        onPress={() => navigation.navigate('Invoices')}
      />
     



      <Div bg="white" position="relative" roundedBottomLeft={50} roundedBottomRight={50} w={80} mb={20} flexDir="row" justifyContent="center" >
        <Button mb={45} p={0} bg={Colors.primary} w={60} h={60} rounded="circle" position="absolute" top={-20} 
           onPress={() => navigation.navigate('Home')}>
          <Feather name="home" size={24} color="white" />
        </Button>
      </Div>






      
      <CustomBottomNavBtn
        title={t('account')}
        icon={<AntDesign name="user" size={24} color="black" />}
        onPress={() => navigation.navigate('Profile')}
      />


    </Div>




  );
}

