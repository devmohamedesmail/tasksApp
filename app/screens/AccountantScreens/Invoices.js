import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Alert, FlatList } from "react-native";
import { DataContext } from "../../ContextData/DataProvider";
import { useNavigation } from "@react-navigation/native";

import { useTranslation } from "react-i18next";
import { AuthContextData } from "../../ContextData/AuthContext";
import axios from "axios";
import BottomNav from "../../components/BottomNav";
import { Div, ScrollDiv, Text, Input, Icon } from 'react-native-magnus'
import InvoiceSkeleton from "../Skeletons/InvoiceSkeleton";

import Colors from "../../config/Colors";
import InvoiceItem from "../../customComponents/CustomItems/InvoiceItem";

import { debounce } from "lodash";

export default function Invoices() {
  const navigation = useNavigation();
  const [searchquery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const [auth, setauth] = useContext(AuthContextData);
  const { invoices } = useContext(DataContext);





  // Memoize the filtered invoices to optimize re-renders
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => invoice.carNo.includes(searchquery));
  }, [invoices, searchquery]);

  // Memoized search handler with debouncing
  const handleSearchInvoice = useCallback(
    debounce((text) => setSearchQuery(text), 500),
    []
  );






 // Optimized delete invoice function
 const handleDeleteInvoice = async (InvoiceID) => {
  if (auth.user.role === "admin") {
    try {
      Alert.alert(
        t("confirm"),
        t("alertdelete"),
        [
          {
            text: t("cancel"),
            style: "cancel",
          },
          {
            text: t("ok"),
            onPress: async () => {
              await deleteInvoice(InvoiceID);
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert(t('problemhappened'));
    }
  } else {
    Alert.alert(t('wrongpermission'));
  }
};

// API call for deleting invoice
const deleteInvoice = async (InvoiceID) => {
  try {
    await axios.delete(`${BackendData.url}delete/invoice/${InvoiceID}`);
    fetchInvoices();
  } catch (error) {
    console.log(error);
    Alert.alert(t('problemhappened'));
  }
};


  return (
    <Div flex={1}>
      <ScrollDiv bg={Colors.light}>
        <Div p={10}>


          <Input
            placeholder={t('search')}
            p={10}
            h={60}
            focusBorderColor={Colors.primary}
            onChangeText={(text) => handleSearchInvoice(text)}
            suffix={<Icon name="search" color="gray900" fontFamily="Feather" />}
          />







          <FlatList
            data={filteredInvoices}
            renderItem={({ item }) => (
              <InvoiceItem
                key={item.id}
                name={item.name}
                carNo={item.carNo}
                carType={item.carType}
                carService={item.carService}
                price={item.price}
                sales={item.sales}
                onpressEdit={() => navigation.navigate("Edit Invoice", { invoice: item })}
                addStage={() => navigation.navigate("Add Stage", { invoice: item })}
                addProblem={() => navigation.navigate("Add Problem", { invoice: item })}
                onpressShowInvoice={() => navigation.navigate("Invoice Details", { invoice: item })}
                onpressDeleteInvoice={() => handleDeleteInvoice(item.id)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text fontWeight="bold" textAlign="center">{t('no-data')}</Text>}
          />
        </Div>
      </ScrollDiv>
      <BottomNav />
    </Div>
  );
}

