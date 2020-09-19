import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

const style = StyleSheet.create({
  logo: {
    fontFamily: 'Metropolis-Bold',
    color: '#303030',
    fontSize: 24,
    marginTop: 20
  },
  size: {
    fontSize: 40
  }
})

function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home')
    }, 500)
  }, [])
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image style={{width: 200, height: 200}} source={require('./icon/ydotlogo.gif')} />
            <Text style={style.logo}>Create, Fund, Enjoy!</Text>
          </View>
      </SafeAreaView>
    </>
  );
};

export default SplashScreen;