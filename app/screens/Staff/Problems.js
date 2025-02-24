import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView,StyleSheet } from 'react-native'
import { PublicStyles } from '../../styles/PublicStyles'
import { useTranslation } from 'react-i18next'
import axios from 'axios';
import BackendData from '../../utilities/BackendData';
// import InvoiceDetailsItem from '../Invoices/InvoiceDetailsItem';


import BottomNav from '../../components/BottomNav';
import { Div, ScrollDiv } from 'react-native-magnus';
import InvoiceSkeleton from '../Skeletons/InvoiceSkeleton';
import Colors from '../../config/Colors';

export default function Problems() {
    const { t } = useTranslation();
    const [problems, setProblems] = useState();
 



    const fetchProblems = async () => {
        try {
            const response = await axios.get(`${BackendData.url}show/problems`);
            setProblems(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchProblems();
    },[])


    return (
      <Div flex={1}>
          <ScrollDiv bg={Colors.light}>
            <Div py={30} px={10}>
            
                {problems ? (
                    <>
                    {problems.map((problem)=>(
                        <View style={styles.item} key={problem.id}>
                            <InvoiceDetailsItem  title={t('stagename')} value={problem.step}/>
                            <InvoiceDetailsItem  title={t('problem')} value={problem.problem}/>
                            <InvoiceDetailsItem  title={t('reason')} value={problem.reason}/>
                            <InvoiceDetailsItem  title={t('solution')} value={problem.solution}/>
                            <InvoiceDetailsItem  title={t('worker')} value={problem.worker}/>
                            <InvoiceDetailsItem  title={t('carno')} value={problem.carNo}/>
                            <InvoiceDetailsItem  title={t('sales')} value={problem.sales}/>
                        </View>
                    ))}
                    </>
                    ):(<>
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
      </Div>
    )
}

const styles = StyleSheet.create({
    item:{
        borderWidth:2,
        borderColor:PublicStyles.lightColor,
        padding:10,
        borderRadius:10,
    }
})