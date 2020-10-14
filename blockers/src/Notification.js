import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>공지사항</Text>
                        </Text>
                    </View>
                </View>
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