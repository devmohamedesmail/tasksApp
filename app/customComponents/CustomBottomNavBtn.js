import React from 'react'
import { Div, Text } from 'react-native-magnus'
import { Button, Icon } from 'react-native-magnus'

export default function CustomBottomNavBtn({ onPress, icon, title,bg ,text}) {
    return (
     
        <Button bg={bg}  flex={1}  rounded="md"  h={55} mx={5} onPress={onPress} >
            <Div justifyContent='center' alignItems='center'>
            {icon}
            <Text color={text}  fontSize={12}>{title}</Text>
            </Div>
        </Button>
    )
}


