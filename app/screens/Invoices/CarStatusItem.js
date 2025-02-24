import React from "react";
import { useTranslation } from "react-i18next";
import StageProgressBar from "../../components/StageProgressBar";
import { Div, Image, Icon, Button ,Text} from "react-native-magnus";
import Colors from "../../config/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function CarStatusItem({name,worker,status,start,end,changeStatus,carNo}) {
  const { t } = useTranslation();

  return (
    <Div flexDir="column" justifyContent="center" alignItems="center"  mx={5} mt={30}>
      {/* <Image h={60} w={60} m={4} mt={10} rounded="circle" source={require("../../images/icons/truck.png")} /> */}
      
      <Text fontSize={13}>{name}</Text>

      <Div h={90}>
        {worker.map((i, w) => (<Text bg={Colors.primary} fontSize={10} color="white" my={5} w='100%' px={15} py={5} rounded='lg' key={i} >{i}</Text>))}
      </Div>
      {status === "0" ? (
        <Button bg="red700" h={40} w={40} alignSelf="center"  rounded="circle" onPress={changeStatus}>
          <FontAwesome name="times" size={16} color="white" />
        </Button>

      ) : (
        <Button bg="green500" h={40} w={40} alignSelf="center" rounded="circle" onPress={changeStatus}>
          <Icon name="check" color="white" />
        </Button>
      )}
      <StageProgressBar start={start} end={end} carNo={carNo} />
    </Div>
  );
}


