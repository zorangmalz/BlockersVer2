import React from 'react';
import {
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
} from 'react-native';

export default function SettingVersion({navigation}) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <ScrollView>
                    <Text style={{
                        fontSize: 40, 
                        fontWeight: 'normal', 
                        color: '#5CC27B', 
                        marginTop:32, 
                        marginBottom: 32,
                        alignSelf: 'center'
                    }}>Ver.2.0</Text>
                    <Text style={{
                        fontSize:16,
                        fontWeight: 'normal',
                        alignSelf: 'center'
                    }}>최신버전입니다!</Text>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}