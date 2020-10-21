import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import CaverExtKAS from "caver-js-ext-kas";

const style = StyleSheet.create({
  logo: {
    fontFamily: 'Metropolis-Bold',
    color: '#303030',
    fontSize: 40,
    marginBottom: 20
  },
  box: {
    width: 315,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  text: {
    fontFamily: 'Metropolis-Bold',
    fontSize: 16,
    color: '#ffffff'
  },
  color: {
    color: '#303030'
  },
  textinput: {
    width: '80%',
    alignSelf: 'center',
    height: 55,
    fontFamily: 'Metropolis-Regular',
    fontSize: 16,
    color: '#303030',
    marginBottom: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  }
})
const HEIGHT = Dimensions.get("window").height;
export default function SignScreen({navigation}) {
  const [accountvisible, setAccountvisible] = useState(false);
  const [signvisible, setSignvisible] = useState(false);
  const [walletvisible, setWalletvisible] = useState(false);
  
 
  async function requestCall(){
    console.log("imhere")
const caver=new CaverExtKAS()
console.log("enxt")
caver.initKASAPI(1001,"KASK799VQ5VDG5O2WJ8KGWZZ","7hE6dzkae0jz+4TjqD8JtKOnsdY4h0Vg/oKY9sl6")
    // const blockNumber=await caver.rpc.klay.getBlockNumber()
    // console.log(blockNumber)
const account =await caver.kas.wallet.createAccount()
console.log(account.address)
try {
  await AsyncStorage.setItem(
    "wallet",
    account.address
  )
}catch(err){
  console.error(err)
}

setWalletvisible(false)
setSignvisible(false)
setAccountvisible(false)
navigation.navigate("Home")
  }

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#ffffff" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      </SafeAreaView>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF', alignItems: 'center', justifyContent: 'center' }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={accountvisible}
          onRequestClose={() => setAccountvisible(!accountvisible)}
        >
          <SafeAreaView accessibilityRole="header" style={{
            justifyContent: "center",
            alignItems: "center",
            zIndex: 0,
            paddingTop: HEIGHT * 0.1,
            backgroundColor: "#B7B7B7",
          }}>
            <Text style={style.logo}>Y.</Text>
          </SafeAreaView>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#B7B7B7', alignItems: 'center', justifyContent: "flex-end" }}>
            <View style={{
              width: "100%",
              height: 557,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              backgroundColor: '#ffffff',
              alignItems: 'center',
            }}>
              <Text style={[style.text, { color: '#161513', fontSize: 24, marginTop: 26, marginBottom: 48 }]}>Create account</Text>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
                <View style={{ borderWidth: 1, borderColor: "#303030", width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center" }}>
                  <Image resizeMode="contain" style={{ width: 60, height: 60 }} source={require('./icon/kakao.png')} />
                </View>
                <Entypo style={{ marginLeft: 16, marginRight: 16 }} name="twitter-with-circle" size={80} color="#303030" />
                <Entypo name="facebook-with-circle" size={80} color="#303030" />
              </View>
              <Text style={[style.text, { color: '#161513', fontSize: 16, marginTop: 16, marginBottom: 16 }]}>or</Text>
              <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "padding"} enabled>
                <TextInput placeholder="Email Address" placeholderTextColor="#D2D3D3" style={style.textinput} />
                <TextInput placeholder="Password" secureTextEntry={true} placeholderTextColor="#D2D3D3" style={style.textinput} />
                <TextInput placeholder="Password Confirm" secureTextEntry={true} placeholderTextColor="#D2D3D3" style={style.textinput} />
              </KeyboardAvoidingView>
              <TouchableOpacity onPress={() => { setAccountvisible(false) }} style={[style.box, { backgroundColor: '#202426' }]}>
                <Text style={style.text}>Create account</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={signvisible}
          onRequestClose={() => setSignvisible(!signvisible)}
        >
          <SafeAreaView accessibilityRole="header" style={{
            justifyContent: "center",
            alignItems: "center",
            zIndex: 0,
            paddingTop: HEIGHT * 0.1,
            backgroundColor: "#B7B7B7",
          }}>
            <Text style={style.logo}>Y.</Text>
          </SafeAreaView>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#B7B7B7', alignItems: 'center', justifyContent: "flex-end" }}>
            <View style={{
              width: "100%",
              height: 557,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              backgroundColor: '#ffffff',
              alignItems: 'center',
            }}>
              <Text style={[style.text, { color: '#161513', fontSize: 24, marginTop: 26, marginBottom: 48 }]}>{walletvisible === false ? 'Sign In' : 'Wallet Connect'}</Text>
              {walletvisible === false ?
                <>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
                    <View style={{ borderWidth: 1, borderColor: "#303030", width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center" }}>
                      <Image resizeMode="contain" style={{ width: 60, height: 60 }} source={require('./icon/kakao.png')} />
                    </View>
                    <Entypo style={{ marginLeft: 16, marginRight: 16 }} name="twitter-with-circle" size={80} color="#303030" />
                    <Entypo name="facebook-with-circle" size={80} color="#303030" />
                  </View>
                  <Text style={[style.text, { color: '#161513', fontSize: 16, marginTop: 16, marginBottom: 16 }]}>or</Text>
                  <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <TextInput placeholder="Email Address" placeholderTextColor="#D2D3D3" style={style.textinput} />
                    <TextInput placeholder="Password" secureTextEntry={true} placeholderTextColor="#D2D3D3" style={style.textinput} />
                  </KeyboardAvoidingView>
                  <View style={{ height: 75, width: 50 }} />
                </>
                :
                <>
                  <Image style={{marginBottom: 109, marginTop: 17}} source={require('./icon/walletconnect.png')} />
                </>
              }
              {walletvisible === false ?
                <TouchableOpacity onPress={() => setWalletvisible(!walletvisible)} style={style.box}>
                  <Text style={[style.text, { color: '#161513' }]}>Sign In</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => requestCall()} style={[style.box, {height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
                  <Image source={require('./icon/klaytn.png')} />
                  <Text style={[style.text, { color: '#161513', marginLeft: 20 }]}>Connect to Klaytn</Text>
                </TouchableOpacity>
              }
            </View>
          </SafeAreaView>
        </Modal>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
          <Text style={[style.logo, { marginBottom: 4 }]}>Y.</Text>
          <Image source={require('./icon/start.png')} />
        </View>
        <View style={{
          position: 'absolute',
          bottom: 0,
          width: "100%",
          height: 232,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableOpacity onPress={() => setAccountvisible(true)} style={[style.box, { backgroundColor: '#202426' }]}>
            <Text style={style.text}>Create account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSignvisible(true)} style={style.box}>
            <Text style={[style.text, style.color]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};





//     var request = require('request');

// var headers = {
//     'x-chain-id': '1001'
// };

// var options = {
//     url: 'https://wallet-api.klaytnapi.com/v2/account',
//     headers: headers,
//     auth: {
//         'user': 'KASK799VQ5VDG5O2WJ8KGWZZ',
//         'pass': '7hE6dzkae0jz+4TjqD8JtKOnsdY4h0Vg/oKY9sl6'
//     }
// };

// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body.items)
//     }
// }

// request(options, callback);