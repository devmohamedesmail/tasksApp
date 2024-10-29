import React, { useContext, useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'
import CustomInput from '../customComponents/CustomInput'
import CustomButton from '../customComponents/CustomButton';
import { AuthContextData } from '../ContextData/AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import BackendData from '../utilities/BackendData';
import { useTheme } from '../ContextData/ThemeContext';
import Header from '../components/Header';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useContext(AuthContextData);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { theme } = useTheme();



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
            Alert.alert('wrong inputs', 'check your internet then try again');
        }

    }


    return (
        <ScrollView style={[theme === 'light' ? PublicStyles.screenLight : PublicStyles.screenDark]}>
            <View style={PublicStyles.container}>
                <Header />
                <View style={styles.loginContainer}>

                    <Text style={[PublicStyles.screenTitle, { marginTop: 40, marginBottom: 40 }]}>{t('register')}</Text>
                    <CustomInput placeholder={t('name')} value={name} onchangetext={(text) => setName(text)} />
                    <CustomInput placeholder={t('email')} value={email} onchangetext={(text) => setEmail(text)} />
                    <CustomInput placeholder={t('password')} value={password} onchangetext={(text) => setPassword(text)} secureTextEntry={true} />

                    {loading ? (<CustomButton title={<ActivityIndicator color='white' size='small' />} onpress={() => handleRegister()} />) : (<CustomButton title={t('register')} onpress={() => handleRegister()} />)}


                    <View style={[PublicStyles.row, { marginTop: 50, marginLeft: 30 }]}>
                        <Text style={theme === 'light' ? PublicStyles.textDarkMode : PublicStyles.textLightMode}>{t('haveaccount')}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={theme === 'light' ? PublicStyles.textDarkMode : PublicStyles.textLightMode} >{t('login')}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    loginContainer: {
        paddingTop: 100,

    }
})
