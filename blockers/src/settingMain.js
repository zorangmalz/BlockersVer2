import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager } from 'react-native-fbsdk';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const setting = StyleSheet.create({
    mainText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        alignSelf: 'flex-start',
        color: '#303030'
    },
    mainBox: {
        marginBottom: 8,
        marginLeft: 32,
    }
})

export default function SettingMain({ navigation }) {
    const [loading, setLoading] = useState(false);
    function signout() {
        setLoading(true)
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        LoginManager.logOut()
        setLoading(false)
        navigation.goBack();
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                {loading ?
                    <ActivityIndicator size="large" color="#5cc27b" style={{ position: "absolute", top: HEIGHT / 2 - 20, left: WIDTH / 2 - 20 }} />
                    :
                    <>
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
                                    <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>설정</Text>
                                </Text>
                            </View>
                        </View>
                        <ScrollView>
                            <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={() => navigation.navigate('문의하기')} >
                                <Text style={setting.mainText}>문의하기</Text>
                            </TouchableOpacity>
                            <View style={{ width: "85%", height: 0.5, backgroundColor: "#C6C6C6", borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                            <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={() => navigation.navigate('초기화')}>
                                <Text style={setting.mainText}>금연 시계 초기화</Text>
                            </TouchableOpacity>
                            <View style={{ width: "85%", height: 0.5, backgroundColor: "#C6C6C6", borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                            <View style={{ flexDirection: 'row', marginRight: 25, marginTop: 32, justifyContent: 'space-between', alignItems: 'center', paddingRight: 8 }}>
                                <TouchableOpacity style={setting.mainBox} onPress={() => navigation.navigate('버전정보')}>
                                    <Text style={setting.mainText}>버전정보</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#000000', opacity: 0.4 }}>최신버전입니다.</Text>
                            </View>
                            <View style={{ width: "85%", height: 0.5, backgroundColor: "#C6C6C6", borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                            <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={() => navigation.navigate('탈퇴')}>
                                <Text style={setting.mainText}>탈퇴하기</Text>
                            </TouchableOpacity>
                            <View style={{ width: "85%", height: 0.5, backgroundColor: "#C6C6C6", borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                            <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={() => signout()} >
                                <Text style={setting.mainText}>로그아웃</Text>
                            </TouchableOpacity>
                            <View style={{ width: "85%", height: 0.5, backgroundColor: "#C6C6C6", borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                        </ScrollView>
                    </>
                }
            </SafeAreaView>
        </>
    );
};