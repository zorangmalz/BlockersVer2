import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Dimensions,
    Modal
} from 'react-native';

const welcome = StyleSheet.create({
    box: {
        backgroundColor: '#333953',
        opacity: 0.95,
        width: "100%",
        height: 180,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginTop: 16,
        flexDirection: 'row',
        paddingTop: 16
    },
    largeText: {
        fontSize: 24,
        fontFamily: 'NunitoSans-Bold',
        color: '#5CC27B',
        textAlign: 'center'
    },
    mediumText: {
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'NunitoSans-Regular'
    },
    smallText: {
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'NunitoSans-Regular'
    }
})

export default function SolutionMain({navigation}) {
    const [skipmodal, setSkipmodal] = useState(false);
    const skipView = () => {
        setTimeout(() => {
            setSkipmodal(true)
        }, 200)
    }
    return (
        <>
            <SafeAreaView style={{flex: 0}} />
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8', justifyContent: 'center' }}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={skipmodal}
                    onRequestClose={() => setSkipmodal(false)}
                >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
                                color: '#000000',
                                opacity: 0.8,
                                marginTop: 20
                            }}>건너뛰시겠습니까?</Text>
                            <Text style={{
                                fontFamily: 'NunitoSans-Regular',
                                fontSize: 14,
                                color: '#000000',
                                opacity: 0.6,
                                textAlign: 'center'
                            }}>홈화면의 챗봇과 미션 클릭을 통해 다시 진행할 수 있습니다.</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 15
                            }}>
                                <TouchableOpacity onPress={() => setSkipmodal(false)} style={{
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
                                <TouchableOpacity onPress={() => navigation.navigate('Home')}
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
                                    }}>건너뛰기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{
                    width: "90%",
                    height: "90%",
                    backgroundColor: '#FFFFFF',
                    margin: 20,
                    borderRadius: 30
                }}>
                    <TouchableOpacity onPress={skipView} style={{ alignSelf: 'flex-end', paddingRight: 17, paddingTop: 17 }}>
                        <Text style={{ textDecorationLine: 'underline', fontSize: 12, fontFamily: 'NunitoSans-Regular' }}>건너뛰기</Text>
                    </TouchableOpacity>
                    <Text style={[welcome.largeText, { alignSelf: 'center', paddingTop: 8 }]}>Welcome Blockers</Text>
                    <View style={welcome.box}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120 }}>
                            <Text style={welcome.smallText}>Blockers</Text>
                            <Text style={welcome.smallText}>평균 성공률</Text>
                            <Image style={{ marginTop: 16, marginBottom: 5 }} source={require('./icon/percent.png')} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120 }}>
                            <Text style={welcome.smallText}>Blockers</Text>
                            <Text style={welcome.smallText}>평균 상금</Text>
                            <Image style={{ marginTop: 16, marginBottom: 5 }} source={require('./icon/money.png')} />
                            <Text style={[welcome.largeText, { color: '#FFFFFF' }]}>10,000 원</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <Text style={welcome.mediumText}>Blockers에 오신 것을 환영합니다!</Text>
                        <Text style={welcome.mediumText}>설문조사를 통해 흡연 습관 분석과</Text>
                        <Text style={welcome.mediumText}>맞춤 솔루션을 제공받으세요!</Text>
                    </View>
                    <TouchableOpacity style={{ 
                        position: 'relative', 
                        top: "10%", 
                        alignSelf: 'center', 
                        marginTop: 45 
                    }}
                        onPress={()=>navigation.navigate('SolutionSmoke')}
                    >
                        <View style={{ width: 150, height: 50, borderRadius: 28, backgroundColor: '#5CC27B', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'NunitoSans-Bold', textAlign: 'center' }}>시작하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    )
}