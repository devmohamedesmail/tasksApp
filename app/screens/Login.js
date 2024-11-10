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
import Logo from '../components/Logo';
import { Div } from 'react-native-magnus';
import CustomRedirectButton from '../customComponents/CustomRedirectButton';



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useContext(AuthContextData);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { t } = useTranslation()




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
                navigation.navigate('JobCards');
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
        <View style={{ flex: 1 }}>
            <ScrollView style={PublicStyles.screenLight}>
                <View style={PublicStyles.container}>
                    {/* <Header /> */}

                    <View style={styles.loginContainer}>
                        <Logo />

                        <Text style={[PublicStyles.screenTitle, { marginTop: 40, marginBottom: 40 }]}>{t('login')}</Text>
                        <CustomInput placeholder={t('email')} value={email} onchangetext={(text) => setEmail(text)} icon='mail' />
                        <CustomInput placeholder={t('password')} value={password} onchangetext={(text) => setPassword(text)} secureTextEntry={true} icon='lock' />

                        {loading ? (<CustomButton title={<ActivityIndicator color='white' size='small' />} onpress={() => handleLogin()} />) : (<CustomButton title={t('login')} onpress={() => handleLogin()} />)}

                        <Div row justifyContent='flex-start' mx={10} my={30} alignItems='center'>
                            <Text>{t('noaccount')} </Text>
                            <CustomRedirectButton title={t('register')} onPress={() => navigation.navigate('Register')} />
                        </Div>
                    </View>


                </View>
            </ScrollView>
            {/* <BottomNav /> */}
        </View>
    )
}



const styles = StyleSheet.create({
    loginContainer: {
        paddingTop: 100,

    }
})

