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
  Dimensions
} from 'react-native';



export default function ContentsBuy({ navigation }) {


  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollContainer}>

          <Text style={[styles.fontText, {
            fontSize: 21,
            color: '#707070',
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginTop: 15,
          }]}>주문방법</Text>
          <View style={{
            marginTop: 15,
            marginBottom: 15,
            marginLeft: 10
          }}>

          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.fontText, {
              color: '#707070',
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginBottom: 10,
              marginTop: 10,

            }]}>이름</Text>
            <View style={{ alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
              <TextInput


                placeholder="박지훈"
                textAlign="left"
                onSubmitEditing={Keyboard.dismiss}
                style={{
                  width: 267,
                  height: 36,
                  marginRight: 5,
                  borderWidth: 1,
                  borderColor: '#707070',
                  fontSize: 15,
                  borderRadius: 5
                }}
              />
            </View>
          </View>


          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.fontText, {
              color: '#707070',
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginBottom: 10
            }]}>전화번호</Text>
            <View style={{ alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
              <TextInput

                keyboardType="number-pad"
                placeholder="010-9037-3600"
                textAlign="left"
                onSubmitEditing={Keyboard.dismiss}
                style={{
                  width: 267,
                  height: 40,
                  marginRight: 5,
                  borderWidth: 1,
                  borderColor: '#707070',
                  fontSize: 15,
                  borderRadius: 5
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.fontText, {
              color: '#707070',
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginBottom: 10
            }]}>우편번호</Text>
            <View style={{ alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
              <TextInput

                keyboardType="number-pad"
                placeholder="36917"
                textAlign="left"
                onSubmitEditing={Keyboard.dismiss}
                style={{
                  width: 135,
                  height: 40,
                  marginRight: 5,
                  borderWidth: 1,
                  borderColor: '#707070',
                  fontSize: 15,
                  borderRadius: 5
                }}
              />
            </View>
            <View style={{ backgroundColor: '#ffb83d', width: 59, height: 25, marginTop: 6, marginRight: 20 }}>
              <Text style={{ fontSize: 15, color: 'white', textAlign: "center" }}>주소찾기</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.fontText, {
              color: '#707070',
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginBottom: 10
            }]}>주소</Text>
            <View style={{ alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
              <TextInput

                keyboardType="number-pad"
                placeholder="경북 문경시 문경읍 온천1길 29"
                textAlign="left"
                onSubmitEditing={Keyboard.dismiss}
                style={{
                  width: 267,
                  height: 40,
                  marginRight: 5,
                  borderWidth: 1,
                  borderColor: '#707070',
                  fontSize: 15,
                  borderRadius: 5
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text></Text>
            <TextInput

              keyboardType="number-pad"
              placeholder="1동 202호 (대원퀸즈빌)"
              textAlign="left"
              onSubmitEditing={Keyboard.dismiss}
              style={{
                width: 267,
                height: 40,
                marginRight: 5,
                borderWidth: 1,
                borderColor: '#707070',
                fontSize: 15,
                borderRadius: 5,
                marginBottom: 20

              }}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.fontText, {
              color: '#707070',
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginBottom: 10
            }]}>배송메세지</Text>
            <View style={{ alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
              <TextInput

                keyboardType="number-pad"
                placeholder="집앞에 놔 주세용~"
                textAlign="left"
                onSubmitEditing={Keyboard.dismiss}
                style={{
                  width: 267,
                  height: 40,
                  marginRight: 5,
                  borderWidth: 1,
                  borderColor: '#707070',
                  fontSize: 15,
                  borderRadius: 5
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image style={{ width: 90, height: 90 }} source={require("./icon/icecream.jpg")}></Image>
            <View>
              <Text>
                녹차맛 아이스크림 150g
          </Text>
              <Text>
                녹차맛 아이스크림 150g
          </Text><Text>
                녹차맛 아이스크림 150g
          </Text><Text>
                녹차맛 아이스크림 150g
          </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>
              최종 결제금액
              </Text>
            <Text>
              5,120원
              </Text>
          </View>
        </ScrollView>
        <View style={{ flexDirection: "row", position: "absolute", bottom: 0 }}>
          <View style={[styles.buttonStyle, { backgroundColor: '#5cc27b', width: "100%", height: 60, }]}>
            <Text style={{ fontSize: 23, color: 'white' }}>결제하기</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};




const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: 'white',
  },
  scrollContainer: {
    backgroundColor: "#ffffff",
    paddingRight: 18,
    paddingLeft: 18,
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
    fontWeight: '600',
    color: '#79808c'
  },
  fontSubTitle: {
    fontSize: 21,
    fontWeight: '600',
    marginLeft: 10,
    color: '#79808c'
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#48d1cc'
  }
});

//상태변화