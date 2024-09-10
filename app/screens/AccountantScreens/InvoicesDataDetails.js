import React, { useEffect, useState ,useCallback} from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PublicStyles } from "../../styles/PublicStyles";
import BackendData from "../../utilities/BackendData";
import CarStatusItem from "./CarStatusItem";
import axios, { Axios } from "axios";
import { useTranslation } from "react-i18next";
import SearchBox from "../../components/SearchBox";
import CustomSpinner from "../../customComponents/CustomSpinner";


export default function InvoicesDataDetails() {
  const [carsstatus, setCarsstatus] = useState([]);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BackendData.url}show/invoices/details`
      );
      setCarsstatus(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeStageStatus = async (stageId) => {
    Alert.alert(
      t("confirm"), // Translated title
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
              await axios.post(`${BackendData.url}change/status/${stageId}`);
              fetchData();
              Alert.alert(t("updated"));
            } catch (error) {
              Alert.alert(t("problemhappened"));
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const handleChangeInvoice = async (invoiceId) => {
    Alert.alert(
      t("confirm"), // Translated title
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
              await axios.post(
                `${BackendData.url}change/invoice/status/${invoiceId}`
              );
              fetchData();
              Alert.alert(t("updated"));
            } catch (error) {
              Alert.alert(t("problemhappened"));
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const handleSearch = () => {
    if (Array.isArray(data)) {
      const result = data.filter((task) =>
        task.carNo.toLowerCase().includes(query.toLowerCase())
      );
      setCarsstatus(result);
    } else {
      console.error("Tasks is not an array:");
    }
  };






  return (
    <ScrollView style={[PublicStyles.screen]}>
      <View style={[PublicStyles.container, { paddingBottom: 100 }]}>

        <View>

        <Text style={PublicStyles.screenTitle}>{carsstatus.length}</Text>
        </View>
       
        <View style={[PublicStyles.row,PublicStyles.justifyBetween,PublicStyles.itemcenter]}>


        <SearchBox
          value={query}
          onchangetext={(text) => {
            setQuery(text);
            handleSearch();
          }}
        />

         
        </View>
       
        {carsstatus && carsstatus.length > 0 ? (
          carsstatus.map((item, index) => (
            <View style={styles.item} key={item.id}>
              <View
                style={[
                  PublicStyles.row,
                  PublicStyles.justifyBetween,
                  PublicStyles.itemcenter,
                ]}
              >
                <Text key={index} style={[PublicStyles.screenTitle]}>
                  {item.carNo}
                </Text>
                <Text key={index} style={[PublicStyles.screenTitle]}>
                  {item.carType}
                </Text>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleChangeInvoice(item.id)}
                >
                  <Text style={styles.textBtn}>{t("delivercar")}</Text>
                </TouchableOpacity>
              </View>
              {item.stages.length > 0 ? (
                <ScrollView horizontal={true}>
                  {item.stages.map((stage) => (
                    <CarStatusItem
                      name={stage.name}
                      worker={stage.worker}
                      start={stage.start}
                      end={stage.end}
                      status={stage.status}
                      changeStatus={() => handleChangeStageStatus(stage.id)}
                      carNo={item.carNo}
                    />
                  ))}
                </ScrollView>
              ) : (
               <View style={{display:'flex',justifyContent:"center",alignItems:'center'}}>
                 <Text
                  styles={{fontSize: 18}}
                >
                  {t("nostage")}
                </Text>
               </View>
              )}
            </View>
          ))
        ) : (
          <>
       
          <CustomSpinner />
          </>
          
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
    marginBottom: 10,
  },
  textalert: {
    color: "red",
    marginBottom: 5,
    fontSize: 30,
    textAlign: "center",
    backgroundColor: "red",
  },
  btn: {
    backgroundColor: "green",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  textBtn: {
    color: "white",
    fontSize: 15,
  },
});
