import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

import { PublicStyles } from "../../styles/PublicStyles";

import BackendData from "../../utilities/BackendData";
import CustomSpinner from "../../customComponents/CustomSpinner";
import TaskItem from "./ItemsComponents/TaskItem";
import { useTranslation } from "react-i18next";
import SearchBox from "../../components/SearchBox";

export default function WorkerTasks() {

  const route = useRoute();
  const { workerID } = route.params;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchquery, setSearchQuery] = useState("");
 

  const fetchWorkertasks = async () => {
    try {
      const response = await axios.get(
        `${BackendData.url}show/worker/tasks/${workerID}`
      );
      const data = response.data.data.tasks;
      if (Array.isArray(data)) {
        setTasks(data);
        setFilteredTasks(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchWorkertasks();
  }, []);

  const handleDeleteTask = async (taskID) => {
    Alert.alert(
      t("confirm"),
      t("alertdelete"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("ok"),
          onPress: async () => {
            try {
              const response = await axios.delete(
                `${BackendData.url}delete/task/${taskID}`
              );
              fetchWorkertasks();
              Alert.alert(t('deletesuccess'));
            } catch (error) {
              Alert.alert(t('problemhappened'));
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
      t("confirm"),
      t("alertupdate"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("ok"),
          onPress: async () => {
            try {
              const response = await axios.get(
                `${BackendData.url}change/task/status/${taskid}`
              );
              fetchWorkertasks();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleSearch = () => {
    if (Array.isArray(tasks)) {
      const result = tasks.filter(task =>
        task.carNo.toLowerCase().includes(searchquery.toLowerCase())
      );
      setFilteredTasks(result);
    } else {
      console.error("Tasks is not an array:");
    }
  };

  const editTaskHandler = (task) => {
    navigation.navigate("Edit Task", { task: task });
    fetchWorkertasks();
  };

  return (
    <ScrollView style={PublicStyles.screen}>
      <View style={[PublicStyles.container, { paddingBottom: 100 }]}>
        <SearchBox
          value={searchquery}
          onchangetext={(text) => {
            setSearchQuery(text);
            handleSearch();
          }}
        />

        {filteredTasks ? (
          <>
            <View>
              {filteredTasks && filteredTasks.length > 0 ? (
                <>
                  {filteredTasks.map((task, index) => (
                    <TaskItem
                      key={task.id}
                      image={`${BackendData.url2}uploads/tasks/${task.image}`}
                      description={task.description}
                      name={task.name}
                      carNo={task.carNo}
                      carType={task.carType}
                      carColor={task.carColor}
                      notes={task.notes}
                      start={task.start}
                      end={task.end}
                      EditTask={() => editTaskHandler(task)}
                      deleteTask={() => handleDeleteTask(task.id)}
                      chaneTaskStatus={() => handleChangeTaskStatus(task.id)}
                      fetchWorkertasks={fetchWorkertasks}
                    />
                  ))}
                </>
              ) : (
                <Text style={{ textAlign: "center" }}>{t("notasks")}</Text>
              )}
            </View>
          </>
        ) : (
          <CustomSpinner />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: PublicStyles.lightColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  btn: {
    marginTop: 20,
    backgroundColor: PublicStyles.lightColor,
    padding: 10,
    borderRadius: 10,
    elevation: 10,
  },
  playBtn: {
    backgroundColor: PublicStyles.lightColor,
    marginTop: 20,
    padding: 10,
    borderRadius: 100,
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
