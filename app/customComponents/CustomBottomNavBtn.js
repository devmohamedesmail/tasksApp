import React from 'react'
import { Div, Text } from 'react-native-magnus'
import { Button, Icon } from 'react-native-magnus'

export default function CustomBottomNavBtn({ onPress, icon, title, text}) {
    return (

        <Button onPress={onPress} bg='transparent'  >
            <Div justifyContent='center' alignItems='center'>
                {icon}
                <Text color={text} fontSize={12}>{title}</Text>
            </Div>
        </Button>
    )
}


