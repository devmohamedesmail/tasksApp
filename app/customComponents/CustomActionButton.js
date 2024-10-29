import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'

export default function CustomActionButton({onpress,title,icon=null,backgroundColor}) {
  return (
    <TouchableOpacity onPress={onpress} style={[PublicStyles.row,PublicStyles.itemcenter,styles.actionButton,{backgroundColor:backgroundColor}]}>
        <Text style={styles.textBtn}>{title}</Text>
        {icon}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    actionButton:{
       borderRadius:5,
       width:'auto' ,
       backgroundColor:PublicStyles.primaryColor,
       padding: 8,
       marginLeft:5,
       marginRight:5,
    },
    textBtn:{
        color:"white",
        fontWeight:'bold',
        fontSize:10,
    }
})
