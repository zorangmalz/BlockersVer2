import React from 'react';
import {
    StatusBar,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get("screen").width;

const style = StyleSheet.create({
    largebox: {
        width: '90%',
        height: 1250,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 80,
        zIndex: 1
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
    }
})

const example = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.";

export default function HomeFund({ navigation }) {
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
                    <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20 }}>Fund Detail</Text>
                    <View />
                </View>
                <ScrollView style={{ zIndex: 1 }}>
                    <View style={style.largebox}>
                        <View style={{
                            backgroundColor: "#e78276",
                            width: 100,
                            height: 0,
                            borderBottomWidth: 25,
                            borderBottomColor: "#e78276",
                            borderLeftWidth: 25,
                            borderLeftColor: '#efefef',
                            borderRightWidth: 25,
                            borderRightColor: '#efefef',
                            borderStyle: "solid",
                            zIndex: 2,
                            marginTop: 20,

                            position: "absolute",
                            right: -23,
                            top: -6,
                            transform: [{
                                rotate: "45deg",
                            }]
                        }} />
                        <Text style={{ 
                            fontFamily: "Metropolis-Bold", 
                            fontSize: 14, 
                            color: "#ffffff", 
                            textAlign: "center", 
                            textAlignVertical: "center", 
                            zIndex: 2, 
                            position: "absolute",
                            top: 21,
                            right: 9,
                            transform: [{
                                rotate: "45deg"
                            }]
                        }}>D-20</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 16,
                            marginRight: "4%",
                            marginLeft: "4%",
                            zIndex: 1,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Image source={require('./icon/homeyoutuber.png')} />
                                <View style={{
                                    marginLeft: WIDTH * 0.032,
                                    alignItems: "flex-start",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={[style.text, { fontSize: 16, marginBottom: 10 }]}>크랩 TV</Text>
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular', marginBottom: 8 }}>자금 모집 유형 : 초기자금</Text>
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular', marginBottom: 8 }}>한줄 소개 : 해산물 먹방 특화 크리에이터</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular' }}>섹터 분류 : </Text>
                                        <View style={[style.smallbox, { backgroundColor: '#78e185' }]}><Text style={style.smalltext}>#먹방</Text></View>
                                        <View style={[style.smallbox, { backgroundColor: '#9ddadb' }]}><Text style={style.smalltext}>#일상</Text></View>
                                        <View style={[style.smallbox, { backgroundColor: '#ffcf77' }]}><Text style={style.smalltext}>#ASMR</Text></View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <ProgressBar style={{alignSelf: 'center', marginTop: 28, marginBottom: 16}} progress={0.6} width={WIDTH * 0.83} height={8} color={'black'} unfilledColor="#acacac" borderWidth={0} />
                        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginLeft: '4%', marginRight: '4%'}}>
                            <View style={{alignItems: 'flex-start'}}>
                                <Text style={{marginBottom: 8, fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Bold'}}>10명 참여중!</Text>
                                <Text style={{marginBottom: 8, fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Bold'}}>600,000 원 펀딩</Text>
                                <Text style={{marginBottom: 8, fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular'}}>목표금액 1,000,000 원 </Text>
                                <Text style={{marginBottom: 8, fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular'}}>펀딩기간 2020/9/4~9/30</Text>
                            </View>
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 24, marginTop: 8}}>
                                    <Ionicons name="md-heart-outline" size={32} />
                                    <Text style={{fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Bold', marginLeft: 4, marginRight: 10}}>100</Text>
                                    <Ionicons name="md-share-social-outline" size={32} />
                                    <Text style={{fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Bold', marginLeft: 4}}>50</Text>
                                </View>
                                <Text style={{marginBottom: 8, fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', alignSelf: "flex-end"}}>100% 완료시 펀딩 진행</Text>
                            </View>
                        </View>
                        <View style={style.line} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginLeft: 18 }}>
                            <Text style={{ fontSize: 14, marginRight: 16, color: '#161513', fontFamily: 'Metropolis-Bold' }}>소개</Text>
                            <Text style={{ fontSize: 14, marginRight: 16, fontFamily: 'Metropolis-Regular', color: '#202426' }}>Fund</Text>
                            <Text style={{ fontSize: 14, marginRight: 16, fontFamily: 'Metropolis-Regular', color: '#202426' }}>상환계획</Text>
                            <Text style={{ fontSize: 14, marginRight: 16, fontFamily: 'Metropolis-Regular', color: '#202426' }}>Q&A</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "center"
                        }}>
                            <View>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <Ionicons name="logo-youtube" size={32} />
                                    <Text style={{ marginLeft: 16, fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular', marginRight: 20 }}>구독자 : 1 K</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 8
                                }}>
                                    <Ionicons name="logo-instagram" size={32} />
                                    <Text style={{ marginLeft: 16, fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular', marginRight: 24 }}>팔로워 : 1 K</Text>
                                </View>
                            </View>
                            <View>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <Ionicons name="logo-twitch" size={32} />
                                    <Text style={{ marginLeft: 16, fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular' }}>구독자 : 2 K</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 8
                                }}>
                                    <Text style={{ width: 32, textAlign: 'center', fontSize: 35, color: '#202426', fontFamily: 'Metropolis-Bold' }}>$</Text>
                                    <Text style={{ marginLeft: 16, fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular' }}>채널 통계 보러가기</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={{alignSelf: 'center', marginTop: 20, fontSize: 16, color: '#161513', fontFamily: 'Metropolis-Bold', marginBottom: 16}}>채널 소개</Text>
                        <Image style={{alignSelf: 'center', marginBottom: 16}} source={require('./icon/krab.png')} />
                        <Text style={{alignSelf: 'center', marginBottom: 16, width: 300, opacity: 0.8, fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular'}}>{example}</Text>
                        <Text style={{alignSelf: 'center', fontSize: 16, color: '#161513', fontFamily: 'Metropolis-Bold', marginBottom: 16}}>성장 계획</Text>
                        <Image style={{alignSelf: 'center', marginBottom: 16}} source={require('./icon/graph.png')} />
                        <Text style={{alignSelf: 'center', marginBottom: 30, width: 300, opacity: 0.8, fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular'}}>{example}</Text>
                        <Text style={{alignSelf: 'center', fontSize: 16, color: '#161513', fontFamily: 'Metropolis-Bold', marginBottom: 16}}>지속 가능성</Text>
                        <Text style={{alignSelf: 'center', marginBottom: 16, width: 300, opacity: 0.8, fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular'}}>{example}</Text>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate("FundFund")} style={{ position: 'absolute', bottom: 0, right: 0, left: 0, zIndex: 2 }}>
                    <View style={{ 
                        width: "100%", 
                        height: 60, 
                        backgroundColor: '#202426',
                        justifyContent: 'center', 
                        alignItems: 'center' 
                    }}>
                        <Text style={{ fontSize: 16, color: '#ffffff', fontFamily: 'Metropolis-Bold' }}>펀딩하기</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}