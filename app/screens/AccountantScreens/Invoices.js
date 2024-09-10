import React, { useContext, useEffect, useState,useCallback } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DataContext } from "../../ContextData/DataProvider";
import { PublicStyles } from "../../styles/PublicStyles";
import { useNavigation } from "@react-navigation/native";
import InvoiceItem from "./InvoiceItem";
import CustomSpinner from "../../customComponents/CustomSpinner";
import { useTranslation } from "react-i18next";
import SearchBox from "../../components/SearchBox";
import { AuthContextData } from "../../ContextData/AuthContext";
import axios from "axios";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
    const result = invoices.filter((invoice) =>
      invoice.carNo.toLowerCase().includes(searchquery.toLowerCase())
    );
    setFilteredInvoices(result);
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
    <ScrollView style={PublicStyles.screen}>
      <View style={PublicStyles.container}>


        <View style={[PublicStyles.row,PublicStyles.justifyBetween,PublicStyles.itemcenter]}>
            <TouchableOpacity style={styles.arrangeBtn} onPress={sortInvoices}>
               <MaterialCommunityIcons name="compare-vertical" size={24} color="black" />
            </TouchableOpacity>
           <Text style={PublicStyles.screenTitle}>{t("invoices")}</Text>
           <View>
               {filteredInvoices && filteredInvoices.length > 0 ? (<Text style={styles.counter}>{filteredInvoices.length}</Text>):(<Text></Text>)}
           </View>
        </View>

        
        <SearchBox
          value={searchquery}
          onchangetext={(text) => {
            setSearchQuery(text);
            handleSearch();
          }}
        />
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
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                There is No Invoices Found
              </Text>
            )}
          </>
        ) : (
          <>
            <CustomSpinner />
          </>
        )}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  arrangeBtn:{
    borderWidth:2,
    borderColor:PublicStyles.lightColor,
    borderRadius:10,
    padding:5
  },
  counter:{
    fontWeight:'bold',
    fontSize:15,
  }
})
