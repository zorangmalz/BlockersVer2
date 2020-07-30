import React, { useState } from 'react';
import {
  StatusBar,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

const contents = StyleSheet.create({
  icecream: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
    color: '#000000',
    opacity: 0.8,
    margin: 16
  },
  discountprice: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
    marginLeft: 16,
    marginBottom: 16,
    color: '#000000',
    opacity: 0.4,
    textDecorationLine: 'line-through'
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#48d1cc',
  },
  basic: {
    fontSize: 20,
    padding: 5,
    fontFamily: 'NunitoSans-Regular'
  },
  company: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
    color: '#000000',
    opacity: 0.8
  },
  pricebox: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 16,
    marginBottom: 16
  },
  price: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
    opacity: 0.8,
    color: '#000000',
    marginRight: 8
  }
})

export default function ContentsInfo({ navigation }) {
  const [userlogined, setUserlogined] = useState(true);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <ScrollView>
          <View>
            <Image style={contents.icecream} source={require("./icon/icecream.jpg")}></Image>
          </View>
          <Text style={contents.title}>녹차맛 아이스크림 150g</Text>
          <Text style={contents.discountprice}>3400원</Text>
          <View style={contents.pricebox}>
            <Text style={contents.price}>2,720원</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
              <Text style={[contents.price, { opacity: 0.98, color: 'red', marginRight: 4 }]}>20%</Text>
              <Image resizeMode="contain" style={{ width: 12, height: 12 }} source={require('./icon/redway.png')} />
            </View>
            <TouchableOpacity>
              <Text style={{
                width: 60,
                height: 20,
                borderRadius: 10,
                borderColor: '#5cc27b',
                borderWidth: 1,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 10,
                fontFamily: 'NunitoSans-Bold',
                opacity: 0.8,
                color: '#000000'
              }} >Step 03</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            padding: 16,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#E5E5E5'
          }}>
            <Text style={contents.company} >아이스크림 회사1</Text>
          </View>
        </ScrollView>
        <View style={{ flexDirection: "row", position: "absolute", bottom: 0 }}>
          <View style={[contents.buttonStyle, { backgroundColor: '#999999', width: "50%", height: 60 }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Food')}>
              <Text style={{ fontSize: 18, color: 'white', fontFamily: 'NunitoSans-Regular' }}>취소</Text>
            </TouchableOpacity>
          </View>
          <View style={[contents.buttonStyle, { backgroundColor: '#5cc27b', width: "50%", height: 60, }]}>
            <TouchableOpacity onPress={() =>
              userlogined == true ?
                navigation.navigate('주문정보')
                :
                Alert.alert(
                  '로그인이 필요한서비스입니다.',
                  '로그인하고 다양한 혜택을 만나보세요',
                  [
                    {
                      text: '취소', onPress: () => console.log('취소')
                    },
                    {
                      text: '로그인', onPress: () => navigation.navigate('회원가입')
                    }
                  ]
                )
            }>
              <Text style={{ fontSize: 18, color: 'white', fontFamily: 'NunitoSans-Regular' }}>주문하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}