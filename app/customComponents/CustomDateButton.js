import React from "react";
import { TouchableOpacity,StyleSheet ,Text} from "react-native";
import { PublicStyles } from "../styles/PublicStyles";
import Fontisto from '@expo/vector-icons/Fontisto';
import { useTheme } from "../ContextData/ThemeContext";

export default function CustomDateButton({ onpress ,title }) {
  const {theme}=useTheme();
  return (
    <TouchableOpacity
      style={[styles.dateBtn,theme==='light'? PublicStyles.backgroundlightColor : PublicStyles.backgroundDarkColor]}
      onPress={onpress}
    >   
      <Text style={[styles.dateBtnText,theme==='light'? PublicStyles.textLightMode : PublicStyles.textDarkMode]}>{title} </Text>
      
      {theme === 'light' ? <Fontisto name="date" size={20} color={'#fff'} /> : <Fontisto name="date" size={20} color={'black'} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    dateBtn: {
      padding: 10,
      marginBottom: 10,
      width: "48%",
      textAlign: "center",
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center'
    },
    dateBtnText: {
      textAlign: "center",
      fontWeight:'normal'
    },
  });
