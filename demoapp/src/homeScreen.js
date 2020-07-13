import React from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';

const style = StyleSheet.create({
    container : {
        marginBottom: 14,
        paddingLeft: 14,
        paddingRight: 14
    }
})

export default function HomeScreen() {
    const num = 1;
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
                <ScrollView style={style.container}>
                    <View
                        accessibilityRole="header"
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 4,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 24 }}>
                            <Text style={{ fontWeight: '100', color: '#979797' }}>Hello,</Text>
                            <Text style={{ fontWeight: 'bold', color: '#5CC27B' }}> Blockers</Text>
                        </Text>
                        <Image source={require('./icon/alram.png')} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Start your Smoking Cessation With </Text>
                            <Text style={{ fontWeight: 'bold', color: '#5CC27B' }}>Blockers</Text>
                        </Text>
                        <TouchableOpacity style={{ marginTop: 20 }}>
                            <View style={{ backgroundColor: '#5CC27B', width: 100, borderRadius: 20, height: 35, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#ffffff' }}>시작하기</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                        <Image source={require('./icon/lightbulb.png')} />
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}> 금연을 시작하고 건강 정보를 받아가세요</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginTop: 30,
                    }}>
                        <TouchableOpacity>
                            <Image source={require('./icon/calendar.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('./icon/chatbot.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingTop: 20,
                        paddingLeft: 14,
                        paddingRight: 14,
                    }}>
                        <View style={{maxWidth: 300}}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingTop: 30,
                                paddingBottom: 5,
                                paddingLeft: 14,
                                paddingRight: 14
                            }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFB83D' }} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Challenge {num}</Text>
                            </View>
                            <Text style={{ marginLeft: 32 }}>
                                <Text style={{ fontSize: 14, color: '#979797', fontWeight: 'normal' }}>180 days Smoking Cessation Challenge with</Text>
                                <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold' }}> Blockers</Text>
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: 35, marginRight: 20 }}>
                            <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Start</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingTop: 20,
                        paddingLeft: 14,
                        paddingRight: 14,
                    }}>
                        <View style={{maxWidth: 300}}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingTop: 30,
                                paddingBottom: 5,
                                paddingLeft: 14,
                                paddingRight: 14
                            }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFB83D' }} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Mission {num}</Text>
                            </View>
                            <Text style={{ marginLeft: 32 }}>
                                <Text style={{ fontSize: 14, color: '#979797', fontWeight: 'normal' }}>180 days Smoking Cessation Challenge with</Text>
                                <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold' }}> Blockers</Text>
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: 35, marginRight: 20 }}>
                            <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Start</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}