import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { PublicStyles } from '../../styles/PublicStyles'
import { useRoute } from '@react-navigation/native'
import InvoiceDetailsItem from '../AccountantScreens/InvoiceDetailsItem';
import { useTranslation } from 'react-i18next';
import BottomNav from '../../components/BottomNav';
import { Div, ScrollDiv, Text } from 'react-native-magnus';
import BackButton from '../../components/BackButton';
import DrawerComponent from '../../components/DrawerComponent';
import Colors from '../../config/Colors';

export default function StaffDetails() {
    const route = useRoute();
    const { staff } = route.params;
    const { t } = useTranslation()

    return (
        <Div flex={1}>
            <ScrollDiv bg={Colors.light}>
                <Div py={20} px={10}>


                    <Div mt={20}>
                        <InvoiceDetailsItem title={t('name')} value={staff.name} />
                        <InvoiceDetailsItem title={t('salary')} value={staff.salary} />
                    </Div>


                    {staff.tasks.length > 0 ? (
                        <Div my={20} bg={Colors.light}>
                            {staff.tasks.length > 0 ? (<>
                                <Text textAlign='center' fontWeight='bold' fontSize={15} mb={10} color={Colors.primary}>{t('tasks')}</Text>
                                {staff.tasks.map((task) => (
                                    <Div my={10} px={8} py={30} borderColor='gray400' borderWidth={1} rounded='lg'>
                                        <InvoiceDetailsItem title={t('stagename')} value={task.name} />
                                        <InvoiceDetailsItem title={t('carno')} value={task.carNo} />
                                        <InvoiceDetailsItem title={t('cartype')} value={task.carType} />

                                        {task.worker.length > 0 ? (<>
                                            {task.worker.map((worker) => (
                                                <Div row justifyContent='space-between' alignItems='center' flexWrap='wrap' my={10}>
                                                    <Text bg={Colors.primary} color="white" fontWeight='bold' px={20} py={5} rounded="lg" >{worker}</Text>
                                                </Div>
                                            ))}
                                        </>) : (<></>)}
                                    </Div>
                                ))}

                            </>) : (<></>)}
                        </Div>
                    ) : (<></>)}



                </Div>
            </ScrollDiv>
            <BottomNav />
        </Div>
    )
}


const styles = StyleSheet.create({
    tasksContainer: {
        borderWidth: 2,
        borderColor: PublicStyles.lightColor,
        padding: 10,
        borderRadius: 10
    },
    workerITem: {
        backgroundColor: PublicStyles.primaryColor,
        margin: 10,
        width: 100,
        borderRadius: 10,
        padding: 10,
        color: "white"
    }
})