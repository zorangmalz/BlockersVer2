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
    },
    mainBox: {
        marginBottom: 8,
        marginLeft: 32,
    }
})

export default function SettingMain({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    function signout(){
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
                <ScrollView style={{ marginBottom: 70 }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(!modalVisible)}
                    >
                        <View style={{ position: 'absolute', top: "33%", justifyContent: 'space-between', borderColor: '#000000', borderWidth: 1, borderRadius: 10, alignSelf: 'center', width: 250, height: 170, alignItems: 'center', backgroundColor: '#ffffff' }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'NunitoSans-Bold',
                                marginTop: 20
                            }}>로그아웃하시겠습니까?</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', width: 125, height: 40, borderColor: '#000000', borderLeftWidth: 1, borderRightWidth: 0.5, borderBottomLeftRadius: 10, borderTopWidth: 1 }} onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', width: 125, height: 40, borderColor: '#000000', borderRightWidth: 1, borderLeftWidth: 0.5, borderBottomRightRadius: 10, borderTopWidth: 1 }} 
                                onPress={
                                    signout
                                }>
                                    <Text>로그아웃</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={() => setModalVisible(true)} >
                        <Text style={setting.mainText}>로그아웃</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};