/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "./global";
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MypageScreen from './src/mypageScreen';
import SplashScreen from './src/splashScreen';
import FancardScreen from './src/fancardScreen';
import FancardDetail from './src/fancardDetail';
import SignScreen from './src/signScreen';
import HomeScreen from './src/homeScreen';
import HomeFund from './src/homeFund';
import FundFund from './src/fundFund';
import ReportScreen from './src/reportScreen';
import ReportCreator from './src/reportCreator';
import CommunityScreen from './src/communityScreen';
import Transaction from "./src/transaction"
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
console.disableYellowBox = true;
function HomeTab({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home-sharp' : 'home-sharp';
            return <Ionicons name={iconName} size={25} color={color} />;
          } else if (route.name === 'ReportScreen') {
            iconName = focused ? 'stats-chart' : 'stats-chart';
            return <Ionicons name={iconName} size={25} color={color} /> 
          } else if (route.name === 'CommunityScreen') {
            iconName = focused ? 'text-box' : 'text-box';
            return <MaterialCommunityIcons name={iconName} size={25} color={color} />
          } else if (route.name === 'MyPageScreen') {
            iconName = focused ? 'ios-person' : 'ios-person';
            return <Ionicons name={iconName} size={25} color={color}/>
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#303030',
        inactiveTintColor: '#CCCCCC',
        showLabel: false
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        name="ReportScreen"
        component={ReportScreen}
      />
      <Tab.Screen
        name="CommunityScreen"
        component={CommunityScreen}
      />
      <Tab.Screen
        name="MyPageScreen"
        component={MypageScreen}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="Home"
          component={HomeTab}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="HomeFund"
          component={HomeFund}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="FundFund"
          component={FundFund}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="SignScreen"
          component={SignScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="FancardScreen"
          component={FancardScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="FancardDetail"
          component={FancardDetail}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="ReportCreator"
          component={ReportCreator}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="Transaction"
          component={Transaction}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
// export const cryp = require('crypto')