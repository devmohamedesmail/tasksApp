import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../ContextData/ThemeContext'
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

export default function ToggleTheme() {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    
    return (
        <TouchableOpacity onPress={toggleTheme} style={styles.btn}>
            {isDarkMode ? <Feather name="sun" size={24} color="white" /> : <Entypo name="moon" size={24} color="black" />}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btn:{
        marginRight:20,
    }
})

