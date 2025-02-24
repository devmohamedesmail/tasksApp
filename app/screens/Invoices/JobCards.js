import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Div, Overlay, ScrollDiv, Text } from 'react-native-magnus'
import BackendData from '../../utilities/BackendData';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { PublicStyles } from '../../styles/PublicStyles';
import BottomNav from '../../components/BottomNav';
import InvoiceSkeleton from '../Skeletons/InvoiceSkeleton';
import Header from '../../components/Header';
import JobCardItem from '../../customComponents/CustomItems/JobCardItem';
import { useTranslation } from 'react-i18next';
import BackButton from '../../components/BackButton';
import DrawerComponent from '../../components/DrawerComponent';
import Colors from '../../config/Colors';


export default function JobCards() {
  const [carjobs, setCarJobs] = useState();
  const { t } = useTranslation();
  const [overlayVisible, setOverlayVisible] = useState(false);






  const getCarJobs = async () => {
    try {
      const response = await axios.get(`${BackendData.url}show/job/cards`)
      setCarJobs(response.data.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCarJobs()
  }, [])


  const calculateRemainingTime = (end) => {
    const endTime = new Date(end);
    const currentTime = new Date();
    const remainingTime = endTime - currentTime;

    if (remainingTime > 0) {
      const hours = Math.floor((remainingTime % 86400000) / 3600000);
      const minutes = Math.floor((remainingTime % 3600000) / 60000);
      return `${hours}h ${minutes}m ${t('remaining')}`;
    } else {
      return `${t('expired')}`;
    }
  };



  // handle change Stage status
  const handleChangeStageStatus = async (id) => {

    try {
      setOverlayVisible(true)
      axios.post(`${BackendData.url}change/active/${id}`)
      getCarJobs()
      setOverlayVisible(false)
    } catch (error) {
      console.log(error)
    }
  }
  // handle handleToggleActiveStage
  const handleToggleActiveStage = async (id) => {

    try {
      setOverlayVisible(true)
      axios.post(`${BackendData.url}change/status/${id}`)
      getCarJobs()
      setOverlayVisible(false)
    } catch (error) {
      console.log(error)
    }
  }

  // handleDeleteStage
  const handleDeleteStage = async (id) => {
    setOverlayVisible(true)
    try {
      axios.get(`${BackendData.url}delete/stage/${id}`)
      getCarJobs()
      setOverlayVisible(false)
      console.log(`Deleted ${id}`)
    } catch (error) {
      console.log(error)
    }

  }







  return (
    <Div flex={1}>
      <ScrollDiv bg={Colors.light} >
        <Div py={30} px={10}>
         
          {carjobs ? (
            <>
              {carjobs.length > 0 ? (
                <>
                  {carjobs.map((card) => (
                    <JobCardItem
                      id={card.id}
                      key={card.id}
                      carNo={card.carNo}
                      carType={card.carType}
                      start={card.start}
                      end={card.end}
                      workers={card.worker}
                      RemainingTime={calculateRemainingTime(card.end)}
                      handleChangeStageStatus={handleChangeStageStatus}
                      handleChangeActiveStatus={handleToggleActiveStage}
                      handleDeleteStage={handleDeleteStage}
                      setOverlayVisible={setOverlayVisible}
                      status={card.status}
                      isActive={card.isActive}

                    />
                  ))}
                </>)
                : (<Text fontWeight='bold' textAlign='center'>{t('no-data-found')}</Text>)}
            </>
          )
            : (<>
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
            </>)}
        </Div>
      </ScrollDiv>
      <BottomNav />

      {/* overlay */}
      <Overlay visible={overlayVisible} p="xl">
        <ActivityIndicator />
        <Text mt="md">Loading...</Text>
      </Overlay>
    </Div>
  )
}
