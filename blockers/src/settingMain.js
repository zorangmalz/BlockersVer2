import React, {useState} from 'react';
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
import { LoginManager } from 'react-native-fbsdk'

const setting = StyleSheet.create({
    mainText : {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        alignSelf: 'flex-start',
        color: '#303030'
    },
    mainBox: {
        marginBottom: 8,
        marginLeft: 32,
    }
})

export default function SettingMain({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const modalbutton = () => {
        setTimeout(() => {
            setModalVisible(true)
        }, 200)
    }
    function signout() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        LoginManager.logOut()

        navigation.popToTop();
        setModalVisible(false);
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, backgroundColor: '#000000', opacity: 0.4 }} />
                </Modal>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            width: 280,
                            height: 180,
                            borderRadius: 20,
                            backgroundColor: '#ffffff',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderWidth: 1,
                            borderColor: '#cccccc'
                        }}>
                            <Text style={{
                                fontFamily: 'NunitoSans-Bold',
                                fontSize: 16,
                                color: '#303030',
                                opacity: 0.8,
                                marginTop: 20
                            }}>로그아웃하시겠습니까?</Text>
                            <Text style={{
                                fontFamily: 'NunitoSans-Regular',
                                fontSize: 14,
                                color: '#303030',
                                opacity: 0.6,
                                textAlign: 'center',
                                paddingRight: 12,
                                paddingLeft: 12
                            }}>출금을 완료하지 않으면 탈퇴가 불가능합니다</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 15
                            }}>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={{
                                    width: 140,
                                    height: 55,
                                    borderBottomLeftRadius: 20,
                                    backgroundColor: '#999999',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#ffffff',
                                        fontFamily: 'NunitoSans-Regular'
                                    }}>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={signout}
                                    style={{
                                        width: 140,
                                        height: 55,
                                        borderBottomRightRadius: 20,
                                        backgroundColor: '#5cc27b',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#ffffff',
                                        fontFamily: 'NunitoSans-Regular'
                                    }}>로그아웃</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView style={{ marginBottom: 70 }}>
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={() => navigation.navigate('문의하기')}>
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
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={modalbutton} >
                        <Text style={setting.mainText}>로그아웃</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};