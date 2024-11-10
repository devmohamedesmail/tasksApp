import React from 'react'
import { Image } from "react-native-magnus";

export default function Logo() {
    return (
        <Image
            h={150}
            w={150}
            m='auto'
            rounded="circle"
            source={require('../images/logo.png')}
        />
    )
}
