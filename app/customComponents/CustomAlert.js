import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'
import Feather from '@expo/vector-icons/Feather';

export default function CustomAlert({alert}) {
  return (
    <View style={styles.alert}>
        <Feather name="wifi-off" size={24} color="black" />
        <Text style={styles.alert_text}>{alert}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    alert:{
        backgroundColor:PublicStyles.lightColor,
        padding:10,
        margin:10,
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center'
    },
    alert_text:{
        color:PublicStyles.darkColor,
        fontSize:15,
        textAlign:'center',
        marginLeft:10
    }
})
