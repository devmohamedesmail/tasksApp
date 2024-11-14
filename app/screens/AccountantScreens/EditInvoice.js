import { useRoute } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Alert, ActivityIndicator } from "react-native";
import CustomPicker from "../../customComponents/CustomPicker";
import { DataContext } from "../../ContextData/DataProvider";
import CustomButton from "../../customComponents/CustomButton";
import CustomInput from "../../customComponents/CustomInput";
import { AuthContextData } from "../../ContextData/AuthContext";
import CustomDateTimePicker from "../../customComponents/CustomDateTimePicker";
import axios from "axios";
import BackendData from "../../utilities/BackendData";
import { useTranslation } from "react-i18next";
import BottomNav from "../../components/BottomNav";
import CustomDateButton from "../../customComponents/CustomDateButton";
import { Div,ScrollDiv,Text } from "react-native-magnus";
import Colors from "../../config/Colors";
import { ServicesContextData } from "../../ContextData/ServicesContext";

export default function EditInvoice() {
  const route = useRoute();
  const { invoice } = route.params;
  const { branches, fetchBranches, invoiceTypes, fetchInvoiceTypes, paidMethods, fetchPaidMethods, invoices, fetchInvoices } = useContext(DataContext)
  const [branch, setBranch] = useState(invoice.branch_id);
  const [branchItem, setBranchItem] = useState();
  const [invoiceType, setInvoiceType] = useState(invoice.invoiceType);
  const [invoiceTypeItem, setInvoiceTypeItem] = useState("");
  const [name, setName] = useState(invoice.name);
  const [phone, setPhone] = useState(invoice.phone);
  const [address, setAddress] = useState(invoice.address);
  const [carNo, setCarno] = useState(invoice.carNo);
  const [carType, setCartype] = useState(invoice.carType);
  const [carService, setService] = useState(invoice.carService);
  const [price, setPrice] = useState(invoice.price);
  const [percent, setPercent] = useState(invoice.percent);
  const [description, setCarDescription] = useState(invoice.description);
  const [carTypeItem, setCarTypeItem] = useState("");
  const [note, setNote] = useState(invoice.note);
  const [Rdate, setRdate] = useState("");
  const [Ddate, setDdate] = useState("");
  const [sales, setSales] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContextData);
  const [isPickerRdateVisible, setPickerRdateVisible] = useState(false);
  const [isPickerDdateVisible, setPickerDdateVisible] = useState(false);
  const { t } = useTranslation();
  const { carstypesData, fetchCarsTypesData } = useContext(ServicesContextData);



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

  const handleSelectCarType = (item) => {
    setCartype(item.type);
    setCarTypeItem(item);
  };



  const handleEditInvoice = async () => {
    setLoading(true);
    try {
      await axios.post(`${BackendData.url}update/invoice/${invoice.id}`, {
        branch: branch,
        invoiceType: invoiceType,
        name: name,
        phone: phone,
        address: address,
        carNo: carNo,
        carType: carType,
        carService: carService,
        price: price,
        percent: percent,
        description: description,
        note: note,
        Rdate: Rdate,
        Ddate: Ddate,
        sales: sales,
      })
      setLoading(false);
      fetchInvoices()
      Alert.alert(t('updated'));
    } catch (error) {
      Alert.alert(t('problemhappend'));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Div flex={1}>
      <ScrollDiv bg={Colors.light}>
        <Div p={10}>
        
          <Text fontWeight="bold" textAlign="center" mb={30} mt={10} fontSize={15}>{t('update')}</Text>
          

          <CustomPicker
            items={branches}
            selectedItem={branchItem}
          
            displayKey="name"
            selectoption={t('selectbranch')}
            onPress={handleSelectbranch}
          />

          <CustomPicker
            items={invoiceTypes}
            selectedItem={invoiceTypeItem}
            
            displayKey="type"
            selectoption={t('selectinvoicetype')}
          />


          <CustomInput
            placeholder="Client Name"
            value={name}
            onchangetext={(text) => setName(text)}
          />
          <CustomInput
            placeholder="Client Phone"
            value={phone}
            onchangetext={(text) => setPhone(text)}
          />

          <CustomInput
            placeholder="Client Phone"
            value={address}
            onchangetext={(text) => setAddress(text)}
          />

          <CustomInput
            placeholder={t("address")}
            value={address}
            onchangetext={(text) => setAddress(text)}
          />

          <CustomInput
            placeholder="Car No"
            value={carNo}
            onchangetext={(text) => setCarno(text)}
          />

             <CustomPicker
              items={carstypesData}
              selectedItem={carTypeItem}
              displayKey="type"
              selectoption={t("selectcartype")}
              onPress={handleSelectCarType}
            />

          <CustomInput
            placeholder="Service"
            value={carService}
            onchangetext={(text) => setService(text)}
          />
          <CustomInput
            placeholder="Price"
            value={price}
            onchangetext={(text) => setPrice(text)}
          />

          <CustomInput
            placeholder={t("percent")}
            value={percent}
            onchangetext={(text) => setPercent(text)}
          />

          <CustomInput
            placeholder="Car Description"
            value={description}
            onchangetext={(text) => setCarDescription(text)}
          />
          <CustomInput
            placeholder="Note"
            value={note}
            onchangetext={(text) => setNote(text)}
          />


          <Div row justifyContent="space-between" alignItems="center" my={20}>
            
            <CustomDateButton onpress={() => setPickerRdateVisible(true)} title={t('rdate')} />

            <CustomDateTimePicker
              isVisible={isPickerRdateVisible}
              onClose={() => setPickerRdateVisible(false)}
              onConfirm={handleConfirmRdate}
            />

         

            <CustomDateButton onpress={() => setPickerDdateVisible(true)} title={t('ddate')} />

            <CustomDateTimePicker
              isVisible={isPickerDdateVisible}
              onClose={() => setPickerDdateVisible(false)}
              onConfirm={handleConfirmDdate}
            />
          </Div>

          {loading ? (
            <CustomButton
              title={<ActivityIndicator size="small" color="white" />}

            />
          ) : (
            <CustomButton title={t('update')} onpress={handleEditInvoice} />
          )}

        </Div>
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
