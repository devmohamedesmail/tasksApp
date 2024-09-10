import React, { useContext, useState } from 'react'
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'
import CustomInput from '../customComponents/CustomInput'
import CustomButton from '../components/CustomButton';

import { AuthContextData } from '../ContextData/AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import BackendData from '../utilities/BackendData';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useContext(AuthContextData);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
     const {t}=useTranslation();



    const handleRegister = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${BackendData.url}register`, {
                name, email, password
            });

            setLoading(false)
            navigation.navigate('Login');

        } catch (error) {
            setLoading(false);
            Alert.alert('wrong inputs','check your internet then try again');
        }

    }


    return (
        <ScrollView style={PublicStyles.screen}>
            <View style={PublicStyles.container}>

                <Image
                    style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 100 }} source={require('../images/logo.png')} />

                <Text style={[PublicStyles.screenTitle,{marginTop:40,marginBottom:40}]}>{t('register')}</Text>
                <CustomInput placeholder={t('name')} value={name} onchangetext={(text) => setName(text)} />
                <CustomInput placeholder={t('email')} value={email} onchangetext={(text) => setEmail(text)} />
                <CustomInput placeholder={t('password')} value={password} onchangetext={(text) => setPassword(text)} secureTextEntry={true} />

                {loading ? (<CustomButton title={<ActivityIndicator color='white' size='small' />} onpress={() => handleRegister()} />) : (<CustomButton title={t('register')} onpress={() => handleRegister()} />)}


                <View style={[PublicStyles.row, { marginTop: 50, marginLeft: 30 }]}>
                    <Text>{t('haveaccount')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: PublicStyles.primaryColor }}>{t('login')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
