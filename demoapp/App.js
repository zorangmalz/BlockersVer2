/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import communityBoard from './src/communityBoard';
import boardDetail from './src/BoardDetail';

const Stack = createStackNavigator();

const App: () => React$Node = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="communityBoard">
        <Stack.Screen name="communityBoard" component={communityBoard} />
        <Stack.Screen name="boardDetail" component={boardDetail} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
};

export default App;