import { View, Text, TouchableOpacity,StyleSheet,Dimensions } from 'react-native'
import React,{useState} from 'react'
import { Button, Menu } from 'react-native-paper';


const Popup = (props) => {

    const deleteid=()=>{

    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Request failed with status");
          }
          return response.json();  
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error.message);
        });
    }

        
    closeModal=(bool)=>{
        props.changeModalVisible(bool);
    }
  return (
   <TouchableOpacity disabled={true}
   style={Styles.container}>
    <View style={Styles.modal}>
        
        <View>
            
            <TouchableOpacity onPress={()=>closeModal(false)} style={Styles.touch}>
                <Text style={Styles.txt}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>closeModal(false)} style={Styles.touch}>
                <Text style={Styles.txt}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>closeModal(false)} style={Styles.touch}>
                <Text style={Styles.txt}>Cancel</Text>
            </TouchableOpacity>
        </View>
    </View>
   </TouchableOpacity>
  )
}
const Styles = StyleSheet.create({
    container:{
        position:"absolute",
        margin: 16,
        right: -5,
        bottom: 430,
    },
    modal:{
        height:180,
        width:200,
        backgroundColor:"rgb(67, 66, 66)",
        borderRadius:10,
        justifyContent:"center", 
        alignItems:"center", 
    },
    touch:{
        justifyContent:"center", 
        alignItems:"center", 
        backgroundColor:"rgb(243, 239, 224)",
        width:170,
        marginTop:10,
        borderRadius:10,
    },
    txt:{
        color:"black",
         fontSize:20,
         padding:8
    }
})
export default Popup