import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { ImageBackground } from 'react-native'

import HomeScreen from './src/screens/HomeScreen'
import SearchScreen from './src/screens/SearchScreen'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import DisconnectScreen from './src/screens/DisconnectScreen'

Icon.loadFont();


const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="white"
      tabb
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: 'black' }}
    >

      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Icon style={{ marginTop: 5 }} name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Icon style={{ marginTop: 5 }} name="search" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="DisconnectScreen"
        component={DisconnectScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Icon style={{ marginTop: 5 }} name="sign-out" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{
        headerShown: false
      }} initialRouteName="Tabs">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen name="Tabs" component={MyTabs} />

      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}
