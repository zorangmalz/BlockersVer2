import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image
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
      navigation.navigate('SignScreen')
    }, 1000)
  }, [])
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#ffffff" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      </SafeAreaView>
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