import React from 'react'
import { StyleSheet, View } from 'react-native'
import BackButton from './BackButton'
import ToggleLangButton from './TogglelangButton/ToggleLangButton'
import { PublicStyles } from '../styles/PublicStyles'



export default function Header() {


  return (
    <View style={[PublicStyles.row, PublicStyles.justifyBetween, PublicStyles.itemcenter]}>
      <BackButton />


   


      <View style={[PublicStyles.row, PublicStyles.justifyBetween, PublicStyles.itemcenter]}>
        <ToggleLangButton />
      </View>
    </View>
  )
}





