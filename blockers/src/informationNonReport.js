import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const report = StyleSheet.create({
    linearGradient: {
        width: "84%",
        height: 19,
        borderRadius: 28,
        alignSelf: 'center',
        marginTop: 16
    },
    title: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 24,
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 16
    },
    boldText: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 18,
        color: '#303030',
        opacity: 0.8,
        marginLeft: 32
    },
    regularText: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 16,
        color: '#303030',
        opacity: 0.7,
        marginLeft: 32,
        marginRight: 32
    },
    smallText: {
        width: 65,
        fontFamily: 'NunitoSans-Regular',
        fontSize: 14,
        color: '#303030',
        opacity: 0.8
    },
    roundBox: {
        width: "80%",
        height: 50, 
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#5cc27b',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    roundTitle: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 18, 
        color: '#5cc27b'
    }
})

export default function InformationNonReport({ navigation }) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView>
                    <Text style={report.title}>
                        <Text style={{ color: '#5cc27b' }}>김현명님의 </Text>
                        <Text style={{ color: '#ffb83d' }}>금연 리포트</Text>
                    </Text>
                    <Text style={[report.regularText, { marginBottom: 8 }]}>금연 20분 경과</Text>
                    <Text style={[report.regularText, { marginBottom: 8 }]}>- 혈액순환이 정상적으로 돌아왔습니다.</Text>
                    <Text style={[report.regularText, { marginBottom: 16 }]}>- 가래가 나오지 않습니다.</Text>
                    <Text style={report.boldText}>
                        <Text>니코틴 중독 정도: </Text>
                        <Text style={{ color: '#5cc27b' }}>Low</Text>
                    </Text>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#27ff00', '#fff500', '#ff0000']}
                        style={report.linearGradient}
                    />
                    <View style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '84%',
                        marginTop: 4
                    }}>
                        <Text style={[report.smallText, { color: '#5cc27b', fontFamily: 'NunitoSans-Bold' }]}>Low</Text>
                        <Text style={report.smallText}>Danger</Text>
                        <Text style={report.smallText}>Addicted</Text>
                    </View>
                    <Text style={[report.regularText, { alignSelf: 'center', marginTop: 16, marginBottom: 16 }]}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.
                    </Text>
                    <View style={[report.roundBox, {marginBottom: 18}]}>
                        <Text style={report.roundTitle}>금단 증상 대처 방법</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}