import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { PublicStyles } from "../styles/PublicStyles";
import axios from "axios";
import BackendData from "../utilities/BackendData";
import SearchBox from "../components/SearchBox";
import { useTranslation } from "react-i18next";
import TaskItem from "./Services/ItemsComponents/TaskItem";
import { useNavigation } from "@react-navigation/native";

export default function Tasks() {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchquery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BackendData.url}show/tasks`);
      setTasks(response.data.data);
      setFilteredTasks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 
  useEffect(() => {
    if (searchquery === "") {
      setFilteredTasks(tasks);
    } else {
      const result = tasks.filter((task) =>
        task.carNo.toLowerCase().includes(searchquery.toLowerCase())
      );
      setFilteredTasks(result);
    }
  }, [searchquery, tasks]);


  const handleDeleteTask = async (taskID) => {
    Alert.alert(
        t('confirm'),
       t('alertdelete'),
        [
          {
            text: t('cancel'),
            style: "cancel",
          },
          {
            text: t('ok'),
            onPress: async () => {
              try {
                const response = await axios.delete(
                  `${BackendData.url}delete/task/${taskID}`
                );
                fetchWorkerByService(); 
                Alert.alert("Deleted Successfully", "Check your Task");
              } catch (error) {
                Alert.alert("Deletion Unsuccessful", "Please try again");
                console.log(error);
              }
            },
          },
        ],
        { cancelable: false }
      );
  };

  const handleChangeTaskStatus = async (taskid) => {
    Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to Update this Task ?",
        [
          {
            text: t('cancel'),
            style: "cancel",
          },
          {
            text: t('ok'),
            onPress: async () => {
              try {
                const response = await axios.delete(
                  `${BackendData.url}change/task/status/${taskid}`
                );
                fetchWorkerByService(); 
               
              } catch (error) {
                
                console.log(error);
              }
            },
          },
        ],
        { cancelable: false }
      );
  };

  return (
    <ScrollView style={PublicStyles.screen}>
      <View style={[PublicStyles.container, { paddingBottom: 100 }]}>
        <SearchBox
          value={searchquery}
          onchangetext={(text) => {
            setSearchQuery(text);
            // handleSearch();
          }}
        />

        <View>
          {filteredTasks && filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                image={`${BackendData.url2}uploads/tasks/${task.image}`}
                description={task.description}
                name={task.name}
                carNo={task.carNo}
                carType={task.carType}
                carColor={task.carColor}
                carStatus={task.status}
                start={task.start}
                end={task.end}
                EditTask={() => navigation.navigate("Edit Task", { task })}
                deleteTask={() => handleDeleteTask(task.id)}
                changeTaskStatus={() => handleChangeTaskStatus(task.id)}
              />
            ))
          ) : (
            <Text style={{ textAlign: "center" }}>{t("notasks")}</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
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
    fontWeight: "bold",
  },
  name: {
    color: PublicStyles.primaryColor,
  },
  deleteBtn: {
    marginTop: 20,
    backgroundColor: PublicStyles.lightColor,
    padding: 10,
    borderRadius: 10,
    elevation: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 20,
  },
  statusBtn: {
    backgroundColor: "#06d6a0",
    padding: 10,
    borderRadius: 10,
  },
  notCompletedBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    color: "white",
  },
});
