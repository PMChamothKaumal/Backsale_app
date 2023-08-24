//rnfe
import { Text, View, ImageBackground, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BarIndicator, } from 'react-native-indicators';
import Home from './Screens1/Home';
import Login from './Screens1/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Signup from './Screens1/Signup';
import MyComponent from './Components/MyComponent';
import { Provider as PaperProvider } from 'react-native-paper';
import { Menu } from 'react-native-paper';
import About from './Screens1/About';
import Picker from './Screens1/Picker';
import Sc from './Screens1/sc';




const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} options={{headerStyle:{backgroundColor: 'gray',}}}/>
      <Drawer.Screen name="About" component={About} options={{headerStyle:{backgroundColor: 'gray',}}}/>
    </Drawer.Navigator>
  );
}

const App = () => {

  useEffect(() => {
    startLoading();
  }, []);

  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  return (
    <ImageBackground source={require('./Components/2.4.jpg')} resizeMode="cover"style={styles.image}>
      { loading ? (
    <View style={styles.container}>

      <View style={{marginTop:60}}>
        <Text style={styles.view}>Welcome To</Text>
        <Text style={styles.view}>NoTeS_+</Text>
      </View>
      <View style={styles.view2}>
        <BarIndicator color='white'/>
      </View>
  </View>):(


    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Root" component={Root} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name="Screen" component={Sc} options={{ headerShown: true }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )}
    </ImageBackground>
  );
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


