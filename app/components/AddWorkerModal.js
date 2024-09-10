import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";

import axios from "axios";
import CustomButton from "./CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { PublicStyles } from "../styles/PublicStyles";
import { DataContext } from "../ContextData/DataProvider";
import CustomPicker from "../customComponents/CustomPicker";
import BackendData from "../utilities/BackendData";
import { useTranslation } from "react-i18next";

export default function AddWorkerModal({
  modalWorker,
  setModalWorker,
  id,
  fetchWorkerByService,
}) {
  const [name, setName] = useState();
  const [staffItem, setStaffItem] = useState();
  const [service, setServices] = useState(id);
  const [loading, setLoading] = useState(false);
  const {t}=useTranslation();
  
  const {
    branches,
    fetchBranches,
    invoiceTypes,
    fetchInvoiceTypes,
    paidMethods,
    fetchPaidMethods,
    invoices,
    fetchInvoices,
    staff,
    fetchStaff,
  } = useContext(DataContext);

  const handleSelectStaff = (item) => {
    setName(item.name);
    setStaffItem(item);
  };



  const handleAddNewUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BackendData.url}add/service/worker/${service}`,
        {
          service,
          name,
        }
      );
      setLoading(false);
      setStaffItem("")
      setModalWorker(false)
      fetchWorkerByService();
      Alert.alert(t('added'));
    
    } catch (error) {
      Alert.alert(t('problemhappened'));
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalWorker}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalWorker);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{t('addnewstaff')}</Text>

          {staff && staff.length > 0 ? (
            <CustomPicker
              items={staff}
              selectedItem={staffItem}
              onSelect={handleSelectStaff}
              displayKey="name"
              selectoption={t('selectstaff')}
            />
          ) : (
            <View>
              <ActivityIndicator
                color={PublicStyles.primaryColor}
                size="small"
              />
            </View>
          )}

          {loading ? (
            <CustomButton
              title={<ActivityIndicator size="small" color="white" />}
              onpress={handleAddNewUser}
            />
          ) : (
            <CustomButton title={t('add')} onpress={handleAddNewUser} />
          )}

          <TouchableOpacity
            onPress={() => setModalWorker(!modalWorker)}
            style={styles.closeBtn}
          >
            <AntDesign name="closecircleo" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: PublicStyles.lightColor,
    elevation: 4,
    width: "90%",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 40,
    alignSelf: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 50,

    marginBottom: 20,
    overflow: "hidden",
  },
  closeBtn: {
    marginTop: 30,
    alignSelf: "center",
  },
});
