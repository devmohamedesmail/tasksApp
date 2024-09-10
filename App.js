import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar, Text } from "react-native";
import "intl-pluralrules";
import BottomNav from "./app/components/BottomNav";
import ServiceWorker from "./app/screens/Services/ServiceWorker";
import Tasks from "./app/screens/Tasks";
import Workers from "./app/screens/Workers";
import AddService from "./app/screens/AddService";
import Setting from "./app/screens/Setting";
import Accountant from "./app/screens/Accountant";
import AddInvoice from "./app/screens/AccountantScreens/AddInvoice";
import EditTask from "./app/screens/EditTask";
import EditService from "./app/screens/EditService";
import ServicesContext from "./app/ContextData/ServicesContext";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import AuthContext from "./app/ContextData/AuthContext";
import DataProvider from "./app/ContextData/DataProvider";
import Invoices from "./app/screens/AccountantScreens/Invoices";
import EditInvoice from "./app/screens/AccountantScreens/EditInvoice";
import AddStage from "./app/screens/AccountantScreens/AddStage";
import AddProblem from "./app/screens/AccountantScreens/AddProblem";
import InvoiceDetails from "./app/screens/AccountantScreens/InvoiceDetails";
import ToggleLangButton from "./app/components/TogglelangButton/ToggleLangButton";
import Home from "./app/screens/Services/Home";
import AddTaskScreen from "./app/screens/Services/AddTaskScreen";
import WorkerTasks from "./app/screens/Services/WorkerTasks";
import Profile from "./app/screens/Profile";

import InvoicesDataDetails from "./app/screens/AccountantScreens/InvoicesDataDetails";
import Staff from "./app/screens/Staff/Staff";
import StaffDetails from "./app/screens/Staff/StaffDetails";
import Problems from "./app/screens/Staff/Problems";




export default function App() {
  const Stack = createNativeStackNavigator();
 


  return (

    <NavigationContainer>
      <StatusBar backgroundColor="black" />
      <DataProvider>
        <AuthContext>
          <ServicesContext>
            <Stack.Navigator initialRouteName="WorkerTasks">

              <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="ServiceWorkers"
                component={ServiceWorker}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Add Task Screen"
                component={AddTaskScreen}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Tasks"
                component={Tasks}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Edit Task"
                component={EditTask}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Workers"
                component={Workers}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Add Service"
                component={AddService}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Worker Tasks"
                component={WorkerTasks}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Setting"
                component={Setting}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Edit Service"
                component={EditService}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Accountant"
                component={Accountant}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              {/* accountant screens */}
              <Stack.Screen
                name="AddInvoice"
                component={AddInvoice}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Invoices"
                component={Invoices}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Edit Invoice"
                component={EditInvoice}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Add Stage"
                component={AddStage}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Add Problem"
                component={AddProblem}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Invoice Details"
                component={InvoiceDetails}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="InvoicesData"
                component={InvoicesDataDetails}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Staff"
                component={Staff}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="StaffDetails"
                component={StaffDetails}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
              <Stack.Screen
                name="Problems"
                component={Problems}
                options={{ title: "", headerRight: () => <ToggleLangButton /> }}
              />
            </Stack.Navigator>
            <BottomNav />
          </ServicesContext>
        </AuthContext>
      </DataProvider>
    </NavigationContainer>
 
  );
}
