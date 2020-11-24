import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

const login = StyleSheet.create({
    rule: {
        fontSize: 12,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
        opacity: 0.4,
        alignSelf: 'center',
        width: "80%",
        textAlign: 'center',
    },
    textinput: {
        fontSize: 21,
        fontFamily: 'NunitoSans-Bold',
        opacity: 0.7,
        color: '#303030',
        borderBottomColor: '#5cc27b',
        borderBottomWidth: 1,
        alignSelf: 'center',
    },
    repeat: {
        marginLeft: "10%",
        marginTop: 8,
        alignSelf: 'flex-start',
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#ff0000'
    }
})

export default function ProfileNickname({ navigation }) {
    const [nickname, setNickname] = useState('');
    const [currentNick, setCurrentNick] = useState("");
    const [same, setSame] = useState(false)

    useEffect(() => {
        firestore().collection("UserInfo").get()
            .then(documentSnapshot => {
                documentSnapshot.forEach(doc => {
                    const data = doc.data().nickname
                    if (nickname === data) {
                        setSame(true)
                    } else {
                        setSame(false)
                    }
                })
            })
    }, [nickname])
    
    async function NicknameUpdate() {
        const user = firebase.auth().currentUser
        if (same) {
            Alert.alert(
                "중복된 닉네임입니다.",
                "",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("중복")
                    }
                ]
            )
        } else if (nickname.length > 0 && !same) {
            console.log("변경")
            await firestore().collection("UserInfo").doc(user.uid)
                .update({
                    nickname: nickname
                });
            Alert.alert(
                "변경완료",
                "",
                [
                    {
                        text: "확인",
                        onPress: navigation.goBack()
                    }
                ]
            )
        }
    }

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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>닉네임 변경</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <TextInput onChangeText={text => setNickname(text)} style={[login.textinput, { width: "80%", marginTop: 32 }]} placeholder="닉네임" />
                        {same ? <Text style={login.repeat}>중복된 닉네임입니다.</Text> : <Text></Text>}
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                {nickname.length > 0 ?
                    <TouchableOpacity
                        onPress={() => NicknameUpdate()}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>변경하기</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>변경하기</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}