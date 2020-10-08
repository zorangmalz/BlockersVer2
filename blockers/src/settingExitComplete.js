import React from 'react';
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
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { LoginManager } from 'react-native-fbsdk';

export default function SettingExitComplete({navigation}) {
    var user = firebase.auth().currentUser;
    const DeleteAccount = () => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                //firestore에 있는 UserInfo 정보 삭제
                firestore().collection("UserInfo")
                    .doc(user.uid)
                    .delete();
                //Logout 만들기
                auth()
                    .signOut()
                    .then(() => console.log('User signed out!'));
                LoginManager.logOut();
                //화면 전환
                navigation.navigate("설정");
            } else {
                console.log("user needs to reauth");
                return false;
            }
        });
    };
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
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
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={DeleteAccount}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>종료</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}