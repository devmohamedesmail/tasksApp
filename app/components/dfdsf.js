import React, { useContext, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import CustomBottomNavBtn from "../customComponents/CustomBottomNavBtn";
import { Div } from "react-native-magnus";
import Colors from "../config/Colors";
import { useNavigationState } from '@react-navigation/native';




import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';



export default function BottomNav() {
  const navigation = useNavigation();
  const { t } = useTranslation()



 // Automatically determine the active screen based on navigation state
 const activeScreen = useNavigationState(state => state.routes[state.index].name);

 const getButtonStyles = (screenName) => ({
   bg: activeScreen === screenName ? Colors.primary : 'white',
   text: activeScreen === screenName ? 'white' : Colors.primary,
 });



  return (
    <Div h={70} row bg='white' borderTopWidth={1} borderTopColor="gray400" justifyContent="center" alignItems="center">
       <Div row>
        <CustomBottomNavBtn
          icon={<AntDesign name="home" size={26} color={activeScreen === 'Home' ? Colors.titary : Colors.primary} />}
          title={t('home')}
          onPress={() => navigation.navigate('Home')}
          {...getButtonStyles('Home')}
        />

        <CustomBottomNavBtn
          icon={<FontAwesome6 name="file-invoice-dollar" size={27} color={activeScreen === 'Invoices' ? Colors.titary : Colors.primary} />}
          title={t('invoices')}
          onPress={() => navigation.navigate('Invoices')}
          {...getButtonStyles('Invoices')}
        />

        <CustomBottomNavBtn
          icon={<FontAwesome5 name="car-alt" size={26} color={activeScreen === 'InvoicesData' ? Colors.titary  : Colors.primary} />}
          title={t('carsstatus')}
          onPress={() => navigation.navigate('InvoicesData')}
          {...getButtonStyles('InvoicesData')}
        />

        <CustomBottomNavBtn
          icon={<AntDesign name="user" size={26} color={activeScreen === 'Profile' ? Colors.titary  : Colors.primary} />}
          title={t('profile')}
          onPress={() => navigation.navigate('Profile')}
          {...getButtonStyles('Profile')}
        />
      </Div>
    </Div>
  );
}


