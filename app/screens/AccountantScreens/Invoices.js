import React, { useContext, useEffect, useState, useCallback } from "react";
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
import { useTheme } from "../../ContextData/ThemeContext";
import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";

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
  const { theme } = useTheme();

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
    <View style={{ flex: 1 }}>
      <ScrollView style={[theme === 'light' ? PublicStyles.screenLight : PublicStyles.screenDark]}>
        <View style={PublicStyles.container}>
          <Header />


          <View style={styles.flex}>
             <TouchableOpacity style={[styles.arrangeBtn,theme==='light' ? PublicStyles.backgroundlightColor: PublicStyles.backgroundDarkColor]} onPress={sortInvoices}>
              <MaterialCommunityIcons name="compare-vertical" size={24} color={theme==='light' ? 'white': 'black'} />
             </TouchableOpacity>
             {filteredInvoices && filteredInvoices.length > 0 ? (
                <Text style={[styles.counter,theme==='light' ? PublicStyles.textDarkMode: PublicStyles.textLightMode]}>{filteredInvoices.length}</Text>

             ):(<></>)}
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
      <BottomNav />
    </View>
  );
}


const styles = StyleSheet.create({
 
  arrangeBtn: {
    width:35,
    height:35,
    borderRadius: 10,
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   
  },
  flex:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:10,
    marginBottom:10,
  },
  counter:{
    fontSize: 15,
    fontWeight: "bold",
    
  }
  
})
