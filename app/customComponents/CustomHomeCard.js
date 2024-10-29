import React from 'react'
import { TouchableOpacity,Image,Text, StyleSheet } from 'react-native'
import { useTheme } from '../ContextData/ThemeContext'
import { PublicStyles } from '../styles/PublicStyles'

export default function CustomHomeCard({image,title,onPress}) {
    const {theme} = useTheme()
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card,theme === 'light'? PublicStyles.backgroundlightColor : PublicStyles.backgroundlightColor]}>
         <Image
        style={styles.image}
        source={image} 
      />
      <Text style={[styles.title,theme === 'light'? PublicStyles.textLightMode : PublicStyles.textLightMode]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card:{
        width: '48%',
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    image:{
        width: 50,
        height: 50,
    },
    title:{
        fontSize: 13,
        fontWeight: 'normal',
        marginTop: 10,
    }
})
