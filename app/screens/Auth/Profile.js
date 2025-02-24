import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthContextData } from "../../ContextData/AuthContext";
import { useNavigation } from "@react-navigation/native";
import BackendData from "../../utilities/BackendData";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from "../../components/BottomNav";
import { Div, Text, Image, ScrollDiv, Button } from "react-native-magnus";
import ItemSkeletion from "../Skeletons/ItemSkeletion";

import Colors from "../../config/Colors";
import { ActivityIndicator } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Toast from "react-native-toast-message";

export default function Profile() {
  const { t } = useTranslation();
  const [info, setInfo] = useState(null);
  const [auth, setauth] = useContext(AuthContextData);
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setInfo(auth);
  }, [auth]);






  const handlelogout = async () => {
    setloading(true);
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
        Toast.show({
          type: 'success',
          text1: t('logoutsuccessfully'),
          visibilityTime: 4000, 
          autoHide: true,
        })
        navigation.navigate('Login');
        

      }
      setloading(false);
    } catch (error) {
      console.error('Logout failed', error);
      Toast.show({
        type: 'error',
        text1: t('problemhappened'),
        visibilityTime: 4000, 
        autoHide: true,
      })
      setloading(false);
    } finally {
      setloading(false);
    }
  };




  return (
    <Div flex={1}>
      <ScrollDiv bg={Colors.screen} >
        <Div py={30} px={10}>

          <Image
            h={100}
            w={100}
            m={10}
            alignSelf="center"
            rounded="circle"
            source={require("./images/profile.png")}
          />






          <Div>
            {info ? (
              <>
                <Div flexDir="row" py={20} alignItems="center" borderBottomColor="gray300" borderBottomWidth={1}>
                  <AntDesign name="user" size={24} color="black" />
                  <Text ml={20} fontSize={16}>{info.user.name}</Text>
                </Div>


                <Div flexDir="row" py={20} alignItems="center" borderBottomColor="gray300" borderBottomWidth={1}>
                  <FontAwesome name="envelope-o" size={24} color="black" />
                  <Text ml={20} fontSize={16}>{info.user.email}</Text>
                </Div>



              </>) :
              (<ItemSkeletion />)}
          </Div>







          <Div my={40}>
            {loading ? <ActivityIndicator color={Colors.primary} size="large" /> :
              <>
                <Button
                  mt="lg"
                  onPress={() => handlelogout()}
                  px="xl"
                  py="lg"
                  h={60}
                  bg="red700"
                  color="white"
                  w="100%"
                  fontWeight="bold"
                  underlayColor="red600"
                >
                  {t('logout')}
                </Button>
              </>
            }
          </Div>





        </Div>
      </ScrollDiv>
      <BottomNav />
    </Div>
  );
}


