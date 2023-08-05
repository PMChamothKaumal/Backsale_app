import {Text, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity} from 'react-native'
import React from "react"
import RoundButton from '../Components/RoundButton';
import Login from './Login';

function Home(){
    return(
        <View>
            <Text>HomePage requied.........</Text>
            <ActivityIndicator theme={{ colors: { primary: 'green' } }} />
       
      <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png'
        }}
        width={200}
        height={220}
      />
        <Login/>
        <TouchableOpacity style={styles.btn}>
        <Text style={styles.txt2}>Press Here</Text>
        </TouchableOpacity>
        <Image
         style={styles.img}
         source={require('../asessts/wallpaperflare.com_wallpaper.jpg')}
        />
        
        <RoundButton/>
        </View>
    )
}


const styles = StyleSheet.create({
    txt:{
      backgroundColor:'black',
      color:'white',
      fontSize:20, 
      fontWeight:'bold'
      },
    btn:{
      backgroundColor:'black',
      padding:20,
      width:'40%',
      borderRadius:100,
      justifyContent:'center',
  
    },
    txt2:{
      color:'white',
    },
    img:{
      marginTop:20,
      width:200,
      height:200,
  
    }
  
  })

  export default Home;
  