import React from 'react'
import { Button } from 'react-native-magnus'
import Colors from '../../config/Colors'

export default function DrawerItem({title,onPress}) {
  return (
    <Button w='100%' 
    onPress={onPress} 
    borderBottomWidth={1} 
    borderBottomColor='gray500' 
    my={2}
     h={60} rounded={0} color='black' fontWeight='bold' fontSize={15} bg='white'>
        {title} 
    </Button>
  )
}
