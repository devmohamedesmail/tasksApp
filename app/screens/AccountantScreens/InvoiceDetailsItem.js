import React from "react";
import { Div,Text } from "react-native-magnus";

export default function InvoiceDetailsItem({ title, value }) {

  return (
    <Div bg="white" my={5} h={60} px={15} row justifyContent="space-between" alignItems="center">
      <Text fontWeight="bold" fontSize={15}>{title}</Text>
      <Text fontWeight="bold" fontSize={15}>{value}</Text>
      
    </Div>
  );
}


