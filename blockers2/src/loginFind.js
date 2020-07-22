import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
} from 'react-native';

const login = StyleSheet.create({
    box: {
        width: "80%",
        height: 50,
        borderRadius: 28,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: 16
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default function LoginFind() {
    const [click, setClick] = useState(true);
    const backColor = click === false ? '#ffffff' : '#5cc27b'
    const textColor = click === false ? '#000000' : '#ffffff'
    const back = click === false ? '#5cc27b' : '#ffffff'
    const teColor = click === false ? '#ffffff' : '#000000'
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView style={{paddingTop: 32}}>
                    <TouchableWithoutFeedback onPress={() => setClick(!click)}>
                        <View style={[login.box, { backgroundColor: backColor, borderColor: textColor }]}>
                            <Text style={[login.text, { color: textColor }]}>아이디 찾기</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setClick(!click)}>
                        <View style={[login.box, { backgroundColor: back, borderColor: teColor }]}>
                            <Text style={[login.text, { color: teColor }]}>비밀번호 찾기</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}