import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const challenge = StyleSheet.create({
    box : {
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 17,
        marginLeft: 16,
        marginRight: 16,
        paddingBottom: 32
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: '#5CC27B',
        borderWidth : 1,

        justifyContent: 'center',
        alignItems: 'center'
    },
    bar : {
        width: "22.5%",
        height: 1,
        backgroundColor : '#5CC27B'
    },
    numText : {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular'
    },
    smallText : {
        fontSize: 12,
        width: 75,
        textAlign: "center",
        fontFamily: 'NunitoSans-Regular',
        color: '#303030'
    },
    largeText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030'
    },
    mediumText : {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030'
    }
})

export default function ChallengeResisterOne ({navigation}) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
            <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "5%", paddingRight: "5%" }}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>Challenge</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView style={{marginBottom: 70, marginTop: 3}}>
                    <View style={challenge.box}>
                        <Text style={[challenge.largeText, {marginTop: 16}]}>Step 01</Text>
                        <View style={{
                            justifyContent: 'center', 
                            alignSelf: 'stretch', 
                            marginLeft: 16, 
                            marginRight: 16, 
                            marginTop: 16,

                            paddingRight: 18,
                            paddingLeft: 18
                        }}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
                                <Text style={[challenge.mediumText, { fontFamily: 'NunitoSans-Bold'}]}>챌린지 금액</Text>
                                <Text style={challenge.mediumText}>10,000원~100,000원</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                <Text style={[challenge.mediumText, { fontFamily: 'NunitoSans-Bold'}]}>인증횟수</Text>
                                <Text style={challenge.mediumText}>2주 1회, 총 2회</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                <Text style={[challenge.mediumText, { fontFamily: 'NunitoSans-Bold'}]}>페널티</Text>
                                <Text style={challenge.mediumText}>30%</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 16 }}>
                                <Text style={[challenge.mediumText, { fontFamily: 'NunitoSans-Bold'}]}>인증방법</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Image style={{width: 80, height: 80, borderColor: '#707070', borderWidth:1}} resizeMode="contain" source={require('./icon/kitone.png')} />
                                    <Text style={[challenge.mediumText,{fontFamily: 'NunitoSans-Bold', color: '#5cc27b', marginTop: 4}]}>1</Text>
                                </View>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Image style={{width: 80, height: 80, borderColor: '#707070', borderWidth:1}} resizeMode="contain" source={require('./icon/kitone.png')} />
                                    <Text style={[challenge.mediumText,{fontFamily: 'NunitoSans-Bold', color: '#5cc27b', marginTop: 4}]}>2</Text>
                                </View>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Image style={{width: 80, height: 80, borderColor: '#707070', borderWidth:1}} resizeMode="contain" source={require('./icon/kittwo.png')} />
                                    <Text style={[challenge.mediumText,{fontFamily: 'NunitoSans-Bold', color: '#5cc27b', marginTop: 4}]}>3</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 16, alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={[challenge.mediumText, { marginBottom: 8 }]}>1. 타액검사 키트를 개봉합니다.</Text>
                                <Text style={[challenge.mediumText, { marginBottom: 8 }]}>2. 타액 검사 키트를 입에 물고 사진을 촬영합니다.</Text>
                                <Text style={[challenge.mediumText, { marginBottom: 8 }]}>3. 3-5분 후 검사결과가 나오면 타액검사 키트를 손에 쥔 상태로 결과 부분을 촬영합니다.</Text>
                                <Text style={[challenge.mediumText, { marginBottom: 8 }]}>4. 1-2일 후 일증결과를 확인합니다.</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => navigation.navigate('ChallengeResisterTwo')}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>다음</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}