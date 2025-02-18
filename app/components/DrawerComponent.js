import React, { useContext } from 'react'
import { Drawer, Button, Text, Div } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next';
import Colors from '../config/Colors';
import DrawerItem from '../customComponents/CustomItems/DrawerItem';
import { AuthContextData } from '../ContextData/AuthContext';
import Logo from './Logo';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function DrawerComponent() {
    const drawerRef = React.createRef();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [auth] = useContext(AuthContextData)
    return (
        <Div>
            <Drawer ref={drawerRef} p={10} w="75%" bg="white" shadow={5}>
                <Div mt={20}>
                    <Logo />
                </Div>

                <DrawerItem title={t('home')} onPress={() => {
                    navigation.navigate('Home');
                    drawerRef.current.close();
                }} />

                <DrawerItem title={t('statistics')} onPress={() => {
                    navigation.navigate('Statistics');
                    drawerRef.current.close();
                }} />

                <DrawerItem title={t('invoices')} onPress={() => {
                    navigation.navigate('Invoices');
                    drawerRef.current.close();
                }} />

                <DrawerItem title={t('addinvoice')} onPress={() => {
                    navigation.navigate('AddInvoice');
                    drawerRef.current.close();
                }} />

                <DrawerItem title={t('carsstatus')} onPress={() => {
                    navigation.navigate('InvoicesData');
                    drawerRef.current.close();
                }} />

                <DrawerItem title={t('problems')} onPress={() => {
                    navigation.navigate('Problems');
                    drawerRef.current.close();
                }} />

                <DrawerItem title={t('jobcards')} onPress={() => {
                    navigation.navigate('JobCards');
                    drawerRef.current.close();
                }} />

                {auth && auth.user.role === 'admin' ? (
                    <DrawerItem title={t('employees')} onPress={() => {
                        navigation.navigate('Staff');
                        drawerRef.current.close();
                    }} />

                ) : (<></>)}


                <DrawerItem title={t('profile')} onPress={() => {
                    navigation.navigate('Profile');
                    drawerRef.current.close();
                }} />


            </Drawer>


            <Button bg={Colors.primary} my={8} w={50} h={50} rounded='lg'
                onPress={() => {
                    if (drawerRef.current) {
                        drawerRef.current.open();
                    }
                }}
            >
                <AntDesign name="bars" size={24}  color={Colors.titary} />
                
            </Button>
        </Div>
    )
}
