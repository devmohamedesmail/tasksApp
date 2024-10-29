import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { PublicStyles } from "../../styles/PublicStyles";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import BackendData from "../../utilities/BackendData";
import CustomSpinner from "../../customComponents/CustomSpinner";
import InvoiceDetailsItem from "./InvoiceDetailsItem";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../ContextData/ThemeContext";
import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";

export default function InvoiceDetails() {
  const route = useRoute();
  const { invoice } = route.params;
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const { t } = useTranslation();
  const { theme } = useTheme();

  const fetchInvoiceDetails = async () => {
    try {
      const response = await axios.get(
        `${BackendData.url}show/invoice/${invoice.id}`
      );
      setInvoiceDetails(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvoiceDetails();
  }, [invoiceDetails]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[theme === 'light' ? PublicStyles.screenLight : PublicStyles.screenDark]}>
        <View style={[PublicStyles.container, styles.detailsContainer]}>
          <Header />
          {invoiceDetails ? (
            <>
              <Text style={PublicStyles.screenTitle}>{t('details')}</Text>

              <InvoiceDetailsItem
                title={t('invoicenumber')}
                value={invoiceDetails.invoiceNumber}
              />
              <InvoiceDetailsItem title={t('name')} value={invoiceDetails.name} />
              <InvoiceDetailsItem title={t('phone')} value={invoiceDetails.phone} />
              <InvoiceDetailsItem
                title={t('address')}
                value={invoiceDetails.address}
              />
              <InvoiceDetailsItem title={t('carno')} value={invoiceDetails.carNo} />
              <InvoiceDetailsItem
                title={t('cartype')}
                value={invoiceDetails.carType}
              />
              <InvoiceDetailsItem
                title={t('carservice')}
                value={invoiceDetails.carService}
              />
              <InvoiceDetailsItem title={t('price')} value={invoiceDetails.price} />
              <InvoiceDetailsItem title={t('note')} value={invoiceDetails.note} />
              <InvoiceDetailsItem
                title={t('description')}
                value={invoiceDetails.description}
              />
              <InvoiceDetailsItem
                title={t('percent')}
                value={invoiceDetails.percent}
              />
              <InvoiceDetailsItem
                title={t('rdate')}
                value={invoiceDetails.Rdate}
              />
              <InvoiceDetailsItem
                title={t('ddate')}
                value={invoiceDetails.Ddate}
              />
              <InvoiceDetailsItem
                title={t('sales')}
                value={invoiceDetails.sales}
              />

              <View style={styles.section}>
                <Text style={[PublicStyles.screenTitle]}>{t('stages')}</Text>
                {invoiceDetails && invoiceDetails.stages.length > 0 ? (
                  <>
                    {invoiceDetails.stages.map((stage) => (
                      <View key={stage.id} style={styles.stageItem}>
                        <InvoiceDetailsItem title={t('stagename')} value={stage.name} />
                        <InvoiceDetailsItem
                          title={t('worker')}
                          value={stage.worker}
                        />

                        <InvoiceDetailsItem
                          title={t('startdate')}
                          value={stage.start}
                        />
                        <InvoiceDetailsItem
                          title={t('enddate')}
                          value={stage.end}
                        />


                      </View>
                    ))}
                  </>
                ) : (
                  <Text style={{ alignSelf: "center" }}>{t('nostage')}</Text>
                )}
              </View>

              <View style={styles.section}>
                <Text style={[PublicStyles.screenTitle]}>{t('problems')} </Text>
                {invoiceDetails && invoiceDetails.problems.length > 0 ? (
                  <>
                    {invoiceDetails.problems.map((problem) => (
                      <View key={problem.id} style={styles.stageItem}>
                        <InvoiceDetailsItem title={t('stagename')} value={problem.step} />
                        <InvoiceDetailsItem
                          title={t('problem')}
                          value={problem.problem}
                        />
                        <InvoiceDetailsItem
                          title={t('reason')}
                          value={problem.reason}
                        />
                        <InvoiceDetailsItem
                          title={t('solution')}
                          value={problem.solution}
                        />
                        <InvoiceDetailsItem
                          title={t('worker')}
                          value={problem.worker}
                        />
                        <InvoiceDetailsItem title={t('sales')} value={problem.sales} />
                      </View>
                    ))}
                  </>
                ) : (
                  <Text style={{ alignSelf: "center" }}>{t('noproblem')}</Text>
                )}
              </View>
            </>
          ) : (
            <CustomSpinner />
          )}
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    paddingBottom: 200,
  },
  stageItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: PublicStyles.lightColor,
    borderRadius: 10,
  }
});
