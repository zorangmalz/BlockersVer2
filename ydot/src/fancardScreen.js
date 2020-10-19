import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const WIDTH = Dimensions.get('screen').width;

const style = StyleSheet.create({
  containerStatus: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: "#ffffff",
    height: 184,
    borderRadius: 10,
    marginTop: 16,
    marginBottom: 23,
    paddingTop: 26,
    paddingLeft: 14,
    paddingRight: 14
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

function FancardScreen({navigation}) {
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 4 }}>
            <Image source={require('./icon/back.png')} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20 }}>Fan Cards & Likes</Text>
          <View />
        </View>
        <ScrollView style={{ flex: 1 }}>
          <Text style={[style.text, { fontSize: 14, marginTop: 13, marginLeft: '9%' }]}>Fan Cards Collection</Text>
          <View style={style.containerStatus}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginBottom: 8
            }}>
              <TouchableOpacity onPress={() => navigation.navigate('FancardDetail')} style={[style.box, { backgroundColor: '#E78276' }]}>
                <Image source={require('./icon/youtuber.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={[style.box, { backgroundColor: '#9DDADB' }]}>
                <Image source={require('./icon/youtuber.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={[style.box, { backgroundColor: '#FDEA6B' }]}>
                <Image source={require('./icon/youtuber.png')} />
              </TouchableOpacity>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
             <Text style={[style.text, {width: 100, fontSize: 12, textAlign: 'center'}]}>KRAB</Text>
             <Text style={[style.text, {width: 100, fontSize: 12, textAlign: 'center'}]}>MIMI</Text>
             <Text style={[style.text, {width: 100, fontSize: 12, textAlign: 'center'}]}>RIRI</Text>
            </View>
          </View>
          <Text style={[style.text, { fontSize: 14, marginLeft: '9%' }]}>Likes</Text>
          <View style={{
            marginTop: 16,
            width: '90%',
            paddingTop: 16,
            paddingLeft: 14.5,
            paddingRight: 14.5,
            paddingBottom: 12,
            backgroundColor: '#ffffff',
            alignSelf: 'center',
            borderRadius: 10
          }}>
            <FlatList
              data={[
                { key: 1, name: '가짜 사나이 2', date: 'D-20', content: '[프로그램] 수익분배형 제작…', progress: '1,100%' },
                { key: 2, name: '가짜 사나이 2', date: 'D-20', content: '[프로그램] 수익분배형 제작…', progress: '1,100%' },
                { key: 3, name: '가짜 사나이 2', date: 'D-20', content: '[프로그램] 수익분배형 제작…', progress: '1,100%' },
              ]}
              renderItem={({ item }) => (
                <>
                  <View style={{
                    borderBottomWidth: 0.7,
                    borderBottomColor: '#D2D3D3',
                    marginTop: 4,
                    marginBottom: 16,
                    paddingBottom: 9
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 9.5
                    }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('./icon/heart.png')} />
                        <Text style={[style.text, { fontSize: 16, marginLeft: 8 }]}>{item.name}</Text>
                      </View>
                      <Text style={[style.text, { fontSize: 16, marginLeft: 100 }]}>{item.date}</Text>
                    </View>
                    <Text style={{ fontSize: 16, color: '#202426', fontFamily: 'Metropolis-Regular', marginTop: 5, marginLeft: 33.5 }}>{item.content}</Text>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 33.5,
                      marginTop: 11
                    }}>
                      <ProgressBar progress={1} width={WIDTH * 0.45} height={8} color={'black'} />
                      <Text style={[style.text, {fontSize: 16, marginLeft: 20}]}>{item.progress}</Text>
                    </View>
                  </View>
                </>
              )} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default FancardScreen;