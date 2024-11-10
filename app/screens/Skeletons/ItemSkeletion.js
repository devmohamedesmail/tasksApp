import React from 'react'
import { Skeleton, Div } from 'react-native-magnus'

export default function ItemSkeletion() {
    return (
        <Div flexDir="row" mt="md">
           
            <Div ml="md" flex={1}>
                <Skeleton.Box mt="sm" h={100} w="80%" />
                <Skeleton.Box mt="sm" h={100} w="80%" />
                <Skeleton.Box mt="sm" h={100} w="80%"/>
            </Div>
        </Div>
    )
}
