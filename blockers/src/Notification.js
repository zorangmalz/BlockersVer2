import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StatusBar,
    StyleSheet,
} from 'react-native';

const notice = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        opacity: 0.8,
        color: '#303030',
        marginLeft: 8
    },
    box: {
        width: "100%",
        height: 120,
        paddingTop: 25,
        paddingBottom: 39,
        paddingLeft: 22
    },
    content: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#000000',
        opacity: 0.6,
        marginTop: 8,
        marginLeft: 20
    }
})

export default function Notification({ navigation }) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView>
                    <View style={notice.box}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#5cc27b' }} />
                            <Text style={notice.title}>Blockers 3월 기부내역 공지</Text>
                        </View>
                        <Text style={notice.content}>여러분들의 소중한 기부금 사용내역입니다.</Text>
                    </View>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                </ScrollView>
            </SafeAreaView>
        </>
    )
} 