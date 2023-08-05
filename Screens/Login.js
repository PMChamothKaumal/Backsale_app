import {Text, View, StyleSheet,ImageBackground,} from 'react-native'
import React from 'react';
import { TextInput, Button } from 'react-native-paper';


function Login({ navigation }){
    return(
        <ImageBackground source={require('../asessts/26-266973_image-page-transparent-background-oasis-skin-1-png.png')} resizeMode="cover" style={styles.image}>
    
        <View style={styles.container}>
            <View style={{flex: 3}}>
                <Text style={styles.txt}>Login.</Text>
            </View> 

            <View style={{flex: 3, marginTop:60}}>
            <TextInput label="Username"mode="outlined" style={{margin:12,borderRadius:20,backgroundColor:'black'}}/>
            <TextInput label="Password" style={{margin:12,borderRadius:20,backgroundColor:'black'}}/>
            </View>

            <View style={{flex: 4}}>
            <Button mode="contained" onPress={()=>{navigation.navigate('Draw')}} style={{margin: 28,backgroundColor:'black',fontSize:40}}> Submit </Button>
            </View>

            <View style={{flex: 1}}>
                <Text  style={{textAlign:'center',fontWeight:'bold',fontSize:20,color:'white'}}>Copyright @AMAD Students 2023</Text>
            </View>
        </View>
        </ImageBackground>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1, 
      },
    txt:{
        fontSize:70,
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        marginTop:80,
        fontStyle:'italic',
        fontFamily: 'Cochin',
        
    },
    image:{
        flex:1,
        justifyContent: 'center'

    }
})
export default Login;