import React, {useState} from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image
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

export default function SettingExit({ navigation }) {
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
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'normal',
                        color: '#000000',
                        opacity: 0.8,
                        marginTop: 16,
                        marginLeft: 48
                    }}>
                        <Text>1. 탈퇴하게 되면 </Text>
                        <Text style={{ fontWeight: 'bold' }}>모든 정보가 </Text>
                        <Text>삭제됩니다.</Text>
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'normal',
                        color: '#000000',
                        opacity: 0.8,
                        marginTop: 8,
                        marginLeft: 48
                    }}>
                        <Text>2. </Text>
                        <Text style={{ fontWeight: 'bold' }}>출금</Text>
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
                                fontWeight: 'bold',
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
                {(agreeOne === true) && (agreeTwo === true) ?
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => navigation.navigate('ExitComplete')}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff' }}>탈퇴하기</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff' }}>탈퇴하기</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}