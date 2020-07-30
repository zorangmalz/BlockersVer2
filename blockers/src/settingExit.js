import React, {useState} from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal
} from 'react-native';

const setting = StyleSheet.create({
    agree : {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#000000',
        opacity: 0.6,
        marginLeft: 8
    },
    agreeBox : {
        width: 16, 
        height: 16, 
        borderColor: '#000000', 
        borderWidth: 0.7, 
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default function SettingExit({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [agreeOne, setAgreeOne] = useState(true);
    const [agreeTwo, setAgreeTwo] = useState(true);
    const OneCheck = () => {setAgreeOne(!agreeOne)}
    const TwoCheck = () => {setAgreeTwo(!agreeTwo)}
    const OneAgree = agreeOne===true ? require('./icon/exitcheck.png') : '';
    const noOneAgree = agreeOne===false ? require('./icon/exitcheck.png') : '';
    const TwoAgree = agreeTwo===true ? require('./icon/exitcheck.png') : '';
    const noTwoAgree = agreeTwo===false ? require('./icon/exitcheck.png') : '';

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <ScrollView>
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
                            }}>출금을 진행해주세요</Text>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: 'NunitoSans-Regular'
                                }}>출금을 완료하지 않으면 탈퇴가 불가능합니다</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', width: 125, height: 40, borderColor: '#000000', borderLeftWidth: 1, borderRightWidth: 0.5, borderBottomLeftRadius: 10, borderTopWidth: 1 }} onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', width: 125, height: 40, borderColor: '#000000', borderRightWidth: 1, borderLeftWidth: 0.5, borderBottomRightRadius: 10, borderTopWidth: 1 }} onPress={() => {
                                    navigation.navigate('ExitComplete');
                                    setModalVisible(false);
                                }}>
                                    <Text>출금하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'NunitoSans-Regular',
                        color: '#000000',
                        opacity: 0.8,
                        marginTop: 16,
                        marginLeft: 48
                    }}>
                        <Text>1. 탈퇴하게 되면 </Text>
                        <Text style={{ fontFamily: 'NunitoSans-Bold' }}>모든 정보가 </Text>
                        <Text>삭제됩니다.</Text>
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'NunitoSans-Regular',
                        color: '#000000',
                        opacity: 0.8,
                        marginTop: 8,
                        marginLeft: 48
                    }}>
                        <Text>2. </Text>
                        <Text style={{ fontFamily: 'NunitoSans-Bold' }}>출금</Text>
                        <Text>을 진행해주시기 바랍니다.</Text>
                    </Text>
                    <View style={{
                        marginLeft: 16,
                        marginRight: 16,
                        marginTop: 32,
                        marginBottom: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <View style={{ width: 9, height: 9, borderRadius: 4.5, borderColor: '#333333', borderWidth: 2, opacity: 0.8 }} />
                            <Text style={{
                                fontSize: 18,
                                fontFamily: 'NunitoSans-Bold',
                                color: '#000000',
                                opacity: 0.8,
                                marginLeft: 8
                            }}>탈퇴 약관 동의</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            <TouchableOpacity onPress={OneCheck}>
                                <View style={setting.agreeBox}>
                                    <Image source={noOneAgree} />
                                </View>
                            </TouchableOpacity>
                            <Text style={setting.agree}>비동의</Text>
                            <TouchableOpacity onPress={OneCheck}>
                                <View style={[setting.agreeBox, { marginLeft: 16 }]}>
                                    <Image source={OneAgree} />
                                </View>
                            </TouchableOpacity>
                            <Text style={setting.agree}>동의</Text>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: '#E5E5E5',
                        width: "90%",
                        paddingBottom: 16,
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingTop: 16,
                        alignSelf: 'center'
                    }}>
                        <Text style={{
                            fontSize: 10,
                            fontFamily: 'NunitoSans-Regular'
                        }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                            ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                            aliquyam erat, sed diam voluptua.
                        </Text>
                    </View>
                    <View style={{
                        marginLeft: 16,
                        marginRight: 16,
                        marginTop: 16,
                        marginBottom: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <View style={{ width: 9, height: 9, borderRadius: 4.5, borderColor: '#333333', borderWidth: 2, opacity: 0.8 }} />
                            <Text style={{
                                fontSize: 18,
                                fontFamily: 'NunitoSans-Bold',
                                color: '#000000',
                                opacity: 0.8,
                                marginLeft: 8
                            }}>개인정보 처리 약관 동의</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            <TouchableOpacity onPress={TwoCheck}>
                                <View style={setting.agreeBox}>
                                    <Image source={noTwoAgree} />
                                </View>
                            </TouchableOpacity>
                            <Text style={setting.agree}>비동의</Text>
                            <TouchableOpacity onPress={TwoCheck}>
                                <View style={[setting.agreeBox, { marginLeft: 16 }]}>
                                    <Image source={TwoAgree} />
                                </View>
                            </TouchableOpacity>
                            <Text style={setting.agree}>동의</Text>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: '#E5E5E5',
                        width: "90%",
                        paddingBottom: 16,
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingTop: 16,
                        alignSelf: 'center',
                    }}>
                        <Text style={{
                            fontSize: 10,
                            fontFamily: 'NunitoSans-Regular'
                        }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                            ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                            aliquyam erat, sed diam voluptua.
                        </Text>
                    </View>
                </ScrollView>
                {(agreeOne === true) && (agreeTwo === true) ?
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => setModalVisible(true)}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>탈퇴하기</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>탈퇴하기</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}