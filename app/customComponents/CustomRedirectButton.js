import React from 'react'
import { Button, Icon, Div, Text } from "react-native-magnus";

export default function CustomRedirectButton({title,onPress}) {
  return (
    <Button bg="orange600" w={100} mx={10}   rounded="md" onPress={onPress}>
    <Text color='white' fontWeight='bold'>{title}</Text>
  </Button>
  )
}
