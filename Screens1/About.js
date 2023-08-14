import { View, Text,StyleSheet,Image,ImageBackground,Dimensions,ScrollView} from 'react-native'
import React from 'react'
import { Avatar, Card, } from 'react-native-paper';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const About = () => {
  return (

    <ImageBackground source={require('../Components/2.5.jpg')} resizeMode="cover"style={Styles.image}>
    <View style={{flex:1}}>

      <View style={Styles.view}>
        <Text style={Styles.ab}>About_Me</Text>
        <Image style={Styles.logo} source={require('../Components/ck.jpg')}/>
        <Text style={Styles.txtName}>P.M.Chamoth Kaumal..</Text>
        <Text style={Styles.txtName}>Mobile Application Developer</Text>
      </View>

      <View style={{flex:2}}>
        
          <Card style={Styles.card}>
            <Card.Content>
            <Text variant="titleLarge" style={Styles.bio}>Bio:</Text>
            <Text variant="bodyMedium" style={Styles.cardName}>
                Undergraduate UOW CompSci student passionate about mobile app development. 
                Creating innovative solutions one line of code at a time.</Text>
          </Card.Content>
         </Card> 

        
        <Card.Title style={Styles.card2}
          title="Email:"
          subtitle="pmchamoth@gmail.com"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}/>

        <Card.Title style={Styles.card2}
          title="Contact:"
          subtitle="077-1482649"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}/>  

        <Card.Title style={Styles.card2}
          title="LinkedIn:"
          subtitle="www.linkedin.com/in/chamoth-kaumal-0679301a9"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}/>   

          <Card.Title style={Styles.card2}
          title="Github:"
          subtitle="https://github.com/PMChamothKaumal"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}/>  
  
      </View>

    </View>
    </ImageBackground>
  )
}

const Styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    borderRadius:60,
    marginBottom:10
  },
  ab:{
    fontSize:32,
    color:"rgb(221, 230, 237)",
    fontStyle:"italic",
    marginBottom:20,
    marginTop:20,
    fontWeight:"bold"
  },
  view:{
    alignItems:'center',
    textAlign:'center',
    flex:1,
  },
  view2:{
    fontSize:16,
    color:"black"
  },
  txtName:{
    fontSize:20,
    color:"rgb(221, 230, 237)",
  

  },
  image:{
    flex:1,
    justifyContent: 'center',
    resizeMode: 'cover',
    height: screenHeight,
    width: screenWidth,
},
card:{
  marginTop:20,
  backgroundColor:"rgb(221, 230, 237)",

},
cardName:{
  fontSize:16,
  color:"rgb(39, 55, 77)"
},
bio:{
  fontSize:18,
  color:"black",
  fontWeight:"bold"
},
card2:{
  backgroundColor:"rgb(221, 230, 237)",
  marginTop:10,
  borderRadius:20
}
})

export default About