import React, {useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';

const mission = StyleSheet.create({
    box: {
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 17,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 10,

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        borderBottomColor: '#979797',
        borderBottomWidth: 0.2
    },
    largeText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 18
    },
    smallText: {
        fontSize: 14,
        color: '#979797',
        marginBottom: 8
    }
});

export default function MissionScreen({ navigation }) {
    const num = 1;
    const [userlogined, setUserlogined] = useState(false);
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <ScrollView style={{ paddingTop: 27 }}>
                    <View style={mission.box}>
                        <Text style={mission.largeText}>Mission {num}</Text>
                        <Text style={mission.smallText}>Set your Goal for smoking cessation</Text>
                        <TouchableOpacity onPress={() => {
                            userlogined == true ?
                            navigation.navigate('로그인')
                            :
                            Alert.alert(
                                '로그인이 필요한서비스입니다.',
                                '로그인하고 다양한 혜택을 만나보세요',
                                [
                                    {
                                        text: '취소', onPress: () => console.log('취소')
                                    },
                                    {
                                        text: '로그인', onPress: () => navigation.navigate('회원가입')
                                    }
                                ]
                            )
                        }
                        } style={{ alignSelf: 'flex-end' }}>
                            <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'normal' }}>Start</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={mission.box}>
                        <Text style={mission.largeText}>Mission {num}</Text>
                        <Text style={mission.smallText}>Set your Goal for smoking cessation</Text>
                        <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                            <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'normal' }}>Start</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={mission.box}>
                        <Text style={mission.largeText}>Mission {num}</Text>
                        <Text style={mission.smallText}>Set your Goal for smoking cessation</Text>
                        <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                            <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'normal' }}>Start</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={mission.box}>
                        <Text style={mission.largeText}>Mission {num}</Text>
                        <Text style={mission.smallText}>Set your Goal for smoking cessation</Text>
                        <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                            <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'normal' }}>Start</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}