import React from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const style = StyleSheet.create({
    portfolioBox: {
        width: "100%",
        height: 290,
        paddingLeft: '10%',
        paddingRight: '8%',
        paddingTop: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 28
    },
    container: {
        width: "90%",
        height: 125,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginBottom: 14,
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: 16,
        paddingLeft: 18,
        paddingRight: 27
    }
})

export default function ReportScreen({ navigation }) {
    const list = [
        {
            name: "크랩 TV",
            money: "40 KRAB",
            invest: 10,
            share: 0,
            stack: 0
        },
        {
            name: "미미 TV",
            money: "40 MIMI",
            invest: 10,
            share: 2,
            stack: 5
        },
        {
            name: "크랩 TV",
            money: "20 PIPI",
            invest: 5,
            share: 0.5,
            stack: 0.6
        }
    ]
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
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
                    <View style={{width: 27}} />
                    <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20 }}>Portfolio</Text>
                    <TouchableOpacity style={{ marginBottom: 4 }}>
                        <Ionicons name="options-outline" color="#35363b" size={27} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={style.portfolioBox}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            marginBottom: 20
                        }}>
                            <View style={{ width: "60%" }}>
                                <View style={{
                                    width: "100%",
                                    marginBottom: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular' }}>총 투자금액 </Text>
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Bold' }}>₩ 1,000,000</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    marginBottom: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular', marginRight: 12 }}>예상 배당</Text>
                                        <View style={{width: 12, height: 12, borderWidth: 1, borderColor: '#202426', backgroundColor: '#ffffff', borderRadius: 6, alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={{fontSize: 8, color: '#202426', fontFamily: 'Metropolis-Bold'}}>?</Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Bold' }}>₩ 1,000,000</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    marginBottom: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular' }}>누적 배당 </Text>
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Bold' }}>₩ 1,000,000</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Ionicons name="arrow-up-outline" color="#78e185" size={28} />
                                <Text style={{ fontSize: 22, color: '#78e185', fontFamily: 'Metropolis-Bold', marginLeft: 4 }}>10%</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%'
                        }}>
                            <Image source={require('./icon/assetchart.png')} />
                            <View style={{ width: "40%" }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: 6
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <View style={{ width: 9, height: 9, backgroundColor: '#161513', borderRadius: 4.5 }} />
                                        <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', marginLeft: 8 }}>크랩 TV</Text>
                                    </View>
                                    <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', marginLeft: 8 }}>60%</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: 6
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <View style={{ width: 9, height: 9, backgroundColor: '#929594', borderRadius: 4.5 }} />
                                        <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', marginLeft: 8 }}>미미 TV</Text>
                                    </View>
                                    <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', marginLeft: 8 }}>40%</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: 6
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <View style={{ width: 9, height: 9, backgroundColor: '#bfc1c0', borderRadius: 4.5 }} />
                                        <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', marginLeft: 8 }}>삐삐 TV</Text>
                                    </View>
                                    <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', marginLeft: 8 }}>20%</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 80 }}>
                        {list.map(id =>
                            <View style={style.container}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: "100%",
                                    marginBottom: 8
                                }}>
                                    <Text style={{ fontSize: 16, color: '#161513', fontFamily: 'Metropolis-Bold' }}>{id.name}</Text>
                                    <Text style={{ fontSize: 16, color: '#161513', fontFamily: 'Metropolis-Bold' }}>{id.money}</Text>
                                </View>
                                <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ width: "60%" }}>
                                        <View style={{
                                            width: "100%",
                                            marginBottom: 8,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>총 투자금액</Text>
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>{id.invest} KLAY</Text>
                                        </View>
                                        <View style={{
                                            width: "100%",
                                            marginBottom: 8,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular', marginRight: 12 }}>예상배당</Text>
                                                <View style={{ width: 12, height: 12, borderWidth: 1, borderColor: '#202426', backgroundColor: '#ffffff', borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 8, color: '#202426', fontFamily: 'Metropolis-Bold' }}>?</Text>
                                                </View>
                                            </View>
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>{id.share} KLAY</Text>
                                        </View>
                                        <View style={{
                                            width: "100%",
                                            marginBottom: 8,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>누적배당</Text>
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>{id.stack} KLAY</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate("ReportCreator")} style={{
                                        width: 94,
                                        height: 32,
                                        borderRadius: 10,
                                        backgroundColor: '#202426',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{ fontFamily: 'Metropolis-Bold', fontSize: 12, color: '#ffffff', marginRight: 4 }}>Report</Text>
                                        <Ionicons name="arrow-forward" size={20} color="#ffffff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}