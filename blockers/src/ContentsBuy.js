import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Keyboard,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

const contents = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
    opacity: 0.8,
    color: '#000000'
  },
  textinput: {
    width: "75%",
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999999',
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
    color: '#999999'
  },
  viewContainer: {
    backgroundColor: 'white',
  },
  box: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "#48d1cc",
    borderWidth: 3,
    alignItems: 'center',
  },
  fontText: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
    color: '#79808c'
  },
  fontSubTitle: {
    fontSize: 21,
    fontFamily: 'NunitoSans-Regular',
    marginLeft: 10,
    color: '#79808c'
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#48d1cc'
  }
});

export default function ContentsBuy({ navigation }) {
  const [moneyEnough, setMoneyEnough] = useState(true);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View style={{ alignItems: 'center', flexDirection: "row", justifyContent: "space-between", marginLeft: 16, marginRight: 16, marginTop: 32}}>
            <Text style={contents.title} >이름</Text>
              <TextInput
                placeholder="박지훈"
                textAlign="left"
                onSubmitEditing={Keyboard.dismiss}
                style={contents.textinput}
              />
          </View>
          <View style={{ alignItems: 'center', flexDirection: "row", justifyContent: "space-between", marginLeft: 16, marginRight: 16, marginTop: 8}}>
            <Text style={contents.title} >전화번호</Text>
              <TextInput
                placeholder="010 - 4697 - 9554"
                textAlign="left"
                onSubmitEditing={Keyboard.dismiss}
                style={contents.textinput}
              />
          </View>
          <View style={{ alignItems: 'center', flexDirection: "row", justifyContent: "space-between", marginLeft: 16, marginRight: 16, marginTop: 8 }}>
            <Text style={contents.title} >우편번호</Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: "75%"
            }}>
              <TextInput
                placeholder="36917"
                textAlign="left"
                onSubmitEditing={Keyboard.dismiss}
                style={[contents.textinput, { width: "50%", alignSelf: 'flex-start' }]}
              />
              <TouchableOpacity onPress={() => navigation.navigate('주소찾기')} style={{
                width: 64,
                height: 24,
                borderRadius: 5,
                backgroundColor: '#ffb83d',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 16
              }}>
                <Text style={{
                  fontSize: 12,
                  fontFamily: 'NunitoSans-Bold',
                  color: '#ffffff',
                }}>주소찾기</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center', flexDirection: "row", justifyContent: "space-between", marginLeft: 16, marginRight: 16, marginTop: 8}}>
            <Text style={contents.title} >주소</Text>
              <TextInput
                placeholder="경상북도 문경시 문경읍 온천1길 29"
                textAlign="left"
                onSubmitEditing={Keyboard.dismiss}
                style={contents.textinput}
              />
          </View>
          <View style={{ alignItems: 'center', flexDirection: "row", justifyContent: "space-between", marginLeft: 16, marginRight: 16, marginTop: 8}}>
            <Text style={contents.title} ></Text>
              <TextInput
                placeholder="1동 202호 (대원퀸즈빌)"
                textAlign="left"
                onSubmitEditing={Keyboard.dismiss}
                style={contents.textinput}
              />
          </View>
          <View style={{ alignItems: 'center', flexDirection: "row", justifyContent: "space-between", marginLeft: 16, marginRight: 16, marginTop: 8, marginBottom: 16}}>
            <Text style={contents.title}>배송메시지</Text>
              <TextInput
                textAlign="left"
                onSubmitEditing={Keyboard.dismiss}
                style={contents.textinput}
              />
          </View>
          <View style={{ 
            flexDirection: "row", 
            alignItems: 'center', 
            justifyContent: 'flex-start',
            width: "100%",
            padding: 16,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#E5E5E5'
          }}>
            <Image style={{ width: 90, height: 90, borderRadius: 10, marginRight: 32 }} source={require("./icon/icecream.jpg")}></Image>
            <View>
              <Text style={contents.title}>녹차맛 아이스크림 150g</Text>
              <Text style={{
                fontSize: 14,
                fontFamily: 'NunitoSans-Bold',
                color: '#999999',
                marginTop: 8,
              }}>3,400원</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'NunitoSans-Bold',
                  color: '#ffb83d',
                  marginTop: 8
                }}
              >+ 배송비 2,500원</Text>
              <Text style={{
                fontSize: 12,
                fontFamily: 'NunitoSans-Bold',
                color: '#5cc27b',
                marginTop: 4
              }}>- 회원 할인 680원</Text>
            </View>
          </View>
          <Text
            style={{
              marginTop: 16,
              marginLeft: 16,
              fontSize: 14,
              fontFamily: 'NunitoSans-Bold',
              color: '#999999'
            }}
          >최종 결제금액</Text>
        </ScrollView>
        <TouchableOpacity style={{ flexDirection: "row", position: "absolute", bottom: 0 }}
          onPress={() => 
            moneyEnough === true ?
            navigation.navigate('ContentsComplete')
            :
            Alert.alert(
              '잔액이 부족합니다.',
              '충전하시겠습니까?',
              [
                {
                  text: '취소', onPress: () => navigation.goback()
                },
                {
                  text: '충전하기', onPress: () => navigation.navigate('입금')
                }
              ]
            )
          }
        >
          <View style={[contents.buttonStyle, { backgroundColor: '#5cc27b', width: "100%", height: 60, }]}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'NunitoSans-Regular' }}>결제하기</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};