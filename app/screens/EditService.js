import { useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { PublicStyles } from "../styles/PublicStyles";
import CustomInput from "../customComponents/CustomInput";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { useTranslation } from "react-i18next";
import BackendData from "../utilities/BackendData";
import CustomImageButton from "../customComponents/CustomImageButton";
import { ServicesContextData } from "../ContextData/ServicesContext";

export default function EditService() {
  const route = useRoute();
  const { service } = route.params;
  const [name, setName] = useState(service.name);
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [services, fetchServicesData, carstypes, fetchCarsTypes] =
    useContext(ServicesContextData);

  const handleEditService = async (id) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("image", {
          uri: imagePath,
          type: "image/jpeg", // or 'image/png' depending on the image type
          name: image,
        });
      }

      const response = await axios.post(
        `${BackendData.url}update/service/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      fetchServicesData();
      Alert.alert(t("updated"), "");
    } catch (error) {
      Alert.alert("problemhappened", "");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView style={PublicStyles.screen}>
      <View style={PublicStyles.container}>
        {/* <Text style={PublicStyles.screenTitle}>{t("update")}</Text> */}
        <CustomInput
          value={name}
          onchangetext={(text) => {
            setName(text);
          }}
        />

        {service.image ? (
          <View style={[PublicStyles.col, PublicStyles.itemcenter]}>
            <Image
              style={styles.image}
              source={{
                uri: `${BackendData.url2}uploads/service/${service.image}`,
              }}
            />
          </View>
        ) : (
          <Text style={{ textAlign: "center", margin: 20 }}>
            {t("noimage")}
          </Text>
        )}

        <CustomImageButton
          background="black"
          title={t("pickimage")}
          iconColor={PublicStyles.whiteColor}
          textColor={PublicStyles.whiteColor}
          borderRadius={10}
          padding={10}
          imageHeight={300}
          imageWidth={300}
          imageMarginBottom={30}
          imageBorderRaduis={20}
          onImageSelected={(selectedImage, selectedImagePath) => {
            setImage(selectedImage);
            setImagePath(selectedImagePath);
          }}
        />

        <View style={{ marginTop: 50 }}>
          {loading ? (
            <CustomButton
              title={<ActivityIndicator size="small" color="white" />}
              onpress={() => handleEditService(service.id)}
            />
          ) : (
            <CustomButton
              title={t("update")}
              onpress={() => handleEditService(service.id)}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageBtn: {
    borderRadius: 20,
    padding: 10,
    width: "50%",
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    textAlign: "center",
  },
});
