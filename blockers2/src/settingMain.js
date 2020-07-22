import React from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const setting = StyleSheet.create({
    mainText : {
        fontSize: 16,
        fontWeight: 'normal',
        alignSelf: 'flex-start',
    },
    mainBox: {
        marginBottom: 8,
        marginLeft: 32,
    }
})

export default function SettingMain({ navigation }) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <ScrollView style={{ marginBottom: 70}}>
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={()=>navigation.navigate('문의하기')}>
                        <Text style={setting.mainText}>문의하기</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={() => navigation.navigate('자주묻는 질문')}>
                        <Text style={setting.mainText}>자주 묻는 질문</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={()=>navigation.navigate('알림설정')} >
                        <Text style={setting.mainText}>알림설정</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={()=>navigation.navigate('초기화')}>
                        <Text style={setting.mainText}>초기화</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <View style={{flexDirection: 'row', marginRight: 25, marginTop: 32, justifyContent: 'space-between', alignItems: 'center'}}>
                        <TouchableOpacity style={setting.mainBox} onPress={() => navigation.navigate('버전정보')}>
                            <Text style={setting.mainText}>버전정보</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 16, fontWeight: 'normal', color: '#000000', opacity: 0.4}}>최신버전입니다.</Text>
                    </View>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={() => navigation.navigate('탈퇴')}>
                        <Text style={setting.mainText}>탈퇴하기</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} >
                        <Text style={setting.mainText}>로그아웃</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};