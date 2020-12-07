import React, { useState, useEffect } from 'react';
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
import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';

export default function AlcoholResult({navigation,route}) {
    const {UID}=route.params
    const [user,setUser]=useState()
    const [results,setResults]=useState("")
    const [result,setResult]=useState(0)
    const [resultcontent,setResultcontent]=useState("")
    
    const [name,setName]=useState("");
    var total=0
    useEffect(()=>{
        
            uploadInfo()   
           
        if(result>1){
        if(result>=35){
            setResults("Bad")
            setResultcontent( "알콜 남용이나 의존 단계입니다. 음주량과 음주횟수 조절이 어려운 상태입니다. 술을 마셔야 기분도 좋고 일도 잘되고 관계도 좋아진다고 생각합니다. 술을 줄이는 단계가 아니라 끊어야 합니다. \n● 신체 질환이나 사회적 역할에 어려움이 있을 것입니다. 예) 직장, 가정, 지역사회에서 술로 인한 사회적 혹은 법적 문제 유발(음주운전이나 가정폭력 등) 전문 병/의원이나 알콜상담센터 혹은 정신보건센터에 연계하여 진단과 치료를 받도록 합니다. 신체에 질병이 생기면 치료받아야 나을 수 있는 것처럼 알콜 사용 장애도 치료가 필요한 질병입니다")
        }else if(15<= result){
            setResults("Normal")
            setResultcontent("위험 음주 단계입니다. 음주량과 음주횟수가 너무 많습니다. 아직은 술 때문에 큰 문제가 없지만 음주문제 예방을 위해 아래 지침을 지켜주세요. \n● 정상 음주군에서 권고한 음주 기준을 지키세요. \n● 과음으로 인한 음주 폐해에 대한 교육이 필요합니다. \n● 전문요원에게 상담을 받으세요. 음주를 유발하는 상황과 음주패턴의 특징을 파악하기 과음을 피할 수 있는 방법 택하기 예) 음주 일지 작성, 작은 잔으로 마시기, 술에 물을 타서 마시기, 음주 속도 제한, 스트레스 대처 방법 훈련, 폭탄주 혹은 독주 피하기, 안주 충분히 먹기, 술 마시지 않는 날 정하기 등 \n● 주기적으로 음주행동을 점검하고 알콜의존도평가(AUDIT-K) 재수행")
            console.log("here")
        }else {
            setResults("Good")      
            setResultcontent("정상 음주입니다. 지금까지는 비교적 건강하고 안전한 음주습관을 지니고 있습니다. 적정음주량을 유지하고 건강음주지침을 지켜주세요. \n● 음주량을 지켜주세요. 한자리에서 남성: 2~4잔 / 여성: 1~2잔 이하 * 일주일에 2~3일은 금주 65세 이상의 노인도 1주당 5잔 미만")
        }}
        
    },[result])
    async function uploadInfo(){
        var a=moment().toArray()
        console.log(a)
        
        if(a[1]===12){
            a[1]=1
        }else{
            a[1]=a[1]+1
        }
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").get().then(querySnapshot=>{
            total=querySnapshot.size-1
        })
        await firestore().collection("UserInfo").doc(UID).get().then(doc=>{
            setName(doc.data().name)
        }) 
        var month
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge"+total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").get().then(doc=>{
            month=doc.data().month-1
        })
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge"+total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").doc(String(month)).get().then(doc=>{
            setResult(doc.data().resultNum)
        })
        console.log(total)
        
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
                    }}>{name}님의 알콜중독 평가 결과</Text>
                    <ProgressCircle
                        style={{
                            marginTop: 20,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        size={160}
                        borderWidth={0}
                        thickness={10}
                        progress={result * 0.025}
                        color={results === "Good" ? "#5cc27b" : results == "Normal" ? "#ffb83d" : "#fb5757"}
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