import React, { useEffect,useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
const alram = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        marginLeft: 8
    },
    box: {
        width: "100%",
        height: 120,
        paddingTop: 25,
        paddingBottom: 39,
        paddingLeft: 40,
        paddingRight: 32
    },
    content: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
        marginTop: 14,
        marginLeft: 16
    }
})

export default function AlramScreen({ navigation }) {
    const [user,setUser]=useState("")
    const [items,setItems]=useState([])
    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
    },[])
    useEffect(()=>{
        if(user){
            const list=[]
            firestore().collection("UserInfo").doc(user.uid).collection("Alarm").orderBy("realDate","desc").onSnapshot(querySnapshot=>{
                querySnapshot.forEach(function(doc){
                    list.push({
                        title:doc.data().title,
                        content:doc.data().content,
                        stats:doc.data().stats,
                        date:doc.data().date,
                        id:doc.data().realDate,
                        docID:doc.data().docID,
                        type:doc.data().type
                    })
                })
                setItems(list)
            })
        }
    })


    const alramData = [
        {
            id: 1,
            title: "댓글 알림",
            content: "회원님의 글에 누군가 댓글을 남겼습니다.",
            date: "2020/10/30"
        },
        {
            id: 2,
            title: "챌린지 알림",
            content: "진행해야할 챌린지가 추가되었습니다.",
            date: "2020/11/10"
        },
        {
            id: 3,
            title: "복약 알림",
            content: "복약을 진행해주세요.",
            date: "2020/11/20"
        },
    ]
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={25} />
                    </TouchableOpacity>
                    <View
                        style={{
                            height: 44,
                            flexDirection: 'row',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            marginLeft: 24
                        }}
                    >
                        <Text style={{ fontSize: 18 }}>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>알림</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <FlatList
                        data={items}
                        renderItem={({ item }) => (
                            <>
                            {item.type==="community"? 
                                    <>
                                    <TouchableOpacity onPress={()=>navigation.navigate("CommunityOtherPost",{docID:item.docID,Uid:user.uid})}>
                                    <View style={alram.box}>
                                    
                                    
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            
                                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#5cc27b' }} />
                                            <Text style={alram.title}>{item.title}</Text>
                                        </View>
                                        <Text style={{
                                            fontFamily: "NunitoSans-Regular",
                                            fontSize: 14,
                                            color: "#303030"
                                        }}>{item.date}</Text>
                                    </View>
                                    <Text style={alram.content}>{item.content}</Text>
                                </View>
                                </TouchableOpacity>
                                <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} /></>

                                    : 
                                    <>
                                    <View style={alram.box}>
                                    
                                    
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            
                                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#5cc27b' }} />
                                            <Text style={alram.title}>{item.title}</Text>
                                        </View>
                                        <Text style={{
                                            fontFamily: "NunitoSans-Regular",
                                            fontSize: 14,
                                            color: "#303030"
                                        }}>{item.date}</Text>
                                    </View>
                                    <Text style={alram.content}>{item.content}</Text>
                                </View>
                                <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                                    </>
                                    }
                                
                            </>
                        )}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    )
}