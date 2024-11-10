import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import "intl-pluralrules";
import ServicesContext from "./app/ContextData/ServicesContext";
import AuthContext from "./app/ContextData/AuthContext";
import DataProvider from "./app/ContextData/DataProvider";
import { useEffect } from "react";
import { Alert, Linking} from 'react-native';
import * as Updates from 'expo-updates';
import AppNavigator from "./app/components/AppNavigator";




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
   
        <DataProvider>
          <AuthContext>
            <ServicesContext>
              <AppNavigator />
            </ServicesContext>
          </AuthContext>
        </DataProvider>

    </NavigationContainer>

  );
}



