import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { PublicStyles } from "../styles/PublicStyles";
import CustomInput from "../customComponents/CustomInput";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import CustomImageButton from "../customComponents/CustomImageButton";
import CustomDateButton from "../customComponents/CustomDateButton";
import CustomDateTimePicker from "../customComponents/CustomDateTimePicker";
import { useTranslation } from "react-i18next";

export default function EditTask() {
  const route = useRoute();
  const { task } = route.params;
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const [description, setDescription] = useState(task.description);
  const [carNo, setCarNo] = useState(task.carNo);
  const [carType, setCarType] = useState(task.carType);
  const [carColor, setCarColor] = useState(task.carColor);
  const [notes, setNotes] = useState(task.notes);
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [start, setStart] = useState(task.start);
  const [end, setEnd] = useState(task.end);
  const [isPickerRdateVisible, setPickerRdateVisible] = useState(false);
  const [isPickerDdateVisible, setPickerDdateVisible] = useState(false);

  const handleConfirmSdate = (date) => {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    setStart(`${formattedDate} ${formattedTime}`);
  };
  const handleConfirmEdate = (date) => {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    setEnd(`${formattedDate} ${formattedTime}`);
  };

  const handleUpdateTask = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("carNo", carNo);
      formData.append("carType", carType);
      formData.append("carColor", carColor);
      formData.append("description", description);
      formData.append("notes", notes);
      formData.append("start", start);
      formData.append("end", end);
      if (image) {
        formData.append("image", {
          uri: imagePath,
          type: "image/jpeg",
          name: image,
        });
      }
      const response = await axios.post(
        `${BackendData.url}update/task/${task.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      Alert.alert(t('updated'));
    } catch (error) {
      Alert.alert(t('problemhappened'));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={PublicStyles.screen}>
      <View style={[PublicStyles.container, { marginBottom: 50 }]}>
        <Text style={PublicStyles.screenTitle}>{t("update")}</Text>

        <View style={[PublicStyles.container, { paddingBottom: 100 }]}>
          <CustomInput
            value={description}
            placeholder={t("taskdescription")}
            onchangetext={(text) => setDescription(text)}
          />
          <CustomInput
            value={carNo}
            placeholder={t("carno")}
            onchangetext={(text) => setCarNo(text)}
          />
        
         
          <CustomInput
            value={notes}
            placeholder={t("note")}
            onchangetext={(text) => setNotes(text)}
          />

          <View
            style={[
              PublicStyles.row,
              PublicStyles.justifyBetween,
              { marginTop: 20, marginBottom: 20 },
            ]}
          >
            <CustomDateButton
              title={t("startdate")}
              onpress={() => setPickerRdateVisible(true)}
            />
            <CustomDateTimePicker
              isVisible={isPickerRdateVisible}
              onClose={() => setPickerRdateVisible(false)}
              onConfirm={handleConfirmSdate}
            />

            <CustomDateButton
              title={t("enddate")}
              onpress={() => setPickerDdateVisible(true)}
            />

            <CustomDateTimePicker
              isVisible={isPickerDdateVisible}
              onClose={() => setPickerDdateVisible(false)}
              onConfirm={handleConfirmEdate}
            />
          </View>

          <CustomImageButton
            background="black"
            title={t("pickimage")}
            iconColor={PublicStyles.whiteColor}
            textColor={PublicStyles.whiteColor}
            borderRadius={10}
            padding={10}
            imageHeight={200}
            imageWidth={200}
            imageMarginBottom={30}
            imageBorderRaduis={20}
            onImageSelected={(selectedImage, selectedImagePath) => {
              setImage(selectedImage);
              setImagePath(selectedImagePath);
            }}
          />

          {loading ? (
            <CustomButton
              title={<ActivityIndicator color="white" size="small" />}
            />
          ) : (
            <CustomButton
              title={t("update")}
              onpress={() => handleUpdateTask()}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}


