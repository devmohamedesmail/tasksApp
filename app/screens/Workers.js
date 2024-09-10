import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PublicStyles } from '../styles/PublicStyles'
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

export default function Workers() {

  const [workers, setWorkers] = useState();
  const fetchTasks = async () => {
    const response = await axios.get(`${Data.url}api/employers`);
    setWorkers(response.data)
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  return (
    <ScrollView style={PublicStyles.screen}>
      <Text style={PublicStyles.screenTitle}>All Workers</Text>
      <View style={[PublicStyles.container, styles.tasksContainer]}>

        {workers && workers.length > 0 ? (<>

          {workers.map((item) => (
            <View style={[styles.item, PublicStyles.row, PublicStyles.justifyBetween]} key={item.id}>
              <Text style={styles.carno}>{item.name}</Text>
              <Text>{item.tasks.length}</Text>

            </View>
          ))}

        </>) : (<>
          <ActivityIndicator size='large' color={PublicStyles.primaryColor} />
        </>)}




      </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  tasksContainer: {},
  item: {
    borderColor: PublicStyles.lightColor,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  carno: {
    fontWeight: 'bold'
  },
  name: {
    color: PublicStyles.primaryColor
  },
  deleteBtn: {
    marginTop: 10,
  }
})
