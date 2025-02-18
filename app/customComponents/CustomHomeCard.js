import React from 'react'
import { Button, Div, Text, Image } from 'react-native-magnus'
import Colors from '../config/Colors'

export default function CustomHomeCard({ image, title, onPress }) {

  return (
    <Button w='32%' my={5} column rounded="xl" bg="white" borderColor='gray400' borderWidth={1} shadow={20} p={0} onPress={onPress}>
      <Div justifyContent='center' alignItems='center'  w="100%" p={5} pb={14}>
        <Image
          h={100}
          w={100}
          m={5}
          source={image}
        />
        <Text fontWeight='bold' color={Colors.primary} mt={6} fontSize={12}  >{title}</Text>
      </Div>
    </Button>

  )
}


