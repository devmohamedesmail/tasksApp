import React,{useRef} from "react";
import Entypo from "@expo/vector-icons/Entypo";
import CustomActionButton from "../CustomActionButton";
import { useTranslation } from "react-i18next";
import { Div, Dropdown, Button, Image, Text } from "react-native-magnus";
import Colors from "../../config/Colors";



export default function InvoiceItem({
  id,
  name,
  carNo,
  carType,
  carService,
  price,
  onpressEdit,
  addStage,
  addProblem,
  onpressShowInvoice,
  onpressDeleteInvoice,
  sales
}) {
  // Get the translation function
  const { t } = useTranslation();

  // Create a ref for the dropdown
  const dropdownRef = useRef();

  return (
    <Div row justifyContent="space-between" key={id} bg="white" my={8} borderBottomWidth={1} p={10} borderBottomColor="gray400" rounded="md" >
      {/* The customer name and car number */}
      <Div flex={1} mx={20}>
        <Div row justifyContent="space-between" alignItems="center" py={5}>
          <Text fontWeight="bold">{t('name')}</Text>
          <Text fontWeight="bold"> {name}</Text>
        </Div>

        <Div row justifyContent="space-between" alignItems="center" py={5}>
          <Text fontWeight="bold">{t('carno')}</Text>
          <Text fontWeight="bold"> {carNo}</Text>
        </Div>

        {/* The car details */}
        <Div row justifyContent="space-between" alignItems="center" py={5}>
          <Text fontWeight="bold">{t('cartype')}</Text>
          <Text fontWeight="bold"> {carType}</Text>
        </Div>

        <Div row justifyContent="space-between" alignItems="center" py={5}>
          <Text fontWeight="bold">{t('carservice')}</Text>
          <Text fontWeight="bold"> {carService}</Text>
        </Div>

        {/* The price and sales */}
        <Div row justifyContent="space-between" alignItems="center" py={5}>
          <Text fontWeight="bold">{t('price')}</Text>
          <Text fontWeight="bold"> {price}</Text>
        </Div>

        <Div row justifyContent="space-between" alignItems="center" py={5} >
          <Text fontWeight="bold">{t('sales')}</Text>
          <Text fontWeight="bold"> {sales}</Text>
        </Div>

      </Div>

      {/* The buttons */}
      <Button
        block
        bg={Colors.primary}
        mt="sm"
        p="md"
        color="white"
        borderWidth={2}
        borderColor="black"
        rounded='lg'
        w={45}
        h={45}
        onPress={() => dropdownRef.current.open()}>
        <Entypo name="dots-three-vertical" size={24} color={Colors.titary} />
      </Button>

      <Dropdown
        ref={dropdownRef}

        mt="md"
        m='auto'
        pb="2xl"
        showSwipeIndicator={true}
        roundedTop="xl">

        <Dropdown.Option py="md" px="xl" block>
          <CustomActionButton title={t('editinvoice')} icon='edit' backgroundColor={Colors.titary} onpress={() => onpressEdit(id)} />
        </Dropdown.Option>

        <Dropdown.Option py="md" px="xl" block>
          <CustomActionButton title={t('show')} icon='eye' backgroundColor={Colors.titary} onpress={() => onpressShowInvoice(id)} />
        </Dropdown.Option>

        <Dropdown.Option py="md" px="xl" block>
          <CustomActionButton title={t('addstage')} icon='plus' backgroundColor={Colors.titary} onpress={() => addStage(id)} />
        </Dropdown.Option>

        <Dropdown.Option py="md" px="xl" block>
          <CustomActionButton title={t('addproblem')} icon='plus' backgroundColor={Colors.titary} onpress={() => addProblem(id)} />
        </Dropdown.Option>



        <Dropdown.Option py="md" px="xl" block>
          <CustomActionButton title={t('delete')} icon='delete' backgroundColor="red" onpress={() => onpressDeleteInvoice(id)} />
        </Dropdown.Option>


      </Dropdown>
    </Div>
  );
}
