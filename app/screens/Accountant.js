import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'
import AccountantCustomButton from '../customComponents/AccountantCustomButton';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AddInvoiceImage from '../../assets/images/invoice.png'
import InvoicesImage from '../../assets/images/invoices.png'
import ProfileImage from '../../assets/images/profile.png'
import carsImage from '../../assets/images/car.png'
import workers from '../../assets/images/workers.png'
import problem from '../../assets/images/problem.png'
import { AuthContextData } from '../ContextData/AuthContext';


export default function Accountant() {
   const navigation = useNavigation();
   const [auth, setAuth] = useContext(AuthContextData);
   const { t } = useTranslation()
   
   return (
      <ScrollView style={PublicStyles.screen}>

         <View style={[PublicStyles.container, PublicStyles.row, PublicStyles.wrap]}>
            <AccountantCustomButton
               image={AddInvoiceImage}
               title={t("addinvoice")}
               onpress={() => navigation.navigate("AddInvoice")} />

            <AccountantCustomButton
               image={InvoicesImage}
               title={t('invoices')}
               onpress={() => navigation.navigate("Invoices")} />
            <AccountantCustomButton
               image={ProfileImage}
               title={t('profile')}
               onpress={() => navigation.navigate("Profile")} />

            <AccountantCustomButton
               image={carsImage}
               title={t('carsstatus')}
               onpress={() => navigation.navigate("InvoicesData")} />
               
            {auth.user.role === 'admin' ? (
               <AccountantCustomButton
                  image={workers}
                  title={t('employees')}
                  onpress={() => navigation.navigate("Staff")} />
            ) : (<></>)}



            <AccountantCustomButton
               image={problem}
               title={t('problems')}
               onpress={() => navigation.navigate("Problems")} />
         </View>
      </ScrollView>
   )
}


const styles = StyleSheet.create({

})
