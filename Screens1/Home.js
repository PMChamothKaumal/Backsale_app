import { View, Text, StyleSheet, ImageBackground, Dimensions, FlatList, Modal, TouchableOpacity, Image, Alert, RefreshControl, } from 'react-native'
import React, { useState, useEffect, } from 'react'
import { Avatar, Button, Card, FAB, TextInput, Menu, Divider, PaperProvider } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Axios from "react-native-axios"
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Popup from './Popup';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import mime from 'mime'



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
  const Screen = () => {
    navigation.navigate('Screen')

  }

  useEffect(() => {
    GetNote();
  }, []);

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const GetNote = () => {

    fetch('http://192.168.1.102:3000/api/note/get_notes')
      .then((response) => response.json())
      .then((json) => setData(json))

  }

  const [Title, setTitle] = useState('')
  const [des, setdes] = useState('')
  const [Note, setNote] = useState('')
  const [TitleError, setTitleError] = useState(null)
  const [DesError, setDesError] = useState(null)
  const [bool, setbool] = useState(false)

  const SaveNote1 = () => {
    Axios.post('http://192.168.1.102:3000/api/note/save_notes', {
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



  const sendData = (itemId) => {
    fetch('http://192.168.1.102:3000/api/note/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    })
      .then((response) => response.json())
      .then((json) => setData2(json))

      .catch(error => {
        console.error('Error:', error);
      });
  };




  const handleInteraction = (itemId) => {
    fetch('http://192.168.1.102:3000/api/note/saveid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Deleted successfully') {
          alert('Item deleted successfully');

        } else {
          alert('Error deleting item: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };



  const validate = () => {
    if (Title.trim() === "") {
      setTitleError("Title requied");
      setbool(false)
    } else if (des.trim() === "") {
      setTitleError("")
      setDesError("discription required");
      setbool(false)
    } else {
      setDesError("");
      setbool(true)
    }
  }
  const merge = () => {
    validate();
    if (bool) {
      SaveNote1();
    }
  };
  const txt = () => {
    if (Note.trim() === "Somthing went wrong") {
      return <Text style={{ color: "red", fontSize: 18, marginTop: 10, fontWeight: "bold" }}>  {Note}</Text>;
    } else {
      return <Text style={{ color: "green" }}>{Note}</Text>;
    }
  }

  const [isModalvisible, setisModalVisibale] = useState(false)
  const changeModalVisible = (bool) => {
    setisModalVisibale(bool);
  }



  const openUploader = async (itemId) => {


    console.log("id ====> " + itemId);
    launchCamera()
      .then((res) => {
        console.log(res.assets[0].uri);

        const newImageUri = "file:///" + res.assets[0].uri.split("file:/").join("");

        const imageData = new FormData()
        imageData.append("image", {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop()
        });
        fetch("http://192.168.1.102:3000/api/note/saveimage/" + itemId,
          {
            body: imageData,
            method: "POST",
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });

      })
      .catch((err) => {
        console.log(err);
      });

  }




  const [itemId, setItemId] = useState(null);
  const [itemDetails, setItemDetails] = useState('');

  const getPostData = async (itemId) => {

    fetch('http://192.168.1.102:3000/api/note/getid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    })
      .then((response) => response.json())
      .then((data) => setItemDetails(data))
    console.log(itemId)
    console.log(itemDetails)

  }



  const [openModal2, setOpenModal2] = React.useState(false);
  function renderModl2() {
    return (
      <Modal visible={openModal2} animationType='slide' transparent={true}>
        <ImageBackground source={require('../Components/2.5.jpg')} resizeMode="cover" style={Styles.image}>
          
            <View style={Styles.mode1}>
              <View style={Styles.mode3}>

                <FlatList
                  data={itemDetails}
                  renderItem={({ item }) => {
                    return (

                      <View style={{justifyContent:"center",alignItems:"center"}}>
                        
                        <Text style={{paddingTop:10,fontSize:21,color:"black",justifyContent:"center",alignItems:"center"}}>{item.title}</Text>
                        <Text style={{paddingTop:15,fontSize:16,color:"black",}}>{item.discription}</Text>
                      </View>
                    )
                  }}
                  keyExtractor={item => item.id}
                />

                <TouchableOpacity style={Styles.cansel1} onPress={() => setOpenModal2(false)}>
                  <Text style={{ fontSize: 18, textAlign: "center", color: "rgb(216, 217, 218)" }}>Go back</Text>
                </TouchableOpacity>
              </View>


            </View>
        
        </ImageBackground>
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
                {!!TitleError && (<Text style={{ color: "red" }}>   {TitleError}</Text>)}
                <Text style={Styles.txt2}> Discription:</Text>
                <TextInput mode="outlined" label="Discription" value={des} onChangeText={(data) => { setdes(data) }} style={Styles.Inputs1} multiline={true} required />
                {!!DesError && (<Text style={{ color: "red" }}>   {DesError}</Text>)}
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
                <TouchableOpacity onPress={() => {
                  getPostData(item.id);
                  setOpenModal2(true)
                }}>

                  <Card style={Styles.card}>

                    <Card.Title title={item.title} style={{ fontSize: 20 }} />
                    <Card.Content>
                      <Text variant="bodyMedium">{item.discription}</Text>
                    </Card.Content>
                    <Button onPress={() => openUploader(item.id)}>upload image</Button>


                    <TouchableOpacity style={Styles.fab1} onPress={() => handleInteraction(item.id)}>
                      <Text style={{ color: "black" }}>Delete</Text>
                    </TouchableOpacity>
                  </Card>
                </TouchableOpacity>

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
      {renderModl2()}

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
    backgroundColor: "gray",
  },
  card: {
    width: 370,
    height: 300,
    backgroundColor: "rgb(249, 245, 246)"
  },
  mode1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30

  },
  mode2: {
    backgroundColor: "rgb(216, 217, 218)",
    padding: 15,
    width: "90%",
    height: 650,
    borderRadius: 20
  },
  mode3: {
    backgroundColor: "rgb(216, 217, 218)",
    padding: 10,
    width: "90%",
    height: 730,
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
    width: 305,
    height: 320,
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
  cansel1: {
    position: 'absolute',
    margin: 16,
    left: 115,
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
    right: -16,
    marginTop: 267,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 6
  },
  fab2: {
    position: "absolute",
    margin: 16,
    right: -15,
    bottom: 257,
  },
})

export default Home