import React, { useState,useEffect } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Clipboard
} from 'react-native';
import auth from '@react-native-firebase/auth';

const style = StyleSheet.create({
    container: {
        marginLeft: 32,
        paddingTop: 16,
        paddingBottom: 8
    },
    profile: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        opacity: 0.8,
        color: '#000000',
        marginBottom: 8
    },
    title: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: '#000000',
        opacity: 0.8,
        marginBottom: 16
    },
    box: {
        marginLeft: 32,
        marginBottom: 16
    },
    images: {
        height: 68,
        width: 68,
        borderRadius: 32,
    },
    item: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        opacity: 0.6,
        color: '#000000'
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#48d1cc'
    },
    clipboard: {
        height: 20,
        width: 16,
    },
})

export default function ProfileMain({ navigation }) {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const [recommend, setRecommend] = useState(true);
    const [copiedText, setCopiedText] = useState('')
    const copyToClipboard = () => {
        Clipboard.setString('hello world')
    }
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }
    
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
      if (initializing) return null;
    
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView>
                    <Text style={[style.title, { marginBottom: 10, marginLeft: 32, marginTop: 24 }]}>Profile</Text>
                    <View style={style.box}>
                        <View style={{ flexDirection: "row" }}>
                            <Image resizeMode="stretch" style={style.images} source={require("./icon/profilepic.png")}></Image>
                            <View style={{
                                marginLeft: 16,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={style.profile}>LV5</Text>
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Text style={style.profile}>{user.nickName}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('닉네임 변경')}>
                                        <Image source={require('./icon/pen.png')} style={{ width: 18, height: 18, marginLeft: 8 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    <View style={style.container}>
                        <Text style={style.title}>이름</Text>
                        <Text style={style.item}>{user.displayName}</Text>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    <View style={style.container}>
                        <Text style={style.title}>생년월일</Text>
                        <Text style={style.item}>{user.birth}</Text>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    <View style={[style.container, { marginRight: 32 }]}>
                        <Text style={style.title}>휴대폰번호</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={style.item}></Text>
                            <TouchableOpacity style={[style.buttonStyle, { backgroundColor: '#5cc27b', width: 54, height: 28 }]}>
                                <Text style={{ fontSize: 12, color: 'white', fontFamily: 'NunitoSans-Bold'}}>재인증</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    <View style={[style.container, { marginRight: 32 }]}>
                        <Text style={style.title}>비밀번호 재설정</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={style.item}>비밀번호를 잃어버리셨나요?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('지갑 비밀번호 재설정')} style={[style.buttonStyle, { backgroundColor: '#5cc27b', width: 54, height: 28 }]}>
                                <Text style={{ fontSize: 12, color: 'white', fontFamily: 'NunitoSans-Bold' }}>재설정</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    {recommend === true ?
                        <View>
                            <View style={style.container}>
                                <Text style={style.title}>추천인 코드</Text>
                                <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={[style.item, { marginRight: 8 }]}>Asd12lasl1</Text>
                                    <TouchableOpacity onPress={copyToClipboard}>
                                        <Image style={style.clipboard} source={require("./icon/clipboard.png")} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                            <View style={style.container}>
                                <Text style={style.title}>추천인 링크</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.item, { marginRight: 8 }]}>Bit/ly.cl1929</Text>
                                    <TouchableOpacity onPress={copyToClipboard}>
                                        <Image style={style.clipboard} source={require("./icon/clipboard.png")} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                        </View>
                        :
                        <View></View>
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    )
}