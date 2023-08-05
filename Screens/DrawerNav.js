import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Login from './Login';
import RoundButton from '../Components/RoundButton';



const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="round" component={RoundButton} />
      <Drawer.Screen name="home" component={Home} />
    </Drawer.Navigator>
  )
}
