import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

const login = StyleSheet.create({
    rule: {
        fontSize: 12,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
        opacity: 0.4,
        alignSelf: 'center',
        width: "80%",
        textAlign: 'center',
    },
    textinput: {
        fontSize: 21,
        fontFamily: 'NunitoSans-Bold',
        opacity: 0.7,
        color: '#303030',
        borderBottomColor: '#5cc27b',
        borderBottomWidth: 1,
        alignSelf: 'center',
    },
    repeat: {
        marginLeft: "10%",
        marginTop: 8,
        alignSelf: 'flex-start',
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#ff0000'
    }
})

export default function ProfileNickname({ navigation }) {
    const [nickname, setNickname] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const modalbutton = () => {
        setTimeout(() => {
            setModalVisible(true)
        }, 200)
    }
    const [same, setSame] = useState(true);
    const [repeat, setRepeat] = useState(false);
    const repeatchange = () => setRepeat(!repeat);

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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>닉네임 변경</Text>
                        </Text>
                    </View>
                </View>
                <Modal
                    animationType="none"
                    transparent={true}
                    isVisible={modalVisible}
                    backdropOpacity={0.4}
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
                        }}>
                            <Text style={{
                                fontFamily: 'NunitoSans-Bold',
                                fontSize: 16,
                                color: '#303030',
                                opacity: 0.8,
                                marginTop: 20
                            }}>변경완료</Text>
                            <TouchableOpacity onPress={() => {
                                navigation.goBack();
                                setModalVisible(false);
                            }}
                                style={{
                                    width: 280,
                                    height: 45,
                                    borderBottomRightRadius: 20,
                                    borderBottomLeftRadius: 20,
                                    backgroundColor: '#5cc27b',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 15
                                }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: '#ffffff',
                                    fontFamily: 'NunitoSans-Regular'
                                }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <ScrollView>
                    <View>
                        <TextInput onSubmitEditing={repeatchange} onChangeText={text => setNickname(text)} style={[login.textinput, { width: "80%", marginTop: 32 }]} placeholder="닉네임" />
                        {repeat === true ?
                            <Text style={login.repeat}>중복된 닉네임입니다.</Text>
                            :
                            <Text></Text>
                        }
                    </View>
                </ScrollView>
                {nickname.length > 0 ?
                    <TouchableOpacity
                        onPress={modalbutton}
                        style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>변경하기</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>변경하기</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}