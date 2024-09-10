import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { PublicStyles } from "../../styles/PublicStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import AddWorkerModal from "../../components/AddWorkerModal";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import WorkerItem from "./ItemsComponents/WorkerItem";
import axios from "axios";
import BackendData from "../../utilities/BackendData";
import { useTranslation } from "react-i18next";

export default function ServiceWorker() {
  const [workers, setWorkers] = useState([]);
  const [modalWorker, setModalWorker] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const { t } = useTranslation();

  const fetchWorkerByService = async () => {
    try {
      const response = await axios.get(
        `${BackendData.url}show/service/workers/${id})`
      );
      setWorkers(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchWorkerByService();
  }, [id]);

  const handleDeleteWorker = (id) => {
    // Show a confirmation dialog
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
              setLoading(true);
              const response = await axios.delete(
                `${BackendData.url}delete/service/worker/${id}`
              );
              fetchWorkerByService();
              setLoading(false);
            } catch (error) {
              Alert.alert(t("problemhappend"));
              setLoading(false);
            }finally{
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const screenHeight = Dimensions.get("window").height;
  return (
    <View>
      <ScrollView style={PublicStyles.screen}>
        <View
          style={[
            PublicStyles.container,
            styles.relativeContainer,
            { height: screenHeight },
          ]}
        >
          <Text style={PublicStyles.screenTitle}>{t("avworker")}</Text>

          <View>
            {workers &&
            workers.workers &&
            Array.isArray(workers.workers) &&
            workers.workers.length > 0 ? (
              <>
                {workers.workers.map((worker, index) => (
                  <WorkerItem
                    key={worker.id}
                    index={index + 1}
                    name={worker.name}
                    navigateToTasks={() =>
                      navigation.navigate("Worker Tasks", {
                        workerID: worker.id,
                      })
                    }
                    onpressAddTask={() =>
                      navigation.navigate("Add Task Screen", {
                        workerID: worker.id,
                      })
                    }
                    onpressDeleteWorker={() => handleDeleteWorker(worker.id)}
                    
                  />
                ))}
              </>
            ) : (
              <Text style={{ textAlign: "center" }}>{t("noavworker")}</Text>
            )}
          </View>
        </View>

        <AddWorkerModal
          modalWorker={modalWorker}
          setModalWorker={setModalWorker}
          id={id}
          fetchWorkerByService={fetchWorkerByService}
        />
      </ScrollView>
      <View style={styles.floatBtnsSection}>
        <TouchableOpacity
          style={styles.floatBtn1}
          onPress={() => setModalWorker(true)}
        >
          <Entypo name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  relativeContainer: {
    position: "relative",
    flex: 1,
  },

  btn: {
    marginRight: 15,
    backgroundColor: PublicStyles.lightColor,
    padding: 10,
    elevation: 2,
    borderRadius: 10,
  },

  floatBtn1: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: PublicStyles.primaryColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    elevation: 10,
  },
  floatBtn2: {
    position: "absolute",
    bottom: 150,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: PublicStyles.primaryColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    elevation: 10,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
