import React from 'react'
import { View } from 'react-native'
import BackButton from './BackButton'
import ToggleLangButton from './TogglelangButton/ToggleLangButton'
import { PublicStyles } from '../styles/PublicStyles'
import ToggleTheme from './ToggleTheme'

export default function Header() {
  return (
    <View style={[PublicStyles.row, PublicStyles.justifyBetween, PublicStyles.itemcenter]}>
      <BackButton />

      <View style={[PublicStyles.row, PublicStyles.justifyBetween, PublicStyles.itemcenter]}>
        <ToggleTheme />
        <ToggleLangButton />
      </View>
    </View>
  )
}



