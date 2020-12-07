import React from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Modal
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager } from 'react-native-fbsdk';
import Ionicons from 'react-native-vector-icons/Ionicons';

const setting = StyleSheet.create({
    mainText : {
        fontSize: 18,
        fontFamily: 'NunitoSans-Regular',
        alignSelf: 'flex-start',
        color: '#303030',
        marginBottom:5
    },
    mainBox: {
        marginBottom: 8,
        marginLeft: 32,
    },
    subText: {
        fontSize: 12
    }
})

export default function SettingCompanyInfo({ navigation }) {
    return (
        <>
            <StatusBar barStyle="default" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>회사소개</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView >
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 16 }]} >
                        <Text style={setting.mainText}>상호명</Text>
                        <Text style={setting.subText}>(주)조랑말즈</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 10 }]} >
                        <Text style={setting.mainText}>사업자번호</Text>
                        <Text style={setting.subText}>526-86-01693</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 10 }]} >
                        <Text style={setting.mainText}>대표자명</Text>
                        <Text style={setting.subText}>박주규</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 10 }]} >
                        <Text style={setting.mainText}>사업자 주소지</Text>
                        <Text style={setting.subText}>서울특별시 종로구 창경궁로35길 38,306호(혜화동 킹고 스타트업스페이스)</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 10 }]} >
                        <Text style={setting.mainText}>유선연락처</Text>
                        <Text style={setting.subText}>02-3676-1541</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />

                </ScrollView>
            </SafeAreaView>
        </>
    );
};