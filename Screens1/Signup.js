import { View, Text,StyleSheet,TouchableOpacity,ImageBackground,Dimensions, Alert } from 'react-native'
import React,{useState} from 'react'
import Login from './Login'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Axios from "react-native-axios"

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Signup = () => {
  const[Username,setUsername]=useState('')
  const[Email,setEmail]=useState('')
  const[ConPassword,setConPassword]=useState('')
  const[Password,setPassword]=useState('')
  const[Register,setRegister]=useState('')
  
  const SaveData = ()=>{
    
    Axios.post('http://192.168.1.105:3000/api/note/save_users', {
    method: 'POST',
      username: Username,
      email: Email,
      password: Password,
      conpassword:ConPassword
  })
  .then((response) => {
    if (response.data && response.data.message) {
      setRegister(response.data.message);
    } else {
      setRegister("Account created successfully");
    }
    Alert.alert('Alert', Register, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  })
 
  .catch((error) => {
    console.error("Error during API request:", error);
    setRegister("An error occurred while signing up");
  });
  
  }

  const navigation = useNavigation();
  const login3=()=>{
    navigation.reset({
      index:0,
      routes:[{name:"Login"}]
    })
  }
  return (

    <KeyboardAwareScrollView>
    <ImageBackground source={require('../Components/2.4.jpg')} resizeMode="cover"style={Styles.image}>
        <View style={{flex:1}}>

          <View style={{flex:1}}>
            <Text style={Styles.txt}>Signup</Text>
          </View>

          <View style={{flex:3}}>
            <Text style={Styles.txt2}>    Username:</Text>
            <TextInput mode="outlined" label="Usename" value={Username}onChangeText={(data)=> {setUsername(data)}} right={<TextInput.Affix text="/15" />} style={Styles.Inputs} required/>
            <Text style={Styles.txt2}>    Email Address:</Text>
            <TextInput mode="outlined" label="Email" value={Email}onChangeText={(data)=> {setEmail(data)}} right={<TextInput.Affix text="/15" />} style={Styles.Inputs} required/>
            <Text style={Styles.txt2}>    Password:</Text>
            <TextInput mode="outlined" label="Password" value={Password}onChangeText={(data)=> {setPassword(data)}} secureTextEntry right={<TextInput.Icon icon="eye" />} style={Styles.Inputs} required/>
            <Text style={Styles.txt2}>    Confirm Password:</Text>
            <TextInput mode="outlined" label="Confirm Password" value={ConPassword}onChangeText={(data)=> {setConPassword(data)}} secureTextEntry right={<TextInput.Icon icon="eye" />} style={Styles.Inputs} required/>
          </View>

          <View style={{flex:1}}>
            <TouchableOpacity style={{alignItems:'center', justifyContent:"center"}} onPress={SaveData}>
                <Text  style={Styles.btn}>Signup</Text>
            </TouchableOpacity>
            <Text style={{color:"white", fontSize:20}}></Text>
          </View>

          <View style={{flex:1}}>
              <Text style={Styles.foter}>Already Have An Account?<Text style={Styles.sign}  onPress={login3}>  Login</Text></Text>
            </View>
          
        </View>
    </ImageBackground>
    </KeyboardAwareScrollView>
  )
}

const Styles = StyleSheet.create({
  txt:{
    fontSize:50,
    color:'rgb(221, 230, 237)',
    fontWeight:'bold',
    textAlign:'center',
    alignItems:"center",
    marginTop:40,
    fontStyle:'italic',
    fontFamily: 'Cochin',
},
  txt2:{
    fontSize:16,
    color:"rgb(221, 230, 237)",
    marginTop:10
  },
  Inputs:{
    margin:10,
    borderRadius:40,
    backgroundColor:'rgb(221, 230, 237)',
    color:"white",
    marginTop:-0,
    fontSize:16,
  },
  btn:{
    marginTop:55,
    backgroundColor:'rgb(221, 230, 237)',
    width:280,
    height:40,
    fontSize:26,
    color:"rgb(39, 55, 77)",
    alignItems:'center',
    textAlign:'center',
    borderRadius:10,
    fontWeight:'bold',
  },
  foter:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20,
    color:'rgb(97, 103, 122)',
    marginTop:58,
    backgroundColor:"rgb(221, 230, 237)",
    height:32,
  },
  image:{
    flex:1,
    justifyContent: 'center',
    resizeMode: 'cover',
    height: screenHeight,
    width: screenWidth,
},
sign:{
  fontSize:20,
  color:"rgb(39, 40, 41)"
}
})

export default Signup