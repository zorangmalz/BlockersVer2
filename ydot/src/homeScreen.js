import React from 'react';
import {
    StatusBar,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, 
    ImageBackground,
    FlatList,
    Dimensions
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import ProgressBar from 'react-native-progress/Bar';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('screen').width;

const style = StyleSheet.create({
    containerStatus: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: "#ffffff",
        height: 150,
        borderRadius: 10,
        marginTop: 16,
        paddingTop: 19,
        paddingLeft: 4,
    },
    newbox: {
        width: 160,
        height: 180,
        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    box: {
        width: 100,
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topbox: {
        width: '90%',
        height: 400,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        marginBottom: 20,
        paddingTop: 6
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

export default function HomeScreen({ navigation }) {
    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: "#ffffff" }}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
                <View accessibilityRole="header" style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: "center",
                    height: 50,
                    backgroundColor: '#ffffff',
                    width: "100%",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignScreen')} style={{ marginLeft: 8}}>
                        <Ionicons name="search" size={27} />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ fontSize: 40 }}>
                            <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513' }}>Y.</Text>
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SignScreen')} >
                        <Ionicons name="notifications-outline" size={27} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <Text style={[style.text, { fontSize: 18, marginTop: 14, marginLeft: '9%' }]}>For You</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeFund')} style={style.containerStatus}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 8,
                            paddingRight: WIDTH * 0.02,
                            paddingLeft: WIDTH * 0.02
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Image source={require('./icon/homeyoutuber.png')} />
                                <View style={{
                                    marginLeft: 12
                                }}>
                                    <View style={{ marginBottom: 8, flexDirection: "row", alignItems: "center"}}>
                                        <Text style={[style.text, { fontSize: 16, marginRight: 4 }]}>크랩 TV</Text>
                                        <Ionicons name="heart-outline" color="#202426" size={18} />
                                    </View>
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular', marginBottom: 4, width: WIDTH * 0.43 }}>[초기자금] 해산물 특화 먹방</Text>
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Regular', marginBottom: 4 }}>목표: 1,000,000 원</Text>
                                    <Text style={{ fontSize: 14, color: '#161513', fontFamily: 'Metropolis-Bold', marginBottom: 7 }}>모금액: 600,000</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <View style={[style.smallbox, {backgroundColor: '#78e185'}]}><Text style={style.smalltext}>#먹방</Text></View>
                                        <View style={[style.smallbox, {backgroundColor: '#9ddadb'}]}><Text style={style.smalltext}>#일상</Text></View>
                                        <View style={[style.smallbox, {backgroundColor: '#ffcf77'}]}><Text style={style.smalltext}>#ASMR</Text></View>
                                    </View>
                                </View>
                            </View>
                            <ProgressCircle 
                                percent={60} 
                                radius={40}
                                borderWidth={4}
                                shadowColor="#F8F8F8"
                                bgColor="#ffffff"
                                color="#161513"
                            >
                                <Text style={[style.text, {fontSize: 16}]}>{"60%"}</Text>
                            </ProgressCircle>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 16, marginLeft: '9%' }}>
                        <Text style={{ marginRight: 17, color: '#161513', fontFamily: 'Metropolis-Bold' }}>New </Text>
                        <Text style={{ fontFamily: 'Metropolis-Regular', color: '#202426' }}>Sector</Text>
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginRight: 16,
                        marginLeft: 16
                    }}>
                        <View style={style.newbox}>
                            <ImageBackground style={{width: 160, height: 112, borderTopRightRadius: 10, borderTopLeftRadius: 10, justifyContent: "flex-end", alignItems: "flex-end"}} source={require('./icon/background.png')} >
                                <Text style={{ width: 62, backgroundColor: '#161513', fontFamily: 'Metropolis-Bold', color: '#ffffff', fontSize: 12, textAlign: 'center'}}>D-30</Text>
                            </ImageBackground>
                            <View style={{marginTop: 4, marginLeft: 16, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[style.text, {fontSize: 12, marginRight: 4}]}>크랩 TV</Text>
                                <Image style={{width: 12, height: 12}} resizeMode="contain" source={require('./icon/heart.png')} />
                            </View>
                            <Text style={[style.text, {fontSize: 12, marginLeft: 16, marginTop: 4}]}>목표: 1,000,000 원</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 16, marginTop: 4}}>
                                <ProgressBar width={100} height={8} color="#161513" unfilledColor="#acacac" borderWidth={0} progress={0.6} />
                                <Text style={[style.text, {fontSize: 12, marginLeft: 4}]}>60%</Text>
                            </View>
                        </View>
                        <View style={style.newbox}>
                            <ImageBackground style={{ width: 160, height: 112, borderTopRightRadius: 10, borderTopLeftRadius: 10, justifyContent: "flex-end", alignItems: "flex-end" }} source={require('./icon/desert.png')} >
                                <Text style={{ width: 62, backgroundColor: '#161513', fontFamily: 'Metropolis-Bold', color: '#ffffff', fontSize: 12, marginTop: 95, textAlign: 'center' }}>D-30</Text>
                            </ImageBackground>
                            <View style={{ marginTop: 4, marginLeft: 16, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[style.text, { fontSize: 12, marginRight: 4 }]}>사막 TV</Text>
                                <Image style={{ width: 12, height: 12 }} resizeMode="contain" source={require('./icon/heart.png')} />
                            </View>
                            <Text style={[style.text, { fontSize: 12, marginLeft: 16, marginTop: 4 }]}>목표: 1,000,000 원</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16, marginTop: 4 }}>
                                <ProgressBar width={100} height={8} color="#161513" unfilledColor="#acacac" borderWidth={0} progress={0.6} />
                                <Text style={[style.text, { fontSize: 12, marginLeft: 4 }]}>60%</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginRight: 16,
                        marginLeft: 16,
                        marginTop: 16
                    }}>
                        <View style={style.newbox}>
                            <ImageBackground style={{ width: 160, height: 112, borderTopRightRadius: 10, borderTopLeftRadius: 10, justifyContent: "flex-end", alignItems: "flex-end" }} source={require('./icon/travel.png')} >
                                <Text style={{ width: 62, backgroundColor: '#161513', fontFamily: 'Metropolis-Bold', color: '#ffffff', fontSize: 12, marginTop: 95, textAlign: 'center' }}>D-30</Text>
                            </ImageBackground>
                            <View style={{ marginTop: 4, marginLeft: 16, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[style.text, { fontSize: 12, marginRight: 4 }]}>여행 TV</Text>
                                <Image style={{ width: 12, height: 12 }} resizeMode="contain" source={require('./icon/heart.png')} />
                            </View>
                            <Text style={[style.text, { fontSize: 12, marginLeft: 16, marginTop: 4 }]}>목표: 1,000,000 원</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16, marginTop: 4 }}>
                                <ProgressBar width={100} height={8} color="#161513" unfilledColor="#acacac" borderWidth={0} progress={0.6} />
                                <Text style={[style.text, { fontSize: 12, marginLeft: 4 }]}>60%</Text>
                            </View>
                        </View>
                        <View style={style.newbox}>
                            <ImageBackground style={{ width: 160, height: 112, borderTopRightRadius: 10, borderTopLeftRadius: 10, justifyContent: "flex-end", alignItems: "flex-end" }} source={require('./icon/mountain.png')} >
                                <Text style={{ width: 62, backgroundColor: '#161513', fontFamily: 'Metropolis-Bold', color: '#ffffff', fontSize: 12, marginTop: 95, textAlign: 'center' }}>D-30</Text>
                            </ImageBackground>
                            <View style={{ marginTop: 4, marginLeft: 16, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[style.text, { fontSize: 12, marginRight: 4 }]}>산악 TV</Text>
                                <Image style={{ width: 12, height: 12 }} resizeMode="contain" source={require('./icon/heart.png')} />
                            </View>
                            <Text style={[style.text, { fontSize: 12, marginLeft: 16, marginTop: 4 }]}>목표: 1,000,000 원</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16, marginTop: 4 }}>
                                <ProgressBar width={100} height={8} color="#161513" unfilledColor="#acacac" borderWidth={0} progress={0.6} />
                                <Text style={[style.text, { fontSize: 12, marginLeft: 4 }]}>60%</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{ fontSize: 14, alignSelf: 'center', fontFamily: 'Metropolis-Regular', color: '#202426', opacity: 0.6, marginTop: 12 }}>+ More</Text>
                    <Text style={{ fontSize: 18, marginTop: 16, marginBottom: 8, marginLeft: '9%' }}>
                        <Text style={{ marginRight: 17, color: '#161513', fontFamily: 'Metropolis-Bold' }}>Top 펀딩 </Text>
                        <Text style={{ fontFamily: 'Metropolis-Regular', color: '#202426' }}>Top 섹터</Text>
                    </Text>
                    <View style={style.topbox}>
                        <FlatList
                            data={[
                                { key: 1, name: '가짜 사나이 2', content: '[프로그램] 수익분배형 제작…', progress: '1,100%' },
                                { key: 2, name: '등산하는 정선웅', content: '[재매입] 프로그램 제작…', progress: '1,100%' },
                                { key: 3, name: '김진성 코딩하기', content: '[수익분배] 프로그램 제작…', progress: '1,100%' },
                                { key: 4, name: '감귤농사 TV', content: '[수익분배] 프로그램 제작…', progress: '1,100%' },
                            ]}
                            renderItem={({ item }) => (
                                <>
                                    <View style={{
                                        marginBottom: 10,
                                        marginTop: 10,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginLeft: 16
                                        }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{fontSize: 24, color: '#161513', fontFamily: 'Metropolis-Bold'}}>{item.key}</Text>
                                                <Text style={[style.text, { fontSize: 16, marginLeft: 8 }]}>{item.name}</Text>
                                            </View>
                                        </View>
                                        <Text style={{ fontSize: 16, color: '#202426', fontFamily: 'Metropolis-Regular', marginTop: 4, marginLeft: 33.5 }}>{item.content}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginLeft: 33.5,
                                            marginTop: 11
                                        }}>
                                            <ProgressBar progress={1} width={WIDTH * 0.45} height={8} color={'black'} />
                                            <Text style={[style.text, { fontSize: 16, marginLeft: 20 }]}>{item.progress}</Text>
                                        </View>
                                    </View>
                                </>
                            )} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}