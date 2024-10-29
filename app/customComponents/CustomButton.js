import React from 'react'
import { TouchableOpacity, View ,StyleSheet,Text} from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'
import { useTheme } from '../ContextData/ThemeContext'

export default function CustomButton({title,onpress}) {
  const {theme} = useTheme()
  return (
   <View>
       <TouchableOpacity style={[styles.btn,theme==='light'? PublicStyles.backgroundlightColor:PublicStyles.backgroundDarkColor]} onPress={onpress}>
          <Text style={[styles.textBtn,theme==='light'?PublicStyles.textLightMode:PublicStyles.textDarkMode]}>{title}</Text>
        </TouchableOpacity>
   </View>
  )
}


const styles = StyleSheet.create({

    btn: {
      paddingRight: 20,
      paddingLeft: 20,
      paddingTop:15,
      paddingBottom:15,
      width: '100%',
      alignSelf: 'center',
      marginTop: 20,
    },
   
    textBtn: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
    },

  })