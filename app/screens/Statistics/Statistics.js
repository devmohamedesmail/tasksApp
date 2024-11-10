import React from 'react'
import BottomNav from '../../components/BottomNav'
import InvoicesStatistics from './InvoicesStatistics'
import SalesStatistics from './SalesStatistics'
import TaskStatistics from './TaskStatistics'
import ProblemStatistics from './ProblemStatistics'
import { Div, ScrollDiv } from 'react-native-magnus'
import Colors from '../../config/Colors'


export default function Statistics() {

  return (
    <Div flex={1}>
      <ScrollDiv bg={Colors.light}>
        <Div p={10}>
          <Div>
            <InvoicesStatistics />
            <SalesStatistics />
            <TaskStatistics />
            <ProblemStatistics />
          </Div>
        </Div>
      </ScrollDiv>
      <BottomNav />
    </Div>
  )
}
