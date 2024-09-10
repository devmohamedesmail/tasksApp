import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { PublicStyles } from "../styles/PublicStyles";

import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ServicesContextData } from "../ContextData/ServicesContext";
import BackendData from "../utilities/BackendData";
import { useTranslation } from "react-i18next";
import CustomActionButton from "../customComponents/CustomActionButton";

export default function Setting() {
  const [loading, setLoading] = useState(false);
  const [services, fetchServicesData] = useContext(ServicesContextData);
  const navigation = useNavigation();
  const { t } = useTranslation();


  // function
  const handleDeleteService = async (id) => {
    // Show confirmation alert
    Alert.alert(
        t('confirm'), // Translated title
        t('alertdelete'),
      [
        {
          text: t('cancel'),
          style: "cancel"
        },
        {
          text: t('ok'),
          onPress: async () => {
            try {
              setLoading(true);
              const response = await axios.delete(
                `${BackendData.url}delete/service/${id}`
              );
              fetchServicesData();
              setLoading(false);
            } catch (error) {
              setLoading(false);
              Alert.alert("There is a problem", "Check your internet connection and try again.");
              console.log(error);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={PublicStyles.screen}>
      <View style={PublicStyles.container}>
        <Text style={PublicStyles.screenTitle}>{t('serviceSetting')}</Text>
        <View>
          {services && services.length > 0 ? (
            <>
              {services.map((item) => (
                <View
                  key={item.id}
                  style={[
                    PublicStyles.row,
                    PublicStyles.itemcenter,
                    styles.item,
                    PublicStyles.justifyBetween,
                  ]}
                >
                  <View style={[PublicStyles.row, PublicStyles.itemcenter]}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${BackendData.url2}uploads/service/${item.image}`,
                      }}
                    />
                    <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                  </View>

                  <View style={[PublicStyles.row]}>
                    <CustomActionButton backgroundColor={PublicStyles.lightColor} icon={<AntDesign name="edit" size={20} color="green" />} onpress={() => {
                        navigation.navigate("Edit Service", {
                          service: item,
                        });
                      }} />

                    {loading ? (
                    <CustomActionButton icon={ <ActivityIndicator size="small" color={PublicStyles.primaryColor} />} />
                    ) : (
                      <CustomActionButton icon={<Entypo name="trash" size={20} color="red" />} onpress={() => handleDeleteService(item.id)} backgroundColor={PublicStyles.lightColor} />
                    )}
                  </View>
                </View>
              ))}
            </>
          ) : (
            <>
              <View>
                <ActivityIndicator
                  size="large"
                  color={PublicStyles.primaryColor}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: PublicStyles.lightColor,
    marginBottom: 10,
    padding: 7,
    borderRadius: 20,
  },
  image: {
    width: 50,
    height: 50,
  },
  btn: {
    backgroundColor: PublicStyles.lightColor,
    padding: 10,
    marginRight: 15,
    borderRadius: 10,
    elevation: 1,
  },
});
