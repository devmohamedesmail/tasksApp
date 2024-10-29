import React from 'react'
import { TouchableOpacity, StyleSheet,Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ContextData/ThemeContext';
import { PublicStyles } from '../styles/PublicStyles';

export default function BackButton() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity style={[styles.backBtn,theme === 'light' ? PublicStyles.backgroundlightColor : PublicStyles.backgroundDarkColor ]} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={20} color={theme === 'light' ?  'white' : 'black'} />
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  backBtn: {

    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
