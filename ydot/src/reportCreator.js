import React from 'react';
import {
    StatusBar,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

const style = StyleSheet.create({
    largebox: {
        width: '90%',
        height: 800,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        marginTop: 24,
        marginBottom: 100
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
        marginRight: 5,

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

export default function ReportCreator({ navigation }) {
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
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 4 }}>
                        <Image source={require('./icon/back.png')} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20 }}>My Creator Report</Text>
                    <View />
                </View>
                <ScrollView>
                    <View style={style.largebox}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 16,
                            marginTop: 9,
                            marginBottom: 16
                        }}>
                            <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', opacity: 0.4, marginRight: 24, marginBottom: 8 }}>ROOKIE</Text>
                            <Text style={[style.text, { fontSize: 16, marginRight: 4 }]}>크랩 TV</Text>
                            <Image style={{ width: 16, height: 16 }} resizeMode="contain" source={require('./icon/heart.png')} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'space-evenly',
                        }}>
                            <Image source={require('./icon/homeyoutuber.png')} />
                            <View style={{ marginLeft: 16 }}>
                            <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', opacity: 0.4, marginBottom: 4 }}>구독자수</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                    <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Bold' }}>1K</Text>
                                    <Image style={{ marginLeft: 4, marginRight: 4 }} source={require('./icon/reddownarrow.png')} />
                                    <Text style={{ fontSize: 12, color: '#ed3f2b', fontFamily: 'Metropolis-Bold' }}>2.1%</Text>
                                </View>
                                <Image source={require('./icon/redgraph.png')} />
                            </View>
                            <View style={{marginRight: 20, marginLeft: 20}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                    <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', marginRight: 2, opacity: 0.4 }}>조회수</Text>
                                    <View style={{ width: 12, height: 12, borderWidth: 1, borderColor: '#202426', backgroundColor: '#ffffff', borderRadius: 6, alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
                                        <Text style={{ fontSize: 8, color: '#202426', fontFamily: 'Metropolis-Bold' }}>?</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                    <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Bold' }}>1.1K</Text>
                                    <Image style={{marginLeft: 4, marginRight: 4}} source={require('./icon/greenuparrow.png')} />
                                    <Text style={{ fontSize: 12, color: '#78e185', fontFamily: 'Metropolis-Bold' }}>1.12%</Text>
                                </View>
                                <Image source={require('./icon/greengraph.png')} />
                            </View>
                        </View>
                        <View style={style.line} />
                        <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', opacity: 0.4, marginLeft: 16, marginBottom: 8 }}>공지</Text>
                        <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Bold', marginLeft: 16, marginBottom: 16 }}>다음 컨텐츠 진행 관련 아이디어 피드백</Text>
                        <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', opacity: 0.4, marginLeft: 16, marginBottom: 8 }}>Sector</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            marginLeft: 16,
                            marginBottom: 16
                        }}>
                            <View style={[style.smallbox, { backgroundColor: '#78e185' }]}><Text style={style.smalltext}>#먹방</Text></View>
                            <View style={[style.smallbox, { backgroundColor: '#9ddadb' }]}><Text style={style.smalltext}>#일상</Text></View>
                            <View style={[style.smallbox, { backgroundColor: '#ffcf77' }]}><Text style={style.smalltext}>#ASMR</Text></View>
                        </View>
                        <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', opacity: 0.4, marginLeft: 16, marginBottom: 8 }}>Channel</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 16,
                            marginBottom: 16
                        }}>
                            <Image style={{marginRight: 16}} source={require('./icon/youtube.png')} />
                            <Image style={{marginRight: 16}} source={require('./icon/twitter.png')} />
                            <Image style={{marginRight: 16}} source={require('./icon/instagram.png')} />
                        </View>
                        <Text style={{ fontSize: 12, color: '#202426', fontFamily: 'Metropolis-Regular', opacity: 0.4, marginLeft: 16, marginBottom: 16 }}>최근 동영상</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginBottom: 16}}>
                            <Image source={require('./icon/lobster.png')} />
                            <Image source={require('./icon/lobster.png')} />
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginBottom: 16}}>
                            <Image source={require('./icon/lobster.png')} />
                            <Image source={require('./icon/lobster.png')} />
                        </View>
                        <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular', alignSelf: 'center', opacity: 0.6}}>+ More</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}