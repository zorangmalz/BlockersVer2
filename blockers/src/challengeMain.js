import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Image,
    Alert
} from 'react-native';

const challenge = StyleSheet.create({
    box: {
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 17,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 10,

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        borderBottomColor: '#979797',
        borderBottomWidth: 0.2,

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    largeText: {
        fontSize: 16,
        marginBottom: 12,
        fontFamily: 'NunitoSans-Bold'
    },
    mediumText: {
        fontSize: 16,
        marginBottom: 12,
        fontFamily: 'NunitoSans-Regular'
    },
    smallText: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 8,
        fontFamily: 'NunitoSans-Regular'
    },
    TokentrueText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold'
    },
    TokenBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 8
    }
});

export default function ChallengeMain({navigation}) {
    const num = 1;
    const [ChallengeToken, setChallengeToken] = useState(true);
    const [userlogined, setUserlogined] = useState(true);
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <ScrollView style={{ paddingTop: 27 }}>
                    {userlogined === true ?
                        <View style={challenge.box}>
                            <View>
                                <Text style={challenge.largeText}>Step 01</Text>
                                <Text style={challenge.mediumText}>예상 상금 | 10,000</Text>
                                <Text style={challenge.smallText}>인증 횟수 | 4회 인증 주기 | 주 1회</Text>
                            </View>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => 
                                userlogined === true ?
                                navigation.navigate('ChallengeResisterOne')
                                :
                                Alert.alert(
                                    '로그인이 필요한서비스입니다.',
                                    '로그인하고 다양한 혜택을 만나보세요',
                                    [
                                        {
                                            text: '취소', onPress: () => console.log('취소')
                                        },
                                        {
                                            text: '로그인', onPress: () => navigation.navigate('회원가입')
                                        }
                                    ]
                                )
                            }>
                                <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'NunitoSans-Regular' }}>신청하기</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{
                            marginRight: 30,
                            marginLeft: 30,
                            marginBottom: 17,
                            paddingTop: 16,
                            paddingBottom: 16,
                            borderRadius: 10,
                            borderBottomColor: '#979797',
                            borderBottomWidth: 0.2,
                        }}>
                            <View style={{
                                flexDirection: 'row', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: 17,
                                marginLeft: 26,
                                marginRight: 26
                            }}>
                                <Text style={challenge.largeText}>Step 01</Text>
                                <TouchableOpacity style={{alignSelf: 'center'}}>
                                    <Text style={{fontSize:12, textDecorationLine: 'underline', color: '#666666', fontFamily: 'NunitoSans-Regular'}}>포기하기</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 19
                            }}>
                                <Image resizeMode="contain" style={{ width: 18, height: 20 }} source={require('./icon/fire.png')} />
                                <Text style={{ fontSize: 16, fontFamily: 'NunitoSans-Bold',  marginLeft: 8 }} >성공률</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 17 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ 
                                        borderWidth: 3, 
                                        width: 48, 
                                        height: 48, 
                                        borderColor: '#5CC27B',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{fontSize: 16, fontFamily: 'NunitoSans-Bold'}}>60%</Text>
                                    </View>
                                    <Text style={{ marginTop: 4, fontSize: 14 }}>1st</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ 
                                        borderWidth: 3, 
                                        width: 48, 
                                        height: 48, 
                                        borderColor: '#5CC27B',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{fontSize: 16, fontFamily: 'NunitoSans-Bold'}}>60%</Text>
                                    </View>
                                    <Text style={{ marginTop: 4, fontSize: 14, fontFamily: 'NunitoSans-Regular' }}>2nd</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderWidth: 3, width: 48, height: 48, borderColor: '#5CC27B' }} />
                                    <Text style={{ marginTop: 4, fontSize: 14, fontFamily: 'NunitoSans-Regular' }}>3rd</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderWidth: 3, width: 48, height: 48, borderColor: '#5CC27B' }} />
                                    <Text style={{ marginTop: 4, fontSize: 14, fontFamily: 'NunitoSans-Regular' }}>Final</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 40
                            }}>
                                <Image resizeMode="contain" style={{ width: 18, height: 20 }} source={require('./icon/reward.png')} />
                                <Text style={{ fontSize: 16, marginLeft: 8,fontFamily: 'NunitoSans-Bold' }}>상금정보</Text>
                            </View>
                            <View style={challenge.TokenBox}>
                                <Text style={[challenge.TokentrueText, {alignSelf: 'flex-start'}]}>총 참여자 수</Text>
                                <Text style={[challenge.TokentrueText, {alignSelf: 'flex-end'}]}>2,000 명</Text>
                            </View>
                            <View style={challenge.TokenBox}>
                                <Text style={[challenge.TokentrueText, {alignSelf: 'flex-start'}]}>총 상금</Text>
                                <Text style={[challenge.TokentrueText, {alignSelf: 'flex-end'}]}>2,000,000원</Text>
                            </View>
                            <View style={challenge.TokenBox}>
                                <Text style={[challenge.TokentrueText, {alignSelf: 'flex-start'}]}>예상 상금</Text>
                                <Text style={[challenge.TokentrueText, {alignSelf: 'flex-end'}]}>20,000원</Text>
                            </View>
                        </View>
                    }
                    <View style={challenge.box}>
                        <View>
                            <Text style={challenge.largeText}>Step 02</Text>
                            <Text style={challenge.mediumText}>예상 상금 | 10,000</Text>
                            <Text style={challenge.smallText}>인증 횟수 | 4회 인증 주기 | 주 1회</Text>
                        </View>
                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() =>
                            userlogined === true ?
                                Alert.alert(
                                    '이전 챌린지를 완료하셔야합니다.',
                                    '이전 챌린지로 참가신청 하시겠습니까?',
                                    [
                                        {
                                            text: '취소', onPress: () => console.log('취소')
                                        },
                                        {
                                            text: '참가하기', onPress: () => navigation.navigate('ChallengeResisterOne')
                                        }
                                    ]
                                )
                                :
                                Alert.alert(
                                    '로그인이 필요한서비스입니다.',
                                    '로그인하고 다양한 혜택을 만나보세요',
                                    [
                                        {
                                            text: '취소', onPress: () => console.log('취소')
                                        },
                                        {
                                            text: '로그인', onPress: () => navigation.navigate('회원가입')
                                        }
                                    ]
                                )
                        }>
                            <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>신청하기</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={challenge.box}>
                        <View>
                            <Text style={challenge.largeText}>Step 03</Text>
                            <Text style={challenge.mediumText}>예상 상금 | 10,000</Text>
                            <Text style={challenge.smallText}>인증 횟수 | 4회 인증 주기 | 주 1회</Text>
                        </View>
                        <TouchableOpacity style={{ alignSelf: 'center' }}>
                            <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>신청하기</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => setUserlogined(!userlogined)}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff' }}>DB 연결 전 임시 버튼</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}