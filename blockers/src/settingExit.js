import React, {useEffect, useState} from 'react';
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

const Agree = "제2조 	[개인정보의 처리 및 보유기간] \n\n①	㈜조랑말즈는 원칙적으로 정보주체의 개인정보를 회원 탈퇴시 지체없이 파기하고 있습니다. 단, 회원에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우 또는 일정 기간 정보보관 의무를 부과하는 경우에는 해당기간 동안 개인정보를 안전하게 보관합니다. \n\n②	정보주체의 회원가입 또는 이용계약체결 시 개인정보 보관기간에 대해 동의를 얻은 경우는 아래와 같습니다. \n\n1.	서비스 부정이용 방지 : 탈퇴일로부터 6개월 보관 \n-	성명, 생년월일, E-mail주소, 부정이용기록 \n\n2.	분쟁 및 민원 대응 : 탈퇴일로부터 6개월 보관 \n-	성명, 생년월일, E-mail주소, 서비스 이용기록, 민원 접수 내역"

export default function SettingExit({ navigation }) {
    const [agreeOne, setAgreeOne] = useState(false);
    const [size, setSize] = useState(false);
    const OneCheck = () => { setAgreeOne(!agreeOne) }
    const OneAgree = agreeOne === true ? <Ionicons size={12} color="#303030" name="checkmark" /> : <View />;
    const noOneAgree = agreeOne === false ? <Ionicons size={12} color="#303030" name="checkmark" /> : <View />;

    return (
        <>
            <StatusBar  />
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
                    <TouchableOpacity>
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
                                fontSize: 14,
                                fontFamily: 'NunitoSans-Regular'
                            }}>{Agree}</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{flex: 0}}>
                {agreeOne === true ?
                    <TouchableOpacity onPress={() => navigation.navigate("SettingResetComplete")}>
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