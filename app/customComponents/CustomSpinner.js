import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Div,Text } from 'react-native-magnus'

export default function CustomSpinner() {
  const { theme } = useTheme()
  const{t}=useTranslation()
  return (
   
    <Div >
      <Text>{t('please-wait')}</Text>
      <ActivityIndicator />
    </Div>
  )
}


