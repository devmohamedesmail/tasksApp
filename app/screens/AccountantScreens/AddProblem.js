import React, { useState, useContext, useEffect } from "react";
import { ScrollView, Text, View, Alert, ActivityIndicator } from "react-native";
import { PublicStyles } from "../../styles/PublicStyles";
import CustomInput from "../../customComponents/CustomInput";
import { DataContext } from "../../ContextData/DataProvider";
import CustomPicker from "../../customComponents/CustomPicker";
import { AuthContextData } from "../../ContextData/AuthContext";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ToggleLangButton from "../../components/TogglelangButton/ToggleLangButton";

export default function AddProblem() {
  const route = useRoute();
  const { invoice } = route.params;
  const [step, setStep] = useState("");
  const [problem, setProblem] = useState("");
  const [reason, setReason] = useState("");
  const [solution, setSolution] = useState("");
  const [worker, setWorker] = useState("");
  const [workerItem, setWorkerItem] = useState("");
  const [sales, setSales] = useState("");
  const { auth } = useContext(AuthContextData);
  const [loading, setLoading] = useState(false);
  const {t}=useTranslation()
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
 

  const handleSelectWorker = (item) => {
    setWorker(item.name);
    setWorkerItem(item);
  };

  useEffect(() => {
    if (auth && auth.user) {
      setSales(auth.user.name);
    }
  }, [auth]);

  const handleAddProblem = async () => {
    setLoading(true);
    setSales(auth.user.name);
    try {
      await axios.post(`${BackendData.url}add/problem/${invoice.id}`, {
        step,
        problem,
        reason,
        solution,
        worker,
        sales,
      });
      setLoading(false);
      Alert.alert(t('added'));
    } catch (error) {
      Alert.alert(t('problemhappened'));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={PublicStyles.screen}>
      <View style={PublicStyles.container}>
        <Text style={PublicStyles.screenTitle}>{t('addproblem')}</Text>
        <CustomInput
          value={step}
          placeholder={t('stagename')}
          onchangetext={(text) => setStep(text)}
        />
        <CustomInput
          value={problem}
          placeholder={t('problem')}
          onchangetext={(text) => setProblem(text)}
        />
        <CustomInput
          value={reason}
          placeholder={t('reason')}
          onchangetext={(text) => setReason(text)}
        />
        <CustomInput
          value={solution}
          placeholder={t('solution')}
          onchangetext={(text) => setSolution(text)}
        />
        <CustomPicker
          items={staff}
          selectedItem={workerItem}
          onSelect={handleSelectWorker}
          displayKey="name"
          selectoption={t('selectstaff')}
        />
      
      

        {loading ? (
          <CustomButton
            title={<ActivityIndicator color="white" size="small" />}
          />
        ) : (
          <CustomButton
            title={t('add')}
            onpress={() => handleAddProblem()}
          />
        )}
      </View>
    </ScrollView>
  );
}