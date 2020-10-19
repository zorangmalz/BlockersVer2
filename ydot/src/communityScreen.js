import React from 'react';
import {
    StatusBar,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const style = StyleSheet.create({
    freeboard: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingTop: 24,
        paddingLeft: 14,
        paddingRight: 14
    },
    text: {
        fontFamily: 'Metropolis-Bold',
        color: '#202426'
    }
})

export default function CommunityScreen({navigation}) {
    const list = [1, 2];
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
                    paddingRight: "5%"
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignScreen')} style={{ marginLeft: 8 }}>
                        <Ionicons name="search" size={27} />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "center",
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>
                            <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513' }}>Community</Text>
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SignScreen')} >
                        <Ionicons name="notifications-outline" size={27} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <Text style={[style.text, { fontSize: 14, marginTop: 13, marginLeft: '9%' }]}>Creator Post</Text>
                    <ScrollView style={{ margin: 8 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        <ImageBackground source={require('./icon/wayimage.png')} resizeMode="stretch" style={{ width: 180, height: 135, borderRadius: 10 }}>
                            <ImageBackground source={require('./icon/opacity.png')} resizeMode="stretch" style={{width: 180, height: 135, borderRadius: 10}}>
                                <Text style={{ fontSize: 12, color: '#ffffff', fontFamily: 'Metropolis-Bold', alignSelf: 'center', marginTop: 25 }}>구독자 늘리는 방법</Text>
                                <Text style={{ fontSize: 10, color: '#ffffff', fontFamily: 'Metropolis-Bold', alignSelf: 'flex-end', marginTop: 50, marginRight: 25 }}>By. BJ 10만</Text>
                            </ImageBackground>
                        </ImageBackground>
                        <ImageBackground source={require('./icon/tipimage.png')} resizeMode="stretch" style={{ width: 180, height: 135, borderRadius: 10 }}>
                            <ImageBackground source={require('./icon/opacity.png')} resizeMode="stretch" style={{width: 180, height: 135, borderRadius: 10}}>
                                <Text style={{ fontSize: 12, color: '#ffffff', fontFamily: 'Metropolis-Bold', alignSelf: 'center', marginTop: 25 }}>시작하는 사람을 위한 팁</Text>
                                <Text style={{ fontSize: 10, color: '#ffffff', fontFamily: 'Metropolis-Bold', alignSelf: 'flex-end', marginTop: 50, marginRight: 25 }}>By. BJ 초보</Text>
                            </ImageBackground>
                        </ImageBackground>
                        <ImageBackground source={require('./icon/wayimage.png')} resizeMode="stretch" style={{ width: 180, height: 135, borderRadius: 10 }}>
                            <ImageBackground source={require('./icon/opacity.png')} resizeMode="stretch" style={{width: 180, height: 135, borderRadius: 10}}>
                                <Text style={{ fontSize: 12, color: '#ffffff', fontFamily: 'Metropolis-Bold', alignSelf: 'center', marginTop: 25 }}>구독자 늘리는 방법</Text>
                                <Text style={{ fontSize: 10, color: '#ffffff', fontFamily: 'Metropolis-Bold', alignSelf: 'flex-end', marginTop: 50, marginRight: 25 }}>By. BJ 10만</Text>
                            </ImageBackground>
                        </ImageBackground>
                    </ScrollView>
                    <Text style={[style.text, { fontSize: 14, marginTop: 7, marginLeft: '9%', marginBottom: 16 }]}>Free Board</Text>
                    <View style={style.freeboard}>
                        {list.map(number =>
                            <View style={{
                                borderBottomColor: '#D2D3D3',
                                borderBottomWidth: 1,
                                marginBottom: 16
                            }}>
                                <Text style={[style.text, { fontSize: 16, marginBottom: 4 }]}>이번에 떠오르는 BJ 픽준다</Text>
                                <Text style={[style.text, { fontSize: 14, opacity: 0.8, marginBottom: 8 }]}>달나라 갈 준비 완료</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                    marginBottom: 16,
                                    marginRight: '25%'
                                }}>
                                    <Text style={[style.text, { fontSize: 12 }]}>방금전</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <MaterialCommunityIcons name="thumb-up-outline" color="#202426" size={16} />
                                        <Text style={{fontFamily: 'Metropolis-Regular', fontSize: 12, color: '#202426', marginLeft: 4, marginRight: 16}}>10</Text>
                                        <Ionicons name="chatbubble-ellipses-outline" color="#202426" size={16} />
                                        <Text style={{fontFamily: 'Metropolis-Regular', fontSize: 12, color: '#202426', marginLeft: 4}}>5</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                    <Text style={{ fontSize: 14, color: '#202426', fontFamily: 'Metropolis-Regular', alignSelf: 'center', opacity: 0.6, marginTop: 16 }}>+ More</Text>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}