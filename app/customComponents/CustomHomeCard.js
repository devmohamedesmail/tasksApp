import React from 'react'
import { Button, Div, Text, Image } from 'react-native-magnus'

export default function CustomHomeCard({ image, title, onPress, bg }) {

  return (
    <Button w='32%' my={5} column rounded="2xl" bg={bg} shadow={20} onPress={onPress}>
      <Div justifyContent='center' alignItems='center'>
        <Image
          h={70}
          w={70}
          m={10}
          source={image}
        />
        <Text fontWeight='bold' fontSize={12} color='white' >{title}</Text>
      </Div>
    </Button>

  )
}


