import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/Splash'
import Login from '../screens/Login'
import Register from '../screens/Register'
import HomeScreen from '../screens/HomeScreen'
import TabNavigator from './TabNavigator'
import DetailsScreen from '../screens/DetailsScreen'
import DrawerNavigator from './DrawerNavigator'
import PaymentScreen from '../screens/PaymentScreen'
import CartScreen from '../screens/CartScreen'
import PersonalDetailsScreen from '../screens/PersonalDetailsScreen'
import SearchScreen from '../screens/SearchScreen'
import BankCardScreen from '../screens/BankCardScreen'
import NotificationScreen from '../screens/NotificationScreen'
import ListScreen from '../screens/ListScreen'
import OrderSuccess from '../screens/OrderSuccess'
import ProfileScreen from '../screens/ProfileScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import CamNang from '../screens/CamNang'
import KienThuc from '../screens/KienThuc'
import QA from '../screens/QA'

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Splash' component={Splash}></Stack.Screen>
                <Stack.Screen name='Login' component={Login}></Stack.Screen>
                <Stack.Screen name='Register' component={Register}></Stack.Screen>
                <Stack.Screen name='HomeScreen' component={HomeScreen}></Stack.Screen>
                <Stack.Screen name='TabNavigator' component={TabNavigator}></Stack.Screen>
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}></Stack.Screen>
                <Stack.Screen name='DetailsScreen' component={DetailsScreen}></Stack.Screen>
                <Stack.Screen name='PaymentScreen' component={PaymentScreen}></Stack.Screen>
                <Stack.Screen name='CartScreen' component={CartScreen}></Stack.Screen>
                <Stack.Screen name='PersonalDetailsScreen' component={PersonalDetailsScreen}></Stack.Screen>
                <Stack.Screen name='SearchScreen' component={SearchScreen}></Stack.Screen>
                <Stack.Screen name='BankCardScreen' component={BankCardScreen}></Stack.Screen>
                <Stack.Screen name='NotificationScreen' component={NotificationScreen}></Stack.Screen>
                <Stack.Screen name='ListScreen' component={ListScreen}></Stack.Screen>
                <Stack.Screen name='OrderSuccess' component={OrderSuccess}></Stack.Screen>
                <Stack.Screen name='Profile' component={ProfileScreen}></Stack.Screen>
                <Stack.Screen name='OrderHistotyScreen' component={OrderHistoryScreen}></Stack.Screen>
                <Stack.Screen name='CamNang' component={CamNang}></Stack.Screen>
                <Stack.Screen name='KienThuc' component={KienThuc}></Stack.Screen>
                <Stack.Screen name='QA' component={QA}></Stack.Screen>


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})