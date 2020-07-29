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

const login = StyleSheet.create({
    text: {
        fontSize: 40,
        fontWeight: 'normal',
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
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
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