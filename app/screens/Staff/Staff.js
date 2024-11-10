import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BackendData from '../../utilities/BackendData'
import { useNavigation } from '@react-navigation/native'
import BottomNav from '../../components/BottomNav'
import { useTranslation } from 'react-i18next'
import { Div, Button, Text, ScrollDiv } from 'react-native-magnus'

import InvoiceSkeleton from '../Skeletons/InvoiceSkeleton'
import Colors from '../../config/Colors'

export default function Staff() {
    const [staffTasks, setstaffTasks] = useState();
    const navigation = useNavigation()
    const { t } = useTranslation()



    const fetchStaffTasks = async () => {
        try {
            const response = await axios.get(`${BackendData.url}show/staff/tasks`)
            setstaffTasks(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchStaffTasks();
    }, [])
    return (
        <Div flex={1}>
            <ScrollDiv bg={Colors.light}>
                <Div py={20} px={10}>

                    <Text fontWeight='bold' textAlign='center' my={20} fontSize={20} mb={20}>{t('employees')}</Text>


                    {staffTasks && staffTasks.length > 0 ? (
                        <>
                            <Div row justifyContent='space-between' alignItems='center' flexWrap='wrap'>
                                {staffTasks.map((item) => (
                                    <Button bg='white' h={100} w='32%' rounded="2xl" borderWidth={1} borderColor='gray500' my={5} onPress={() => navigation.navigate("StaffDetails", { staff: item })}>
                                        <Div flexDir='column' justifyContent='center' alignItems='center'>
                                            <Text color="black" fontWeight='bold' fontSize={15}>{item.name}</Text>
                                            <Text color="black" mt={10} fontWeight='semibold' fontSize={14}>{item.tasks.length}</Text>
                                        </Div>
                                    </Button>
                                ))}
                            </Div>
                        </>
                    ) : (
                        <>
                            <InvoiceSkeleton />
                            <InvoiceSkeleton />
                            <InvoiceSkeleton />
                            <InvoiceSkeleton />
                            <InvoiceSkeleton />
                            <InvoiceSkeleton />
                        </>
                    )}
                </Div>
            </ScrollDiv>
            <BottomNav />
        </Div>
    )
}


