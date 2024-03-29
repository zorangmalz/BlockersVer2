import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const login = StyleSheet.create({
    rule: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#000000',
        opacity: 0.4,
        alignSelf: 'center',
        width: "80%",
        textAlign: 'center',
    },
    textinput: {
        fontSize: 21, 
        fontWeight: 'bold',
        opacity: 0.7,
        color: '#000000',
        borderBottomColor: '#5cc27b',
        borderBottomWidth: 1,
        alignSelf: 'center',
    },
    repeat: {
        marginLeft: "10%",
        marginTop: 8,
        alignSelf: 'flex-start',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ff0000'
    }
})

export default function LoginVerificationProfile({ navigation }) {
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [repeat, setRepeat] = useState(false);
    const repeatchange = () => setRepeat(!repeat);

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView>
                    <TouchableOpacity style={{alignSelf: 'center', marginTop: 16}}>
                        <Image source={require('./icon/userprofile.png')} style={{width: 132, height: 132}} resizeMode="contain" />
                    </TouchableOpacity>
                    <View>
                        <TextInput onSubmitEditing={repeatchange} onChangeText={text => setNickname(text)} style={[login.textinput, { width: "80%", marginTop: 32 }]} placeholder="닉네임" />
                        {repeat === true ?
                            <Text style={login.repeat}>중복된 닉네임입니다.</Text>
                            :
                            <Text></Text>
                        }
                        <View style={{ marginLeft: "10%", flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TextInput onChangeText={text => setGender(text)} style={[login.textinput, { width: "20%" }]} placeholder="성별" />
                            <TextInput keyboardType="number-pad" onChangeText={text => setBirthday(text)} style={[login.textinput, { width: "40%", marginLeft: "12%" }]} placeholder="생년월일" />
                        </View>
                    </View>
                    <View style={{ marginTop: "70%" }}>
                        <Text style={login.rule}>
                            계정 생성시 Blockers
                        <Text style={{ textDecorationLine: 'underline' }}> 개인정보 처리약관</Text>
                        과</Text>
                        <Text style={login.rule}>
                            <Text style={{ textDecorationLine: 'underline' }}>이용약관</Text>
                        에 동의하게 됩니다.(마케팅 정보 수신동의 포함)</Text>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff' }}>시작하기</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}