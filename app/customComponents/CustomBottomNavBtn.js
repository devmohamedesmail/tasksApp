import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'
import { useTheme } from '../ContextData/ThemeContext'

export default function CustomBottomNavBtn({ onPress, icon, title, activeScreen, setActiveScreen }) {
    const { theme } = useTheme()
    return (
        <TouchableOpacity
            style={[
                PublicStyles.col,
                PublicStyles.itemcenter,
                styles.btn,
                activeScreen === "Home" && styles.activeBtn,
            ]}
            onPress={onPress}
        >
            {icon}
            <Text style={[styles.btnText,theme === 'light' ? styles.btnTextLight : styles.btnTextDark]}>{title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btn: {
        flex: 1,
    },
    btnTextDark: {
        color: "black",
        fontSize: 13,
        marginTop:5,
        fontWeight:'semibold'
    },
    btnTextLight: {
        color: "white",
        fontSize: 13,
        marginTop:5,
        fontWeight:'semibold'
    },

})
