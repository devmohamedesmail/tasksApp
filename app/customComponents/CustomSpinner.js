import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'

export default function CustomSpinner() {
  return (
    <View style={styles.spinnerContainer}>
        <ActivityIndicator color={PublicStyles.primaryColor} size='large' />
    </View>
  )
}

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:200
    }
})
