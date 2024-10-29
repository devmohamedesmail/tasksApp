import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView,StyleSheet } from 'react-native'
import { PublicStyles } from '../../styles/PublicStyles'
import { useTranslation } from 'react-i18next'
import axios from 'axios';
import BackendData from '../../utilities/BackendData';
import InvoiceDetailsItem from '../AccountantScreens/InvoiceDetailsItem';
import CustomSpinner from '../../customComponents/CustomSpinner';
import { useTheme } from '../../ContextData/ThemeContext';
import BottomNav from '../../components/BottomNav';
import Header from '../../components/Header';

export default function Problems() {
    const { t } = useTranslation();
    const [problems, setProblems] = useState();
    const { theme } = useTheme();



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
      <View style={{ flex:1 }}>
          <ScrollView style={[theme === 'light' ? PublicStyles.screenLight : PublicStyles.screenDark]}>
            <View style={PublicStyles.container}>
                <Header />
                <Text style={[PublicStyles.screenTitle,theme==='light'? PublicStyles.textDarkMode : PublicStyles.textLightMode]}>{t('problems')}</Text>
                {problems ? (
                    <>
                    {problems.map((problem)=>(
                        <View style={styles.item}>
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
                    <CustomSpinner />
                    
                    </>)}
            </View>
        </ScrollView>
        <BottomNav />
      </View>
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