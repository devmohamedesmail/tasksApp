import React from 'react'
import { Div,Skeleton} from 'react-native-magnus'


export default function InvoiceSkeleton() {
  return (
    <Div flexDir="row" my={20} mt="md">
    
    <Div ml="md" flex={1}>
      <Skeleton.Box mt="sm" />
      <Skeleton.Box mt="sm" w="80%" />
      <Skeleton.Box mt="sm" />
    </Div>
  </Div>
  )
}
