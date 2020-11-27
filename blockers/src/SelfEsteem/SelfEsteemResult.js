import React, { useState, useEffect ,createContext,useContext} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    SafeAreaView,
    ScrollView,
    FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressCircle from "react-native-progress/Circle";
import {AdEventType,InterstitialAd,BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import moment from "moment"
import firestore from '@react-native-firebase/firestore';

export default function SelfEsteemResult({navigation,route}) {
    const {UID}=route.params
    
    const [results,setResults]=useState(0)
    const [resultcontent,setResultcontent]=useState("")
    const [result,setResult]=useState(0)
    const [name,setName]=useState("");
    
    
    
    useEffect(()=>{
        
            uploadInfo()   
        
        if(result>1){
        if(result>=45){
            setResults("Good")
            setResultcontent( "높은 자기효능감을 가지고 있군요! 금연을 성공할 수 있는 자신감이 있는 상태입니다. 금연 리포트 & 정보 에서 내 상태 변화와 다양한 정보를 알아보세요!")
        }else if(35<=result){
            setResults("Normal")
            setResultcontent("보통 수준의 자기 효능감을 가지고 있습니다. 이를 좀 더 높일 수 있도록 모든 일에 자신감을 가지시기 바랍니다.")
            
        }else{
            setResults("Bad")      
            setResultcontent("낮은 자기 효능감을 가지고 있습니다. 항상 자신감 있는 생각과 행동이 필요합니다. 내적인 자신감의 강화와 더불어 세심한 생활관리가 필요합니다.")
        }
    }
        
    },[result])
    async function uploadInfo(){
        var a=moment().toArray()
        console.log(a)
        
        if(a[1]===12){
            a[1]=1
            a[0]=a[0]+1
        }else{
            a[1]=a[1]+1
        }
        var total
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").get().then(querySnapshot=>{
            total=querySnapshot.size-1
        })
        await firestore().collection("UserInfo").doc(UID).get().then(doc=>{
            setName(doc.data().name)
        })
        console.log(total)
        var month
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge"+total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").get().then(doc=>{
            month=doc.data().month-1
        })
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge"+total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc(String(month)).get().then(doc=>{
            setResult(doc.data().resultNum)
        })
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>평가 결과</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={{
                        fontFamily: "NunitoSans-Bold",
                        fontSize: 18,
                        color: "#5cc27b",
                        alignSelf: "center",
                        marginTop: 20
                    }}>{name}님의 자기효능감 평가 결과</Text>
                    <ProgressCircle
                        style={{
                            marginTop: 20,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        size={160}
                        borderWidth={0}
                        thickness={10}
                        progress={result*0.02}
                        color={results === "Good" ? "#5cc27b" : results=="Normal" ? "#ffb83d" : "#fb5757"}
                        unfilledColor="#E0E5EC"
                    >
                        <Text style={{ position: "absolute", flex: 1, color: "#303030", textAlign: "center" }}>
                            <Text style={{ fontSize: 36, fontFamily: "NunitoSans-Bold" }}>{results}</Text>
                        </Text>
                    </ProgressCircle>
                    <View style={{paddingRight: 32, paddingLeft: 32}}>
                        <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 16,
                            color: "#303030",
                            lineHeight: 30,
                            alignSelf: "center",
                            textAlign: "left",
                            marginTop: 20
                        }}>{resultcontent}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <View style={{
                        width: "100%",
                        height: 60,
                        backgroundColor: '#5cc27b',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>완료</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}