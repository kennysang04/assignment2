import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './screens/Login'
import Splash from './screens/Splash'
import Register from './screens/Register'
import HomeScreen from './screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './navigators/TabNavigator'
import DetailsScreen from './screens/DetailsScreen'
import PaymentScreen from './screens/PaymentScreen'
//import FavoritesScreen from './screens/FavoritesScreen'
import AppNavigator from './navigators/AppNavigator'
import CartScreen from './screens/CartScreen'

const App = () => {
  return (
   
    <AppNavigator/>
     //<PaymentScreen/>
    // <CartScreen/>
    

  )

}

export default App

const st = StyleSheet.create({

})