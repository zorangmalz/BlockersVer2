import React, {useState, useReducer} from 'react';
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
        fontFamily: 'NunitoSans-Bold',
    }
})

function loginfind (state, action) {
    switch (action.type) {
        case 'id':
            return state = 1;
        case 'password':
            return state = 2;
    }
} 

export default function LoginFind({navigation}) {
    const [click, dispatch] = useReducer(loginfind, 0);
    const backColor = click === 1 ? '#5cc27b' : '#ffffff'
    const textColor = click === 1 ? '#ffffff' : '#000000'
    const back = click === 2 ? '#5cc27b' : '#ffffff'
    const teColor = click === 2 ? '#ffffff' : '#000000'
    const idclick = () => {
        dispatch({
            type: 'id'
        })
        setTimeout(() => {
            navigation.navigate('본인인증')
        }, 500);
    }
    const passwordclick = () => {
        dispatch({
            type: 'password'
        })
        setTimeout(() => {
            navigation.navigate('본인인증')
        }, 500);
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView style={{paddingTop: 32}}>
                    <TouchableWithoutFeedback onPress={idclick}>
                        <View style={[login.box, { backgroundColor: click === 0 ? '#ffffff' : backColor , borderColor: click === 0 ? '#000000' : textColor }]}>
                            <Text style={[login.text, { color: textColor }]}>아이디 찾기</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={passwordclick}>
                        <View style={[login.box, { backgroundColor: click === 0 ? '#ffffff' : back , borderColor: click === 0 ? '#000000' : teColor }]}>
                            <Text style={[login.text, { color: teColor }]}>비밀번호 찾기</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}