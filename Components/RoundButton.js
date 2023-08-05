import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from "react";

function RoundButton(props){
    return(
        <View>
            <TouchableOpacity style={{...styles.btn,backgroundColor:props.color}}>
                <Text style={styles.txt}>{props.name}</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const styles=StyleSheet.create({
    btn:{
        
        borderRadius:100,
        padding:20,
        width:'50%',
        justifyContent:'center',
        alignItems:'center'
    },
    txt:{
        fontSize:20,
        color:'white'
    }
})

export default RoundButton;