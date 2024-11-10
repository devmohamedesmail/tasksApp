import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import BackendData from "../../utilities/BackendData";
import InvoiceDetailsItem from "./InvoiceDetailsItem";
import { useTranslation } from "react-i18next";
import BottomNav from "../../components/BottomNav";
import InvoiceSkeleton from "../Skeletons/InvoiceSkeleton";
import { Div, ScrollDiv,Text } from "react-native-magnus";
import Colors from "../../config/Colors";

export default function InvoiceDetails() {
  const route = useRoute();
  const { invoice } = route.params;
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const { t } = useTranslation();


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
    <Div flex={1}>
      <ScrollDiv bg={Colors.light}>
        <Div>
        
          {invoiceDetails ? (
            <>
              <Text fontWeight="bold" textAlign="center" my={20}>{t('details')}</Text>

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

              <Div>
                <Text fontWeight="bold" my={30} textAlign="center" fontSize={15} color={Colors.primary}>{t('stages')}</Text>
                {invoiceDetails && invoiceDetails.stages.length > 0 ? (
                  <>
                    {invoiceDetails.stages.map((stage) => (
                      <Div key={stage.id} borderColor="gray400" borderWidth={1} py={20}>
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


                      </Div>
                    ))}
                  </>
                ) : (
                  <Text fontWeight="bold" my={30} textAlign="center" fontSize={13} color={Colors.primary}>{t('nostage')}</Text>
                )}
              </Div>

              <Div>
                <Text fontWeight="bold" my={30} textAlign="center" fontSize={15} color={Colors.primary}>{t('problems')} </Text>
                {invoiceDetails && invoiceDetails.problems.length > 0 ? (
                  <>
                    {invoiceDetails.problems.map((problem) => (
                      <Div key={problem.id}  borderColor="gray400" borderWidth={1} py={20}>
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
                      </Div>
                    ))}
                  </>
                ) : (
                  <Text fontWeight="bold" my={30} textAlign="center" fontSize={13} color={Colors.primary}>{t('noproblem')}</Text>
                )}
              </Div>
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


