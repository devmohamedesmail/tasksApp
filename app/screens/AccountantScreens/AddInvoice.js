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
import { useNavigation } from "@react-navigation/native";
import { Div, ScrollDiv, Text, Button, Icon } from "react-native-magnus";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../config/Colors";
import ServicesContext, { ServicesContextData, } from "../../ContextData/ServicesContext";
import Modal from "react-native-modal";
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from "react-native-toast-message";

export default function AddInvoice() {
  const [branch, setBranch] = useState();
  const [branchError, setBranchError] = useState(false);
  const [branchItem, setBranchItem] = useState();
  const [invoiceType, setInvoiceType] = useState("");
  const [invoiceTypeError, setinvoiceTypeError] = useState(false);
  const [invoiceTypeItem, setInvoiceTypeItem] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [carNo, setCarno] = useState("");
  const [carNoError, setCarNoError] = useState(false);
  const [carType, setCartype] = useState("");
  const [carService, setService] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState(false);
  const [description, setCarDescription] = useState("");
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState(false);
  const [percent, setPercent] = useState("");
  const [Rdate, setRdate] = useState("");
  const [Ddate, setDdate] = useState("");
  const [sales, setSales] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContextData);
  const [isPickerRdateVisible, setPickerRdateVisible] = useState(false);
  const [isPickerDdateVisible, setPickerDdateVisible] = useState(false);
  const { t } = useTranslation();
  // const dropdownRef = React.createRef();
  const [newCarType, setNewCarType] = useState("");
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const { branches, fetchBranches, invoiceTypes, fetchInvoiceTypes, paidMethods, fetchPaidMethods, invoices, fetchInvoices } = useContext(DataContext);

  const { carstypesData, fetchCarsTypesData } = useContext(ServicesContextData);

  const handleAddInvoie = async () => {
    let isValid = true;

    // Validate required fields and set error messages
    if (!branch) {
      setBranchError(true);
      isValid = false;
    }

    if (!invoiceType) {
      setinvoiceTypeError(true);
      isValid = false;
    }

    if (!carNo) {
      setCarNoError(true);
      isValid = false;
    }
    if (!price) {
      setPriceError(true);
      isValid = false;
    }



    if (!isValid) {
      return;
    }


    try {
      
      setLoading(true);
      await axios.post(
        `${BackendData.url}add/new/invoice`,
        {branch,invoiceType,name,phone,
          description,note,address,carNo,carType,carService, price,sales,
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
      setBranchError(false);
      setinvoiceTypeError(false);
      setCarNoError(false);
      setPriceError(false);
      setNoteError(false);
      setModalVisible(true)
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: t("problemhappened"),
        visibilityTime: 4000,
        autoHide: true
      })
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

  const handleAddNewCarType = async () => {
    if (!newCarType || newCarType.trim() === "") {
      console.log("Car type cannot be empty or null.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${BackendData.url}add/car/type`, {
        type: newCarType,
      });
      fetchCarsTypesData();
      setLoading(false);
      console.log("Car type added successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };




  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Div flex={1}>
      <ScrollDiv bg={Colors.screen} px={10}>

        {sales ? (
          <Div>
            <Text fontWeight="bold" textAlign="center" my={23} fontSize={15}>
              {t("addinvoice")}
            </Text>





            <CustomPicker
              items={branches}
              selectedItem={branchItem}
              displayKey="name"
              selectoption={t("selectbranch")}
              onPress={handleSelectbranch}
            />
            {branchError && <Text color="red500">{t("fieldrequired")}</Text>}

            <CustomPicker
              items={invoiceTypes}
              selectedItem={invoiceTypeItem}
              displayKey="type"
              selectoption={t("selectinvoicetype")}
              onPress={handleSelectInvoiceType}
            />
            {invoiceTypeError && <Text color="red500">{t("fieldrequired")}</Text>}

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

            {carNoError && <Text color="red500">{t("fieldrequired")}</Text>}


            <Div
              bg="white"
              rounded="md"
              borderWidth={2}
              borderColor="gray300"
              p="s"
              mt={20}
            >
              <Picker
                selectedValue={carType}
                onValueChange={(itemValue, itemIndex) => {
                  setCartype(itemValue);

                }}
                mode="dropdown"
              >
                {carstypesData.map((item) => (
                  <Picker.Item label={item.type} value={item.type} />
                ))}
              </Picker>
            </Div>




            <Div
              flexDir="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Div flex={1}>
                <CustomInput
                  placeholder={t("new-car-type")}
                  value={newCarType}
                  onchangetext={(text) => setNewCarType(text)}
                />
              </Div>

              {loading ? (
                <Button
                  bg={Colors.primary}
                  mt={50}
                  mx={10}
                  h={40}
                  w={40}
                  rounded="circle"
                >
                  <ActivityIndicator color={Colors.secondary} />
                </Button>
              ) : (
                <Button
                  bg={Colors.primary}
                  mt={50}
                  mx={10}
                  h={40}
                  w={40}
                  rounded="circle"
                  onPress={() => handleAddNewCarType()}
                >
                  <Icon name="plus" color="white" fontWeight="bold" />
                </Button>
              )}
            </Div>

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

            {priceError && <Text color="red500">{t("fieldrequired")}</Text>}

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

            <Div flexDir="row" justifyContent="space-between" mt={30}>
              <CustomDateButton
                title={t("rdate")}
                onpress={() => setPickerRdateVisible(true)}
                bg="green800"
              />

              <CustomDateTimePicker
                isVisible={isPickerRdateVisible}
                onClose={() => setPickerRdateVisible(false)}
                onConfirm={handleConfirmRdate}
              />

              <CustomDateButton
                title={t("ddate")}
                onpress={() => setPickerDdateVisible(true)}
                bg="red700"
              />

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
              <CustomButton title={t("add")} onpress={handleAddInvoie} />
            )}
          </Div>
        ) : (
          <Div px={10}>
            <CustomAlert alert={t("alert-connection")} />
            <CustomButton title={t('login')} onpress={() => navigation.navigate('Login')} />
          </Div>

        )}


   




        <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown" >
          <Div  bg="white" h={200} rounded="lg" px={20} py={20}>

            <Div flexDir="row" justifyContent="flex-end">
              <Button onPress={toggleModal} bg="red700" p={3}>
                <AntDesign name="close" size={24} color="white" />

              </Button>
            </Div>



            <Text textAlign="center" mt={20} fontSize={20} fontWeight="bold">{t('added')}  👍</Text>
            <Text textAlign="center" fontSize={15}>{t('thankyou')} {sales}</Text>
          </Div>
        </Modal>
      </ScrollDiv>
      <BottomNav />
    </Div>
  );
}
