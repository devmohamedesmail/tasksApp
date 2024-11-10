import React from 'react'

import { Button, Icon, Div, Text } from "react-native-magnus";

export default function CustomActionButton({ onpress, title, icon = null, backgroundColor, bg }) {
  return (
      <Button bg={backgroundColor} h={60} w='100%' rounded="lg" onPress={onpress}>
        <Icon name={icon} color="white" fontSize={20} />
        <Text color='white' fontWeight='bold' mx={10} fontSize={15}>{title}</Text>
      </Button>
  )
}


