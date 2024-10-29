import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import "intl-pluralrules";
import Accountant from "./app/screens/Accountant";
import AddInvoice from "./app/screens/AccountantScreens/AddInvoice";
import ServicesContext from "./app/ContextData/ServicesContext";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import AuthContext, { AuthContextData } from "./app/ContextData/AuthContext";
import DataProvider from "./app/ContextData/DataProvider";
import Invoices from "./app/screens/AccountantScreens/Invoices";
import EditInvoice from "./app/screens/AccountantScreens/EditInvoice";
import AddStage from "./app/screens/AccountantScreens/AddStage";
import AddProblem from "./app/screens/AccountantScreens/AddProblem";
import InvoiceDetails from "./app/screens/AccountantScreens/InvoiceDetails";
import ToggleLangButton from "./app/components/TogglelangButton/ToggleLangButton";
import Home from "./app/screens/Home";
import Profile from "./app/screens/Profile";
import InvoicesDataDetails from "./app/screens/AccountantScreens/InvoicesDataDetails";
import Staff from "./app/screens/Staff/Staff";
import StaffDetails from "./app/screens/Staff/StaffDetails";
import Problems from "./app/screens/Staff/Problems";
import {  useContext, useEffect } from "react";
import { Alert, Linking, View } from 'react-native';
import * as Updates from 'expo-updates';
import { ThemeProvider } from "./app/ContextData/ThemeContext";




export default function App() {
  const Stack = createNativeStackNavigator();
 

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          Alert.alert(
            t('update_available'),
            t('update_now'),
            [
              { text: t('cancel'), style: 'cancel' },
              {
                text: t('go-to-store'),
                onPress: () => {
                  const url = 'https://play.google.com/store/apps/details?id=com.mohamedesmail9225.alktaboot&pli=1'; // Replace with your app's package name
                  Linking.openURL(url).catch(err => console.error('An error occurred', err));
                },
              },
              {
                text: t('updateNow'),
                onPress: async () => {
                  await Updates.fetchUpdateAsync();
                  Alert.alert(t('after-update'));
                  Updates.reloadAsync();
                },
              },
            ]
          );
        }
      } catch (e) {
        console.error(e);
      }
    };

    checkForUpdate();
  }, []);





  return (


    <NavigationContainer>
      <StatusBar backgroundColor="black" />
      <ThemeProvider>
        <DataProvider>
          <AuthContext>
            <ServicesContext>
              <Stack.Navigator  >

        
              <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }}
                />


                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                

                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{ headerShown: false }}
                />




                <Stack.Screen
                  name="AddInvoice"
                  component={AddInvoice}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Invoices"
                  component={Invoices}
                  options={{ headerShown: false }}
                />


                <Stack.Screen
                  name="Invoice Details"
                  component={InvoiceDetails}
                  options={{ headerShown: false }}
                />


                <Stack.Screen
                  name="Edit Invoice"
                  component={EditInvoice}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="Add Stage"
                  component={AddStage}
                  options={{ headerShown: false }}
                />


                <Stack.Screen
                  name="Add Problem"
                  component={AddProblem}
                  options={{ headerShown: false }}
                />


                <Stack.Screen
                  name="InvoicesData"
                  component={InvoicesDataDetails}
                  options={{ headerShown: false }}
                />



                <Stack.Screen
                  name="Problems"
                  component={Problems}
                  options={{ headerShown: false }}
                />



                <Stack.Screen
                  name="Staff"
                  component={Staff}
                  options={{ headerShown: false }}
                />







                <Stack.Screen
                  name="Profile"
                  component={Profile}
                  options={{ headerShown: false }}
                />



                <Stack.Screen
                  name="Accountant"
                  component={Accountant}
                  options={{ title: "", headerRight: () => <ToggleLangButton /> }}
                />
                {/* accountant screens */}






                <Stack.Screen
                  name="StaffDetails"
                  component={StaffDetails}
                  options={{ title: "", headerRight: () => <ToggleLangButton /> }}
                />

              </Stack.Navigator>
              {/* <BottomNav /> */}
            </ServicesContext>
          </AuthContext>
        </DataProvider>
      </ThemeProvider>
    </NavigationContainer>

  );
}



