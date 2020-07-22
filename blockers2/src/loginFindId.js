import React from 'react';
import {
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
    StyleSheet,
} from 'react-native';

const login = StyleSheet.create({
    text: {
        fontSize: 40,
        fontWeight: 'normal',
        alignSelf: 'center',
        color: '#5cc27b',
        marginTop: 64
    }
})

export default function LoginFindId () {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
                <ScrollView>
                    <Text style={login.text}>wise@blockers.me</Text>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}