import React, { useContext, useState } from 'react'
import { ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextData } from '../../ContextData/AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BackendData from '../../utilities/BackendData';
import { useTranslation } from 'react-i18next';
import { Div, ScrollDiv,Text } from 'react-native-magnus';
import CustomRedirectButton from '../../customComponents/CustomRedirectButton';
import Toast from 'react-native-toast-message';
import CustomButton from '../../customComponents/CustomButton';
import CustomInput from '../../customComponents/CustomInput';





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
        <ScrollDiv bg={Colors.screen} px={10}>
            <Div>
               
                <Div mt={50}>
                    <Logo />
                      <Text fontWeight='bold' fontSize={15} m='auto' textAlign='center' mb={20}>{t('register')}</Text>
                    
                    <CustomInput icon='user' placeholder={t('name')} value={name} onchangetext={(text) => setName(text)} />
                    <CustomInput icon='mail' placeholder={t('email')} value={email} onchangetext={(text) => setEmail(text)} />
                    <CustomInput icon='lock' placeholder={t('password')} value={password} onchangetext={(text) => setPassword(text)} secureTextEntry={true} />

                    {loading ? (<CustomButton title={<ActivityIndicator color='white' size='small' />} onpress={() => handleRegister()} />) : (<CustomButton title={t('register')} onpress={() => handleRegister()} />)}
                    <Div row justifyContent='center' mx={10} my={30} alignItems='center'>
                        <Text>{t('haveaccount')}</Text>
                        <CustomRedirectButton onPress={() => navigation.navigate('Login')} title={t('login')} />
                    </Div>

                </Div>
            </Div>
        </ScrollDiv>
    )
}


