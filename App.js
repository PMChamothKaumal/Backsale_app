//rnfe
import { Text, View, ImageBackground, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { BarIndicator, } from 'react-native-indicators';
import Home from './Screens1/Home';
import Login from './Screens1/Login';
import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Signup from './Screens1/Signup';
import About from './Screens1/About';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const App = () => {

  return (
    /*<ImageBackground source={require('./Components/2.4.jpg')} resizeMode="cover"style={styles.image}>
      <View style={styles.container}>
          <View style={{marginTop:60}}>
            <Text style={styles.view}>Welcome To</Text>
            <Text style={styles.view}>NoTeS_+</Text>
          </View>
          <View style={styles.view2}>
            <BarIndicator color='white'/>
          </View>
      </View>
    </ImageBackground>*/
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
      </Stack.Navigator>
      
    </NavigationContainer>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    height: screenHeight,
    width: screenWidth,
  },
  view: {
    fontSize: 52,
    textAlign: "center",
    color: 'rgb(221, 230, 237)',
    fontWeight: "bold"
  }, view2: {
    marginTop: 100
  }


})
export default App


