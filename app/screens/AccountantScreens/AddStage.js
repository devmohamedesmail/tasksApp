import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { PublicStyles } from "../../styles/PublicStyles";
import CustomInput from "../../customComponents/CustomInput";
import { DataContext } from "../../ContextData/DataProvider";
import CustomPicker from "../../customComponents/CustomPicker";
import CustomDateTimePicker from "../../customComponents/CustomDateTimePicker";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import { useTranslation } from "react-i18next";
import BackendData from "../../utilities/BackendData";
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import CustomMultiSelect from "../../customComponents/CustomMultiSelect";
import CustomDateButton from "../../customComponents/CustomDateButton";


export default function AddStage() {
  const route = useRoute();
  const { invoice } = route.params;
  const [name, setName] = useState("");
  const [worker, setWorker] = useState();
  const [workers, setWorkers] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [isPickerRdateVisible, setPickerRdateVisible] = useState(false);
  const [isPickerDdateVisible, setPickerDdateVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { branches, fetchBranches, invoiceTypes, fetchInvoiceTypes, paidMethods, fetchPaidMethods, invoices, fetchInvoices, staff, fetchStaff } = useContext(DataContext);
  const { t } = useTranslation();
  const [carProcess, setCarProcess] = useState()
  const [stage, setStage] = useState()





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

  const handleAddInvoieceStage = async () => {
    console.log(worker)
    try {

      setLoading(true);
      await axios.post(`${BackendData.url}add/stage/${invoice.id}`, {
        name,
        worker,
        start,
        end,
      });
      setName("");
      setWorker();
      setStart("");
      setEnd("");
      setLoading(false);
      Alert.alert(t('added'));
    } catch (error) {
      //Alert.alert(t('problemhappened'));
      console.log(error)
      console.log(worker)
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  const fetchCarProcess = async () => {
    try {
      const response = await axios.get(`${BackendData.url}show/car/process`)
      setCarProcess(response.data.data)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    fetchCarProcess()
  }, [])


  const handleSelectStage = (item) => {
    setStage(item);
    setName(item.process);
  };




  const handleSelect = (newSelection) => {
    const selectedIds = newSelection.map(item => typeof item === 'object' ? item.id : item);
    setWorkers(newSelection)
    setWorker(selectedIds);

    console.log(worker)
  };








  return (
    <ScrollView style={PublicStyles.screen}>
      <View style={PublicStyles.container}>
        <Text style={PublicStyles.screenTitle}>{t('addstage')}</Text>

        <CustomPicker
          items={carProcess}
          selectedItem={stage}
          onSelect={handleSelectStage}
          displayKey="process"
          selectoption={t('stagename')}
        />



        <CustomMultiSelect
          items={staff}
          selectedItems={workers}
          onSelect={handleSelect}
          displayKey="name" 
          selectOption={t('selectstaff')}

        />

        



        <View
          style={[
            PublicStyles.row,
            PublicStyles.justifyBetween,
            { marginTop: 20, marginBottom: 20 },
          ]}
        >
         

          <CustomDateButton onpress={() => setPickerRdateVisible(true)} title={t('startdate')} />

          <CustomDateTimePicker
            isVisible={isPickerRdateVisible}
            onClose={() => setPickerRdateVisible(false)}
            onConfirm={handleConfirmSdate}
          />

      
          <CustomDateButton onpress={() => setPickerDdateVisible(true)}  title={t('enddate')} />

          <CustomDateTimePicker
            isVisible={isPickerDdateVisible}
            onClose={() => setPickerDdateVisible(false)}
            onConfirm={handleConfirmEdate}
          />
        </View>

        {loading ? (
          <CustomButton
            title={<ActivityIndicator color="white" size="small" />}
          />
        ) : (
          <CustomButton
            title={t('add')}
            onpress={() => handleAddInvoieceStage()}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dateBtn: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "45%",
    textAlign: "center",
  },
  dateBtnText: {
    textAlign: "center",
  },
  selectedText:{
    backgroundColor:PublicStyles.primaryColor
  }
});
