import React, { useContext, useState } from 'react'
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'
import CustomInput from '../customComponents/CustomInput'
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextData } from '../ContextData/AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BackendData from '../utilities/BackendData';
import ToggleLangButton from '../components/TogglelangButton/ToggleLangButton';
import { useTranslation } from 'react-i18next';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useContext(AuthContextData);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const {t}=useTranslation()



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
            
            
        }finally{
            setLoading(false);
        }

    }
    return (
        <ScrollView style={PublicStyles.screen}>
            <View style={PublicStyles.container}>

                <Image
                    style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 100 }} source={require('../images/logo.png')} />

                <Text style={[PublicStyles.screenTitle,{marginTop:40,marginBottom:40}]}>{t('login')}</Text>
                <CustomInput placeholder={t('email')} value={email} onchangetext={(text) => setEmail(text)} />
                <CustomInput placeholder={t('password')} value={password} onchangetext={(text) => setPassword(text)} secureTextEntry={true} />

                {loading ? (<CustomButton title={<ActivityIndicator color='white' size='small' />} onpress={() => handleLogin()} />) : (<CustomButton title={t('login')} onpress={() => handleLogin()} />)}
                

                <View style={[PublicStyles.row,{marginTop:50,marginLeft:30}]}>
                <Text>{t('noaccount')} </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                    <Text style={{color:PublicStyles.primaryColor}}>{t('register')}</Text>
                </TouchableOpacity>
               
                </View>
            </View>
        </ScrollView>
    )
}
