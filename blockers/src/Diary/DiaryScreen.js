import React from 'react';
import { Create, List } from './Style';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image
} from 'react-native';

export default function DiaryWrite({navigation}) {
    return (
        <>
            <Create navigation={navigation} />
        </>
    )
}

export function DiaryList({navigation}) {
    return (
        <>
            <List navigation={navigation} />
        </>
    )
}

export function DiaryComplete({navigation}) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
                <ScrollView>
                    <Image 
                        style={{width: 150, height: 150, alignSelf: 'center', marginTop: "30%", marginBottom: 32}}
                        source={require('../icon/resetcheck.png')} 
                    />
                    <Text style={{
                        fontSize: 24,
                        fontFamily: 'NunitoSans-Bold',
                        color: '#303030',
                        opacity: 0.7,
                        alignSelf: 'center'
                    }}>작성 완료</Text>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: 'NunitoSans-Regular',
                        color: '#303030',
                        opacity: 0.6,
                        alignSelf: 'center',
                        marginTop: 16
                    }}>오늘 금연도 수고하셨습니다!</Text>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>종료</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}