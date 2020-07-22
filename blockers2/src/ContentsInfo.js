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
  FlatList,
  Button,
  TouchableHighlight,
  Clipboard
} from 'react-native';

const styles = {
  icecream: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#48d1cc',

  },
  basic: {
    fontSize: 20,
    padding: 5
  }
}

export default function ContentsInfo({ navigation }) {
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView >
        <View>
          <Image style={styles.icecream} source={require("./icon/icecream.jpg")}></Image>
        </View>
        <Text style={styles.basic}>녹차맛 아이스크림 150g</Text>
        <Text style={styles.basic}>3400원</Text>
        <Text style={styles.basic}>3400원</Text>
        <Text style={styles.basic}>3400원</Text>
        <Text style={styles.basic}>3400원</Text>
        <Text style={styles.basic}>3400원</Text>
      </ScrollView>
      <View style={{ flexDirection: "row", position: "absolute", bottom: 0 }}>
        <View style={[styles.buttonStyle, { backgroundColor: 'black', width: "50%", height: 60 }]}>
          <Text style={{ fontSize: 23, color: 'white' }}>취소</Text>
        </View>
        <View style={[styles.buttonStyle, { backgroundColor: '#5cc27b', width: "50%", height: 60, }]}>
          <TouchableOpacity onPress={() => navigation.navigate('ContentsBuy')}>
            <Text style={{ fontSize: 23, color: 'white' }}>주문하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>

  )

}