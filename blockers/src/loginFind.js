import React, {useReducer} from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    const textColor = click === 1 ? '#ffffff' : '#303030'
    const back = click === 2 ? '#5cc27b' : '#ffffff'
    const teColor = click === 2 ? '#ffffff' : '#303030'
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>아이디/비밀번호 찾기</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView style={{ paddingTop: 32 }}>
                    <TouchableWithoutFeedback onPress={idclick}>
                        <View style={[login.box, { backgroundColor: click === 0 ? '#ffffff' : backColor, borderColor: click === 0 ? '#000000' : textColor }]}>
                            <Text style={[login.text, { color: textColor }]}>아이디 찾기</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={passwordclick}>
                        <View style={[login.box, { backgroundColor: click === 0 ? '#ffffff' : back, borderColor: click === 0 ? '#000000' : teColor }]}>
                            <Text style={[login.text, { color: teColor }]}>비밀번호 찾기</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}