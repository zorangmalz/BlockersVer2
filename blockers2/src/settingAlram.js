import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const setting = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        opacity: 0.8
    },
    content: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000000',
        opacity: 0.6
    }
})

function alramOne({ navigation }) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <ScrollView style={{ marginBottom: 30, marginTop: 32 }}>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginLeft: 32,
                            marginRight: 32,
                            marginBottom: 16
                        }}>
                            <View>
                                {alram === false ?
                                    <Text style={[setting.title, { marginBottom: 16 }]}>알림사용이 중지됨</Text>
                                    :
                                    <Text style={[setting.title, { marginBottom: 16 }]}>알림사용이 허용됨</Text>
                                }
                                <Text style={setting.content}>알림을 사용하려면 설정으로 이동하세요.</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('AlramTwo')}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'normal',
                                    color: '#000000',
                                    opacity: 0.8
                                }}>설정</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

let count = 1;
let divide = count % 2;
const alram = divide === 1 ? false : true;

function alramTwo({ navigation }) {
    const [alram, setAlram] = useState(false);
    const alramSwitch = () => {
        setAlram(previousState => !previousState);
        count+=1;
    };
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <ScrollView style={{ marginBottom: 30, marginTop: 32 }}>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginLeft: 32,
                            marginRight: 32,
                            marginBottom: 16
                        }}>
                            <View>
                                <Text style={[setting.title, { marginBottom: 16 }]}>알림</Text>
                                <Text style={setting.content}>모든 알림을 허용합니다.</Text>
                            </View>
                            <Switch
                                trackColor={{ true: '#34C759', false: '#C6C6C6' }}
                                thumbColor={alram ? '#FFFFFF' : '#f4f3f4'}
                                onChange={alramSwitch}
                                value={alram}
                                style={{ width: 51, height: 31 }}
                            />
                        </View>
                        <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center', marginBottom: 32 }} />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginLeft: 32,
                            marginRight: 32,
                            marginBottom: 16
                        }}>
                            <View>
                                <Text style={[setting.title, { marginBottom: 16 }]}>인증</Text>
                                <Text style={setting.content}>챌린지 인증알림을 보내드립니다.</Text>
                            </View>
                            <Switch
                                trackColor={{ true: '#34C759', false: '#C6C6C6' }}
                                thumbColor={alram ? '#FFFFFF' : '#f4f3f4'}
                                onValueChange={alramSwitch}
                                value={alram}
                                style={{ width: 51, height: 31 }}
                            />
                        </View>
                        <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center', marginBottom: 32 }} />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginLeft: 32,
                            marginRight: 32,
                            marginBottom: 16
                        }}>
                            <View>
                                <Text style={[setting.title, { marginBottom: 16 }]}>건강상태</Text>
                                <Text style={setting.content}>건강상태 정보를 알려드립니다.</Text>
                            </View>
                            <Switch
                                trackColor={{ true: '#34C759', false: '#C6C6C6' }}
                                thumbColor={alram ? '#FFFFFF' : '#f4f3f4'}
                                onValueChange={alramSwitch}
                                value={alram}
                                style={{ width: 51, height: 31 }}
                            />
                        </View>
                        <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center', marginBottom: 32 }} />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginLeft: 32,
                            marginRight: 32,
                            marginBottom: 16
                        }}>
                            <View>
                                <Text style={[setting.title, { marginBottom: 16 }]}>미션 & 챗봇</Text>
                                <Text style={setting.content}>돌발 미션 혹은 정보를 알려드립니다.</Text>
                            </View>
                            <Switch
                                trackColor={{ true: '#34C759', false: '#C6C6C6' }}
                                thumbColor={alram ? '#FFFFFF' : '#f4f3f4'}
                                onValueChange={alramSwitch}
                                value={alram}
                                style={{ width: 51, height: 31 }}
                            />
                        </View>
                        <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center', marginBottom: 32 }} />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginLeft: 32,
                            marginRight: 32,
                            marginBottom: 16
                        }}>
                            <View>
                                <Text style={[setting.title, { marginBottom: 16 }]}>광고</Text>
                                <Text style={setting.content}>다양한 혜택을 담은 정보를 알려드립니다.</Text>
                            </View>
                            <Switch
                                trackColor={{ true: '#34C759', false: '#C6C6C6' }}
                                thumbColor={alram ? '#FFFFFF' : '#f4f3f4'}
                                onValueChange={alramSwitch}
                                value={alram}
                                style={{ width: 51, height: 31 }}
                            />
                        </View>
                        <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center', marginBottom: 32 }} />
                    </View>

                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default function SettingAlram({ navigation }) {

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="AlramOne"
                component={alramOne}
            />
            <Stack.Screen 
                name="AlramTwo"
                component={alramTwo}
            />
        </Stack.Navigator>
    )
}