import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Keyboard,
    Alert
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth, { firebase } from '@react-native-firebase/auth';
const login = StyleSheet.create({
    textinput: {
        borderBottomColor: '#5cc27b',
        borderBottomWidth: 1,
        fontSize: 21,
        alignSelf: 'center',
        width: "80%",
        marginBottom: 32
    },
    buttontextinput: {
        fontSize: 21,
        opacity: 0.8,
        color: '#000000',
        fontFamily: 'NunitoSans-Regular',
    },
    buttontext: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: 'NunitoSans-Regular'
    },
    buttonbox: {
        width: 92,
        height: 32,
        backgroundColor: '#5cc27b',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default function LoginVerification({ navigation }) {
    const [name, setName] = useState('');
    async function findPassword() {
        console.log(name, "name")

        firebase.auth().sendPasswordResetEmail(name)
        Alert.alert(
            "비밀번호 변경 메일이 발송되었습니다",
            "이메일을 확인해 주세요",
            [
                {
                    text: "확인",
                    onPress: () => navigation.navigate('Home')
                }
            ]
        )
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>비밀번호 찾기</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={{
                        fontSize: 21,
                        opacity: 0.7,
                        color: '#000000',
                        fontFamily: 'NunitoSans-Regular',
                        alignSelf: 'center',
                        marginTop: 16,
                        marginBottom: 32
                    }}>이메일 주소를 입력해주세요</Text>
                    <TextInput value={name} onSubmitEditing={Keyboard.dismiss} onChangeText={text => setName(text)} style={login.textinput} placeholder="Blockers@blockers.me" />

                </ScrollView>
                {name != '' ?
                    <TouchableOpacity
                        onPress={findPassword}
                        style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}
                    >
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>확인</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, width: "100%", height: 60, backgroundColor: '#999999', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>확인</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}
