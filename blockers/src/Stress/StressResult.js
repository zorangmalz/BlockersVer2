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
import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import ProgressCircle from "react-native-progress/Circle";

export default function StressResult({navigation,route}) {
    const {UID}=route.params
    
    const [results,setResults]=useState("")
    const [result,setResult]=useState(0)
    const [resultcontent,setResultcontent]=useState("")
    const [name,setName]=useState("");
    
    useEffect(()=>{
        
            uploadInfo()   
        
        if(result>1){
        if(result>=50){
            setResults("Bad")
            setResultcontent( "사람들에 비해 스트레스 정도가 많은 편입니다. 스트레스는 적당한 경우에 능률을 향상시키는 역할을 하지만, 지속적인 스트레스는 결국 인체의 저항력을 고갈시키고, 우울증, 정신증과 같은 정신과적 증상으로도 나타날 수 있습니다. 스스로의 상태를 주시하면서 주위의 도움을 청하고 스트레스 해소를 위한 방법을 적극적으로 찾아야 합니다. 상당한 정도의 스트레스를 경험하고 있거나 오랫동안 과다한 스트레스로 어려움을 겪었을 것으로 보입니다. 따라서 이를 극복하기 위해 좀 더 적극적인 노력이 필요합니다.")
        }else if(35<=result){
            setResults("Normal")
            setResultcontent("예방적 행위가 필요합니다. 당신의 스트레스 반응이 위험한 상태로서 도움받을 필요가 있습니다. 포괄적인 스트레스 관리 계획이 필요합니다.")
            console.log("here")
        }else {
            setResults("Good")      
            setResultcontent("다른 사람들에 비해 스트레스 정도가 적은 편입니다. 스트레스는 적당한 경우에 능률을 향상시키는 역할을 하지만, 지속적인 스트레스는 결국 인체의 저항력을 고갈시키고, 우울증, 정신증과 같은 정신과적 증상으로도 나타날 수 있습니다. 스스로의 상태를 주시하면서 주위의 도움을 청하고 스트레스 해소를 위한 방법을 적극적으로 찾아야 합니다.당신은 이미 스트레스 상황에 특별한 방식으로 잘 대처하고 있습니다. 특별한 조치가 필요 없습니다. 지금 상태를 유지할 수 있도록 노력하세요!")
        }
    }
    },[result])
    async function uploadInfo(){
        var a=moment().toArray()
        
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
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge"+total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").get().then(doc=>{
            month=doc.data().month-1
        })
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge"+total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").doc(String(month)).get().then(doc=>{
            setResult(doc.data().resultNum)
        })
        console.log(total)
        
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
                    }}>{name}님의 스트레스 평가 결과</Text>
                    <ProgressCircle
                        style={{
                            marginTop: 20,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        size={160}
                        borderWidth={0}
                        thickness={10}
                        progress={result * 0.01538}
                        color={results === "Good" ? "#5cc27b" : results == "Normal" ? "#ffb83d" : "#fb5757"}
                        unfilledColor="#E0E5EC"
                    >
                        <Text style={{ position: "absolute", flex: 1, color: "#303030", textAlign: "center" }}>
                            <Text style={{ fontSize: 36, fontFamily: "NunitoSans-Bold" }}>{results}</Text>
                        </Text>
                    </ProgressCircle>
                    <View style={{paddingRight: 16, paddingLeft: 16}}>
                        <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 16,
                            color: "#303030",
                            lineHeight: 30,
                            alignSelf: "center",
                            textAlign: "center",
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