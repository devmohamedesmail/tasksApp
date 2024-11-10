import React from 'react'
import { Button, Div, Text, Image } from 'react-native-magnus'

export default function CustomHomeCard({ image, title, onPress, bg }) {

  return (
    <Button w='49%' my={5} column rounded="2xl" bg={bg} onPress={onPress}>
      <Div justifyContent='center' alignItems='center'>
        <Image
          h={100}
          w={100}
          m={10}
          source={image}
        />
        <Text fontWeight='bold' fontSize={15} color='white' >{title}</Text>
      </Div>
    </Button>

  )
}


