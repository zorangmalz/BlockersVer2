import React, { useState ,useEffect} from 'react';
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
  AsyncStorage
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';



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
const [wallet,setWallet]=useState('')
  const copyToClipboard = () => {
    Clipboard.setString('hello world')
  }
async function retrieveData(){
  try{
    const value=await AsyncStorage.getItem("wallet")
    console.log(value)
    setWallet(value)
  }
  catch(err){
    console.error(err)
  }
}
useEffect(()=>{
  retrieveData()
  
},[])
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: "center",
              alignItems: 'center',
              marginLeft: '37.5%'
            }}
          >
            <Text style={{ fontSize: 24 }}>
              <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20 }}>My Page</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('SignScreen')} style={{ marginLeft: 8 }}>
            <Ionicons name="settings-sharp" color="#161513" size={28} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={style.containerStatus}>
            <View style={{ marginTop: 26, marginLeft: 31, marginRight: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 10, fontFamily: 'Metropolis-Bold', color: "white", marginRight: 8 }}>{wallet}</Text>
                  <TouchableOpacity onPress={copyToClipboard}>
                    <Image source={require('./icon/clipboard.png')} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Transaction')}>
                  <Text style={{ textDecorationLine: 'underline', fontSize: 12, fontFamily: 'Metropolis-Regular', color: "white" }}>Transaction</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ marginTop: 32, fontSize: 16, fontFamily: 'Metropolis-Bold', color: "white" }}>5.8 Klay</Text>
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











//무덤


// function temp(){
//   var axios=require("axios")
//   const accessKey = "KASKT37TZEH7QSUWDC26TT0L";
//   const secret = "zMMs4rHWOJqwOcEl0wCucuDVB6oAcmLbWaRe9oCL";
//   const credential = Buffer.from(`${accessKey}:${secret}`).toString("base64");
// console.log(credential)
//   const configForDeployContract = {
//     method: 'POST',
//     url: `https://wallet-api.beta.klaytn.io/v2/tx/value`,
//     headers: {
//         'x-chain-id': '1001',
//         "Authorization": "Basic S0FTS1ZMOEJYUEdJM1RPNkI5NzVMUUNOOkdMZ2pZUExza2JkdmRZczByL3lYTUlsQ0k4dnhNSkg1YWhyMmFWamo=",
//         'Content-Type': 'application/json'
//     },
//     data: {
//         from: '0xFE071C182b38c9E1901649527d40EDeC072dd4a6',
//         value: "0x12",
//         nonce: 0,
//         to:"0x33035dd1f7f9cFDd60066F2d3946fc14ca926D4a",
//     }
// }
// axios(configForDeployContract)
//     .then((response) => {
//         console.log(response)
//     })
//     .then((error) => {
//         console.log(error,"errordlqslek")
//     })
//  }

//   function send(){
//     var request = require('request');
// var headers = {
//   'Content-Type': 'application/json',
//     'x-chain-id':"1001",
//     "Authorization": "Basic S0FTS1ZMOEJYUEdJM1RPNkI5NzVMUUNOOkdMZ2pZUExza2JkdmRZczByL3lYTUlsQ0k4dnhNSkg1YWhyMmFWamo=",
// };
// var dataString = '{ "from":"0x33035dd1f7f9cFDd60066F2d3946fc14ca926D4a", "value": "0x12", "to":"0xc3c266Efa54923Ea1e67ef9C4F35B7a0a82DaAD7", "memo":"with memo", "nonce": 0, "gas_limit": 1000000, "submit": true, "fee_ratio": 0 }';
// var options = {
//     url: 'https://wallet-api.beta.klaytn.io/v2/tx/value',
//     headers: headers,
//     body: dataString,
// };
// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//         console.log(response)
        
//     }else{
//       console.log(body,"error")
//       console.error(error)
//     }
// }
// request(options, callback);
//   }


//   function sendFetch(){
//     fetch("https://wallet-api.beta.klaytn.io/v2/tx/value", {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             "x-chain-id": "1001",
//             "Authorization": "Basic S0FTS1ZMOEJYUEdJM1RPNkI5NzVMUUNOOkdMZ2pZUExza2JkdmRZczByL3lYTUlsQ0k4dnhNSkg1YWhyMmFWamo=",
//         },
//         data:{
//             from: '0xFE071C182b38c9E1901649527d40EDeC072dd4a6',
//             value: "0x12",
//             nonce: 0,
//             to:"0x33035dd1f7f9cFDd60066F2d3946fc14ca926D4a",
//         }
        
//       }).then(res => res.json())
//       .then(json => console.log(json));

//   }

// function token(){
//   var request = require('request');

//   var headers = {
//       'x-chain-id': '1001',
//       'Content-Type': 'application/json'
//   };
  
//   var options = {
//       url: 'https://th-api.beta.klaytn.io/v1/account/0x7160a9d133b2b1288ec278ba4f5aea38fea6cd44',
//       headers: headers,
//       auth: {
//           'user': 'KASKT37TZEH7QSUWDC26TT0L',
//           'pass': 'zMMs4rHWOJqwOcEl0wCucuDVB6oAcmLbWaRe9oCL'
//       }
//   };
  
//   function callback(error, response, body) {
//       if (!error && response.statusCode == 200) {
//           console.log(body);
//       }else{
//         console.log(error)
//       }
//   }
  
//   request(options, callback);
  

// }