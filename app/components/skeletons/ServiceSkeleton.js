import React from 'react'
import { View ,Text, StyleSheet} from 'react-native'
import { PublicStyles} from "../../styles/PublicStyles";


function ServiceSkeleton() {
 
  return (
   <View style={styles.itemSkeleton}>
    <View></View>
    <Text></Text>
   </View>
  )
}


const styles = StyleSheet.create({
    itemSkeleton:{
        backgroundColor:PublicStyles.grayColor,
        width:'30%',
        height:100,
        borderRadius:10,
        elevation:4,
        marginBottom:10,
    }
})


export default ServiceSkeleton
