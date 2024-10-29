import React, { useContext, useState } from "react";
import {ScrollView,StyleSheet,Text,View,Alert,ActivityIndicator} from "react-native";
import { PublicStyles } from "../styles/PublicStyles";
import CustomInput from "../customComponents/CustomInput";
import axios from "axios";
import CustomButton from "../customComponents/CustomButton";
import CustomImageButton from "../customComponents/CustomImageButton";
import { ServicesContextData } from "../ContextData/ServicesContext";
import { DataContext } from "../ContextData/DataProvider";
import BackendData from "../utilities/BackendData";
import CustomPicker from "../customComponents/CustomPicker";
import { useTranslation } from "react-i18next";

export default function AddService() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [services, fetchServicesData] = useContext(ServicesContextData);
  const { branches, fetchBranches } = useContext(DataContext);
  const [branch, setBranch] = useState();
  const [branchID, setbranchID] = useState();
  const {t}=useTranslation()

  const handleAddService = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("branch", branchID);
      if (image) {
        formData.append("image", {
          uri: imagePath,
          type: "image/jpeg",
          name: image,
        });
      }

      const response = await axios.post(
        `${BackendData.url}add/service`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      fetchServicesData();
      setName("");
      setImage(null);
      setImagePath(null);
      Alert.alert(t('added'), "");
    } catch (error) {
      Alert.alert(t('problemhappened'));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBranch = (item) => {
    setBranch(item);
    setbranchID(item.id);
  };

  return (
    <ScrollView style={PublicStyles.screen}>
      <View style={[PublicStyles.container, { marginBottom: 100 }]}>
        <Text style={PublicStyles.screenTitle}>{t('addservice')}</Text>

        <View style={{marginBottom:20}}>
        <CustomPicker
            items={branches}
            selectedItem={branch}
            onSelect={handleSelectBranch}
            displayKey="name"
            selectoption={t('selectbranch')}
          />
        </View>
          
       
        <View style={{marginBottom:20}}>
          <CustomInput
            value={name}
            placeholder={t('servicename')}
            onchangetext={(text) => {
              setName(text);
            }}
          />
         </View>
        <CustomImageButton
          background="black"
          title={t('pickimage')}
          iconColor="white"
          textColor="white"
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

        <View style={{ marginBottom: 50, marginTop: 50 }}>
          {loading ? (
            <CustomButton
              title={<ActivityIndicator size="small" color="white" />}
              onpress={handleAddService}
            />
          ) : (
            <CustomButton title={t('add')} onpress={handleAddService} />
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
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});
