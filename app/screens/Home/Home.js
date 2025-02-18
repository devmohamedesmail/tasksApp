import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import BottomNav from "../../components/BottomNav";
import CustomHomeCard from "../../customComponents/CustomHomeCard";
import statistics from "./icons/analytics.png"
import invoice from "./icons/invoice.png"
import addinvoice from "./icons/addinvoice.png"
import carstatus from "./icons/car-insurance.png"
import car from "./icons/problems.png"
import boy from "./icons/user.png"
import card from "./icons/card.png"
import staff from "./icons/users.png"
import { AuthContextData } from "../../ContextData/AuthContext";
import { Div, ScrollDiv,Text } from "react-native-magnus";
import Colors from "../../config/Colors";




export default function Home() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [auth] = useContext(AuthContextData)




  return (
    <Div flex={1}>
      <ScrollDiv bg={Colors.screen}> 
        <Div p={10}>
          
          <Div row justifyContent="space-between" flexWrap="wrap" mt={30}>
            <CustomHomeCard 
              bg='blue400' 
              title={t('statistics')} 
              image={statistics} 
              onPress={() => navigation.navigate('Statistics')}
               />
            <CustomHomeCard bg='yellow600' title={t('invoices')} image={invoice} onPress={() => navigation.navigate('Invoices')} />
            <CustomHomeCard bg='orange600' title={t('addinvoice')} image={addinvoice} onPress={() => navigation.navigate('AddInvoice')} />
            <CustomHomeCard bg='green600' title={t('carsstatus')} image={carstatus} onPress={() => navigation.navigate('InvoicesData')} />
            <CustomHomeCard bg='purple600' title={t('problems')} image={car} onPress={() => navigation.navigate('Problems')} />
            <CustomHomeCard bg='purple600' title={t('jobcards')} image={card} onPress={() => navigation.navigate('JobCards')} />
            {auth && auth.user.role === 'admin' ? (
              <CustomHomeCard bg='red600' title={t('employees')} image={staff} onPress={() => navigation.navigate('Staff')} />
            ) : (<></>)}
            <CustomHomeCard bg='blue600' title={t('profile')} image={boy} onPress={() => navigation.navigate('Profile')} />
          </Div>
        </Div>
      </ScrollDiv>
      <BottomNav />
    </Div>
  );
}


