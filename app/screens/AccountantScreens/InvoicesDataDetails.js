import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { PublicStyles } from "../../styles/PublicStyles";
import BackendData from "../../utilities/BackendData";
import CarStatusItem from "./CarStatusItem";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Entypo from '@expo/vector-icons/Entypo';
import BottomNav from "../../components/BottomNav";
import CustomInput from "../../customComponents/CustomInput";
import { Div, ScrollDiv, Text } from "react-native-magnus";
import InvoiceSkeleton from "../Skeletons/InvoiceSkeleton";
import BackButton from "../../components/BackButton";
import DrawerComponent from "../../components/DrawerComponent";
import CustomButton from "../../customComponents/CustomButton";
import Colors from "../../config/Colors";


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
    <Div flex={1}>
      <ScrollDiv bg={Colors.light}>
        <Div px={10} py={30}>

          {carsstatus && carsstatus.length > 0 ? (
            <Div>
              <CustomInput
                placeholder={t('search')}
                icon='search'
                value={query}
                onchangetext={(text) => {
                  setQuery(text);
                  handleSearch();
                }}

              />
            </Div>
          ) : (<></>)}



          {carsstatus && carsstatus.length > 0 ? (
            carsstatus.map((item, index) => (
              <Div bg="gray200" py={10} my={10} key={item.id}>

                <Div row justifyContent="space-between" alignItems="center" px={15} my={10}>
                  <Text fontWeight="bold" fontSize={15}>{item.carNo}</Text>
                  <Text fontWeight="bold" fontSize={15}>{item.carType}</Text>
                </Div>




                {item.stages.length > 0 ? (
                  <>
                    <Div row justifyContent="center" alignItems="center">
                      <Text fontWeight="bold" mx={10}>{t("scroll-right")}</Text>
                      <Entypo name="arrow-bold-right" size={24} color="#14213d" />
                    </Div>
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

                    <CustomButton title={t("delivercar")} onpress={() => handleChangeInvoice(item.id)} />
                  </>
                ) : (
                  <Text textAlign="center" fontSize={14} mt={10}>{t("nostage")}</Text>
                )}
              </Div>
            ))
          ) : (
            <>
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />

            </>

          )}
        </Div>

      </ScrollDiv>
      <BottomNav />
    </Div>
  );
}


