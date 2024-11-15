import React, { useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, View, StyleSheet } from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'
import CustomInput from '../customComponents/CustomInput'
import CustomButton from '../customComponents/CustomButton';

import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import BackendData from '../utilities/BackendData';
import Header from '../components/Header';
import { Div,Text } from 'react-native-magnus';
import CustomRedirectButton from '../customComponents/CustomRedirectButton';
import Logo from '../components/Logo';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const { t } = useTranslation();




    const handleRegister = async () => {
        try {
            setLoading(true)
            await axios.post(`${BackendData.url}register`, {
                name, email, password
            });

            setLoading(false)
            navigation.navigate('Login');

        } catch (error) {
            setLoading(false);
            Alert.alert('wrong inputs', 'check your internet then try again');
        }

    }


    return (
        <ScrollView style={PublicStyles.screenLight}>
            <View style={PublicStyles.container}>
               
                <View style={styles.loginContainer}>
                    <Logo />
                      <Text fontWeight='bold' fontSize={15} m='auto' mb={20}>{t('register')}</Text>
                    
                    <CustomInput icon='user' placeholder={t('name')} value={name} onchangetext={(text) => setName(text)} />
                    <CustomInput icon='mail' placeholder={t('email')} value={email} onchangetext={(text) => setEmail(text)} />
                    <CustomInput icon='lock' placeholder={t('password')} value={password} onchangetext={(text) => setPassword(text)} secureTextEntry={true} />

                    {loading ? (<CustomButton title={<ActivityIndicator color='white' size='small' />} onpress={() => handleRegister()} />) : (<CustomButton title={t('register')} onpress={() => handleRegister()} />)}
                    <Div row justifyContent='flex-start' mx={10} my={30} alignItems='center'>
                        <Text>{t('haveaccount')}</Text>
                        <CustomRedirectButton onPress={() => navigation.navigate('Login')} title={t('login')} />
                    </Div>

                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    loginContainer: {
        paddingTop: 50,

    }
})
