import React, { useContext, useState } from "react";
import { ScrollView, Text, View, StyleSheet, RefreshControl, } from "react-native";
import { PublicStyles } from "../styles/PublicStyles";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { useTheme } from "../ContextData/ThemeContext";
import BottomNav from "../components/BottomNav";
import CustomHomeCard from "../customComponents/CustomHomeCard";
import invoice from "../images/icons/invoice.png"
import addinvoice from "../images/icons/add-invoice.png"
import carstatus from "../images/icons/car-insurance.png"
import car from "../images/icons/car.png"
import staff from "../images/icons/staff.png"
import boy from "../images/icons/boy.png"
import { AuthContextData } from "../ContextData/AuthContext";


export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [auth] = useContext(AuthContextData)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchServicesData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={[theme === 'light' ? PublicStyles.screenLight : PublicStyles.screenDark]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={PublicStyles.container}>
          <Header />

          <View style={[PublicStyles.row, PublicStyles.justifyBetween, PublicStyles.wrap, styles.cardsContainer]}>
            <CustomHomeCard title={t('invoices')} image={invoice} onPress={() => navigation.navigate('Invoices')} />
            <CustomHomeCard title={t('addinvoice')} image={addinvoice} onPress={() => navigation.navigate('AddInvoice')} />
            <CustomHomeCard title={t('carsstatus')} image={carstatus} onPress={() => navigation.navigate('InvoicesData')} />
            <CustomHomeCard title={t('problems')} image={car} onPress={() => navigation.navigate('Problems')} />
            {auth && auth.user.role === 'admin' ? (
              <CustomHomeCard title={t('employees')} image={staff} onPress={() => navigation.navigate('Staff')} />
            ) : (<></>)}
            <CustomHomeCard title={t('profile')} image={boy} onPress={() => navigation.navigate('Profile')} />
          </View>

        </View>

      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: { marginTop: 20, marginBottom: 20, paddingTop: 100, }
})
