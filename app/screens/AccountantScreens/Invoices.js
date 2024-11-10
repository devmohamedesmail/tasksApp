import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Alert,
  StyleSheet,

} from "react-native";
import { DataContext } from "../../ContextData/DataProvider";
import { useNavigation } from "@react-navigation/native";

import { useTranslation } from "react-i18next";
import { AuthContextData } from "../../ContextData/AuthContext";
import axios from "axios";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomNav from "../../components/BottomNav";
import { Div, Button, ScrollDiv, Text } from 'react-native-magnus'
import InvoiceSkeleton from "../Skeletons/InvoiceSkeleton";
import CustomInput from "../../customComponents/CustomInput";
import Colors from "../../config/Colors";
import InvoiceItem from "../../customComponents/CustomItems/InvoiceItem";


export default function Invoices() {
  const {
    branches,
    fetchBranches,
    invoiceTypes,
    fetchInvoiceTypes,
    paidMethods,
    fetchPaidMethods,
    invoices,
    fetchInvoices,
  } = useContext(DataContext);
  const navigation = useNavigation();
  const [searchquery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const [filteredInvoices, setFilteredInvoices] = useState();
  const [auth, setauth] = useContext(AuthContextData);
  const [isAscending, setIsAscending] = useState(true);


  useEffect(() => {
    setFilteredInvoices(invoices);
  }, [invoices]);



  const handleSearch = () => {
    if (!searchquery) {
      setFilteredInvoices(invoices);
    } else {
      const result = invoices.filter((invoice) => {
        const carNo = invoice.carNo;
        return carNo && carNo.toLowerCase().includes(searchquery.toLowerCase());
      });
      setFilteredInvoices(result);
    }
  };

  const handleDeleteInvoice = async (InvoiceID) => {
    if (auth.user.role === "admin") {
      try {
        Alert.alert(
          t("confirm"), // Translated title
          t("alertdelete"),
          [
            {
              text: t("cancel"),
              style: "cancel",
            },
            {
              text: t("ok"),
              onPress: async () => {
                try {

                  const response = await axios.delete(
                    `${BackendData.url}delete/invoice/${InvoiceID}`
                  );
                  fetchInvoices();

                } catch (error) {
                  console.log(error)
                  Alert.alert(
                    t('problemhappened'),

                  );

                }
              },
            },
          ]
        );
      } catch (error) {
        console.log(error)
      }
    } else {
      Alert.alert(t('wrongpermission'))
    }
  };


  const sortInvoices = useCallback(() => {
    const sortedInvoices = [...filteredInvoices].sort((a, b) => {
      return isAscending ? a.id - b.id : b.id - a.id;
    });
    setFilteredInvoices(sortedInvoices);
    setIsAscending(!isAscending);
  }, [filteredInvoices, isAscending]);

  return (
    <Div flex={1}>
      <ScrollDiv bg={Colors.light}>
        <Div p={10}>


          {filteredInvoices && filteredInvoices.length > 0 ? (
            <>
              <Div row justifyContent="space-between" alignItems="center">

                <Button onPress={sortInvoices} bg={Colors.primary} h={40} w={40} rounded="lg">
                  <MaterialCommunityIcons name="compare-vertical" size={17} color={Colors.titary} />
                </Button>

                <Text fontWeight="bold" fontSize={15} >{filteredInvoices.length}</Text>

              </Div>

              <CustomInput icon='search' placeholder={'Enter-Invoice-Number'}
                value={searchquery}
                onchangetext={(text) => {
                  setSearchQuery(text);
                  handleSearch();
                }} />
            </>
          ) : (<></>)}



          {filteredInvoices && filteredInvoices.length > 0 ? (
            <>
              {filteredInvoices.length > 0 ? (
                <>
                  {filteredInvoices.map((invoice) => (
                    <InvoiceItem
                      key={invoice.id}
                      name={invoice.name}
                      carNo={invoice.carNo}
                      carType={invoice.carType}
                      carService={invoice.carService}
                      price={invoice.price}
                      sales={invoice.sales}
                      onpressEdit={() =>
                        navigation.navigate("Edit Invoice", { invoice: invoice })
                      }
                      addStage={() =>
                        navigation.navigate("Add Stage", { invoice: invoice })
                      }
                      addProblem={() =>
                        navigation.navigate("Add Problem", { invoice: invoice })
                      }
                      onpressShowInvoice={() =>
                        navigation.navigate("Invoice Details", {
                          invoice: invoice,
                        })
                      }
                      onpressDeleteInvoice={() => handleDeleteInvoice(invoice.id)}
                    />
                  ))}
                </>
              ) : (
                <Text fontWeight="bold" textAlign="center">
                 {t('no-data')}
                </Text>
              )}
            </>
          ) : (
            <>
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
            </>
          )}
        </Div>
      </ScrollDiv>
      <BottomNav />
    </Div>
  );
}

