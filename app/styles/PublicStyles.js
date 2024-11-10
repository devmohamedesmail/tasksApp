import { StyleSheet } from "react-native";

export const PublicStyles = StyleSheet.create({
    // colors
    primaryColor:'#4c0054',
    secondayColor:'black',
    lightColor:'#e5e5e5',
    grayColor:'#e9ecef',
    whiteColor:'white',
    primaryLightColor:'#ffffff',
    primaryDarkColor:'#14213d',



    screen:{
        backgroundColor:'#f8f9fa',
        paddingTop:10,  
    },
    container:{
        width:'96%',
        alignSelf:'center',
    },
    screenTitle:{
        fontSize:16,
        fontWeight:"bold",
        alignSelf:'center',
        marginTop:20,
        marginBottom:30,
        paddingLeft:20,
        paddingRight:20,
        letterSpacing:3,
    },
    wrap:{
        flexWrap:'wrap',
    },
    row:{
        display:'flex',
        flexDirection:"row",
    },
    col:{
        display:'flex',
        flexDirection:"column",
    },
    justifyBetween:{
        justifyContent:'space-between',
    },
    justifyCenter:{
        justifyContent:'center',
    },
    itemcenter:{
        alignItems:'center',
    },
    btn:{
        
    }
})