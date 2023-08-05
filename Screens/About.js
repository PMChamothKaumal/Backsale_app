import { View, Text, } from 'react-native'
import React,{useState} from 'react'
import { TextInput,Button  } from 'react-native-paper';



const About = () => {

    const[Username,setUsername]=useState('')
    const[Email,setEmail]=useState('')
    const[Password,setPassword]=useState('')

    const SaveData = ()=>{
      fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: Email,
        body: Username,
        userId: Password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    }

  return (
    <View>
      <Text>Hello fill your details here:</Text>
      <TextInput label="Username" 
      value={Username}
      onChangeText={(data)=> {setUsername(data)}}/>

      <TextInput label="Email"
      value={Email}
      onChangeText={(data1)=>{setEmail(data1)}}/>

      <TextInput label="Password"
      value={Password}
      onChangeText={(data2)=>{setPassword(data2)}}/>
      <Button icon="camera" mode="contained" onPress={SaveData}>Press me</Button>
    </View>
  )
}

export default About