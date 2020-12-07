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

import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import LinearGradient from "react-native-linear-gradient";
const data=[
    {
        
        content:"현재 니코틴 의존도가 아주 낮은 수준입니다.\n니코틴 의존도는 흡연량이 많아지거나 흡연한 시간이 길면 길수록 더 높아지게 되어 있습니다.\n‘지금은 좀 피우고 나중에 완전 끊어야지’, ‘나는 하루에 얼마 피지 않으니깐 괜찮아’라고 생각할 수 있는데,\n이렇게 지속적으로 늘리다보면 나중에 완전 금연하는 것이 지금보다 훨씬 더 힘들 것 입니다.\n그래서 가장 쉽게 금연할 수 있는 때가 바로 지금입니다.\n점점 니코틴 의존도가 늘어가기 전에 지금 바로 완전 금연하세요!\n"
    },
    {
        
        content:"현재 니코틴 중독으로 인한 구체적인 증상은 나타나지 않습니다.\n아직은 큰 고통 없이 담배를 끊을 수 있으리라 생각됩니다.\n대신 쉽게 다시 담배를 피우게 되어 결국 금연에 실패하는 경우도 많겠습니다.\n장기간 담배를 피우다 보면 누구라도 심리적, 신체적 의존을 일으키게 됩니다. 일단 의존에 빠지게 되면 자신을 조절하기 힘들어지므로 담배를 끊는 것은 쉽지 않은 일이 되어 버립니다.\n잠재적인 중독의 위험성과 건강에 해가 된다는 점을 생각하면 지금이 바로 금연을 시작해야 할 시기인 것입니다\n"
    },
    {
        
        content:"정도의 차이는 있겠으나 심리적, 신체적으로 니코틴에 대한 의존이 생긴 상태입니다.\n니코틴은 뇌에 흡수되어 여러 가지 약리 작용을 일으키는 물질입니다.\n하지만, 신경에 작용하는 약물 중에는 중독을 일으키기 쉬운 것들이 있으며,\n니코틴도 예외는 아닙니다. 니코틴이 몸에서 빠져나가 혈중 농도가 떨어지면 금단증상을 경험하게 됩니다.\n‘한 대만 피웠으면…’ 하는 조바심도 금단 증상의 한 모습일 뿐입니다.\n담배를 끊기 어려운 이유는 이처럼 금단증상과 내 마음이 뒤섞여 버려 생활의 일부가 되어버리기 때문입니다.\n갑자기 담배를 중단하면, 금단증상으로 금연을 지속하기 어려워질 수 있으므로,\n니코틴 패치 등을 적절히 사용하는 것이 도움이 됩니다.\n"
    },
    {
        content:""
    }
]
export default function SolutionSmokeResult({navigation,route}) {
    const {UID}=route.params
    const [user,setUser]=useState("")
    const [results,setResults]=useState(0)
    const [resultcontent,setResultcontent]=useState("")
    const [result,setResult]=useState(0)
    const [name,setName]=useState("");
    
    const [nicotine,setNicotine]=useState(3)
    const [word,setWord]=useState('')
    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
            
        })
    })
    
    useEffect(()=>{
        if(user){
            uploadInfo()   
        }
    },[user])
    async function uploadInfo(){
        var a=moment().toArray()
        console.log(a)
        
        if(a[1]===12){
            a[1]=1
            a[0]=a[0]+1
        }else{
            a[1]=a[1]+1
        }
        var totals
        
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").get().then(querySnapshot=>{
            totals=querySnapshot.size-1
        })
        var total
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge"+totals).collection("ChallengeDetail").doc("니코틴 중독 평가하기").get().then(doc=>{
            total=doc.data().resNum            
        })
        var nico
        if(total>=7){
            setNicotine(2)
            setWord("Addicted")
            nico=2
        }else if (total>=4){
            setNicotine(1)
            setWord("Danger")
            nico=1
        }else{
            setNicotine(0)
            setWord("Low")
            nico=0
        }
        console.log(nicotine)
        
        await firestore().collection("UserInfo").doc(UID).get().then(doc=>{
            setName(doc.data().name)
        })
      
       
    }
    return (
        <>
            <StatusBar barStyle="default" />
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
                    }}>{name}님의 니코틴중독 평가 결과</Text>
                     <View style={{ marginTop: 16, marginLeft: 32, marginRight: 32 }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Bold",
                                fontSize: 18
                            }}>
                                <Text style={{ color: "#303030" }}>니코틴 중독 정도: </Text>
                                
                                <Text style={{ color: nicotine === 0 ? "#5cc27b" :( nicotine===1 ? "#f6f600":"#ff0400") }}>{word}</Text>
                            </Text>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#5CC27B', '#F6F600', '#FF0400']} style={{ width: "100%", height: 19, borderRadius: 28, marginTop: 16 }} />
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingLeft: 4,
                                paddingRight: 4,
                                marginTop: 8
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    width: 60,
                                    fontFamily: nicotine === 0 ? "NunitoSans-Bold" : "NunitoSans-Regular",
                                    color: nicotine === 0 ? "#5cc27b" : "#303030"
                                }}>Low</Text>
                                <Text style={{
                                    fontSize: 14,
                                    width: 60,
                                    fontFamily: nicotine === 1 ? "NunitoSans-Bold" : "NunitoSans-Regular",
                                    color: nicotine === 1 ? "#f6f600" : "#303030"
                                }}>Danger</Text>
                                <Text style={{
                                    fontSize: 14,
                                    width: 60,
                                    fontFamily: nicotine === 2 ? "NunitoSans-Bold" : "NunitoSans-Regular",
                                    color: nicotine === 2 ? "#ff0400" : "#303030"
                                }}>Addicted</Text>
                            </View>
                            <View style={{
                                marginTop: 16,
                                marginBottom: 16
                            }}>
                                <Text style={{
                                    fontFamily: "NunitoSans-Regular",
                                    fontSize: 16,
                                    color: "#303030",
                                    opacity: 0.7,
                                    lineHeight: 26
                                }}>{data[nicotine].content}</Text>
                            </View>
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