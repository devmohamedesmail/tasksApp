import React,{useState} from "react";
import { Input, Icon, Div, Text, Button } from "react-native-magnus";


import Colors from "../config/Colors";
import { Alert } from "react-native";

export default function CustomInput({
  value,
  placeholder,
  onchangetext,
  secureTextEntry = false,
  icon
}) {



  const [isSecure, setIsSecure] = useState(secureTextEntry);

  // Toggle the secure text visibility
  const toggleSecureTextEntry = () => {
    setIsSecure(!isSecure);
    console.log(isSecure)
    secureTextEntry = !isSecure
  };


  return (

    <Div my={10}>
      <Text mx={5} mb={4}>{placeholder}</Text>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onchangetext}
        p={10}
        h={60}
        borderBottomWidth={2}
        focusBorderColor={Colors.secondary}
        secureTextEntry={isSecure}
        suffix={
          <>
          {secureTextEntry ? 
           <Button
            onPress={toggleSecureTextEntry}
            style={{ marginLeft: 10 }}
            bg="transparent"
            p={0}
          >
            <Icon
              name={isSecure ? "eye" : "eye-off"}
              color="black"
              fontSize={18}
              fontFamily="Feather"
            />
          
          </Button> :  <Icon name={icon} color="black" fontSize={18} fontFamily="Feather" />}
         
         
          
        </>
        }
      />
      
    </Div>

  );
}
