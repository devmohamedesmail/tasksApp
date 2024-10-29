// Make sure to install this package

import { ScrollView, Text, View, ActivityIndicator, Alert, TextInput, StyleSheet } from "react-native";
import CustomInput from "../../customComponents/CustomInput";
import CustomDateButton from "../../customComponents/CustomDateButton";
import CustomDateTimePicker from "../../customComponents/CustomDateTimePicker";
import { useTranslation } from "react-i18next";
import { PublicStyles } from "../../styles/PublicStyles";
import { useContext, useEffect, useState } from "react";
import CustomImageButton from "../../customComponents/CustomImageButton";
import { useRoute } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import CustomPicker from "../../customComponents/CustomPicker";
import CustomButton from "../../customComponents/CustomButton";
import CustomActionButton from "../../customComponents/CustomActionButton";

export default function AddTaskScreen() {
  const [carTypesData, setcarTypesData] = useState();
  const [carTypeItem, setCarTypeItem] = useState();
  const [type, setType] = useState();

  const route = useRoute();
  const { workerID } = route.params;
  const { t } = useTranslation();
  const [description, setDescription] = useState();
  const [carNo, setCarNo] = useState();
  const [carType, setCarType] = useState();
  const [carColor, setCarColor] = useState();
  const [notes, setNotes] = useState();
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [isPickerRdateVisible, setPickerRdateVisible] = useState(false);
  const [isPickerDdateVisible, setPickerDdateVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // function to fetch car types
  const fetchCarsTypesData = async () => {
    try {
      const response = await axios.get(`${BackendData.url}show/car/types`);
      setcarTypesData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCarsTypesData();
  }, []);

  const handleSelectCarType = (item) => {
    setCarType(item.type);
    setCarTypeItem(item);
  };

  const handleAddTask = async () => {
    if (!start || !end) {
      Alert.alert(t('datetimerequired'));
      return; 
    }
  
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", workerID);
      formData.append("carNo", carNo);
      formData.append("carType", carType);
      formData.append("carColor", carColor);
      formData.append("description", description);
      formData.append("start", start);
      formData.append("end", end);
      formData.append("notes", notes);
      if (image) {
        formData.append("image", {
          uri: imagePath,
          type: "image/jpeg",
          name: image,
        });
      }
      const response = await axios.post(
        `${BackendData.url}add/task/${workerID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      Alert.alert(t("added"));
    } catch (error) {
      Alert.alert(t("problemhappened"));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCarType = async () => {
    try {
      await axios.post(`${BackendData.url}add/car/type`, {
        type,
      });
      setType("");
      fetchCarsTypesData();
      Alert.alert(t("added"));
    } catch (error) {
      Alert.alert(t("problemhappened"));
    }
  };

  return (
    <ScrollView style={PublicStyles.screen}>
      <View style={[PublicStyles.container, { marginBottom: 50 }]}>
        <Text style={PublicStyles.screenTitle}>{t("addtask")}</Text>

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
            value={carColor}
            placeholder={t("carcolor")}
            onchangetext={(text) => setCarColor(text)}
          />

          <CustomPicker
            items={carTypesData}
            displayKey="type"
            selectedItem={carTypeItem}
            onSelect={handleSelectCarType}
            selectoption={t("cartype")}
          />
          <View style={styles.container}>
            <TextInput style={{flex:1,paddingLeft:5,paddingRight:5}} value={type} placeholder={t("addnewcartype")} onChangeText={(text) => setType(text)} />
            <CustomActionButton
               backgroundColor={PublicStyles.lightColor}
              icon={<AntDesign name="pluscircle" size={24} color={PublicStyles.primaryColor} />}
              onpress={() => handleAddCarType()}
            />
          </View>

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

          <View>
            {loading ? (
              <CustomButton
                title={<ActivityIndicator color="white" size="small" />}
              />
            ) : (
              <CustomButton title={t("add")} onpress={() => handleAddTask()} />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius:30,
    padding:5,
    borderWidth:2,
    borderColor:PublicStyles.lightColor,
  }
})
