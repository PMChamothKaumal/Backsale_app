import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Axios from "react-native-axios"
import { createDrawerNavigator } from '@react-navigation/drawer';
import About from './About';
import Home from './Home';
import MyComponent from '../Components/MyComponent';
const Drawer = createDrawerNavigator();



const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function Login() {
  const navigation = useNavigation();

  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [loginSt, setLoginSt] = useState('')
  const [data, setData] = useState('');
  const [nameError, setNameError] = useState(null);
  const [pwError, setpwError] = useState(null);

  const LoginData = () => {
    Axios.post('http://192.168.1.105:3000/api/note/get_users', {
      method: 'POST',
      username: Username,
      password: Password,
    })
      .then((response) => {
        if (response.data.message) {
          setLoginSt(response.data.message);
        } else {
          { Login2() }
        }
      })
  }

  const Login2 = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Root" }]
    })
  }

const validate=() => {
  if (Username.trim() === "") {
    setNameError("Username required.");
  }else if(Password.trim()===""){
    setNameError(null);
    setpwError("Invalid Password.");
  }else{ 
    setpwError(null);
  }
}

  const login1 = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Signup" }]
    })
  }

  const merge = () => {
    validate();
    LoginData();
  };

  const txt=()=>{
    if(loginSt.trim() === "Wrong user name or password"){
      return <Text style={{color:"red", fontSize:18, marginTop:10, fontWeight:"bold"}}>  {loginSt}</Text>;
    }else{
      return <Text style={{color:"green"}}>{loginSt}</Text>;
    }
  }

  return (

    <KeyboardAwareScrollView>
      <ImageBackground source={require('../Components/2.4.jpg')} resizeMode="cover" style={Styles.image}>
        <View style={Styles.container}>

          <View style={{ flex: 3 }}>
            <Text style={Styles.txt}>Login</Text>
          </View>

          <View style={{ flex: 3, marginTop: 60 }}>
            <Text style={Styles.txt2}>    Username:</Text>
            <TextInput mode="outlined" label="Username:" value={Username} onChangeText={(data) => { setUsername(data) }} right={<TextInput.Affix text="/15" />} style={Styles.Inputs} required />
            {!!nameError && (<Text style={{color:"red"}}>   {nameError}</Text>)}
            <Text style={Styles.txt2}>    Password:</Text>
            <TextInput mode="outlined" label="Password:" value={Password} onChangeText={(data) => { setPassword(data) }} secureTextEntry right={<TextInput.Icon icon="eye" />} style={Styles.Inputs} required />
            {!!pwError && (<Text style={{color:"red"}}>   {pwError}</Text>)}
          </View>

          <View style={{ flex: 4, }}>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: "center" }} onPress={merge}>
              <Text style={Styles.btn}>Login</Text>
            </TouchableOpacity>
            {txt()}
            
          </View>

          <View style={{ flex: 1 }}>
            <Text style={Styles.foter}>Don't You Have An Account?<Text style={Styles.sign} onPress={login1}>   Sign_Up</Text></Text>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>

  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    fontSize: 70,
    color: 'rgb(221, 230, 237)',
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: "center",
    marginTop: 102,
    fontStyle: 'italic',
    fontFamily: 'Cochin',
  },
  Inputs: {
    margin: 10,
    borderRadius: 40,
    backgroundColor: 'rgb(221, 230, 237)',
    color: "white",
    marginTop: -0,
    fontSize: 18,
  },
  btn: {
    marginTop: 45,
    backgroundColor: 'rgb(221, 230, 237)',
    width: 280,
    height: 40,
    fontSize: 26,
    color: "rgb(39, 55, 77)",
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
  },
  foter: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'rgb(97, 103, 122)',
    backgroundColor: "rgb(221, 230, 237)",
    height: 32,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    height: screenHeight,
    width: screenWidth,
  },
  txt2: {
    fontSize: 16,
    color: "rgb(221, 230, 237)",
    marginTop: 10
  },
  sign: {
    fontSize: 20,
    color: "rgb(39, 40, 41)"
  }
})

export default Login;