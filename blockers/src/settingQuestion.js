import React, {useLayoutEffect} from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native';

const setting = StyleSheet.create({
    email : {
        fontSize: 40,
        fontFamily: 'NunitoSans-Regular',
        color: "#5CC27B",
        marginBottom: 32,
        marginTop: 32,
        alignSelf: 'center'
    },
    content : {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
    }
})

export default function SettingQuestion({ navigation }) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <ScrollView>
                    <Text style={setting.email} >help@blockers.me</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 67 }}>
                        <Text style={setting.content} >해당 이메일로 서비스 이용 문의사항과</Text>
                        <Text style={setting.content} >피드백을 남겨주세요!</Text>
                        <Text style={setting.content} >2-3 영업일 내로 답변드립니다.</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}