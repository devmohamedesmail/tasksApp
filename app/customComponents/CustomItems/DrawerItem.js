import React from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import Colors from '../../config/Colors'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function DrawerItem({ title, onPress }) {
  return (
    <Button w='100%'
      onPress={onPress}
      borderBottomWidth={1}
      borderBottomColor='gray500'
      my={2}
      p={0}
      h={50} rounded={0} color='black' fontSize={15} bg='white'>
      <Div  pl={30} w="100%" flexDir='row' justifyContent='space-between' alignItems='center'>
        <FontAwesome5 name="chevron-right" size={15} color="black" />
           <Text flex={1} fontWeight='semiBold' fontSize={15} ml={20}>
          {title}

        </Text>
      </Div>
    </Button>
  )
}
