import React, {useState, useReducer} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TextInput,
    Button,
    Alert,
} from 'react-native';
import {challengeToken} from './challengeMain';

const challenge = StyleSheet.create({
    box: {
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 17
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: '#5CC27B',
        borderWidth: 1,

        justifyContent: 'center',
        alignItems: 'center'
    },
    bar: {
        width: "22.5%",
        height: 1,
        backgroundColor: '#5CC27B'
    },
    smallText: {
        fontSize: 12,
        width: 75,
        textAlign: "center",
        fontFamily: 'NunitoSans-Regular'
    },
    largeText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold'
    },
    mediumText: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular'
    },
    kitText : {
        fontSize: 18,
        fontFamily: 'NunitoSans-Bold',
        color: '#5CC27B'
    }
})

export default function ChallengeResisterTwo({navigation}) {
    const username = "박지훈";
    const phoneNumber = "010-4337-6670";
    const [addressnumber, setAdressnumber] = useState('');
    const [address, setAddress] = useState('');
    const [detailaddress, setDetailaddress] = useState('');

    const [money, setMoney] = useState('');
    const Money = money.length === 0 ? 0 : parseInt(money);
    const totalmoney = Money+12500;
    function onYesorNo(state, action) {
        switch(action.type) {
            case 'nothing' : 
                return state=0
            case 'yes' : 
                return state=1
            case 'no' :
                return state=2
        }
    }
    const [YesorNo, dispatch] = useReducer(onYesorNo, 0);
    const YesPress = () => {
        dispatch({
            type : 'yes'
        })
    }
    const NoPress = () => {
        dispatch({
            type: 'no'
        })
    }
    const YesColor = YesorNo===1 ? "#5CC27B" : "#FFFFFF";
    const NoColor = YesorNo===2 ? "#5CC27B" : "#FFFFFF";

    const [checkOne, setCheckOne] = useState(false);
    const [checkTwo, setCheckTwo] = useState(false);
    const [checkThree, setCheckThree] = useState(false);
    const onOneCheck = () => {setCheckOne(!checkOne)}
    const onTwoCheck = () => {setCheckTwo(!checkTwo)}
    const onThreeCheck = () => {setCheckThree(!checkThree)}
    const OneCheck = checkOne===true ? require('./icon/check.png') : undefined;
    const TwoCheck = checkTwo===true ? require('./icon/check.png') : undefined;
    const ThreeCheck = checkThree===true ? require('./icon/check.png') : undefined;

    const [info, setInfo] = useState(false);
    const kitButton = () => {setInfo(!info)}
    
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
                <ScrollView style={{marginBottom: 70}}>
                    {info===false ? 
                        <View />
                        :
                        <View style={{
                            position: 'absolute', 
                            top: 0, 
                            alignSelf: 'center', 
                            justifyContent: 'flex-start',
                            width: "92%", 
                            height: 509,
                            zIndex: 1,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#C6C6C6',
                            paddingLeft: 28,
                            paddingRight: 28,
                            paddingTop: 20,
                            paddingBottom: 20
                        }}>
                            <Text style={[challenge.kitText,{marginBottom: 16}]}>챌린지 키트?</Text>
                            <Text style={{marginBottom: 16}}>
                                <Text style={[challenge.largeText,{fontFamily: 'NunitoSans-Regular'}]}>당신의</Text>
                                <Text style={[challenge.largeText,{color: '#FFB83D'}]}> 챌린지 성공</Text>
                                <Text style={[challenge.largeText,{fontFamily: 'NunitoSans-Regular'}]}>을 돕기위한</Text>
                                <Text style={[challenge.largeText,{color: '#FFB83D'}]}> 비장의 카드!</Text>
                            </Text>
                            <Text style={[challenge.kitText,{marginBottom: 16}]}>다음과 같이 구성되어 있어요.</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                                <Image resizeMode="contain" style={{width: 80, height: 80}} source={require('./icon/kit1.png')} />
                                <Image resizeMode="contain" style={{width: 80, height: 80}} source={require('./icon/kit2.png')} />
                                <Image resizeMode="contain" style={{width: 80, height: 80}} source={require('./icon/kit3.png')} />
                            </View>
                            <Text style={{marginBottom: 8}}>
                                <Text style={[challenge.largeText,{fontFamily: 'NunitoSans-Regular'}]}>1. 입이 심심한 당신을 위한 </Text>
                                <Text style={[challenge.largeText,{color: '#FFB83D'}]}>무가당 껌 5 set</Text>
                            </Text>
                            <Text style={{marginBottom: 8}}>
                                <Text style={[challenge.largeText,{fontFamily: 'NunitoSans-Regular'}]}>2. 금연하는 것을 자연스럽게! </Text>
                                <Text style={[challenge.largeText,{color: '#FFB83D'}]}>금연 굿즈!</Text>
                            </Text>
                            <Text style={{marginBottom: 18}}>
                                <Text style={[challenge.largeText,{fontFamily: 'NunitoSans-Regular'}]}>3. 금연 잘하고 있나? </Text>
                                <Text style={[challenge.largeText,{color: '#FFB83D'}]}>타액검사키트 2 set!</Text>
                            </Text>
                            <Text style={[challenge.kitText,{marginBottom: 16}]}>특별혜택</Text>
                            <Text style={{marginBottom: 16}}>
                                <Text style={[challenge.largeText,{fontFamily: 'NunitoSans-Regular'}]}>챌린지에 성공하면 </Text>
                                <Text style={[challenge.largeText,{color: '#FFB83D'}]}>2,000BLOCK 페이백!</Text>
                            </Text>
                            <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => setInfo(!info)}>
                                <View style={{width: 150, height: 50, borderRadius: 28, backgroundColor: '#5CC27B', justifyContent: 'center', alignItems: 'center'}} >
                                    <Text style={{fontSize: 16, fontFamily: 'NunitoSans-Bold', color: '#FFFFFF'}}>확인</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{ marginTop: 32 }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={[challenge.circle, { backgroundColor: '#ffffff' }]}>
                                <Text style={[challenge.mediumText, { color: '#5CC27B'}]}>1</Text>
                            </View>
                            <View style={challenge.bar} />
                            <View style={[challenge.circle, { backgroundColor: '#5CC27B' }]}>
                                <Text style={[challenge.mediumText, { color: '#ffffff', fontFamily: 'NunitoSans-Bold'}]}>2</Text>
                            </View>
                            <View style={challenge.bar} />
                            <View style={[challenge.circle, { backgroundColor: '#ffffff' }]}>
                                <Text style={[challenge.mediumText, { color: '#5CC27B' }]}>3</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            marginTop: 4,
                        }}>
                            <Text style={challenge.smallText}>챌린지 정보</Text>
                            <Text style={challenge.smallText}>챌린지 설정</Text>
                            <Text style={challenge.smallText}>비밀번호 입력</Text>
                        </View>
                    </View>
                    <View style={{alignSelf: 'flex-start', marginTop: 32, marginLeft: 16}}>
                        <Text style={[challenge.mediumText,{fontFamily: 'NunitoSans-Bold'}]}>참가자 정보</Text>
                    </View>
                    <View style={{
                        marginTop: 18,
                        marginLeft: 18,

                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <Image source={require('./icon/kitone.png')} resizeMode="center" style={{width: 68, height: 68, borderRadius: 34}} />
                        <View style={{
                            marginLeft: 18,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <Text style={[challenge.mediumText, {marginBottom: 7, fontFamily: 'NunitoSans-Bold'}]}>{username}</Text>
                            <Text style={[challenge.mediumText, {fontFamily: 'NunitoSans-Bold'}]}>{phoneNumber}</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 44,
                        marginLeft: 18,
                        marginRight: 16,

                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={[challenge.mediumText, {fontFamily: 'NunitoSans-Bold'}]}>참가금액</Text>
                        <TextInput value={money} keyboardType="numeric" onChangeText={text => setMoney(text)} placeholder="최소 10,000 ~ 최대 100,000" placeholderTextColor="#C6C6C6" style={{fontSize: 14, textAlignVertical: 'center', width:"55%", height: 40, fontFamily: 'NunitoSans-Regular', borderRadius: 5, borderWidth: 1, borderColor: '#C6C6C6', marginLeft: 20}}/>
                        <Text style={[challenge.mediumText, {fontFamily: 'NunitoSans-Bold', marginRight: 16}]}>BLOCK</Text>
                    </View>
                    <View style={{alignSelf: 'center', marginTop: 8, marginRight: 50}}>
                        <Text style={{fontSize: 12, color: '#FF0000', fontFamily: 'NunitoSans-Regular'}}>입력가능 : 100,000</Text>
                    </View>
                    <View style={{
                        marginTop: 32,
                        marginLeft: 16,
                        flexDirection : 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={[challenge.mediumText, {fontFamily: 'NunitoSans-Bold', marginRight: 4}]}>챌린지 키트</Text>
                        <TouchableOpacity onPress={kitButton}>
                            <Image resizeMode="contain" source={require('./icon/questionmark.png')} style={{width: 20, height: 20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft: 17, marginRight: 7}} onPress={YesPress}>
                            <View style={{width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#5CC27B', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{width: 12, height: 12, borderRadius: 6, backgroundColor:YesColor}} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'NunitoSans-Regular', fontSize: 14, color: '#000000', opacity: 0.8}}>있음</Text>
                        <TouchableOpacity style={{marginLeft: 35, marginRight: 7}} onPress={NoPress}>
                            <View style={{width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#5CC27B', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{width: 12, height: 12, borderRadius: 6, backgroundColor:NoColor}} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'NunitoSans-Regular', fontSize: 14, color: '#000000', opacity: 0.8}}>없음 (+ 12,500)</Text>
                    </View>
                    {YesorNo === 1 ? 
                        <Text style={{
                            fontSize: 12,
                            color: '#FF0000',
                            alignSelf: 'center',
                            marginLeft: 85,
                            marginTop: 4,
                            fontFamily: 'NunitoSans-Regular'
                        }}>챌린지 키트가 없으면 챌린지를 진행할 수 없습니다.</Text>
                        : 
                        <View />
                    }
                    {YesorNo===2 ?
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 32,
                                marginTop: 18,
                                marginBottom: 8
                            }}>
                                <Text style={{fontSize:14, fontFamily: 'NunitoSans-Bold'}}>우편번호</Text>
                                <TextInput onChangeText={text => setAdressnumber(text)} placeholder="36917" placeholderTextColor="#C6C6C6" style={{fontSize: 14, width:"36%", height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#C6C6C6', marginLeft: 27, fontFamily: 'NunitoSans-Regular'}}/>
                                <TouchableOpacity style={{marginLeft: 16}} onPress={() => navigation.navigate('주소찾기')}>
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#FFB83D',
                                        paddingTop: 8,
                                        paddingBottom: 8,
                                        paddingLeft: 9,
                                        paddingRight: 9,
                                        borderRadius: 5
                                    }}>
                                        <Text style={{fontSize: 12, fontFamily: 'NunitoSans-Bold', color: '#FFFFFF'}}>주소찾기</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginLeft: 32,
                                marginBottom: 8
                            }}>
                                <Text style={{fontSize:14, fontFamily: 'NunitoSans-Bold', alignSelf: 'flex-start'}}>주소</Text>
                                <View style={{marginLeft: 54}}>
                                    <TextInput onChangeText={text => setAddress(text)} placeholder="경북 문경시 문경읍 온천1길 29" placeholderTextColor="#C6C6C6" style={{ fontSize: 14, fontFamily: 'NunitoSans-Regular', width: 251, height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#C6C6C6' }} />
                                    <TextInput onChangeText={text => setDetailaddress(text)} placeholder="1동 202호 (대원퀸즈빌)" placeholderTextColor="#C6C6C6" style={{ fontSize: 14, fontFamily: 'NunitoSans-Regular', width: 251, height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#C6C6C6', marginTop: 8 }} />
                                </View>
                            </View>
                        </View>
                        :
                        <View />
                    }
                    <View style={{
                        marginTop: 16.5,
                        flexDirection: 'row',
                        marginLeft: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={onOneCheck}>
                            <View style={{
                                width: 19,
                                height: 19,
                                borderWidth: 1,
                                borderColor: '#5CC27B',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={OneCheck} />
                            </View>
                        </TouchableOpacity>
                        <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular', marginLeft: 8 }]}>내용을 충분히 읽고 이해했습니다.</Text>
                    </View>
                    <View style={{
                        marginTop: 16.5,
                        flexDirection: 'row',
                        marginLeft: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={onTwoCheck}>
                            <View style={{
                                width: 19,
                                height: 19,
                                borderWidth: 1,
                                borderColor: '#5CC27B',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={TwoCheck} />
                            </View>
                        </TouchableOpacity>
                        <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular', marginLeft: 8, textDecorationLine: 'underline' }]}>개인정보 처리 약관</Text>
                    </View>
                    <View style={{
                        marginTop: 16.5,
                        flexDirection: 'row',
                        marginLeft: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={onThreeCheck}>
                            <View style={{
                                width: 19,
                                height: 19,
                                borderWidth: 1,
                                borderColor: '#5CC27B',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={ThreeCheck} />
                            </View>
                        </TouchableOpacity>
                        <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular', marginLeft: 8, textDecorationLine: 'underline' }]}>기타 약관</Text>
                    </View>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center', marginTop: 16, marginBottom: 10 }} />
                    {YesorNo === 2 ?
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginLeft: 18,
                                marginRight: 18,
                                marginBottom: 9
                            }}>
                                <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular' }]}>참가금액</Text>
                                <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular' }]}>{money} Block</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginLeft: 18,
                                marginRight: 18,
                                marginBottom: 9
                            }}>
                                <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular'}]}>챌린지 키트</Text>
                                <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular' }]}>12,500 Block</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginLeft: 18,
                                marginRight: 18
                            }}>
                                <Text style={{ fontSize: 21, fontFamily: 'NunitoSans-Bold' }}>총금액</Text>
                                <Text style={{ fontSize: 21, fontFamily: 'NunitoSans-Bold' }}>{totalmoney} Block</Text>
                            </View>
                        </View>
                        :
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginLeft: 18,
                                marginRight: 18,
                                marginBottom: 9
                            }}>
                                <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular'}]}>참가금액</Text>
                                <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular' }]}>{money} Block</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginLeft: 18,
                                marginRight: 18
                            }}>
                                <Text style={{ fontSize: 21, fontFamily: 'NunitoSans-Bold'}}>총금액</Text>
                                <Text style={{ fontSize: 21, fontFamily: 'NunitoSans-Bold' }}>{money} Block</Text>
                            </View>
                        </View>
                    }
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => {
                    {
                        YesorNo === 1 ? (
                            (checkOne === true) && (checkTwo === true) && (checkThree === true) && (YesorNo >= 1) && (Money >= 10000) && (Money <= 100000) ?
                                navigation.navigate('PasswordChange')
                                :
                                '')
                            :
                            ((checkOne === true) && (checkTwo === true) && (checkThree === true) && (YesorNo >= 1) && (Money >= 10000) && (Money <= 100000) && (addressnumber.length > 0) && (address.length > 0) && (detailaddress.length > 0) ?
                                navigation.navigate('PasswordChange')
                                :
                                ''
                            )
                    }
                }}>
                    <View style={{
                        width: "100%",
                        height: 60,
                        backgroundColor:
                            YesorNo === 1 ? (
                                (checkOne === true) && (checkTwo === true) && (checkThree === true) && (YesorNo >= 1) && (Money >= 10000) && (Money <= 100000) ?
                                    '#5cc27b'
                                    :
                                    '#c6c6c6'
                            )
                                :
                                ((checkOne === true) && (checkTwo === true) && (checkThree === true) && (YesorNo >= 1) && (Money >= 10000) && (Money <= 100000) && (addressnumber.length > 0) && (address.length > 0) && (detailaddress.length > 0) ?
                                    '#5cc27b'
                                    :
                                    '#c6c6c6'
                                ),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>등록하기</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}