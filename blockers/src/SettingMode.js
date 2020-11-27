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
    Alert,
    TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import moment from "moment";

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

export default function SettingMode({ navigation, route }) {
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
        if (one == true) {
            forSmoker()
        } else {
            forNonSmoker()
        }
    }
    function forSmoker() {
        updateInfo(user.uid, true)
        navigation.navigate("SettingModeSelectSmoker")
    }
    function forNonSmoker() {
        updateInfo(user.uid, false)
        navigation.navigate("SettingModeNonSmoker")
    }

    const ref = firestore().collection("UserInfo");
    async function updateInfo(code, state) {
        await ref.doc(code).update({
            smoker: state
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

const modeA = StyleSheet.create({
    largeText: {
        fontSize: 20,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        opacity: 0.8,
        marginLeft: "10%",
        marginBottom: 32,
        marginTop: 32
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
        borderColor: '#999999',
        marginLeft: 38,
        marginRight: 38,
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        width: "80%",
        height: 50,
        borderRadius: 28,
        backgroundColor: '#FFB83D',
        marginLeft: 38,
        marginRight: 38,
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export function SettingModeNonSmoker({ navigation, route }) {
    const [ten, setTen] = useState(false);
    const [num, setNum] = useState('');
    const [twenty, setTwenty] = useState(false);
    const [several, setSeveral] = useState('');
    const [mg, setMg] = useState('');
    const [thirty, setThirty] = useState(false);
    const [select, setSelect] = useState([]);
    const [clear, setClear] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })

    }, [])

    var count = 3;

    const pushten = () => {
        setSelect(select.concat("일반담배"));
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
        ten === true ? count = count + 1 : count = count - 1;
        twenty === true ? count = count + 1 : count = count - 1;
        thirty === true ? count = count + 1 : count = count - 1;
        if ((count <= 2) && (count >= 0)) {
            setClear(true);
            console.log(select)
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
        if (ten == true) {
            updateInfo(user.uid, select, num, 0)
        } else if (twenty == true) {
            updateInfo(user.uid, select, several, mg)
        } else if (thirty == true) {

            updateInfo(user.uid, select, num2, 0)
        }
    }

    const ref = firestore().collection("UserInfo");
    async function updateInfo(code, state, amount, mg) {
        await ref.doc(code).update({
            smokeInfo: state,
            smokingAmount: amount,
            smokingMg: mg
        })
        navigation.navigate("Home")
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
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
                <ScrollView>
                    <Text style={mode.largeText}>어떤 종류의 담배를 피우셨었나요?</Text>
                    {ten === false ?
                        <TouchableOpacity onPressIn={pushten} onPress={() => setTen(!ten)}>
                            <View style={modeA.buttonBox}>
                                <Text style={[modeA.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>일반담배</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterten} onPress={() => setTen(!ten)}>
                            <View style={modeA.activeButton}>
                                <Text style={[modeA.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>일반담배</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {twenty === false ?
                        <TouchableOpacity onPressIn={pushtwenty} onPress={() => setTwenty(!twenty)}>
                            <View style={modeA.buttonBox}>
                                <Text style={[modeA.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>전자담배(JULL, VAPE)</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filtertwenty} onPress={() => setTwenty(!twenty)}>
                            <View style={modeA.activeButton}>
                                <Text style={[modeA.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>전자담배(JULL, VAPE)</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {thirty === false ?
                        <TouchableOpacity onPressIn={pushthirty} onPress={() => setThirty(!thirty)}>
                            <View style={modeA.buttonBox}>
                                <Text style={[modeA.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>궐련형 담배(IQOS, LIL)</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterthirty} onPress={() => setThirty(!thirty)}>
                            <View style={modeA.activeButton}>
                                <Text style={[modeA.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>궐련형 담배(IQOS, LIL)</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {ten === true ?
                        <>
                            <Text style={[modeA.largeText, { marginBottom: 0 }]}>하루에 담배를 몇 개피 피우셨었나요?</Text>
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
                        </>
                        :
                        <View />
                    }
                    {twenty === true ?
                        <>
                            <Text style={[modeA.largeText, { marginBottom: 0 }]}>한번 필때 몇번의 흡입을 하셨나요?</Text>
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
                            <Text style={[modeA.largeText, { marginBottom: 0 }]}>액상에 몇 mg의 니코틴을 넣으시나요?</Text>
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
                        </>
                        :
                        <View />
                    }
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                    {ten === true ?
                        num.length > 0 ?
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
                            (mg.length > 0) && (several.length > 0) ?
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

const modeB = StyleSheet.create({
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

export function SettingModeSelectSmoker({ navigation, route }) {
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
            SmokingTime: a
        })
        navigation.navigate("Home")
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
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
                <ScrollView>
                    <Text style={modeB.largeText}>어떤 종류의 담배를 피우시나요?</Text>
                    {ten === false ?
                        <TouchableOpacity onPressIn={pushten} onPress={() => setTen(!ten)}>
                            <View style={modeB.buttonBox}>
                                <Text style={[modeB.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>일반담배</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterten} onPress={() => setTen(!ten)}>
                            <View style={modeB.activeButton}>
                                <Text style={[modeB.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>일반담배</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {twenty === false ?
                        <TouchableOpacity onPressIn={pushtwenty} onPress={() => setTwenty(!twenty)}>
                            <View style={modeB.buttonBox}>
                                <Text style={[modeB.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>전자담배(JULL, VAPE)</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filtertwenty} onPress={() => setTwenty(!twenty)}>
                            <View style={modeB.activeButton}>
                                <Text style={[modeB.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>전자담배(JULL, VAPE)</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {thirty === false ?
                        <TouchableOpacity onPressIn={pushthirty} onPress={() => setThirty(!thirty)}>
                            <View style={modeB.buttonBox}>
                                <Text style={[modeB.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>궐련형 담배(IQOS, LIL)</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterthirty} onPress={() => setThirty(!thirty)}>
                            <View style={modeB.activeButton}>
                                <Text style={[modeB.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>궐련형 담배(IQOS, LIL)</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {ten === true ?
                        <>
                            <Text style={[modeB.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>하루에 담배를 몇 개피 피우시나요?</Text>
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
                            <Text style={[modeB.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>총 흡연기간은 어느정도인가요?</Text>
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
                            <Text style={[modeB.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>한번 필때 몇번의 흡입을 하셨나요?</Text>
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
                            <Text style={[modeB.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>액상에 몇 mg의 니코틴을 넣으시나요?</Text>
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
                            <Text style={[modeB.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>총 흡연기간은 어느정도인가요?</Text>
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
                            <Text style={[modeB.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>하루에 담배를 몇 개피 피우시나요?</Text>
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
                            <Text style={[modeB.largeText, { marginBottom: 0, marginTop: 32, marginLeft: "10%", alignSelf: "flex-start" }]}>총 흡연기간은 어느정도인가요?</Text>
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
                </ScrollView>
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