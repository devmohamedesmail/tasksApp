import React from 'react'

import { useNavigation } from '@react-navigation/native';

import { Button, Icon } from 'react-native-magnus';
import Colors from '../config/Colors';

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <>

      <Button bg={Colors.primary} h={50} w={50} rounded="circle" onPress={() => navigation.goBack()}>
        <Icon name="back" color="white" fontSize={16} />
      </Button>
    </>
  )
}
