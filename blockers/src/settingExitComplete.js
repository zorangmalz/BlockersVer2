import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { LoginManager } from 'react-native-fbsdk';
import storage from '@react-native-firebase/storage';

export default function SettingExitComplete({ navigation }) {
    const [User, setUser] = useState();
    const [del, setDel] = useState(false);

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        if (del) {
            //로그아웃
            auth().signOut().then(() => {
                //화면 전환
                navigation.navigate("Home");
            }).catch(() => {
                LoginManager.logOut()
                navigation.navigate("Home");
            })
        }
    }, [del])

    //User 탈퇴함수
    async function DeleteAccount() {
        const ref = await firestore().collection("UserInfo").doc(firebase.auth().currentUser.uid)
        //firestore에 있는 UserInfo 정보 삭제
        ref.delete()
            .then(() => {
                //User 삭제
                User.delete()
                setDel(true)
            })
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <ScrollView>
                    <Image 
                        style={{width: 150, height: 150, alignSelf: 'center', marginTop: "50%", marginBottom: 32}}
                        source={require('./icon/resetcheck.png')} 
                    />
                    <Text style={{
                        fontSize: 24,
                        fontFamily: 'NunitoSans-Bold',
                        color: '#303030',
                        opacity: 0.7,
                        alignSelf: 'center'
                    }}>탈퇴 완료</Text>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: 'NunitoSans-Regular',
                        color: '#303030',
                        opacity: 0.6,
                        alignSelf: 'center',
                        marginTop: 16
                    }}>이용해주셔서 감사합니다.</Text>
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => DeleteAccount()}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>종료</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}