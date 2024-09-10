import React from 'react'
import { ScrollView, View,Text, StyleSheet } from 'react-native'
import { PublicStyles } from '../../styles/PublicStyles'
import { useRoute } from '@react-navigation/native'
import InvoiceDetailsItem from '../AccountantScreens/InvoiceDetailsItem';
import { useTranslation } from 'react-i18next';

export default function StaffDetails() {
    const route = useRoute();
    const { staff } = route.params; 
    const {t} = useTranslation()
  return (
    <ScrollView style={PublicStyles.screen}>
        <View style={PublicStyles.container}>
            <InvoiceDetailsItem title={t('name')} value={staff.name} />
            <InvoiceDetailsItem title={t('salary')} value={staff.salary} />

            <View style={styles.tasksContainer}>
                {staff.tasks.length > 0 ? (<>
                <Text style={PublicStyles.screenTitle}>{t('tasks')}</Text>
                {staff.tasks.map((task)=>(
                    <View>
                        <InvoiceDetailsItem title={t('stagename')} value={task.name} /> 
                        <InvoiceDetailsItem title={t('carno')} value={task.carNo} />
                        <InvoiceDetailsItem title={t('cartype')} value={task.carType} />
                        
                        {task.worker.length > 0 ? (<>
                        {task.worker.map((worker)=>(
                            <View style={[PublicStyles.row,PublicStyles.justifyBetween]}>
                                <Text style={styles.workerITem}>{worker}</Text>
                            </View>
                        ))}
                        </>):(<></>)}
                    </View>
                ))}
                
                </>):(<></>)}
            </View>
        </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    tasksContainer:{
        borderWidth:2,
        borderColor:PublicStyles.lightColor,
        padding:10,
        borderRadius:10
    },
    workerITem:{
        backgroundColor:PublicStyles.primaryColor,
        margin:10,
        width:100,
        borderRadius:10,
        padding:10,
        color:"white"
    }
})