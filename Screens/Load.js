import { View, Text, StyleSheet,FlatList, TextInput,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { FAB } from 'react-native-paper';
import { Button } from 'react-native-paper'

export default function Load() {

    useEffect(() => {
        saveData();

      },[]);

    const [data,setData] = useState([]);
    const [name,setName] = useState('');

    const saveData=() =>{
      fetch('https://imdb-top-100-movies.p.rapidapi.com/',{
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'b8f90fd9e1msh6215ca5c6e6a076p11c4a7jsn53492c6ed26c',
          'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
      })
      .then((response) => response.json())
      .then((json) => setData(json))
    }

  return (
    <View style={styles.cont}>
      <Text style={styles.txt}>IMDb Top 100 Movies.</Text>
      <FlatList
        data={data}
        renderItem={({item}) => {return(
            <View style={styles.item}>
              
              <Text style={styles.fab}>{item.rank}</Text>
                <Text style={styles.txt1}>{item.title}</Text>
                <Text style={{fontSize:20}}>{item.rating}</Text>
                <Image style={styles.img} source={{uri:item.image}}/>
            </View>
        )}}
        keyExtractor={item => item.id}
      />

    </View>
  )
}

const styles= StyleSheet.create({
    cont:{
        flex:1,
        alignItems:'center'
    },
    txt:{
        marginTop:20,
        fontSize:30,
        color:'black',
        fontWeight:'bold',
        marginBottom:20
             
    },
    item:{
        marginTop:'5%',
        padding:10,
        borderColor:'red',
        alignItems:'center',
        backgroundColor:'gray'
    },
    img:{
      width:120,
      height:120,
      marginRight:220,
      borderRadius:20
    },
    txt1:{
      marginTop:10,
      fontSize:20,
      color:'black',
      fontWeight:'bold',
      marginBottom:5
           
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    fontSize:20,
    color:'yellow'
    
    
  }
})