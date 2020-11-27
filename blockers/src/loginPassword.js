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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const login = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        alignSelf: 'center',
        marginTop: 32,
        marginBottom: 32
    },
    textinput: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Bold',
        width: "90%",
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e4e4e4',
        marginBottom: 4
    },
    text: {
        fontSize: 10,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
        opacity: 0.4,
        alignSelf: 'flex-start',
        marginLeft: '5%'
    }
})

export default function LoginPassword({ navigation }) {
    const [pass, setPass] = useState('');
    const [len, setLen] = useState(true);
    const [passcon, setPasscon] = useState('');
    const [contrue, setContrue] = useState(true);

    const differ = () => {
        if(passcon !== pass) {
            setContrue(false)
        }
        else {
            setContrue(true)
        }
    }
    const leng = () => {
        if(pass.length < 8) {
            setLen(false)
        }
        else {
            setLen(true)
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>비밀번호 재설정</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={login.title}>새로운 비밀번호를 설정해주세요.</Text>
                    <TextInput onSubmitEditing={leng} textContentType="password" secureTextEntry={true} onChangeText={text => setPass(text)} style={login.textinput} placeholder="비밀번호(영문, 숫자 포함 8자리)" />
                    {len === false ?
                        <Text style={login.text}>8자리 이상 입력해주세요.</Text>
                        :
                        <View></View>
                    }
                    <TextInput textContentType="password" secureTextEntry={true} onSubmitEditing={differ} onChangeText={text => setPasscon(text)} style={login.textinput} placeholder="비밀번호 확인" />
                    {contrue === false ?
                        <Text style={login.text}>비밀번호가 일치하지 않습니다.</Text>
                        :
                        <View></View>
                    }
                </ScrollView>
                {((pass !== '') && (passcon !== '') && (pass === passcon)) === true ?
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>확인</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, width: "100%", height: 60, backgroundColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>확인</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}