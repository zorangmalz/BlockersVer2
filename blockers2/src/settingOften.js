import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const setting = StyleSheet.create({
    title : {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 32
    },
    content : {
        fontSize: 16,
        fontWeight: 'normal',
        marginLeft: 32
    }
})

const Tab = createMaterialTopTabNavigator();

function commonTab() {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <ScrollView style={{paddingTop: 32}}>
                    <View>
                        <Text style={setting.title}>Q. Blockers는 어떤 서비스인가요?</Text>
                        <Text style={setting.content}>A. Blockers는 챌린지와 개인 솔루션 기반</Text>
                        <Text style={setting.content}>   금연실천 서비스입니다.</Text>
                    </View>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center', marginTop: 16, marginBottom: 32}} />
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

function challengeTab() {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <ScrollView>

                </ScrollView>
            </SafeAreaView>
        </>
    )
}

function moneyTab() {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <ScrollView>

                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default function SettingOften () {
    return (
        <Tab.Navigator
            initialRouteName="공통"
            style={{borderBottomColor: '#5CC27B'}}
            tabBarOptions={{
                labelStyle: { fontSize: 16, color: '#000000' },
                tabStyle: {width: 80, borderBottomColor: '#5cc27b'},
                indicatorStyle: {borderBottomColor: '#5cc27b', borderBottomWidth: 2, width: 80},
                activeTintColor: '#000000',
                inactiveTintColor: '#333333'
            }}
        >
            <Tab.Screen 
                name="공통"
                component={commonTab}
                options={{ tabBarLabel: '공통' }}
            />
            <Tab.Screen 
                name="챌린지"
                component={challengeTab}
                options={{ tabBarLabel: '챌린지' }}
            />
            <Tab.Screen 
                name="입출금"
                component={moneyTab}
                options={{ tabBarLabel: '입출금' }}
            />
        </Tab.Navigator>
    )
}