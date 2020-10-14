import React from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const setting = StyleSheet.create({
    email : {
        fontSize: 40,
        fontFamily: 'NunitoSans-Regular',
        color: "#5CC27B",
        marginBottom: 32,
        marginTop: 32,
        alignSelf: 'center',
        color: '#5cc27b'
    },
    content : {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030'
    }
})

export default function SettingQuestion({ navigation }) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>문의하기</Text>
                        </Text>
                    </View>
                </View>
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