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
  FlatList
} from 'react-native';
import Clipboard from "@react-native-community/clipboard";
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as RNFS from 'react-native-fs';

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
 function temp(){
  var axios=require("axios")
  const accessKey = "KASKT37TZEH7QSUWDC26TT0L";
  const secret = "zMMs4rHWOJqwOcEl0wCucuDVB6oAcmLbWaRe9oCL";
  const credential = Buffer.from(`${accessKey}:${secret}`).toString("base64");
console.log(credential)
  const configForDeployContract = {
    method: 'POST',
    url: `https://wallet-api.beta.klaytn.io/v2/tx/value`,
    headers: {
        'x-chain-id': '1001',
        "Authorization": "Basic S0FTS1ZMOEJYUEdJM1RPNkI5NzVMUUNOOkdMZ2pZUExza2JkdmRZczByL3lYTUlsQ0k4dnhNSkg1YWhyMmFWamo=",
        'Content-Type': 'application/json'
    },
    data: {
        from: '0xFE071C182b38c9E1901649527d40EDeC072dd4a6',
        value: "0x12",
        nonce: 0,
        to:"0x33035dd1f7f9cFDd60066F2d3946fc14ca926D4a",
    }
}
axios(configForDeployContract)
    .then((response) => {
        console.log(response)
    })
    .then((error) => {
        console.log(error,"errordlqslek")
    })
 }

  function send(){
    var request = require('request');
var headers = {
  'Content-Type': 'application/json',
    'x-chain-id':"1001",
    "Authorization": "Basic S0FTS1ZMOEJYUEdJM1RPNkI5NzVMUUNOOkdMZ2pZUExza2JkdmRZczByL3lYTUlsQ0k4dnhNSkg1YWhyMmFWamo=",
};
var dataString = '{ "from":"0x33035dd1f7f9cFDd60066F2d3946fc14ca926D4a", "value": "0x12", "to":"0xc3c266Efa54923Ea1e67ef9C4F35B7a0a82DaAD7", "memo":"with memo", "nonce": 0, "gas_limit": 1000000, "submit": true, "fee_ratio": 0 }';
var options = {
    url: 'https://wallet-api.beta.klaytn.io/v2/tx/value',
    headers: headers,
    body: dataString,
};
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        console.log(response)
        
    }else{
      console.log(body,"error")
      console.error(error)
    }
}
request(options, callback);
  }


  function sendFetch(){
    fetch("https://wallet-api.beta.klaytn.io/v2/tx/value", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-chain-id": "1001",
            "Authorization": "Basic S0FTS1ZMOEJYUEdJM1RPNkI5NzVMUUNOOkdMZ2pZUExza2JkdmRZczByL3lYTUlsQ0k4dnhNSkg1YWhyMmFWamo=",
        },
        data:{
            from: '0xFE071C182b38c9E1901649527d40EDeC072dd4a6',
            value: "0x12",
            nonce: 0,
            to:"0x33035dd1f7f9cFDd60066F2d3946fc14ca926D4a",
        }
        
      }).then(res => res.json())
      .then(json => console.log(json));

  }
const [copiedText, setCopiedText] = useState('')

  const copyToClipboard = () => {
    Clipboard.setString('hello world')
  }
function token(){
  var request = require('request');

  var headers = {
      'x-chain-id': '1001',
      'Content-Type': 'application/json'
  };
  
  var options = {
      url: 'https://th-api.beta.klaytn.io/v1/account/0x7160a9d133b2b1288ec278ba4f5aea38fea6cd44',
      headers: headers,
      auth: {
          'user': 'KASKT37TZEH7QSUWDC26TT0L',
          'pass': 'zMMs4rHWOJqwOcEl0wCucuDVB6oAcmLbWaRe9oCL'
      }
  };
  
  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body);
      }else{
        console.log(error)
      }
  }
  
  request(options, callback);
  

}
// function send(){
//   var request = require('request');
// console.log("come")
// var headers = {
//     'X-Krn': 'krn:1001:wallet:GC1:account:rp1',
//     'Content-Type': 'application/json'
// };

// var dataString = '{ "from":"0xf4584afef226e41b384e11b94a9e2f635366dc97", "value": "0x91100000000000", "to":"0xFE071C182b38c9E1901649527d40EDeC072dd4a6", "submit": true }';

// var options = {
//     url: 'https://wallet-api.beta.klaytn.io/v2/tx/value',
//     method: 'POST',
//     headers: headers,
//     body: dataString,
//     auth: {
//       'user': 'KASKT37TZEH7QSUWDC26TT0L',
//       'pass': 'zMMs4rHWOJqwOcEl0wCucuDVB6oAcmLbWaRe9oCL'
//     }
// };

// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     }else{
//       console.log(body)
//     }
// }

// request(options, callback);

// }
// function deploy(){
//   var request = require('request');
// console.log("come")
// var headers = {
//     'x-chain-id': '1001',
//     'Content-Type': 'application/json'
// };

// var dataString = '{ "from": "0xFE071C182b38c9E1901649527d40EDeC072dd4a6", "value": "0x0", "input": "0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029", "nonce": 0, "gas": 1000000, "submit": true, "feeRatio": 0 }';
// var deploying=""
// var options = {
//     url: 'https://wallet-api.klaytnapi.com/v2/tx/fd/contract/deploy',
//     method: 'POST',
//     headers: headers,
//     auth:{
//       'user': 'KASKT37TZEH7QSUWDC26TT0L',
//       'pass': 'zMMs4rHWOJqwOcEl0wCucuDVB6oAcmLbWaRe9oCL'
//     },
//     body: dataString
// };

// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     }else{
//       console.log(body)
//     }
    
// }

// request(options, callback);

// }

// function deployconfirm(){
//   var request = require('request');
// console.log("come")
// var headers = {
//   'x-chain-id': '1001',
//     'Content-Type': 'application/json'
// };

// var dataString = '{ "method": "klay_getTransactionReceipt", "params": [ "0x9764f723e90349d8627ea363eed1d0b30e91b4c72c7b304cc1291243453a23d1" ], "id": 1 }'

// var options = {
//     url: 'http://13.125.2.103:8551/v1/klaytn',
//     method: 'POST',
//     headers: headers,
//     auth:{
//       'user': 'KASKT37TZEH7QSUWDC26TT0L',
//       'pass': 'zMMs4rHWOJqwOcEl0wCucuDVB6oAcmLbWaRe9oCL'
//     },
//     body: dataString
// };

// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body,"success");
//     }else{
//       console.log(body)
//       console.log(error)
//     }
    
// }

// request(options, callback);

// }
useEffect(()=>{
  token()
  // check()
  
},[])
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
            <TouchableOpacity onPress={()=>sendFetch()}>
            <Text style={{ fontSize: 24 }}>
              <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20, }}>My Page</Text>
            </Text>
            </TouchableOpacity>
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
                  <Text style={{ fontSize: 10, fontFamily: 'Metropolis-Bold', color: "white", marginRight: 8 }}>0xc0d025e12ad38219f0ae3e049990ce9067becd26</Text>
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