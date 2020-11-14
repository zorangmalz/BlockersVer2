import React, { useEffect,useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from "@react-native-firebase/firestore"
import { loadOptions } from '@babel/core';

const HEIGHT = Dimensions.get("screen").height;

export default function SolutionResult({navigation,route}) {
const {UID}=route.params
const [item,setItem]=useState([])
async function load(){
    const list=[]
    await firestore()
  .collection('UserInfo').doc(UID).collection("Solution")
  // Order results
  .orderBy('answer', 'desc')
  .get()
  .then(querySnapshot => {  
        querySnapshot.forEach(function (doc) {
            
            list.push({first:doc.id})
      })
      setItem(list)
    /* ... */
  });
}
useEffect(()=>{
    
    console.log(UID)
   load()
  console.log(item,"ITEm")
})
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
            <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: "center", height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%", backgroundColor: '#ffffff' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={25} />
                    </TouchableOpacity>
                    <View
                        style={{
                            height: 44,
                            flexDirection: 'row',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            marginLeft: 20
                        }}
                    >
                        <Text style={{ fontSize: 18 }}>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>흡연유형 알아보기</Text>
                        </Text>
                    </View>
                </View>
                <View style={{
                    marginHorizontal: "9%"
                }}>
                    <Text style={{
                        fontFamily: "NunitoSans-Bold",
                        fontSize: 18,
                        marginTop: HEIGHT * 0.1
                    }}>
                        <Text style={{color: "#303030"}}>주요 흡연 요인:</Text>
                        <Text style={{color: "#5cc27b"}}> 스트레스</Text>
                    </Text>
                    <Text style={{
                        fontFamily: "NunitoSans-Regular",
                        marginTop: HEIGHT * 0.025,
                        fontSize: 16
                    }}>행동전략</Text>
                    <Text style={{
                        fontFamily: "NunitoSans-Bold",
                        fontSize: 18,
                        marginTop: HEIGHT * 0.07
                    }}>
                        <Text style={{color: "#303030"}}>보조 흡연 요인:</Text>
                        <Text style={{color: "#FFB83D"}}> 습관성, 즐거움 추구</Text>
                    </Text>
                    <Text style={{
                        fontFamily: "NunitoSans-Regular",
                        marginTop: HEIGHT * 0.025,
                        fontSize: 16
                    }}>행동전략</Text>
                </View>
            </SafeAreaView>
            <SafeAreaView onPress={() => navigation.navigate("Home")} style={{flex: 0}}>
                <TouchableOpacity style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "#5cc27b",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontFamily: "NunitoSans-Bold",
                        fontSize: 18,
                        color: "#ffffff"
                    }}>완료</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}