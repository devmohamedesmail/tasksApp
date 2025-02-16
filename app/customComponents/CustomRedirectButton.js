import React from 'react'
import { Button, Icon, Div, Text } from "react-native-magnus";
import Colors from '../config/Colors';

export default function CustomRedirectButton({title,onPress}) {
  return (
    <Button bg={Colors.secondary} p={0} w={100} h={35} mx={10}   rounded="md" onPress={onPress}>
    <Text color='white' fontWeight='bold'>{title}</Text>
  </Button>
  )
}
