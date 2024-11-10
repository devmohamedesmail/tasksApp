import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, Alert, ScrollView, View, StyleSheet } from "react-native";
import { PublicStyles } from "../../styles/PublicStyles";
import CustomInput from "../../customComponents/CustomInput";
import CustomButton from "../../customComponents/CustomButton";
import axios from "axios";
import { AuthContextData } from "../../ContextData/AuthContext";
import { DataContext } from "../../ContextData/DataProvider";
import CustomPicker from "../../customComponents/CustomPicker";
import BackendData from "../../utilities/BackendData";
import CustomDateTimePicker from "../../customComponents/CustomDateTimePicker";
import { useTranslation } from "react-i18next";
import CustomDateButton from "../../customComponents/CustomDateButton";
import CustomAlert from "../../customComponents/CustomAlert";
import BottomNav from "../../components/BottomNav";
import { Div, ScrollDiv, Text } from "react-native-magnus";
import BackButton from "../../components/BackButton";
import DrawerComponent from "../../components/DrawerComponent";
import Colors from "../../config/Colors";


export default function AddInvoice() {
  const [branch, setBranch] = useState();
  const [branchItem, setBranchItem] = useState();
  const [invoiceType, setInvoiceType] = useState("");
  const [invoiceTypeItem, setInvoiceTypeItem] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [carNo, setCarno] = useState("");
  const [carType, setCartype] = useState("");
  const [carService, setService] = useState("");
  const [price, setPrice] = useState("");
  const [description, setCarDescription] = useState("");
  const [note, setNote] = useState("");
  const [percent, setPercent] = useState("");
  const [Rdate, setRdate] = useState("");
  const [Ddate, setDdate] = useState("");
  const [sales, setSales] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContextData);
  const [isPickerRdateVisible, setPickerRdateVisible] = useState(false);
  const [isPickerDdateVisible, setPickerDdateVisible] = useState(false);
  const { t } = useTranslation()
 



  const {
    branches,
    fetchBranches,
    invoiceTypes,
    fetchInvoiceTypes,
    paidMethods,
    fetchPaidMethods,
    invoices, fetchInvoices, staff, fetchStaff
  } = useContext(DataContext);

  const handleAddInvoie = async () => {
    if (!branch || !invoiceType || !note || !carNo || !carType || !carService || !price) {
      Alert.alert(t('validationError'), t('requiredFieldsMissing'));
      return;
    }
    try {
      setSales(auth.name);
      setLoading(true);
      const response = await axios.post(
        `${BackendData.url}add/new/invoice`,
        {
          branch,
          invoiceType,
          name,
          phone,
          description,
          note,
          address,
          carNo,
          carType,
          carService,
          price,
          sales,
          percent,
          Rdate,
          Ddate,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      fetchInvoices();
      setName("");
      setPhone("");
      setAddress("");
      setCarno("");
      setCartype("");
      setService("");
      setPrice("");
      setCarDescription("");
      setPercent("");
      setRdate("");
      setDdate("");
      setNote("");
      Alert.alert(t('added'));
    } catch (error) {
      setLoading(false);
      Alert.alert(
        t('problemhappened')
      );
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.user) {
      setSales(auth.user.name);
    }
  }, [auth]);



  const handleSelectInvoiceType = (item) => {
    setInvoiceType(item.type);
    setInvoiceTypeItem(item);
  };
  const handleSelectbranch = (item) => {
    setBranch(item.id);
    setBranchItem(item);
  };

  const handleConfirmRdate = (date) => {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    setRdate(`${formattedDate} ${formattedTime}`);
  };
  const handleConfirmDdate = (date) => {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    setDdate(`${formattedDate} ${formattedTime}`);
  };


  
 

  return (
    <Div flex={1}>
      <ScrollDiv bg={Colors.light}>
        {auth ? (
          <View style={[PublicStyles.container, { paddingBottom: 100 }]}>

            <Text fontWeight="bold" textAlign="center" my={20} fontSize={15}>{t('addinvoice')}</Text>


            <CustomPicker
              items={branches}
              selectedItem={branchItem}
              onSelect={handleSelectbranch}
              displayKey="name"
              selectoption={t("selectbranch")}
            />

            <CustomPicker
              items={invoiceTypes}
              selectedItem={invoiceTypeItem}
              onSelect={handleSelectInvoiceType}
              displayKey="type"
              selectoption={t("selectinvoicetype")}
            />



            <CustomInput
              placeholder={t("name")}
              value={name}
              onchangetext={(text) => setName(text)}
            />
            <CustomInput
              placeholder={t("phone")}
              value={phone}
              onchangetext={(text) => setPhone(text)}
            />

            <CustomInput
              placeholder={t("address")}
              value={address}
              onchangetext={(text) => setAddress(text)}
            />

            <CustomInput
              placeholder={t("carno")}
              value={carNo}
              onchangetext={(text) => setCarno(text)}
            />

            <CustomInput
              placeholder={t("cartype")}
              value={carType}
              onchangetext={(text) => setCartype(text)}
            />

            <CustomInput
              placeholder={t("carservice")}
              value={carService}
              onchangetext={(text) => setService(text)}
            />
            <CustomInput
              placeholder={t("price")}
              value={price}
              onchangetext={(text) => setPrice(text)}
            />

            <CustomInput
              placeholder={t("description")}
              value={description}
              onchangetext={(text) => setCarDescription(text)}
            />
            <CustomInput
              placeholder={t("note")}
              value={note}
              onchangetext={(text) => setNote(text)}
            />
            <CustomInput
              placeholder={t("percent")}
              value={percent}
              onchangetext={(text) => setPercent(text)}
            />

            <View
              style={[
                PublicStyles.row,
                PublicStyles.justifyBetween,
                { marginTop: 20, marginBottom: 20 },
              ]}
            >

              <CustomDateButton title={t("rdate")} onpress={() => setPickerRdateVisible(true)} bg='blue600' />

              <CustomDateTimePicker
                isVisible={isPickerRdateVisible}
                onClose={() => setPickerRdateVisible(false)}
                onConfirm={handleConfirmRdate}
              />

              <CustomDateButton title={t("ddate")} onpress={() => setPickerDdateVisible(true)} bg='red400' />

              <CustomDateTimePicker
                isVisible={isPickerDdateVisible}
                onClose={() => setPickerDdateVisible(false)}
                onConfirm={handleConfirmDdate}
              />
            </View>



            {loading ? (
              <CustomButton
                title={<ActivityIndicator size="small" color="white" />}

              />
            ) : (
              <CustomButton title={t("add")} onpress={handleAddInvoie} />
            )}
          </View>
        ) : <CustomAlert alert={t('alert-connection')} />}

      </ScrollDiv>
      <BottomNav />
    </Div>
  );
}


const styles = StyleSheet.create({
  dateBtn: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '45%',
    textAlign: 'center'
  },
  dateBtnText: {
    textAlign: 'center'
  }

})
