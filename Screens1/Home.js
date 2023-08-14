import { View, Text, StyleSheet, ImageBackground, Dimensions, FlatList, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, } from 'react'
import { Avatar, Button, Card, FAB, TextInput } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {launchCamera, launchImageLibrary,ImagePicker} from 'react-native-image-picker';
const Drawer = createDrawerNavigator();
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;



const Home = () => {

  useEffect(() => {
    GetNote();
  }, []);

  const [data, setData] = useState([]);

  const GetNote = () => {
    fetch('http://192.168.1.105:3000/notesdetails/get_notes')
      .then((response) => response.json())
      .then((json) => setData(json))
  }

  const[Title,setTitle]=useState('')

  const SaveNote1 = ()=>{
    fetch('http://192.168.1.105:3000/notesdetails/save_notes', {
    method: 'POST',
    body: JSON.stringify({
      title: Title,
      
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  }

  const [openModal, setOpenModal] = React.useState(false);
  function renderModl() {
    return (
      <Modal visible={openModal} animationType='slide' transparent={true}>
        <ImageBackground source={require('../Components/2.5.jpg')} resizeMode="cover" style={Styles.image}>
          <KeyboardAwareScrollView>
            <View style={Styles.mode1}>
              <View style={Styles.mode2}>
                <Text style={Styles.txt2}> Title:</Text>
                <TextInput mode="outlined" label="Title" value={Title} onChangeText={(data)=> {setTitle(data)}} right={<TextInput.Affix text="/35" />} style={Styles.Inputs} />
                <Text style={Styles.txt2}> Discription:</Text>
                <View>
                  <Image style={{height:400, width:200}} source={{uri: selectImage}}/>
                </View>
                <TouchableOpacity style={Styles.save}  onPress={() => setOpenModal(false)}>
                  <Text style={{fontSize:18,textAlign:"center",color:"rgb(216, 217, 218)"}}>Cansel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.save1} onPress={SaveNote1}>
                  <Text style={{fontSize:18,textAlign:"center",color:"rgb(216, 217, 218)"}}>Save</Text>
                </TouchableOpacity>

              </View>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </Modal>
    )
  }

  return (
    <ImageBackground source={require('../Components/2.5.jpg')} resizeMode="cover" style={Styles.image}>
      <View style={Styles.cont}>
        <Text style={Styles.txt}>NoTeS_+</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={Styles.item}>
                <Card style={Styles.card}>
                  <Card.Title title="Card Title" />
                  <Card.Content>
                    <Text variant="titleLarge">{item.name}</Text>
                    <Text variant="bodyMedium">{item.email}</Text>
                  </Card.Content>
                  <Card.Cover source={require('../Components/2.4.jpg')} />
                </Card>

              </View>
            )
          }}
          keyExtractor={item => item.id}
        />

        <FAB
          icon="plus"
          style={Styles.fab}
          onPress={() => setOpenModal(true)}
        />
      </View>
      {renderModl()}
    </ImageBackground>


  )
}

const Styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    height: screenHeight,
    width: screenWidth,
  },
  cont: {
    flex: 1,
    alignItems: 'center'
  },
  item: {
    marginTop: '5%',
    padding: 5,
    borderColor: 'red',
    alignItems: 'center',

  },
  txt: {
    fontSize: 28,
    marginTop: 20,
    marginBottom: 16,
    color: "black",
    textAlign: "right",
    fontWeight: "bold"
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    height: screenHeight,
    width: screenWidth,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  card: {
    width: 370,
    height: 300,
  },
  mode1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50

  },
  mode2: {
    backgroundColor: "rgb(216, 217, 218)",
    padding: 15,
    width: "90%",
    height: 650,
    borderRadius: 20
  },
  txt2: {
    fontSize: 16,
    color: "rgb(39, 40, 41)",
    marginTop: 10
  },
  Inputs: {
    margin: 10,
    borderRadius: 60,
    backgroundColor: 'rgb(246, 241, 241)',
    color: "white",
    marginTop: -0,
    fontSize: 18,
  },
  save:{
    position: 'absolute',
    margin: 16,
    right: 170,
    bottom: 10,
    backgroundColor:"rgb(39, 40, 41)",
    width:90,
    height:28,
    borderRadius:20
  },  
  save1:{
    position: 'absolute',
    margin: 16,
    right: 50,
    bottom: 10,
    backgroundColor:"rgb(39, 40, 41)",
    width:90,
    height:28,
    borderRadius:20
  },  
})

export default Home