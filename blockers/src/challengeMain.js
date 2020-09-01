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
    Alert,
    FlatList,
    Modal
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const challenge = StyleSheet.create({
    box: {
        marginRight: 16,
        marginLeft: 16,
        marginBottom: 16,
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16,
        paddingLeft: 16,
        borderRadius: 10,

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        borderBottomColor: '#979797',
        borderBottomWidth: 0.2,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    largeText: {
        fontSize: 16,
        marginBottom: 12,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030'
    },
    mediumText: {
        fontSize: 16,
        marginBottom: 12,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030'
    },
    smallText: {
        fontSize: 14,
        color: '#303030',
        marginBottom: 8,
        fontFamily: 'NunitoSans-Regular'
    },
    TokentrueText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030'
    },
    TokenBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 8
    }
});

export default function ChallengeMain({ navigation }) {
    const num = 1;
    //챌린지 참가 여부
    const [ChallengeToken, setChallengeToken] = useState(false);
    //Modal 띄울때 사용
    const [userlogin, setUserlogin] = useState(false);
    const loginview = () => {
        setTimeout(()=>{
            setUserlogin(true)
        }, 200)
    }
    //아래는 진짜 로그인이 되어있는지 여부
    const [userlogined, setUserlogined] = useState(true);
    const PreviousData = [
        {
            challengeNumber: 1001,
            success: false,
            ChallengeStep: 'Step 01',
            participationDate: '참가: 2020/06/01',
            failureDate: '실패: 2020/06/23'
        },
        {
            challengeNumber: 1002,
            success: true,
            ChallengeStep: 'Step 01',
            participationDate: '참가: 2020/06/01',
            failureDate: '상금: ₩ 20,000'
        },
    ]

    const OngoingData = [
        {
            step: '1st',
            percent: 100
        },
        {
            step: '2nd',
            percent: 70
        },
        {
            step: '3rd',
            percent: 0
        },
        {
            step: 'Final',
            percent: 0
        }
    ]

    //이전 챌린지가 참여 안했을 때 사용
    const [previousChallenge, setPreviousChallenge] = useState(false);
    const previouschallengeview = () => {
        setTimeout(()=>{
            setPreviousChallenge(true)
        }, 200)
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={userlogin}
                    onRequestClose={() => setUserlogin(false)}
                >
                    <View style={{ flex: 1, backgroundColor: '#000000', opacity: 0.4 }} />
                </Modal>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={userlogin}
                    onRequestClose={() => setUserlogin(false)}
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
                            }}>로그인이 필요한서비스입니다.</Text>
                            <Text style={{
                                fontFamily: 'NunitoSans-Regular',
                                fontSize: 14,
                                color: '#303030',
                                opacity: 0.6,
                                textAlign: 'center'
                            }}>로그인하고 다양한 혜택을 만나보세요</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 15
                            }}>
                                <TouchableOpacity onPress={() => setUserlogin(false)} style={{
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
                                <TouchableOpacity onPress={() =>  {
                                    navigation.navigate('회원가입')
                                    setUserlogin(false)
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
                                    }}>로그인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={previousChallenge}
                    onRequestClose={() => setPreviousChallenge(false)}
                >
                    <View style={{ flex: 1, backgroundColor: '#000000', opacity: 0.4 }} />
                </Modal>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={previousChallenge}
                    onRequestClose={() => setPreviousChallenge(false)}
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
                            }}>이전 챌린지를 완료하셔야합니다.</Text>
                            <Text style={{
                                fontFamily: 'NunitoSans-Regular',
                                fontSize: 14,
                                color: '#303030',
                                opacity: 0.6,
                                textAlign: 'center'
                            }}>이전 챌린지로 참가신청 하시겠습니까?</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 15
                            }}>
                                <TouchableOpacity onPress={() => setPreviousChallenge(false)} style={{
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
                                <TouchableOpacity onPress={() =>  {
                                    navigation.navigate('ChallengeResisterOne')
                                    setPreviousChallenge(false)
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
                                    }}>참가하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {ChallengeToken === false ?
                    <ScrollView style={{ paddingTop: 27 }}>
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
                                    loginview()
                            }>
                                <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'NunitoSans-Regular', color: '#303030' }}>신청하기</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={challenge.box}>
                            <View>
                                <Text style={challenge.largeText}>Step 02</Text>
                                <Text style={challenge.mediumText}>예상 상금 | 10,000</Text>
                                <Text style={challenge.smallText}>인증 횟수 | 4회 인증 주기 | 주 1회</Text>
                            </View>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() =>
                                userlogined === true ?
                                    previouschallengeview()
                                    :
                                    loginview()
                            }>
                                <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 12, color: '#303030', fontFamily: 'NunitoSans-Regular' }}>신청하기</Text>
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
                                    <Text style={{ fontSize: 12, fontFamily: 'NunitoSans-Regular', color: '#303030' }}>신청하기</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    :
                    <ScrollView style={{paddingBottom: 70}}>
                        <View style={{
                            marginRight: 30,
                            marginLeft: 30,
                            paddingTop: 16,
                            paddingBottom: 16,
                            borderRadius: 10,
                        }}>
                            <View style={{
                                marginTop: 16,
                                marginBottom: 24,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#ffb83d', marginRight: 8 }} />
                                <Text style={{
                                    fontFamily: 'NunitoSans-Bold',
                                    fontSize: 16,
                                    color: '#333333'
                                }}>Ongoing</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 19
                            }}>
                                <Image resizeMode="contain" style={{ width: 18, height: 20 }} source={require('./icon/fire.png')} />
                                <Text style={{ fontSize: 16, fontFamily: 'NunitoSans-Bold', marginLeft: 8, color: '#303030' }} >Step 01</Text>
                            </View>
                            <FlatList
                                data={OngoingData}
                                keyExtractor={item => item.step}
                                renderItem={({ item }) => (
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
                                        <Text style={{
                                            fontSize: 12,
                                            fontFamily: 'NunitoSans-Bold',
                                            color: '#303030',
                                            width: 40,
                                            marginRight: 12
                                        }}>{item.step}</Text>
                                        <ProgressBar progress={item.percent/100} width={184} color="#5cc27b" unfilledColor="#e0e0e0" borderColor="#ffffff" />
                                        <Text style={{
                                            fontSize: 12,
                                            fontFamily: 'NunitoSans-Bold',
                                            color: '#303030',
                                            width: 40,
                                            marginLeft: 12
                                        }}>{item.percent}%</Text>
                                    </View>
                                )}
                            />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 16
                            }}>
                                <Image resizeMode="contain" style={{ width: 18, height: 20 }} source={require('./icon/reward.png')} />
                                <Text style={{ fontSize: 16, marginLeft: 8, color: '#303030', fontFamily: 'NunitoSans-Bold' }}>상금정보</Text>
                            </View>
                            <View style={challenge.TokenBox}>
                                <Text style={[challenge.TokentrueText, { alignSelf: 'flex-start' }]}>총 참여자 수</Text>
                                <Text style={[challenge.TokentrueText, { alignSelf: 'flex-end' }]}>2,000 명</Text>
                            </View>
                            <View style={challenge.TokenBox}>
                                <Text style={[challenge.TokentrueText, { alignSelf: 'flex-start' }]}>총 상금</Text>
                                <Text style={[challenge.TokentrueText, { alignSelf: 'flex-end' }]}>2,000,000원</Text>
                            </View>
                            <View style={challenge.TokenBox}>
                                <Text style={[challenge.TokentrueText, { alignSelf: 'flex-start' }]}>예상 상금</Text>
                                <Text style={[challenge.TokentrueText, { alignSelf: 'flex-end' }]}>20,000원</Text>
                            </View>
                        </View>
                        <View style={{
                            marginLeft: 32,
                            marginTop: 16,
                            paddingBottom: 16,
                            marginRight: 32,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            borderBottomWidth: 0.2,
                            borderBottomColor: '#979797'
                        }}>
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#ffb83d', marginRight: 8 }} />
                            <Text style={{
                                fontFamily: 'NunitoSans-Bold',
                                fontSize: 16,
                                color: '#333333'
                            }}>Previous</Text>
                        </View>
                        <FlatList
                            data={PreviousData}
                            keyExtractor={item => item.challengeNumber}
                            renderItem={({ item }) => (
                                <View style={challenge.box}>
                                    <View>
                                        <Text style={challenge.largeText}>{item.ChallengeStep}</Text>
                                        {item.success === true ?
                                            <View>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <View style={{width: 8, height: 8, backgroundColor: '#5cc27b', borderRadius: 4, marginRight: 12}} />
                                                    <Text style={[challenge.mediumText, { marginBottom: 4 }]}>{item.participationDate}</Text>
                                                </View>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <View style={{width: 8, height: 8, backgroundColor: '#5cc27b', borderRadius: 4, marginRight: 12}} />
                                                    <Text style={[challenge.smallText, { fontSize: 16 }]}>{item.failureDate}</Text>
                                                </View>
                                            </View>
                                            :
                                            <View>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <View style={{width: 8, height: 8, backgroundColor: '#5cc27b', borderRadius: 4, marginRight: 12}} />
                                                    <Text style={[challenge.mediumText, { marginBottom: 4 }]}>{item.participationDate}</Text>
                                                </View>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <View style={{width: 8, height: 8, backgroundColor: '#ff0000', borderRadius: 4, marginRight: 12}} />
                                                    <Text style={[challenge.smallText, { fontSize: 16 }]}>{item.failureDate}</Text>
                                                </View>
                                            </View>
                                        }
                                    </View>
                                    {item.success === true ?
                                        <View style={{ width: 80, height: 30, backgroundColor: '#5cc27b', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16, color: '#ffffff' }}>성공</Text>
                                        </View>
                                        :
                                        <View style={{ width: 80, height: 30, backgroundColor: '#ff0000', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16, color: '#ffffff' }}>실패</Text>
                                        </View>
                                    }
                                </View>
                            )
                            }
                        />
                    </ScrollView>
                }
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => setChallengeToken(!ChallengeToken)}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff' }}>DB 연결 전 임시 버튼</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}