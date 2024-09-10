import { StyleSheet } from "react-native";

export const PublicStyles = StyleSheet.create({
    // colors
    primaryColor:'#fb6107',
    secondayColor:'black',
    lightColor:'#e5e5e5',
    grayColor:'#e9ecef',
    whiteColor:'white',
    screen:{
        backgroundColor:'white',
        paddingTop:10,   
    },
    container:{
        width:'90%',
        alignSelf:'center',
    },
    screenTitle:{
        fontSize:14,
        fontWeight:"bold",
        alignSelf:'center',
        marginTop:5,
        marginBottom:10,
        borderWidth:1,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:10,
        borderColor:'#e9ecef',
       

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