import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import "intl-pluralrules";
import ServicesContext from "./app/ContextData/ServicesContext";
import AuthContext from "./app/ContextData/AuthContext";
import DataProvider from "./app/ContextData/DataProvider";
import AppNavigator from "./app/components/AppNavigator";
import Toast from "react-native-toast-message";



export default function App() {

 
  return (



    <NavigationContainer>
      <StatusBar backgroundColor="black" />
        <DataProvider>
          <AuthContext>
            <ServicesContext>
              <AppNavigator />
              <Toast />
            </ServicesContext>
          </AuthContext>
        </DataProvider>

    </NavigationContainer>
   

  );
}



