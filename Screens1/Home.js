import { View, Text, StyleSheet, ImageBackground, Dimensions, FlatList, Modal, TouchableOpacity, Image, Alert,  RefreshControl, } from 'react-native'
import React, { useState, useEffect, } from 'react'
import { Avatar, Button, Card, FAB, TextInput,Menu, Divider, PaperProvider } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Axios from "react-native-axios"
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Popup from './Popup';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Drawer = createDrawerNavigator();

const Home = () => {

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const navigation = useNavigation();
  const co = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Comp" }]
    })
  }

  useEffect(() => {
    GetNote();
  }, []);

  const [data, setData] = useState([]);

  const GetNote = () => {
    fetch('http://192.168.1.105:3000/api/note/get_notes')
      .then((response) => response.json())
      .then((json) => setData(json))
  }

  const [Title, setTitle] = useState('')
  const [des, setdes] = useState('')
  const [Note, setNote] = useState('')
  const [TitleError, setTitleError] = useState(null)
  const [DesError, setDesError] = useState(null) 
  const[bool,setbool]=useState(false)

  const SaveNote1 = () => {
    Axios.post('http://192.168.1.105:3000/api/note/save_notes', {
      method: 'POST',
      title: Title,
      discription: des
    })
      .then((response) => {
        if (response.data && response.data.message) {
          setNote(response.data.message);
        } else {
          setNote("Note upload complted");
        }
      })

      .catch((error) => {
        console.error("Error during API request:", error);
        setNote("An error occurred while upload note");
      });
  }
  const validate=() => {
    if (Title.trim() === "") {
      setTitleError("Title requied");
    }else if(des.trim()===""){
      setTitleError(null);
      setDesError("discription required");
    }else{   
      setDesError(null);
      setbool(true);
    }
  }
  const merge = () => {
      validate();
      if(bool){
      SaveNote1();
      }
    
    
  };
  const txt=()=>{
    if(Note.trim() === "Somthing went wrong"){
      return <Text style={{color:"red", fontSize:18, marginTop:10, fontWeight:"bold"}}>  {Note}</Text>;
    }else{
      return <Text style={{color:"green"}}>{Note}</Text>;
    }
  }

  const [isModalvisible, setisModalVisibale]= useState(false)
  const changeModalVisible=(bool)=>{
    setisModalVisibale(bool);
  }
  const mode=()=>{
    return(
    <Modal
    transparent={true}
    animationType='fade'
    visible={isModalvisible}
    nRequestClose={()=>changeModalVisible(false)}>
      <Popup changeModalVisible={changeModalVisible} setData={setData} style={Styles.fab2}/>
    </Modal>
    )
  }

  const [openModal, setOpenModal] = React.useState(false);
  function renderModl() {
    return (
      <Modal visible={openModal} animationType='slide' transparent={true}>
        <ImageBackground source={require('../Components/2.5.jpg')} resizeMode="cover" style={Styles.image}>
          <KeyboardAwareScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View style={Styles.mode1}>
              <View style={Styles.mode2}>
                
                
                <Text style={Styles.txt2}> Title:</Text>
                <TextInput mode="outlined" label="Title" value={Title} onChangeText={(data) => { setTitle(data) }} right={<TextInput.Affix text="/35" />} style={Styles.Inputs} required />
                {!!TitleError && (<Text style={{color:"red"}}>   {TitleError}</Text>)}
                <Text style={Styles.txt2}> Discription:</Text>
                <TextInput mode="outlined" label="Discription" value={des} onChangeText={(data) => { setdes(data) }} style={Styles.Inputs1} multiline={true} required />
                {!!DesError && (<Text style={{color:"red"}}>   {DesError}</Text>)}
                <View>
                </View>
                {txt()}
                <TouchableOpacity style={Styles.save} onPress={() => setOpenModal(false)}>
                  <Text style={{ fontSize: 18, textAlign: "center", color: "rgb(216, 217, 218)" }}>Cansel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.save1} onPress={merge}>
                  <Text style={{ fontSize: 18, textAlign: "center", color: "rgb(216, 217, 218)" }}>Save</Text>
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
      <View style={Styles.cont} >

        <Text style={Styles.txt}>NoTeS_+</Text>
        <FlatList refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={Styles.item}>
                <Card style={Styles.card}>
                {mode()} 
                  <TouchableOpacity onPress={()=>changeModalVisible(true)}>
                  <FAB icon="dots-vertical" style={Styles.fab1} />
                  </TouchableOpacity>
                  <Text>{item.id}</Text>
                  <Card.Title title={item.title}style={{fontSize:20}}/>
                  <Card.Content>
                    <Text variant="bodyMedium">{item.discription}</Text>
                  </Card.Content>
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
    backgroundColor:"gray",
  },
  card: {
    width: 370,
    height: 300,
    backgroundColor:"rgb(249, 245, 246)"
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
  Inputs1: {
    width:305,
    height:320,
    margin: 10,
    borderRadius: 60,
    backgroundColor: 'rgb(246, 241, 241)',
    color: "white",
    marginTop: -0,
    fontSize: 18,
  },
  save: {
    position: 'absolute',
    margin: 16,
    right: 170,
    bottom: 10,
    backgroundColor: "rgb(39, 40, 41)",
    width: 90,
    height: 28,
    borderRadius: 20
  },
  save1: {
    position: 'absolute',
    margin: 16,
    right: 50,
    bottom: 10,
    backgroundColor: "rgb(39, 40, 41)",
    width: 90,
    height: 28,
    borderRadius: 20
  },
  fab1: {
    position: "absolute",
    margin: 16,
    right: -15,
    bottom: 257,
    backgroundColor:"rgb(249, 245, 246)"
  },
  fab2: {
    position: "absolute",
    margin: 16,
    right: -15,
    bottom: 257,
  },
})

export default Home