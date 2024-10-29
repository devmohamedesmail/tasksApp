import React, { useContext, useState } from 'react'
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'
import CustomInput from '../customComponents/CustomInput'
import CustomButton from '../customComponents/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextData } from '../ContextData/AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BackendData from '../utilities/BackendData';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { useTheme } from '../ContextData/ThemeContext';
import BottomNav from '../components/BottomNav';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useContext(AuthContextData);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { t } = useTranslation()
    const { theme } = useTheme()



    const handleLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${BackendData.url}login`, {
                email, password
            });
            const user = response.data;
            setAuth(user)
            await AsyncStorage.setItem('userAuth', JSON.stringify(user));
            setLoading(false)

            if (response.data.user.role === 'user' || response.data.user.role === null) {
                navigation.navigate('Login');
                Alert.alert(t('notallowedlogin'))
            } else {
                navigation.navigate('Home');
            }


        } catch (error) {
            setLoading(false);
            Alert.alert(t('errorlogin'));
            console.log(error)
            setLoading(false)


        } finally {
            setLoading(false);
        }

    }
    return (
       <View style={{ flex:1 }}>
         <ScrollView style={[theme === 'light' ? PublicStyles.screenLight : PublicStyles.screenDark]}>
            <View style={PublicStyles.container}>
                <Header />

                <View style={styles.loginContainer}>


                    <Text style={[PublicStyles.screenTitle, { marginTop: 40, marginBottom: 40 }]}>{t('login')}</Text>
                    <CustomInput placeholder={t('email')} value={email} onchangetext={(text) => setEmail(text)} />
                    <CustomInput placeholder={t('password')} value={password} onchangetext={(text) => setPassword(text)} secureTextEntry={true} />

                    {loading ? (<CustomButton title={<ActivityIndicator color='white' size='small' />} onpress={() => handleLogin()} />) : (<CustomButton title={t('login')} onpress={() => handleLogin()} />)}

                    <View style={[PublicStyles.row, { marginTop: 50, marginLeft: 30 }]}>
                        <Text style={theme === 'light' ? PublicStyles.textDarkMode : PublicStyles.textLightMode}>{t('noaccount')} </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={theme === 'light' ? PublicStyles.textDarkMode : PublicStyles.textLightMode}>{t('register')}</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </View>
        </ScrollView>
        <BottomNav />
       </View>
    )
}



const styles = StyleSheet.create({
    loginContainer: {
        paddingTop: 100,

    }
})

