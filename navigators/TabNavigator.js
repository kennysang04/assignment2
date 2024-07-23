import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import { Image } from 'react-native'
import SearchScreen from '../screens/SearchScreen'
import NotificationScreen from '../screens/NotificationScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            
            tabBarBackground: () => (
                <View style = {styles.tabBarStyle}></View>
            ),
            tabBarIcon: ({ color, size, focused }) => {
                let iconName;

                if (route.name  === "Home") {
                    iconName = focused ? require('../img/home.png'): require('../img/home.png');
                } else if (route.name === "Search") {
                    iconName = focused ? require('../img/search.png'): require('../img/search.png');
                } else if (route.name  === "NotificationScreen") {
                    iconName = focused ? require('../img/bell.png'): require('../img/bell.png');
                } else if (route.name  === "Profile") {
                    iconName = focused ? require('../img/man.png'): require('../img/man.png');
                }
                
                return (
                    <Image
                        source={iconName}
                        style={{ width: 22, height: 22, tintColor: color }}
                    />
                );
            },

        })}

        >
            
            <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>

            <Tab.Screen name="Search" component={SearchScreen}></Tab.Screen>

            <Tab.Screen name="NotificationScreen" component={NotificationScreen}></Tab.Screen>

            <Tab.Screen name="Profile" component={ProfileScreen}></Tab.Screen>

        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 55,      
        backgroundColor: "white",
        borderTopWidth: 0,
        position: 'relative',
        elevation: 0,
        borderTopColor: 'black'
    },

    BlurViewStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})