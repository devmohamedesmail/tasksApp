import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PublicStyles } from '../../styles/PublicStyles'
import axios from 'axios'
import BackendData from '../../utilities/BackendData'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../ContextData/ThemeContext'
import BottomNav from '../../components/BottomNav'
import Header from '../../components/Header'
import { useTranslation } from 'react-i18next'

export default function Staff() {
    const [staffTasks, setstaffTasks] = useState();
    const navigation = useNavigation()
    const { theme } = useTheme()
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
        <View style={{ flex:1 }}>
            <ScrollView style={[theme === 'light' ? PublicStyles.screenLight : PublicStyles.screenDark]}>
                <View style={[PublicStyles.container, { paddingBottom: 50 }]}>
                    <Header />
                    <Text style={[PublicStyles.screenTitle,theme==='light'? PublicStyles.textDarkMode : PublicStyles.textLightMode]}>{t('staff')}</Text>
                    {staffTasks && staffTasks.length > 0 ? (
                        <>
                            <View style={[PublicStyles.row, PublicStyles.justifyBetween, PublicStyles.wrap]}>
                                {staffTasks.map((item) => (
                                    <TouchableOpacity key={item.id} style={[styles.item,theme === 'light' ? PublicStyles.backgroundlightColor : PublicStyles.backgroundDarkColor] } onPress={() => navigation.navigate("StaffDetails", {
                                        staff: item
                                    })}>
                                        <Text style={[styles.name,theme === 'light' ? PublicStyles.textLightMode : PublicStyles.textDarkMode]}>{item.name}</Text>

                                        <View style={styles.counter}>
                                            <Text style={styles.counterText}> {item.tasks.length}</Text>
                                        </View>

                                    </TouchableOpacity>
                                ))}
                            </View>



                        </>
                    ) : (<Text>no</Text>)}
                </View>
            </ScrollView>
            <BottomNav />
        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        width: '30%',
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: PublicStyles.lightColor,
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: PublicStyles.primaryColor,
        position: 'relative',
        elevation: 10
    },
    name: {
        fontWeight: 'bold',
        fontSize: 13,
        color: 'white',
    },
    counter: {
        backgroundColor: 'black',
        color: 'white',
        width: 35,
        height: 35,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: -13,
        borderWidth: 3,
        borderColor: 'white'
    },
    counterText: {
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }

})