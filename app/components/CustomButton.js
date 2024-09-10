import React from 'react'
import { TouchableOpacity, View ,StyleSheet,Text} from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'

export default function CustomButton({title,onpress}) {
  return (
   <View>
       <TouchableOpacity style={styles.btn} onPress={onpress}>
          <Text style={styles.textBtn}>{title}</Text>
        </TouchableOpacity>
   </View>
  )
}


const styles = StyleSheet.create({

    btn: {
      backgroundColor: PublicStyles.primaryColor,
      borderRadius: 7,
      paddingRight: 20,
      paddingLeft: 20,
      paddingTop:15,
      paddingBottom:15,
      width: '80%',
      alignSelf: 'center',
    },
    textBtn: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
    },

  })