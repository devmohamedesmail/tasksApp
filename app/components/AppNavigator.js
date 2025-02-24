import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screens/Home/Home';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Problems from '../screens/Staff/Problems';
import Staff from '../screens/Staff/Staff';
import Profile from '../screens/Auth/Profile';
import StaffDetails from '../screens/Staff/StaffDetails';
import Statistics from '../screens/Statistics/Statistics';
import DrawerComponent from './DrawerComponent';
import { useTranslation } from 'react-i18next';
import AddInvoice from '../screens/Invoices/AddInvoice';
import Invoices from '../screens/Invoices/Invoices';
import InvoiceDetails from '../screens/Invoices/InvoiceDetails';
import EditInvoice from '../screens/Invoices/EditInvoice';
import AddStage from '../screens/Invoices/AddStage';
import AddProblem from '../screens/Invoices/AddProblem';
import InvoicesDataDetails from '../screens/Invoices/InvoicesDataDetails';
import JobCards from '../screens/Invoices/JobCards';







export default function AppNavigator() {
    const Stack = createNativeStackNavigator();
    
    const { t } = useTranslation();



    return (

        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: () => null,
                    headerRight: () => <DrawerComponent />,
                    
                }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="AddInvoice"
                component={AddInvoice}
                options={{
                    title: t('addinvoice'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            />

            <Stack.Screen
                name="Statistics"
                component={Statistics}
                options={{
                    title: t('statistics'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            />

            <Stack.Screen
                name="Invoices"
                component={Invoices}
                options={{
                    title: t('invoices'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            />


            <Stack.Screen
                name="Invoice Details"
                component={InvoiceDetails}
                options={{
                    title: t('details'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            />


            <Stack.Screen
                name="Edit Invoice"
                component={EditInvoice}
                options={{
                    title: t('editinvoice'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            />

            <Stack.Screen
                name="Add Stage"
                component={AddStage}
                options={{
                    title: t('addstage'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            />


            <Stack.Screen
                name="Add Problem"
                component={AddProblem}
                options={{
                    title: t('addproblem'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },

                }}
            />


            <Stack.Screen
                name="InvoicesData"
                component={InvoicesDataDetails}
                options={{
                    title: t('carsstatus'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            />



            <Stack.Screen
                name="Problems"
                component={Problems}
                options={{
                    title: t('problems'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            />

            <Stack.Screen
                name="JobCards"
                component={JobCards}
                options={{
                    title: t('jobcards'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            />



            <Stack.Screen
                name="Staff"
                component={Staff}
                options={{
                    title: t('employees'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            />


            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: t('profile'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            />



            <Stack.Screen
                name="StaffDetails"
                component={StaffDetails}
                options={{
                    title: t('staff-details'),
                    headerRight: () => <DrawerComponent />,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            />

        </Stack.Navigator>

    )
}
