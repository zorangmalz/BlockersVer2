import React, {useState} from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const setting = StyleSheet.create({
    agree : {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
        opacity: 0.6,
        marginLeft: 8
    },
    agreeBox : {
        width: 16, 
        height: 16, 
        borderColor: '#303030', 
        borderWidth: 0.7, 
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default function SettingExit({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const modalbutton = () => {
        setTimeout(() => {
            setModalVisible(true)
        }, 200)
    }
    const [agreeOne, setAgreeOne] = useState(true);
    const [agreeTwo, setAgreeTwo] = useState(true);
    const OneCheck = () => { setAgreeOne(!agreeOne) }
    const TwoCheck = () => { setAgreeTwo(!agreeTwo) }
    const OneAgree = agreeOne === true ? <Ionicons size={12} color="#303030" name="checkmark" /> : <View />;
    const noOneAgree = agreeOne === false ? <Ionicons size={12} color="#303030" name="checkmark" /> : <View />;
    const TwoAgree = agreeTwo === true ? <Ionicons size={12} color="#303030" name="checkmark" /> : <View />;
    const noTwoAgree = agreeTwo === false ? <Ionicons size={12} color="#303030" name="checkmark" /> : <View />;

    return (
        <>
            <StatusBar barStyle="light-content" />
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>탈퇴</Text>
                        </Text>
                    </View>
                </View>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={{position: "absolute", width: WIDTH, height: HEIGHT, backgroundColor: "#303030", opacity: 0.4}} />
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
                            }}>출금을 진행해주세요</Text>
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
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("SettingResetComplete")
                                    setModalVisible(false)
                                }}
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
                                    }}>확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'NunitoSans-Regular',
                        color: '#303030',
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
                        color: '#303030',
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
                                color: '#303030',
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
                                    {noOneAgree}
                                </View>
                            </TouchableOpacity>
                            <Text style={setting.agree}>비동의</Text>
                            <TouchableOpacity onPress={OneCheck}>
                                <View style={[setting.agreeBox, { marginLeft: 16 }]}>
                                    {OneAgree}
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
                                color: '#303030',
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
                                    {noTwoAgree}
                                </View>
                            </TouchableOpacity>
                            <Text style={setting.agree}>비동의</Text>
                            <TouchableOpacity onPress={TwoCheck}>
                                <View style={[setting.agreeBox, { marginLeft: 16 }]}>
                                    {TwoAgree}
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
            </SafeAreaView>
            <SafeAreaView style={{flex: 0}}>
                {(agreeOne === true) && (agreeTwo === true) ?
                    <TouchableOpacity onPress={modalbutton}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>탈퇴하기</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>탈퇴하기</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}