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
    Modal,
} from 'react-native';

const setting = StyleSheet.create({
    agree : {
        fontSize: 14,
        fontWeight: 'normal',
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

export default function MyPageRule({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [agreeTwo, setAgreeTwo] = useState(true);
    const TwoCheck = () => { setAgreeTwo(!agreeTwo) }
    const TwoAgree = agreeTwo === true ? require('./icon/exitcheck.png') : '';
    const noTwoAgree = agreeTwo === false ? require('./icon/exitcheck.png') : '';

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
                                fontWeight: 'bold',
                                marginTop: 20
                            }}>거부하시겠습니까?</Text>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontWeight: 'normal'
                                }}>유용한 정보와 혜택을 놓칠수 있습니다!</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', width: 125, height: 40, borderColor: '#000000', borderLeftWidth: 1, borderRightWidth: 0.5, borderBottomLeftRadius: 10, borderTopWidth: 1 }} 
                                    onPress={() => {setModalVisible(!modalVisible);
                                                    setAgreeTwo(true);
                                }}>
                                    <Text>cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', width: 125, height: 40, borderColor: '#000000', borderRightWidth: 1, borderLeftWidth: 0.5, borderBottomRightRadius: 10, borderTopWidth: 1 }} onPress={() => {
                                    setAgreeTwo(false);
                                    setModalVisible(false);
                                }}>
                                    <Text>거부하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
                                fontWeight: 'bold',
                                color: '#000000',
                                opacity: 0.8,
                                marginLeft: 8
                            }}>개인정보 처리약관</Text>
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
                            fontWeight: 'normal'
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
                                fontWeight: 'bold',
                                color: '#000000',
                                opacity: 0.8,
                                marginLeft: 8
                            }}>환불 약관</Text>
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
                            fontWeight: 'normal'
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
                                fontWeight: 'bold',
                                color: '#000000',
                                opacity: 0.8,
                                marginLeft: 8
                            }}>
                                <Text style={{color: 'red'}}>(선택) </Text>
                                <Text>마케팅, 홍보 약관</Text>
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            <TouchableOpacity onPress={() => {
                                TwoCheck;
                                setModalVisible(true);
                            }}>
                                <View style={setting.agreeBox}>
                                    <Image resizeMode="contain" source={noTwoAgree} />
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
                            fontWeight: 'normal'
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
        </>
    )
}