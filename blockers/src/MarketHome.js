import React, {useLayoutEffect} from 'react'
import { Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import { SafeAreaView } from 'react-native-safe-area-context'

const styles = {
  wrapper: {

  },
  container: {
    height: 300
  },
  slide1: {
    height: 300,
    justifyContent: 'center',
  },
  slide2: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'NunitoSans-Regular'
  },
  backImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text1: {
    fontSize: 15,
    color: "white",
    marginBottom: 30,
    fontFamily: 'NunitoSans-Regular'
  },
  ImageSquare: {
    marginTop: 26
  },
  textSub: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
    textAlign: "center",
    color: '#303030'
  }
}

export default function MarketHome({ navigation }) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={styles.container}>
          <Swiper style={styles.wrapper} height={300} loop={true}>
            <ImageBackground source={require("./icon/crispy.jpg")} style={styles.backImage}>
              <View testID="Hello" style={styles.slide1 }>
                <Text style={[styles.text1,{paddingLeft: 28}]}>Blockers Promotion</Text>
                <Text style={[styles.text,{paddingLeft: 28}]}>30% OFF</Text>
                <Text style={[styles.text,{paddingLeft: 28}]}>Crispy Cream</Text>
              </View>
            </ImageBackground>
            <View testID="Beautiful" style={styles.slide2}>
              <Text style={styles.text}>등킨도나-쓰</Text>
            </View>
            <View testID="Simple" style={styles.slide3}>
              <Text style={styles.text}>뜨끈하고 든든한 순대국밥</Text>
            </View>
          </Swiper>
        </View>
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Food')}>
            <View style={styles.ImageSquare}>
              <Image source={require("./icon/1.png")}></Image>
              <Text style={styles.textSub}>Category 1</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.ImageSquare}>
            <Image source={require("./icon/2.png")}></Image>
            <Text style={styles.textSub}>Category 2</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly'  }}>
          <View style={styles.ImageSquare}>
            <Image source={require("./icon/3.png")}></Image>
            <Text style={styles.textSub}>
              Category 3</Text>
          </View>
          <View style={styles.ImageSquare}>
            <Image source={require("./icon/4.png")}></Image>
            <Text style={styles.textSub}>Category 4</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}