import React, {useState} from 'react';
import {
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard'
import Ionicons from 'react-native-vector-icons/Ionicons';

const login = StyleSheet.create({
    text: {
        fontSize: 40,
        fontFamily: 'NunitoSans-Regular',
        color: '#5cc27b',
    }
})

export default function LoginFindId ({navigation}) {
    const emailId = "wise@blockers.io";
    const [copiedId, setCopiedId] = useState('');
    const copyToClipboard = () => {
        Clipboard.setString(emailId);
        setTimeout(() => {
            navigation.navigate('로그인')
        }, 2000)
    }

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString()
        setCopiedId(text)
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={35} />
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
                        <Text style={{ fontSize: 24 }}>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>아이디 찾기</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <TouchableOpacity onPress={copyToClipboard} style={{
                        marginTop: 64,
                        alignSelf: 'center'
                    }}>
                        <Text style={login.text}>{emailId}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}