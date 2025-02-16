import React from 'react'

import { Button, Text ,Div} from 'react-native-magnus'
import Colors from '../config/Colors'

export default function CustomButton({ title, onpress }) {

  return (
    <Div>
      <Button bg={Colors.primary} h={60} mt={20} w='100%' onPress={onpress}>
        <Text color='white' fontWeight='bold'>{title}</Text>
      </Button>
    </Div>
  )
}
