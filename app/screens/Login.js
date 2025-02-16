import React, { useContext, useState } from 'react'
import { ActivityIndicator} from 'react-native'
import CustomInput from '../customComponents/CustomInput'
import CustomButton from '../customComponents/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextData } from '../ContextData/AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BackendData from '../utilities/BackendData';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import { Div, ScrollDiv,Text } from 'react-native-magnus';
import CustomRedirectButton from '../customComponents/CustomRedirectButton';
import Colors from '../config/Colors';
import Toast from 'react-native-toast-message';



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
                
                Toast.show({
                    type: 'error',
                    text1: t('notallowedlogin'),
                    visibilityTime: 4000, 
                    autoHide: true 
                })
            } else {
               
                Toast.show({
                    type: 'success',
                    text1: t('loginsuccessfully'),
                    visibilityTime: 4000, 
                    autoHide: true 
                })
                navigation.navigate('Home');
            }


        } catch (error) {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: t('notallowedlogin'),
                visibilityTime: 4000, 
                autoHide: true 
            })
            
        } finally {
            setLoading(false);
        }

    }
    return (
        <Div style={{ flex: 1 }}>
            <ScrollDiv px={10} bg={Colors.screen}>
                <Div>
                    <Div mt={100} >
                        <Logo />

                        <Text fontSize={20} fontWeight='bold' my={20} textAlign='center'>{t('login')}</Text>
                        <CustomInput placeholder={t('email')} value={email} onchangetext={(text) => setEmail(text)} icon='mail' />
                        <CustomInput placeholder={t('password')} value={password} onchangetext={(text) => setPassword(text)} secureTextEntry={true} icon='lock' />

                        {loading ? (<CustomButton title={<ActivityIndicator color='white' size='small' />} onpress={() => handleLogin()} />) : (<CustomButton title={t('login')} onpress={() => handleLogin()} />)}

                        <Div row justifyContent='center' mx={10} my={30} alignItems='center'>
                            <Text>{t('noaccount')} </Text>
                            <CustomRedirectButton title={t('register')} onPress={() => navigation.navigate('Register')} />
                        </Div>
                    </Div>
                </Div>
            </ScrollDiv>
        </Div>
    )
}





