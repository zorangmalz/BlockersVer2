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
import Clipboard from "@react-native-community/clipboard";

const style = StyleSheet.create({
  containerStatus: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 27,
    backgroundColor: "#787470",
    height: 171,
    borderRadius: 20,
    justifyContent: 'space-between'
  },
  buttonStyle: {
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Metropolis-Regular',
    width: "50%",
    height: 45
}
})

function MypageScreen({navigation}) {
  const [copiedText, setCopiedText] = useState('')

  const copyToClipboard = () => {
    Clipboard.setString('hello world')
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
        <View accessibilityRole="header" style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: 87,
          paddingBottom: 14,
          backgroundColor: '#ffffff',
          width: "100%",
          paddingLeft: "5%",
          paddingRight: "5%"
        }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: "center",
              alignItems: 'center',
              marginLeft: '37.5%'
            }}
          >
            <Text style={{ fontSize: 24 }}>
              <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20, }}>My Page</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('SignScreen')} style={{ marginLeft: 8 }}>
            <Image source={require('./icon/setting.png')} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={style.containerStatus}>
            <View style={{ marginTop: 26, marginLeft: 31, marginRight: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, fontFamily: 'Metropolis-Bold', color: "white", marginRight: 8 }}>0xE50…336BC</Text>
                  <TouchableOpacity onPress={copyToClipboard}>
                    <Image source={require('./icon/clipboard.png')} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Transaction')}>
                  <Text style={{ textDecorationLine: 'underline', fontSize: 12, fontFamily: 'Metropolis-Regular', color: "white" }}>Transaction</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ marginTop: 32, fontSize: 16, fontFamily: 'Metropolis-Bold', color: "white" }}>1,000 Klay</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
              <TouchableOpacity style={[style.buttonStyle, { backgroundColor: '#35363b', borderBottomLeftRadius: 20 }]}>
                <Text style={{ fontSize: 12, color: '#ffffff', fontFamily: 'Metropolis-Bold' }}>Deposit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[style.buttonStyle, { backgroundColor: '#ffffff', borderBottomRightRadius: 20 }]}>
                <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Bold' }}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{
            marginTop: 29,
            width: '90%',
            height: 300,
            paddingTop: 24,
            paddingLeft: 14.5,
            paddingRight: 14.5,
            paddingBottom: 18,
            backgroundColor: '#ffffff',
            alignSelf: 'center',
            borderRadius: 10
          }}>
            <FlatList
              data={[
                { key: '개인정보', name: '개인정보', screen: "" },
                { key: 'Fan Card & Likes', name: 'Fan Card & Likes', screen: 'FancardScreen' },
                { key: '공지사항', name: '공지사항', screen: "" },
                { key: '이용약관', name: '이용약관', screen: "" },
                { key: 'FAQ', name: 'FAQ', screen: "" },
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
                  <Text style={{
                    fontSize: 14,
                    color: '#202426',
                    fontFamily: 'Metropolis-Bold',
                    marginBottom: 8
                  }}>{item.key}</Text>
                  <View style={{height: 0.7, backgroundColor: '#D2D3D3', marginBottom: 16}} />
                </TouchableOpacity>)}
            />
            <Text style={{
              fontFamily: 'Metropolis-Regular',
              fontSize: 14,
              color: '#202426',
              opacity: 0.6,
              alignSelf: 'center'
            }}>Powered by Klaytn</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MypageScreen;