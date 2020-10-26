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
import Ionicons from 'react-native-vector-icons/Ionicons';

const style = StyleSheet.create({
  containerStatus: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: "#ffffff",
    justifyContent: 'flex-start',
    height: 380,
    borderRadius: 10,
    marginTop: 16,
    paddingTop: 26,
    paddingLeft: 14.5,
    paddingRight: 14.5,
    paddingBottom: 30
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Metropolis-Bold',
    color: '#202426'
  }
})

function FancardDetail({navigation}) {
  const [copiedText, setCopiedText] = useState('')

  const copyToClipboard = () => {
    Clipboard.setString('hello world')
  }
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#ffffff" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      </SafeAreaView>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
        <View accessibilityRole="header" style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: "center",
          height: 50,
          backgroundColor: '#ffffff',
          width: "100%",
          paddingLeft: "5%",
          paddingRight: "5%"
        }}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons name="chevron-back-outline" size={30} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20, marginRight: '24%' }}>Fan Cards & Likes</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={style.containerStatus}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={[style.box, { backgroundColor: '#E78276', marginBottom: 8 }]}>
                <Image source={require('./icon/youtuber.png')} />
              </TouchableOpacity>
              <Text style={[style.text, { width: 100, fontSize: 12, textAlign: 'center' }]}>JEJU</Text>
            </View>
            <FlatList
              data={[
                { key: 1, getdate: '2020/10/24', nftaddress: '0xdcd…b9d6c', fantoken: 'JEJU' },
              ]}
              renderItem={({ item }) => (
                <>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginLeft: 9.5,
                    borderBottomWidth: 0.7,
                    borderBottomColor: '#D2D3D3',
                    marginTop: 16,
                    marginBottom: 16,
                    paddingBottom: 7
                  }}>
                    <Text style={[style.text, { fontSize: 14, marginLeft: 8 }]}>취득일 : </Text>
                    <Text style={[style.text, { fontSize: 14 }]}>{item.getdate}</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginLeft: 9.5,
                    borderBottomWidth: 0.7,
                    borderBottomColor: '#D2D3D3',
                    marginBottom: 16,
                    paddingBottom: 7
                  }}>
                    <Text style={[style.text, { fontSize: 14, marginLeft: 8 }]}>NFT Address : </Text>
                    <Text style={[style.text, { fontSize: 14, marginRight: 8 }]}>{item.nftaddress}</Text>
                    <TouchableOpacity onPress={copyToClipboard}>
                      <Image source={require('./icon/blackclip.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginLeft: 9.5,
                    borderBottomWidth: 0.7,
                    borderBottomColor: '#D2D3D3',
                    marginBottom: 16,
                    paddingBottom: 7
                  }}>
                    <Text style={[style.text, { fontSize: 14, marginLeft: 8 }]}>Fan Token : </Text>
                    <Text style={[style.text, { fontSize: 14 }]}>{item.fantoken}</Text>
                  </View>
                </>
              )} />
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 16,
              marginBottom: 16,
              alignSelf: "center"
            }}>
              <Ionicons style={{ marginRight: 24 }} name="logo-youtube" size={36} />
              <Ionicons style={{ marginRight: 24 }} name="logo-twitch" size={36} />
              <Ionicons name="logo-instagram" size={36} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default FancardDetail;