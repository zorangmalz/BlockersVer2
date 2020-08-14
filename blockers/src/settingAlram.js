import React, { useState, useEffect, useReducer } from 'react';
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
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        opacity: 0.8
    },
    content: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
        opacity: 0.6
    }
})

let count = 1;
let divide = count % 2;
const alram = divide === 1 ? false : true;

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
                                    fontFamily: 'NunitoSans-Regular',
                                    color: '#303030',
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

function allowing (state, action) {
    switch (action.type) {
        case 'allow':
            return state = 1;
        case 'notallow':
            return state = 2;
    }
} 

function alramTwo({ navigation }) {
    const [state, dispatch] = useReducer(allowing, count);
    const [alarm, setAlarm] = useState(false);
    const alarmSwitch = () => {
        console.log(count)
        if(alarm === false) {
            setAlarm(true);
            dispatch({
                type: 'allow'
            });
        } else {
            setAlarm(false);
            dispatch({
                type: 'notallow'
            })
        }
    };

    const [alarmcharge, setAlarmcharge] = useState(false);
    const alarmchargeSwitch = () => {
        {
            alarm === true ?
            setAlarmcharge(previousState => !previousState)
            :
            console.log('알람허용을 해주세요')
        }
    };

    const [alarmveri, setAlarmveri] = useState(false);
    const alarmveriSwitch = () => {
        {
            alarm === true ?
            setAlarmveri(previousState => !previousState)
            :
            console.log('알람허용을 해주세요')
        }
    };

    const [alarmhealth, setAlarmhealth] = useState(false);
    const alarmhealthSwitch = () => {
        {
            alarm === true ?
            setAlarmhealth(previousState => !previousState)
            :
            console.log('알람허용을 해주세요')
        }
    };

    const [alarmchat, setAlarmchat] = useState(false);
    const alarmchatSwitch = () => {
        {
            alarm === true ?
            setAlarmchat(previousState => !previousState)
            :
            console.log('알람허용을 해주세요')
        }
    };

    const [alarmadver, setAlarmadver] = useState(false);
    const alarmadverSwitch = () => {
        {
            alarm === true ?
            setAlarmadver(previousState => !previousState)
            :
            console.log('알람허용을 해주세요')
        }
    };

    useEffect(() => {
        if(alarm === false) {
            setAlarmadver(false);
            setAlarmchat(false);
            setAlarmhealth(false);
            setAlarmveri(false);
            setAlarmcharge(false);
        }
    }, [alarm])

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
                                thumbColor={alarm ? '#FFFFFF' : '#f4f3f4'}
                                onChange={alarmSwitch}
                                value={alarm}
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
                                <Text style={[setting.title, { marginBottom: 16 }]}>입출금</Text>
                                <Text style={setting.content}>입출금 알림을 전송합니다.</Text>
                            </View>
                            <Switch
                                trackColor={{ true: '#34C759', false: '#C6C6C6' }}
                                thumbColor={alarmcharge ? '#FFFFFF' : '#f4f3f4'}
                                onValueChange={alarmchargeSwitch}
                                value={alarmcharge}
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
                                thumbColor={alarmveri ? '#FFFFFF' : '#f4f3f4'}
                                onValueChange={alarmveriSwitch}
                                value={alarmveri}
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
                                thumbColor={alarmhealth ? '#FFFFFF' : '#f4f3f4'}
                                onValueChange={alarmhealthSwitch}
                                value={alarmhealth}
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
                                thumbColor={alarmchat ? '#FFFFFF' : '#f4f3f4'}
                                onValueChange={alarmchatSwitch}
                                value={alarmchat}
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
                                thumbColor={alarmadver ? '#FFFFFF' : '#f4f3f4'}
                                onValueChange={alarmadverSwitch}
                                value={alarmadver}
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