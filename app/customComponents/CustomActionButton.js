import React from 'react'

import { Button, Icon, Div, Text } from "react-native-magnus";

export default function CustomActionButton({ onpress, title, icon = null, backgroundColor, bg }) {
  return (
      <Button bg="white" h={60} w='100%' borderBottomColor='gray500' borderBottomWidth={1} rounded="lg" onPress={onpress}>
        <Icon name={icon} color="black" fontSize={25} />
        <Text color='black' flex={1} ml={20} fontWeight='bold' mx={10} fontSize={15}>{title}</Text>
      </Button>
  )
}


