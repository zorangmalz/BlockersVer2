import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    BackHandler,
    Alert
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { LoginManager } from 'react-native-fbsdk';
import storage from '@react-native-firebase/storage';
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const mode = StyleSheet.create({
    largeText: {
        fontSize: 20,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        opacity: 0.8,
        alignSelf: "center",
        marginBottom: 32,
        marginTop: 16
    },
    mediumText: {
        fontSize: 18,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
        opacity: 0.8
    },
    buttonBox: {
        width: "80%",
        height: 50,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#5cc27b',
        alignSelf: "center",
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        width: "80%",
        height: 50,
        borderRadius: 28,
        backgroundColor: '#5cc27b',
        alignSelf: "center",
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default function ModeSelectSmoker({ navigation, route }) {
    const [year, setYear] = useState('');
    const [ten, setTen] = useState(false);
    const [num, setNum] = useState('');
    const [twenty, setTwenty] = useState(false);
    const [mg, setMg] = useState('');
    const [several, setSeveral] = useState('');
    const [thirty, setThirty] = useState(false);
    const [num2, setNum2] = useState("");
    const [select, setSelect] = useState([]);
    const [clear, setClear] = useState(false);
    const [user, setUser] = useState();
    var count = 3;

    const pushten = () => {
        setSelect(select.concat('일반담배'));
    }

    const filterten = () => {
        setSelect(select.filter(info => info !== '일반담배'))
    }

    const pushtwenty = () => {
        setSelect(select.concat('전자담배(JULL, VAPE)'));
    }

    const filtertwenty = () => {
        setSelect(select.filter(info => info !== '전자담배(JULL, VAPE)'))
    }

    const pushthirty = () => {
        setSelect(select.concat('궐련형 담배(IQOS, LIL)'));
    }

    const filterthirty = () => {
        setSelect(select.filter(info => info !== '궐련형 담배(IQOS, LIL)'))
    }

    useEffect(() => {
        console.log("aksjfeopasji")
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })

    }, [])
    useEffect(() => {
        ten === true ? count = count + 1 : count = count - 1;
        twenty === true ? count = count + 1 : count = count - 1;
        thirty === true ? count = count + 1 : count = count - 1;
        if ((count <= 2) && (count >= 0)) {
            setClear(true);
            console.log(select, "Imselect")
        } else {
            if (select[0] === "일반담배") setTen(false);
            if (select[0] === "전자담배(JULL, VAPE)") setTwenty(false);
            if (select[0] === "궐련형 담배(IQOS, LIL)") setThirty(false);
            setSelect(select.slice(1, select.length));
            console.log(select);
            setClear(false);
        }
    }, [ten, twenty, thirty]);

    async function move() {
        setIos(true)
        if (ten == true) {
            updateInfo(user.uid, select, num, 0)
        } else if (twenty == true) {
            updateInfo(user.uid, select, num, mg)
        } else if (thirty == true) {

            updateInfo(user.uid, select, num2, 0)
        }
    }

    const ref = firestore().collection("UserInfo");
    async function updateInfo(code, state, amount, mg) {
        var a = moment().toArray()
        
        if (a[1] === 12) {
            a[1] = 1
            a[0]=a[0]+1
        } else {
            a[1] = a[1] + 1
        }
        
        await ref.doc(code).update({
            smokeInfo: state,
            smokingAmount: amount,
            smokingMg: mg,
            smokeDaily: 0,
            SmokingTime: a,

        })
        navigation.navigate("GuideScreen", { from: "GuideScreen" })
    }

    //다음 버튼 눌렀는지 유무
    const [ios, setIos] = useState(false);
    
    //ios 전용
    // useEffect(() => {
    //     if (Platform.OS === "ios") {
    //         if (ios === false) {
    //             navigation.addListener('beforeRemove', (e) => {
    //                 e.preventDefault();
    //                 Alert.alert(
    //                     '회원가입을 중단하겠습니까?',
    //                     '',
    //                     [
    //                         {
    //                             text: '취소', onPress: () => console.log("cancel;")
    //                         },
    //                         {
    //                             text: '확인',
    //                             onPress: () => { navigation.dispatch(e.data.action), deletes() }
    //                         },
    //                     ]
    //                 );
    //             }), [navigation]
    //         }
    //     }
    // }, [ios]);

    //android 전용
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (route.name === "ModeSelectSmoker") {
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
            '회원가입을 중단하겠습니까?',
            '',
            [
                {
                    text: '취소', onPress: () => console.log("cancell?smo fini")
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
    async function iosdeletes() {
        const user = firebase.auth().currentUser
        user.delete()
        
    }

    return (
        <>
            <StatusBar barStyle="default" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                    <TouchableOpacity onPress={finishLogin}>
                        <Ionicons name="chevron-back" size={25} />
                    </TouchableOpacity>
                    <View
                        style={{
                            height: 44,
                            flexDirection: 'row',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            marginLeft: 24
                        }}
                    >
                        <Text style={{ fontSize: 18 }}>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>기본정보 입력</Text>
                        </Text>
                    </View>
                </View>
                <KeyboardAwareScrollView>
                    <Text style={mode.largeText}>어떤 종류의 담배를 피우시나요?</Text>
                    {ten === false ?
                        <TouchableOpacity onPressIn={pushten} onPress={() => setTen(!ten)}>
                            <View style={mode.buttonBox}>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>일반담배</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterten} onPress={() => setTen(!ten)}>
                            <View style={mode.activeButton}>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>일반담배</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {twenty === false ?
                        <TouchableOpacity onPressIn={pushtwenty} onPress={() => setTwenty(!twenty)}>
                            <View style={mode.buttonBox}>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>전자담배(JULL, VAPE)</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filtertwenty} onPress={() => setTwenty(!twenty)}>
                            <View style={mode.activeButton}>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>전자담배(JULL, VAPE)</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {thirty === false ?
                        <TouchableOpacity onPressIn={pushthirty} onPress={() => setThirty(!thirty)}>
                            <View style={mode.buttonBox}>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>궐련형 담배(IQOS, LIL)</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterthirty} onPress={() => setThirty(!thirty)}>
                            <View style={mode.activeButton}>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>궐련형 담배(IQOS, LIL)</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {ten === true ?
                        <>
                            <Text style={[mode.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>하루에 담배를 몇 개피 피우시나요?</Text>
                            <View style={{
                                width: "35%",
                                height: 50,
                                borderBottomColor: '#5cc27b',
                                borderBottomWidth: 2,
                                alignSelf: 'flex-end',
                                marginRight: '10%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}>
                                <TextInput keyboardType="numeric" style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular',
                                    paddingBottom: 0,
                                    width: 100
                                }}
                                    value={num}
                                    onChangeText={text => setNum(text)}
                                />
                                <Text style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular'
                                }}>개피</Text>
                            </View>
                            <Text style={[mode.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>총 흡연기간은 어느정도인가요?</Text>
                            <View style={{
                                width: "35%",
                                height: 50,
                                borderBottomColor: '#5cc27b',
                                borderBottomWidth: 2,
                                alignSelf: 'flex-end',
                                marginRight: '10%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}>
                                <TextInput keyboardType="numeric" style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular',
                                    paddingBottom: 0,
                                    width: 100
                                }}
                                    value={year}
                                    onChangeText={text => setYear(text)}
                                />
                                <Text style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular'
                                }}>년</Text>
                            </View>
                        </>
                        :
                        <View />
                    }
                    {twenty === true ?
                        <>
                            <Text style={[mode.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>한번 필때 몇번의 흡입을 하셨나요?</Text>
                            <View style={{
                                width: "35%",
                                height: 50,
                                borderBottomColor: '#5cc27b',
                                borderBottomWidth: 2,
                                alignSelf: 'flex-end',
                                marginRight: '10%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}>
                                <TextInput keyboardType="numeric" style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular',
                                    paddingBottom: 0,
                                    width: 100

                                }}
                                    value={several}
                                    onChangeText={text => setSeveral(text)}
                                />
                                <Text style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular'
                                }}>번</Text>
                            </View>
                            <Text style={[mode.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>액상에 몇 mg의 니코틴을 넣으시나요?</Text>
                            <View style={{
                                width: "35%",
                                height: 50,
                                borderBottomColor: '#5cc27b',
                                borderBottomWidth: 2,
                                alignSelf: 'flex-end',
                                marginRight: '10%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}>
                                <TextInput keyboardType="numeric" style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular',
                                    paddingBottom: 0,
                                    width: 100
                                }}
                                    value={mg}
                                    onChangeText={text => setMg(text)}
                                />
                                <Text style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular'
                                }}>mg</Text>
                            </View>
                            <Text style={[mode.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>총 흡연기간은 어느정도인가요?</Text>
                            <View style={{
                                width: "35%",
                                height: 50,
                                borderBottomColor: '#5cc27b',
                                borderBottomWidth: 2,
                                alignSelf: 'flex-end',
                                marginRight: '10%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}>
                                <TextInput keyboardType="numeric" style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular',
                                    paddingBottom: 0,
                                    width: 100
                                }}
                                    value={year}
                                    onChangeText={text => setYear(text)}
                                />
                                <Text style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular'
                                }}>년</Text>
                            </View>
                        </>
                        :
                        <View />
                    }
                    {thirty === true ?
                        <>
                            <Text style={[mode.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>하루에 담배를 몇 개피 피우시나요?</Text>
                            <View style={{
                                width: "35%",
                                height: 50,
                                borderBottomColor: '#5cc27b',
                                borderBottomWidth: 2,
                                alignSelf: 'flex-end',
                                marginRight: '10%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}>
                                <TextInput keyboardType="numeric" style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular',
                                    paddingBottom: 0,
                                    width: 100
                                }}
                                    value={num2}
                                    onChangeText={text => setNum2(text)}
                                />
                                <Text style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular'
                                }}>개피</Text>
                            </View>
                            <Text style={[mode.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>총 흡연기간은 어느정도인가요?</Text>
                            <View style={{
                                width: "35%",
                                height: 50,
                                borderBottomColor: '#5cc27b',
                                borderBottomWidth: 2,
                                alignSelf: 'flex-end',
                                marginRight: '10%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}>
                                <TextInput keyboardType="numeric" style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular',
                                    paddingBottom: 0,
                                    width: 100
                                }}
                                    value={year}
                                    onChangeText={text => setYear(text)}
                                />
                                <Text style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular'
                                }}>년</Text>
                            </View>
                        </>
                        :
                        <View />
                    }
                </KeyboardAwareScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                    {ten === true ?
                        num.length > 0 && year.length >0 ?
                            <TouchableOpacity onPress={move}>
                                <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <View style={{ width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                            </View>

                        :
                        twenty === true ?
                            mg.length > 0 && year.length >0 ?
                                <TouchableOpacity onPress={move}>
                                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                                    </View>
                                </TouchableOpacity>
                                :
                                <View style={{ width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                                </View>
                            :
                            thirty === true ?
                                num2.length > 0 && year.length >0 ?
                                    <TouchableOpacity onPress={move}>
                                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <View style={{ width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                                    </View>
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