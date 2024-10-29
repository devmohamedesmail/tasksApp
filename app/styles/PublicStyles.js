import { StyleSheet } from "react-native";

export const PublicStyles = StyleSheet.create({
    // colors
    primaryColor:'#CCFF00',
    secondayColor:'black',
    lightColor:'#e5e5e5',
    grayColor:'#e9ecef',
    whiteColor:'white',
    primaryLightColor:'#ffffff',
    primaryDarkColor:'#14213d',


    backgroundlightColor:{
        backgroundColor:'#14213d'
    },
    backgroundwhiteColor:{
        backgroundColor:'#fff'
    },
    backgroundDarkColor:{
        backgroundColor:'#CCFF00'
    },
    textLightMode:{
        color:'#ffffff'
    },
    textDarkMode:{
        color:'#000000'  
    },


    screenLight:{
        backgroundColor:'#ffffff',
        paddingTop:20,
    },
    screenDark:{
         backgroundColor:'#000000',
         paddingTop:20,
         opacity:0.9,
    },
    screen:{
        backgroundColor:'#f8f9fa',
        
        paddingTop:10,  
    },
    container:{
        width:'90%',
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