import React, { useEffect, useReducer, useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity,
    Modal,
    TextInput
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const style = StyleSheet.create({
    largebox: {
        width: '90%',
        height: 270,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 16
    },
    line: {
        height: 0.7,
        backgroundColor: '#D2D3D3',
        margin: 16
    },
    smallbox: {
        width: 45,
        height: 18,
        borderRadius: 20,
        marginRight: 5.3,

        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center"
    },
    smalltext: {
        fontFamily: 'Metropolis-Bold',
        color: '#ffffff',
        fontSize: 10,
    },
    text: {
        fontFamily: 'Metropolis-Bold',
        color: '#202426'
    },
    agreebox: {
        width: 320,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 20
    },
    percentbox: {
        width: 46, 
        height: 33,
        borderRadius: 5, 
        borderWidth: 1,
        borderColor: '#35363b',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    percent: {
        fontFamily: 'Metropolis-Bold',
        fontSize: 14,
        color: '#202426'
    }
})

function Percent (state, action) {
    switch (action.type) {
        case "25%":
            return 25;
        case "50%":
            return 50;
        case "75%":
            return 75;
        case "MAX":
            return 100;
    }
}

export default function FundFund({ navigation }) {
    //Fund-Fund
    const [checkTotal, setCheckTotal] = useState(false);
    const [checkOne, setCheckOne] = useState(false);
    const [checkTwo, setCheckTwo] = useState(false);
    const [checkThree, setCheckThree] = useState(false);
    const [checkFour, setCheckFour] = useState(false);
    const onOneCheck = () => { setCheckOne(!checkOne) }
    const onTwoCheck = () => { setCheckTwo(!checkTwo) }
    const onThreeCheck = () => { setCheckThree(!checkThree) }
    const onFourCheck = () => { setCheckFour(!checkFour) }
    const OneCheck = checkTotal === true ? require('./icon/check.png') : checkOne === true ? require('./icon/check.png') : undefined;
    const TwoCheck = checkTotal === true ? require('./icon/check.png') : checkTwo === true ? require('./icon/check.png') : undefined;
    const ThreeCheck = checkTotal === true ? require('./icon/check.png') : checkThree === true ? require('./icon/check.png') : undefined;
    const FourCheck = checkFour === true ? require('./icon/check.png') : undefined;
    const TotalCheck = checkTotal === true ? require('./icon/check.png') : undefined;

    //펀딩 금액 설정
    const [fundvisible, setFundvisible] = useState(false);
    const [klayvalue, setKlayvalue] = useState(0);
    const [percentvalue, percentpatch] = useReducer(Percent, 0);
    const onTwentyFive = () => {percentpatch({type: "25%"})}
    const onFifty = () => {percentpatch({type: "50%"})}
    const onSeventyFive = () => {percentpatch({type: "75%"})}
    const onMax = () => {percentpatch({type: "MAX"})}

    //펀딩 완료
    const [fundComplete, setFundComplete] = useState(false);
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
                <View accessibilityRole="header" style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    height: 87,
                    paddingBottom: 14,
                    backgroundColor: '#ffffff',
                    width: "100%",
                    paddingLeft: "5%",
                    paddingRight: "5%"
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 4 }}>
                        <Image source={require('./icon/back.png')} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20 }}>Funding</Text>
                    <View />
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={fundvisible}
                    onRequestClose={() => setFundvisible(!fundvisible)}
                >
                    <View style={{ flex: 1, backgroundColor: '#B7B7B7', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <View style={{
                            width: "100%",
                            height: 439,
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                            backgroundColor: '#ffffff',
                            alignItems: 'center',
                        }}>
                            <Text style={[style.text, { color: '#161513', fontSize: 24, marginTop: 16, marginBottom: 30 }]}>{fundComplete === false ? "펀딩 금액 설정" : "펀딩 완료"}</Text>
                            {fundComplete === false ?
                                <>
                                    <View style={{ width: 250, marginBottom: 16 }}>
                                        <View style={{ width: 250, height: 50, borderBottomColor: '#161513', borderBottomWidth: 2, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                            <TextInput value={klayvalue} keyboardType="number-pad" style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20, width: 180 }} />
                                            <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20, marginBottom: 8 }}>KLAY</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 8, alignSelf: 'flex-end' }}>
                                            <TouchableOpacity onPress={onTwentyFive} style={[style.percentbox, { backgroundColor: percentvalue === 25 ? '#202426' : '#ffffff' }]}>
                                                <Text style={[style.percent, { color: percentvalue === 25 ? '#ffffff' : '#202426' }]}>25%</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={onFifty} style={[style.percentbox, { backgroundColor: percentvalue === 50 ? '#202426' : '#ffffff' }]}>
                                                <Text style={[style.percent, { color: percentvalue === 50 ? '#ffffff' : '#202426' }]}>50%</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={onSeventyFive} style={[style.percentbox, { backgroundColor: percentvalue === 75 ? '#202426' : '#ffffff' }]}>
                                                <Text style={[style.percent, { color: percentvalue === 75 ? '#ffffff' : '#202426' }]}>75%</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={onMax} style={[style.percentbox, { backgroundColor: percentvalue === 100 ? '#202426' : '#ffffff' }]}>
                                                <Text style={[style.percent, { color: percentvalue === 100 ? '#ffffff' : '#202426' }]}>MAX</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={[style.text, { color: '#ed3f2b', fontSize: 13, marginTop: 8, alignSelf: 'flex-end' }]}>MAX: 1,000 KLAY</Text>
                                    </View>
                                    <Image source={require('./icon/arrowdown.png')} />
                                </>
                                :
                                <Image style={{marginBottom: 32}} source={require('./icon/checkcomplete.png')} />
                            }
                            <Text style={[style.text, { color: '#161513', fontSize: 14, marginTop: 16, alignSelf: 'center' }]}>{fundComplete === false ? "Smart Contract Address" : "Tx hash"}</Text>
                            <Text style={{ fontSize: 12, marginTop: 16, alignSelf: 'center', fontFamily: 'Metropolis-Regular', color: '#202426' }}>{fundComplete === false ? "0xCFAf7E7337466ce5444219b84741F2039611a382" : "0x649640518e043295c86e674b4904…e6989215db2"}</Text>
                            <Text style={{ fontSize: 12, marginTop: 16, alignSelf: 'flex-end', fontFamily: 'Metropolis-Regular', color: '#202426', marginRight: "9%", textDecorationLine: "underline" }}>View In Klaytnscope</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { fundComplete === false ? setFundComplete(true) : navigation.navigate("Home") }} style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                        <View style={{
                            width: "100%",
                            height: 60,
                            backgroundColor: '#202426',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 16, color: '#ffffff', fontFamily: 'Metropolis-Bold' }}>{fundComplete===false ? "확인" : "돌아가기"}</Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
                <ScrollView>
                    <View style={style.largebox}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: '4%',
                            marginTop: 16
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('./icon/homeyoutuber.png')} />
                                <View style={{
                                    marginLeft: 16
                                }}>
                                    <Text style={[style.text, { fontSize: 16, marginBottom: 8 }]}>크랩 TV</Text>
                                    <Text style={{ fontSize: 12, color: '#161513', fontFamily: 'Metropolis-Regular', marginBottom: 8 }}>목표금액 : 1,000,000 KLAY</Text>
                                    <Text style={{ fontSize: 12, color: '#161513', fontFamily: 'Metropolis-Regular', marginBottom: 8 }}>펀딩기간 : 2020/9/4~9/30</Text>
                                    <Text style={{ marginBottom: 8 }}>
                                        <Text style={{ fontSize: 12, color: '#161513', fontFamily: 'Metropolis-Bold' }}>100% </Text>
                                        <Text style={{ fontSize: 12, color: '#161513', fontFamily: 'Metropolis-Regular' }}>완료시 펀딩 진행</Text>
                                    </Text>
                                    <Text style={{ marginBottom: 8 }}>
                                        <Text style={{ fontSize: 12, color: '#161513', fontFamily: 'Metropolis-Regular' }}>Personal cap </Text>
                                        <Text style={{ fontSize: 12, color: '#161513', fontFamily: 'Metropolis-Bold' }}>: 100,000 KLAY</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <ProgressBar style={{ alignSelf: 'center', marginTop: 28, marginBottom: 16 }} progress={0.6} width={320} height={8} color={'black'} unfilledColor="#acacac" borderWidth={0} />
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginLeft: '4%', marginRight: '4%' }}>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Text style={{ marginBottom: 8, fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Bold' }}>10명 참여중!</Text>
                                <Text style={{ marginBottom: 8, fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Bold' }}>600,000 원 펀딩</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 24, marginTop: 8 }}>
                                    <Image style={{ width: 24, height: 24, marginRight: 4 }} resizeMode="contain" source={require('./icon/heart.png')} />
                                    <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Bold' }}>100</Text>
                                    <Image style={{ width: 24, height: 24, marginLeft: 10, marginRight: 4 }} resizeMode="contain" source={require('./icon/share.png')} />
                                    <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Bold' }}>50</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={style.agreebox}>
                        <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Bold' }}>약관 전체동의</Text>
                        <TouchableOpacity onPress={() => setCheckTotal(!checkTotal)} style={{width: 16, height: 16, borderWidth: 1, borderColor: '#202426', backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={TotalCheck} />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignSelf: 'center', width: 320, paddingLeft: 16, paddingRight: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
                        <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Bold', opacity: 0.6 }}>
                            <Text style={{textDecorationLine: 'underline'}}>개인정보 처리</Text> 약관(필수)
                        </Text>
                        <TouchableOpacity onPress={onOneCheck} style={{width: 16, height: 16, borderWidth: 1, borderColor: '#202426', backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={OneCheck} />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignSelf: 'center', width: 320, paddingLeft: 16, paddingRight: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
                        <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Bold', opacity: 0.6 }}>
                            <Text style={{textDecorationLine: 'underline'}}>이용약관</Text> 동의(필수)
                        </Text>
                        <TouchableOpacity onPress={onTwoCheck} style={{width: 16, height: 16, borderWidth: 1, borderColor: '#202426', backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'}} >
                            <Image source={TwoCheck} />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignSelf: 'center', width: 320, paddingLeft: 16, paddingRight: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
                        <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Bold', opacity: 0.6 }}>
                            <Text style={{textDecorationLine: 'underline'}}>자산손실의 위험</Text>을 인지했습니다(필수)
                        </Text>
                        <TouchableOpacity onPress={onThreeCheck} style={{width: 16, height: 16, borderWidth: 1, borderColor: '#202426', backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'}} >
                            <Image source={ThreeCheck} />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignSelf: 'center', width: 320, paddingLeft: 16, paddingRight: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
                        <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Bold', opacity: 0.6 }}>
                            펀딩완료시 SNS, Email 알람 수신(선택)
                        </Text>
                        <TouchableOpacity onPress={onFourCheck} style={{width: 16, height: 16, borderWidth: 1, borderColor: '#202426', backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={FourCheck} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => setFundvisible(true)} style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                    <View style={{
                        width: "100%",
                        height: 60,
                        backgroundColor: '#202426',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 16, color: '#ffffff', fontFamily: 'Metropolis-Bold' }}>확인</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}