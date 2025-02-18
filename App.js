import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import "intl-pluralrules";
import ServicesContext from "./app/ContextData/ServicesContext";
import AuthContext from "./app/ContextData/AuthContext";
import DataProvider from "./app/ContextData/DataProvider";
import AppNavigator from "./app/components/AppNavigator";
import Toast from "react-native-toast-message";

import { useState } from "react";
import IntroApp from "./app/components/IntroApp/IntroApp";
import BottomNav from "./app/components/BottomNav";


export default function App() {

  const [isIntroCompleted, setIsIntroCompleted] = useState(false);
  const handleIntroCompletion = () => {
    setIsIntroCompleted(true);
  };
  return (


    <NavigationContainer>
      <StatusBar backgroundColor="black" />
   
        <DataProvider>
          <AuthContext>
            <ServicesContext>
            
            <AppNavigator />
              {/* {isIntroCompleted ? (
              <AppNavigator />
            ) : (
              <IntroApp onDone={handleIntroCompletion} />
            )} */}
              <Toast />
            </ServicesContext>
          </AuthContext>
        </DataProvider>

    </NavigationContainer>
   

  );
}



