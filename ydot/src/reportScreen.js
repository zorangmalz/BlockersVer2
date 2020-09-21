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
        height: 145,
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
    const list = [1, 2, 3];
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
                    <View />
                    <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20 }}>Portfolio</Text>
                    <TouchableOpacity style={{ marginBottom: 4 }}>
                        <Image source={require('./icon/filter.png')} />
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
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Bold' }}>25 KLAY</Text>
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
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Bold' }}>2.5 KLAY</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    marginBottom: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular' }}>누적 배당 </Text>
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Bold' }}>5.6 KLAY</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Image source={require('./icon/arrowup.png')} />
                                <Text style={{ fontSize: 22, color: '#78e185', fontFamily: 'Metropolis-Bold', marginLeft: 8 }}>10%</Text>
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
                                        <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', marginLeft: 8 }}>미미먹방</Text>
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
                                        <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', marginLeft: 8 }}>롤킹</Text>
                                    </View>
                                    <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', marginLeft: 8 }}>20%</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 80 }}>
                        
                            <View style={style.container}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: "100%",
                                    marginBottom: 8
                                }}>
                                    <Text style={{ fontSize: 16, color: '#161513', fontFamily: 'Metropolis-Bold' }}>크랩 TV </Text>
                                    <Text style={{ fontSize: 16, color: '#161513', fontFamily: 'Metropolis-Bold' }}>40 KRAB</Text>
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
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>10 KLAY</Text>
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
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>0 KLAY</Text>
                                        </View>
                                        <View style={{
                                            width: "100%",
                                            marginBottom: 8,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>누적배당</Text>
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>0 KLAY</Text>
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
                                        <Text style={{ fontFamily: 'Metropolis-Bold', fontSize: 12, color: '#ffffff', marginRight: 8 }}>Report</Text>
                                        <Image source={require('./icon/arrowright.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={style.container}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: "100%",
                                    marginBottom: 8
                                }}>
                                    <Text style={{ fontSize: 16, color: '#161513', fontFamily: 'Metropolis-Bold' }}>미미 TV </Text>
                                    <Text style={{ fontSize: 16, color: '#161513', fontFamily: 'Metropolis-Bold' }}>40 MIMI</Text>
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
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>10 KLAY</Text>
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
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>2 KLAY</Text>
                                        </View>
                                        <View style={{
                                            width: "100%",
                                            marginBottom: 8,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>누적배당</Text>
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>5 KLAY</Text>
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
                                        <Text style={{ fontFamily: 'Metropolis-Bold', fontSize: 12, color: '#ffffff', marginRight: 8 }}>Report</Text>
                                        <Image source={require('./icon/arrowright.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={style.container}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: "100%",
                                    marginBottom: 8
                                }}>
                                    <Text style={{ fontSize: 16, color: '#161513', fontFamily: 'Metropolis-Bold' }}>삐삐 TV </Text>
                                    <Text style={{ fontSize: 16, color: '#161513', fontFamily: 'Metropolis-Bold' }}>40 PIPI</Text>
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
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>5 KLAY</Text>
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
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>0.5 KLAY</Text>
                                        </View>
                                        <View style={{
                                            width: "100%",
                                            marginBottom: 8,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>누적배당</Text>
                                            <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular' }}>0.6 KLAY</Text>
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
                                        <Text style={{ fontFamily: 'Metropolis-Bold', fontSize: 12, color: '#ffffff', marginRight: 8 }}>Report</Text>
                                        <Image source={require('./icon/arrowright.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}