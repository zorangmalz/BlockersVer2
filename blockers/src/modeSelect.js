import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    BackHandler,
    Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { LoginManager } from 'react-native-fbsdk';
import storage from '@react-native-firebase/storage';
import { useFocusEffect } from "@react-navigation/native";

const mode = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'NunitoSans-Bold',
        color: '#5cc27b',
        alignSelf: 'center',
        margin: 32
    },
    largeText: {
        fontSize: 20,
        fontFamily: 'NunitoSans-Bold',
        color: '#5CC27B',
        marginLeft: 24,
        marginBottom: 36
    },
    mediumText: {
        fontSize: 18,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
    },
    buttonBox: {
        width: 160,
        height: 160,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        width: 160,
        height: 160,
        borderWidth: 3,
        borderRadius: 17,
        borderColor: '#FFB83D',
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default function ModeSelect({ navigation, route }) {
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [selectone, setSelectone] = useState([]);
    const [pressed, setPressed] = useState(false)
    const [user, setUser] = useState()
    var countone = 2;

    const pushone = () => {
        setSelectone(selectone.concat('오전'));
        setPressed(true)
    }

    const filterone = () => {
        setSelectone(selectone.filter(info => info !== '오전'))
        setPressed(false)
    }

    const pushtwo = () => {
        setSelectone(selectone.concat('오후 & 저녁'));
        setPressed(true)
    }

    const filtertwo = () => {
        setSelectone(selectone.filter(info => info !== '오후 & 저녁'))
        setPressed(false)
    }

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })

    }, [])

    useEffect(() => {
        one === true ? countone = countone + 1 : countone = countone - 1;
        two === true ? countone = countone + 1 : countone = countone - 1;
        if ((countone <= 2) && (countone >= 0)) {
            console.log(selectone);
        }
        if (countone > 3) {
            if (selectone[0] === "오전") setOne(false);
            if (selectone[0] === "오후 & 저녁") setTwo(false);
            setSelectone(selectone.slice(1, selectone.length));
            console.log(selectone);
        }
    }, [one, two]);

    function move() {
        setIos(true)
        if (one == true) {
            forSmoker()
        } else {
            forNonSmoker()
        }
    }
    function forSmoker() {
        updateInfo(user.uid, true)
        navigation.navigate("ModeSelectSmoker")
    }
    function forNonSmoker() {
        updateInfo(user.uid, false)
        navigation.navigate("ModeSelectNonSmoker")
    }

    const ref = firestore().collection("UserInfo");
    async function updateInfo(code, state) {
        await ref.doc(code).update({
            smoker: state
        })
    }

    //다음 버튼 눌렀는지 유무
    const [ios, setIos] = useState(false);
    
    //ios 전용
    useEffect(() => {
        if (Platform.OS === "ios") {
            if (ios === false) {
                navigation.addListener('beforeRemove', (e) => {
                    e.preventDefault();
                    Alert.alert(
                        '회원가입을 중단하겠습니까??',
                        '',
                        [
                            {
                                text: '취소', onPress: () => console.log("cancel")
                            },
                            {
                                text: '확인',
                                onPress: () => { navigation.dispatch(e.data.action), deletes() }
                            },
                        ]
                    );
                }), [navigation]
            }
        }
    }, [ios]);

    //android 전용
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (route.name === "ModeSelect") {
                    finishLogin()
                    return true;
                } else {
                    return false;
                }
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    async function finishLogin() {
        Alert.alert(
            '회원가입을 중단하겠습니까??',
            '',
            [
                {
                    text: '취소', onPress: () => console.log("cancel")
                },
                {
                    text: '확인', onPress: () => deletes()
                }
            ]
        )
    }

    async function deletes() {
        const user = firebase.auth().currentUser
        firestore().collection("UserInfo").doc(user.uid).delete().then(() => {
            storage().ref("/User/" + user.uid + "/프로필사진").delete().then(() => {
                user.delete()
                //로그아웃
                auth().signOut().then(() => {
                    //화면 전환
                    navigation.navigate("Home");
                }).catch(() => {
                    LoginManager.logOut()
                    navigation.navigate("Home");
                })
            }).catch(() => {
                user.delete()
                //로그아웃
                auth().signOut().then(() => {
                    //화면 전환
                    navigation.navigate("Home");
                }).catch(() => {
                    LoginManager.logOut()
                    navigation.navigate("Home");
                })
            })
        })
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView>
                    <Text style={mode.title}>Welcome Blockers</Text>
                    <Text style={[mode.mediumText, { alignSelf: 'center' }]}>Blockers에 오신 것을 환영합니다</Text>
                    <Text style={[mode.mediumText, { marginTop: 12, marginBottom: 30, alignSelf: 'center' }]}>시작하기 전에 회원님의 상태를 선택해주세요.</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 20,
                        marginRight: 20,
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                    }}>
                        {one === false ?
                            <View>
                                <TouchableOpacity onPressIn={pushone} onPress={() => setOne(!one)}>
                                    <View style={mode.buttonBox}>
                                        <Ionicons name="sunny" color="#FFA700" size={95} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Regular', color: '#303030', alignSelf: 'center' }]}>흡연관리</Text>
                            </View>
                            :
                            <View>
                                <TouchableOpacity onPressIn={filterone} onPress={() => setOne(!one)}>
                                    <View style={mode.activeButton}>
                                        <Ionicons name="sunny" color="#FFA700" size={95} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030', alignSelf: 'center' }]}>흡연관리</Text>
                            </View>
                        }
                        {two === false ?
                            <View>
                                <TouchableOpacity onPressIn={pushtwo} onPress={() => setTwo(!two)}>
                                    <View style={mode.buttonBox}>
                                        <Ionicons name="moon" color="#F4E100" size={85} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Regular', color: '#303030', alignSelf: 'center' }]}>금연관리</Text>
                            </View>
                            :
                            <View>
                                <TouchableOpacity onPressIn={filtertwo} onPress={() => setTwo(!two)}>
                                    <View style={mode.activeButton}>
                                        <Ionicons name="moon" color="#F4E100" size={85} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030', alignSelf: 'center' }]}>금연관리</Text>
                            </View>
                        }
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 32, marginRight: 60, marginLeft: 48, alignItems: 'flex-start' }}>
                        <View style={{ width: 11, height: 11, borderRadius: 5.5, backgroundColor: '#303030', marginRight: 20, marginTop: 11 }} />
                        <Text style={mode.mediumText}>
                            <Text style={{ fontFamily: 'NunitoSans-Bold' }}>흡연관리: </Text>
                            <Text>담배피는 양을 조절하고 천천히 금연하고 싶은 경우</Text>
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16, marginRight: 60, marginLeft: 48, alignItems: 'flex-start' }}>
                        <View style={{ width: 11, height: 11, borderRadius: 5.5, backgroundColor: '#303030', marginRight: 20, marginTop: 11 }} />
                        <Text style={mode.mediumText}>
                            <Text style={{ fontFamily: 'NunitoSans-Bold' }}>금연관리: </Text>
                            <Text>금연을 하고 있거나 시작하고 싶은 경우</Text>
                        </Text>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                    {pressed == true ?
                        <TouchableOpacity onPress={move}>
                            <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <View style={{ width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                        </View>

                    }
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}