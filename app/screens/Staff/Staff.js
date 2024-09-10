import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PublicStyles } from '../../styles/PublicStyles'
import axios from 'axios'
import BackendData from '../../utilities/BackendData'
import { useNavigation } from '@react-navigation/native'

export default function Staff() {
    const [staffTasks,setstaffTasks]=useState();
    const navigation = useNavigation()



    const fetchStaffTasks = async ()=>{
        try {
            const response = await axios.get(`${BackendData.url}show/staff/tasks`)
            setstaffTasks(response.data.data)
        } catch (error) {
           console.log(error) 
        }
    }

    useEffect(()=>{
        fetchStaffTasks();
    },[])
  return (
    <ScrollView style={PublicStyles.screen}>
        
        <View style={[PublicStyles.container,{paddingBottom:50}]}>
        <Text style={PublicStyles.screenTitle}>Staff</Text>
         {staffTasks && staffTasks.length > 0 ? (
            <>
            <View style={[PublicStyles.row,PublicStyles.justifyBetween,PublicStyles.wrap]}>
            {staffTasks.map((item)=>(
                <TouchableOpacity key={item.id} style={styles.item} onPress={()=>navigation.navigate("StaffDetails",{
                    staff:item
                })}>
                    <Text style={styles.name}>{item.name}</Text>
                    
                    <View  style={styles.counter}>
                      <Text style={{color:'white',alignSelf:'center'}}> {item.tasks.length}</Text>
                    </View>
                   
                </TouchableOpacity>
              ))}
            </View>
             
         
         
           </>
        ):(<Text>no</Text>) }
        </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    item:{
       width:'45%',
       height:100,
       display:'flex',
       justifyContent:'center',
       alignItems:'center',
       borderWidth:1,
       borderColor:PublicStyles.lightColor,
       marginBottom:10,
       borderRadius:20,
    },
    name:{
        fontWeight:'bold',
        fontSize:15,
    },
    counter:{
        marginTop:20,
        backgroundColor:PublicStyles.primaryColor,
        color:'white',
        width:30,
        height:30,
        borderRadius:100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }

})