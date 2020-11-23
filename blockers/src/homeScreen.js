import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    RefreshControl,
    Alert,
    ImageBackground,
    Animated,
    Easing,
    Modal,
} from 'react-native';
import Swiper from 'react-native-swiper';
import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AdEventType, InterstitialAd, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import { useFocusEffect } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-1011958477260123/9244108660';



const date = StyleSheet.create({
    viewcontainer: {
        width: 50,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    largedate: {
        fontSize: 24,
        color: '#FFFFFF',
        fontFamily: 'NunitoSans-Bold'
    },
    smalldate: {
        fontSize: 12,
        color: '#FFFFFF',
        fontFamily: 'NunitoSans-Regular'
    },
});

const resource = StyleSheet.create({
    container: {
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    largeText: {
        fontSize: 24,
        fontFamily: 'NunitoSans-Bold',
        color: '#5CC27B'
    },
    smallText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        opacity: 0.6
    }
})
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function HomeScreen({ navigation}) {
    const ref = firestore().collection("UserInfo");
    const [smokeProof, setSmokeProof] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0,])
    const [smokeProofTwo, setSmokeProofTwo] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0,])
    const [smokeProofThree, setSmokeProofThree] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0,])
    const [smokeProofFour, setSmokeProofFour] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0,])
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minu, setMinu] = useState(0);
    const [sec, setSec] = useState(0);
    const [viewopacity, setViewOpacity] = useState(true);

    const [user, setUser] = useState()
    const [fullTime, setfullTime] = useState()
    const [check, setcheck] = useState(false)
    const [smoker, setSmoker] = useState(false)
    const [smokeInfo, setSmokeInfo] = useState()
    const [smokingShow, setSmokingShow] = useState(0)
    const [smokingMoney, setSmokingMoney] = useState()
    const [smokingDaily, setSmokingDaily] = useState(0)
    const [stats, setStats] = useState()
    const [totals, setTotals] = useState()
    const [today, setToday] = useState()
    const [refreshing, setRefreshing] = React.useState(false);
    const [login, setLogin] = useState(false);
    const [focus, setFocus] = useState(false);

    const [smokingSmoker,setSmokingSmoker]=useState(0)
    const [smokingSmokerMoney,setSmokingSmokerMoney]=useState(0)

    useFocusEffect(
        useCallback(() => {
            //포커싱 되었을 떄
            setFocus(true)
            const USER = auth().currentUser
            if (USER) {
                setLogin(true)
                setViewOpacity(false)
                firestore().collection("UserInfo").doc(USER.uid).get().then(doc => {
                    if (doc.data().SmokingTime) {
                        setViewOpacity(false)
                    } else {
                        setViewOpacity(true)
                    }
                })
                firestore().collection("UserInfo").doc(USER.uid).get().then(doc => {
                    setSmoker(doc.data().smoker)
                })
                howMuch()
            } else {
                setViewOpacity(true)
                setLogin(false)
            }
            return () => {
                //포커싱 안 되었을 떄
            };
        }, [])
    );

    var total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    async function updateInfo(code) {
        var a = moment().toArray()
        if (a[1] === 12) {
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }
        await ref.doc(code).update({
            SmokingTime: a
        })
    }

    function timeCounter(seconds) {
        setDay(parseInt(seconds / 86400))
        setHour(parseInt(seconds % 86400 / 3600))
        setMinu(parseInt(seconds % 86400 % 3600 / 60))
        setSec(parseInt(seconds % 86400 % 3600 % 60))
    }
    async function cutting(range) {
        var a = moment().toArray()
        for (var i = 0; i < range; i++) {
            total[i] = 1
        }
        for (var i = 0; i < smokingDaily; i++) {
            total[i] = 2
        }
        setTotals(total)
        // console.log(total)
        setSmokeProof(total.slice(0, 10))
        setSmokeProofTwo(total.slice(10, 20))
        setSmokeProofThree(total.slice(20, 30))
        setSmokeProofFour(total.slice(30, 40))
        await ref.doc(user.uid).update({
            smokeToday: a[2]
        })
    }
    async function smokeClick() {
        // console.log(totals,"init")

        var smoke = smokingDaily
        console.log(smoke, stats, "compare")
        if (Number(smoke) === Number(stats)) {
            Alert.alert("고마펴싀발")
        }
        var history= await howMuch()
        setSmokingDaily(smoke + 1)
        setSmokingSmoker(history+smoke+1)
        setSmokingSmokerMoney((history+smoke+1)*225)
        console.log(history+smoke+1)
        // console.log(smoke,smokingDaily)
        var total = totals
        for (var i = 0; i < smoke + 1; i++) {
            total[i] = 2
        }
        // console.log(total)
        setSmokeProof(total.slice(0, 10))
        setSmokeProofTwo(total.slice(10, 20))
        setSmokeProofThree(total.slice(20, 30))
        setSmokeProofFour(total.slice(30, 40))
        await ref.doc(user.uid).update({
            smokeDaily: smoke + 1
        })
    }

    //보완...
    async function timeCheck() {
        var a = moment().toArray()
        console.log(a)
        if (a[1] === 12) {
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }
        await ref.doc(user.uid).get().then(documentSnapshot => {
            if (a[2] === documentSnapshot.data().smokeToday) {
                console.log("same")
            } else {
                console.log("different")
                ref.doc(user.uid).update({
                    smokeDaily: 0,
                    smokeToday: a[2],
                    smokeStats: firebase.firestore.FieldValue.arrayUnion(a + "/흡연량:" + smokingDaily)
                })
                firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).update({
                    smoke:String(smokingDaily)+"개피",
                    smoketotal:smokingDaily
                }).catch(()=>
                firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).set({
                    smoke:String(smokingDaily)+"개피",
                    smoketotal:smokingDaily
                }))
                setToday(false)
            }
        })

    }
    async function howMuch(){
        var total=0
        await ref.doc(user.uid).collection("Calendar").get().then(querySnapshot=>{
            var sub
            querySnapshot.forEach(documentSnapshot =>{
                sub=documentSnapshot.data().smoketotal
                if(sub){
                    total=total+sub
                }
                
            })
        })
        return(total)
        console.log(total,"total")
    }

    // useEffect(() => {
    //     auth().onAuthStateChanged(userAuth => {
    //         setUser(userAuth)
    //     })
    //     if (user) {
    //         setLogin(true)
    //         setViewOpacity(false)
    //         firestore().collection("UserInfo").doc(user.uid).get().then(doc => {
    //             if (doc.data().SmokingTime) {
    //                 setViewOpacity(false)
    //             } else {
    //                 setViewOpacity(true)
    //             }
    //         })
    //         howMuch()
    //     } else {
    //         setViewOpacity(true)
    //         setLogin(false)
    //     }
    // }, [user,login, userlogin, refreshing, Rotate, focus, smoker])

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        if (user) {
            console.log("stsat")
            setLogin(true)
            firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc("2020-11-18").set({
                hi:"hi"
            })
            ref.doc(user.uid).get().then(documentSnapshot => {
                setSmoker(documentSnapshot.data().smoker)
                setSmokeInfo(documentSnapshot.data().smokeInfo)
                setStats(documentSnapshot.data().smokingAmount)
                setSmokingDaily(documentSnapshot.data().smokeDaily)
                cutting(documentSnapshot.data().smokingAmount)
                console.log("smokeInfo and stats", smoker, smokeInfo, stats, smokingDaily)
                if (!documentSnapshot.data().SmokingTime) {
                    setcheck(false)
                } else {
                    setfullTime(documentSnapshot.data().SmokingTime)
                    setcheck(true)
                    // console.log(fullTime)
                }
            })
        } else {
            setLogin(false)
        }
    }, [user, viewopacity, focus, check, refreshing, today, Rotate, smoker])

    useEffect(() => {
        timeCheck().then(() => {
            console.log("타임체크시작")
        }).catch(err => console.log(err))
        // console.log("s")
        var b = moment(fullTime)
        if (fullTime) {
            const interval = setInterval(() => {
                var a = moment().toArray()
                if(a[1]===12){
                    a[1]=1
                }else{
                    a[1]=a[1]+1
                }
                var c = (b.diff(a, "seconds")) * -1
                timeCounter(c)
                setSmokingShow(parseInt(c / 86400) * stats + parseInt(parseInt(c % 86400 / 3600) * stats / 24))
                setSmokingMoney(((parseInt(c / 86400) * stats + parseInt(parseInt(c % 86400 / 3600) * stats / 24)) * 225).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
            }, 1000)
            return () => clearInterval(interval)
        }
        console.log(smoker, "smoker")
    }, [fullTime, refreshing, focus])

    //새로고침
    const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons)
    const Rotate = useRef(new Animated.Value(0)).current;
    async function Rotation() {
        Rotate.setValue(0);
        Animated.timing(Rotate, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
        console.log(user.uid)
        if (smoker) {
            Alert.alert(
                "금연을 시작하시겠습니까?",
                "",
                [
                    {
                        text: '취소', onPress: () => console.log('CANCEL Pressed')
                    },
                    {
                        text: '시작하기', onPress: () => {
                            changeToNonSmoker(), Alert.alert(
                                '금연모드 활성화, 챌린지를 진행해 보세요',
                                '앱 새로고침 후 사용',
                                [
                                    {
                                        text: 'OK', onPress: () => console.log('OK Pressed')
                                    }
                                ]
                            )
                        }
                    }
                ]
            )
        } else {
            Alert.alert(
                "금연을 포기하시겠습니까?",
                "",
                [
                    {
                        text: '취소', onPress: () => console.log('CANCEL Pressed')
                    },
                    {
                        text: '포기하기', onPress: () => {
                            changeToSmoker(), Alert.alert(
                                '흡연모드 활성화',
                                '앱 새로고침 후 사용',
                                [
                                    {
                                        text: 'OK', onPress: () => console.log('OK Pressed')
                                    }
                                ]
                            )
                        }
                    }
                ]
            )
        }
    }

    //새로고침 버튼
    const Sync = Rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })


    //금연 포기시
    async function changeToSmoker() {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
            requestNonPersonalizedAdsOnly: true,
        });
        interstitial.onAdEvent((type) => {
            if (type === AdEventType.LOADED) {
                interstitial.show();
            }
        });

        interstitial.load();
        var a = moment().toArray()
        if (a[1] === 12) {
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }
        await firestore().collection("UserInfo").doc(user.uid).update({
            smoker: true,
            SmokingTime: a,
            smokedLoss: firebase.firestore.FieldValue.arrayUnion(smokingMoney + "/" + a),
            smokedAmount: firebase.firestore.FieldValue.arrayUnion(smokingShow + "/" + a)
        })
        await firestore().collection("UserInfo").doc(user.uid).get().then(doc => {
            setSmoker(doc.data().smoker)
        })
        var totals
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            totals = querySnapshot.size - 1
        })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + totals).update({
            ongoing: false,
            success: 1,
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).update({
            smoke:"흡연 모드로 전환"
        }).catch(
            firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).set({
                smoke:"흡연 모드로 전환"
            })
        )
    }

    //금연 시작시에
    async function changeToNonSmoker() {
        const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
            requestNonPersonalizedAdsOnly: true,
        });
        interstitial.onAdEvent((type) => {
            if (type === AdEventType.LOADED) {
                interstitial.show();
            }
        });

        interstitial.load();
        var a = moment().toArray()
        if(a[1]===12){
            a[1]=1
        }else{
            a[1]=a[1]+1
        }
        await firestore().collection("UserInfo").doc(user.uid).update({
            smoker: false,
            SmokingTime: a,
            smokedSavedLoss: firebase.firestore.FieldValue.arrayUnion(smokingMoney + "/" + a),
            smokedSavedAmount: firebase.firestore.FieldValue.arrayUnion(smokingShow + "/" + a),
            smokeDaily: 0,
            smokeStats: firebase.firestore.FieldValue.arrayUnion(a + "/흡연량 : " + smokingDaily)
        })
        await firestore().collection("UserInfo").doc(user.uid).get().then(doc => {
            setSmoker(doc.data().smoker)
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).update({
            smoke:"금연 모드로 전환"
        }).catch(
            firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).set({
                smoke:"금연 모드로 전환"
            })
        )
    }

    const ChallengeParticipate = () => Alert.alert(
        "챌린지를 진행하시겠습니까?",
        "금연모드로 전환됩니다",
        [
            {
                text: '아니오', onPress: () => console.log('CANCEL Pressed')
            },
            {
                text: '예', onPress: () => {
                    changeToSmoker()
                    navigation.navigate("ChallengeRegister")
                }
            }
        ]
    )

    //로그인 Modal 띄울때 사용
    const [userlogin, setUserlogin] = useState(false);
    const loginview = () => {
        setTimeout(() => {
            setUserlogin(true)
        }, 200)
    }

    const VIEWOPACITY = () => {
        const USER = firebase.auth().currentUser;
        if (login) {
            setViewOpacity(false)
            updateInfo(USER.uid)
        } else {
            loginview()
        }
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={userlogin}
                    onRequestClose={() => setUserlogin(false)}
                >
                    <View style={{ width: WIDTH, height: HEIGHT, position: "absolute", backgroundColor: "#303030", opacity: 0.4 }} />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            width: 280,
                            height: 180,
                            borderRadius: 20,
                            backgroundColor: '#ffffff',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{
                                fontFamily: 'NunitoSans-Bold',
                                fontSize: 16,
                                color: '#303030',
                                opacity: 0.8,
                                marginTop: 20
                            }}>로그인이 필요한서비스입니다.</Text>
                            <Text style={{
                                fontFamily: 'NunitoSans-Regular',
                                fontSize: 14,
                                color: '#303030',
                                opacity: 0.6,
                                textAlign: 'center'
                            }}>로그인하고 다양한 혜택을 만나보세요</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 15
                            }}>
                                <TouchableOpacity onPress={() => setUserlogin(false)} style={{
                                    width: 140,
                                    height: 55,
                                    borderBottomLeftRadius: 20,
                                    backgroundColor: '#999999',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#ffffff',
                                        fontFamily: 'NunitoSans-Regular'
                                    }}>둘러보기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('로그인')
                                    setUserlogin(false)
                                }}
                                    style={{
                                        width: 140,
                                        height: 55,
                                        borderBottomRightRadius: 20,
                                        backgroundColor: '#5cc27b',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#ffffff',
                                        fontFamily: 'NunitoSans-Regular'
                                    }}>로그인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View accessibilityRole="header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, width: "100%", paddingLeft: "5%", paddingRight: "5%" }}>
                    <View
                        style={{
                            height: 44,
                            flexDirection: 'row',
                            paddingTop: 4,
                            justifyContent: "flex-start",
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 24, fontFamily: 'NunitoSans-Regular' }}>
                            <Text style={{ fontFamily: 'NunitoSans-Light', color: '#979797' }}>Hello,</Text>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#5CC27B' }}> Blockers</Text>
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity onPress={Rotation}>
                            <AnimatedIonicons name="sync" size={27} color="#5cc27b" style={{ marginRight: 16, transform: [{ rotate: Sync }] }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('./icon/alram.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {smoker ?
                        <Swiper dotStyle={{ borderColor: '#5CC27B', borderWidth: 1, backgroundColor: '#FFFFFF' }} activeDotColor='#5CC27B' style={{ height: 250 }}>
                            <View>
                                <View style={{ zIndex: 0 }}>
                                    <>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 16, marginBottom: 16 }}>
                                            <View style={resource.container}>
                                                <Text style={resource.smallText}>얼마나 피웠지?</Text>
                                                <Text style={resource.largeText}>{smokingSmoker}대</Text>
                                            </View>
                                            <View style={resource.container}>
                                                <Text style={resource.smallText}>얼마나 썼지?</Text>

                                                <Text style={resource.largeText}>{smokingSmokerMoney}원</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('./icon/chicken.png')} />
                                            <Text style={{
                                                fontFamily: 'NunitoSans-Bold',
                                                fontSize: 16,
                                                color: '#303030',
                                                opacity: 0.8,
                                                marginLeft: 16
                                            }}>치킨이 날아갑니다</Text>
                                        </View>
                                       
                                    </>
                                </View>
                            </View>
                            <View style={{ width: "100%" }}>
                                <>
                                    <View style={{ marginTop: 24 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "90%", alignSelf: 'center' }}>
                                            {smokeProof.map((backColor) => (
                                                <View style={{ width: 16, height: 16, borderRadius: 8, borderColor: '#cc9a67', borderWidth: 1, backgroundColor: backColor === 0 ? '#ffffff' : (backColor === 2 ? '#ff0000' : "#cc9a67") }} />
                                            ))}
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "90%", alignSelf: 'center', marginTop: 8 }}>
                                            {smokeProofTwo.map((backColor) => (
                                                <View style={{ width: 16, height: 16, borderRadius: 8, borderColor: '#cc9a67', borderWidth: 1, backgroundColor: backColor === 0 ? '#ffffff' : backColor === 2 ? '#ff0000' : "#cc9a67" }} />
                                            ))}
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "90%", alignSelf: 'center', marginTop: 8 }}>
                                            {smokeProofThree.map((backColor) => (
                                                <View style={{ width: 16, height: 16, borderRadius: 8, borderColor: '#cc9a67', borderWidth: 1, backgroundColor: backColor === 0 ? '#ffffff' : backColor === 2 ? '#ff0000' : "#cc9a67" }} />
                                            ))}
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "90%", alignSelf: 'center', marginTop: 8 }}>
                                            {smokeProofFour.map((backColor) => (
                                                <View style={{ width: 16, height: 16, borderRadius: 8, borderColor: '#cc9a67', borderWidth: 1, backgroundColor: backColor === 0 ? '#ffffff' : backColor === 2 ? '#ff0000' : "#cc9a67" }} />
                                            ))}
                                        </View>
                                    </View>
                                    <Text style={{
                                        fontFamily: 'NunitoSans-Bold',
                                        color: '#5cc27b',
                                        fontSize: 24,
                                        alignSelf: 'center',
                                        marginTop: 10
                                    }}>{smokingDaily}/{stats}</Text>
                                    <TouchableOpacity style={{
                                        width: 100,
                                        height: 35,
                                        borderRadius: 18,
                                        backgroundColor: '#5cc27b',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 8,
                                        alignSelf: 'center'
                                    }}
                                        onPress={smokeClick}>
                                        <Text style={{
                                            fontFamily: 'NunitoSans-Bold',
                                            fontSize: 16,
                                            color: '#ffffff',
                                        }}>담배 +1</Text>
                                    </TouchableOpacity>
                                </>
                            </View>
                        </Swiper>
                        :
                        <>
                            {viewopacity ?
                                <TouchableWithoutFeedback style={{ flexDirection: 'row' }} onPress={VIEWOPACITY}>
                                    <View style={{
                                        width: "100%",
                                        zIndex: 1,
                                        position: 'absolute',
                                        height: 210,
                                        backgroundColor: '#000000',
                                        opacity: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }} >
                                        <Text style={{ color: '#FFFFFF', fontSize: 24, fontFamily: 'NunitoSans-Bold' }}>터치해서 금연 시작하기</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                :
                                <View />
                            }
                            <View style={{
                                backgroundColor: '#5CC27B',
                                marginRight: 33,
                                marginLeft: 33,
                                height: 64,
                                borderRadius: 29,
                                marginTop: 30,
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <View style={date.viewcontainer}>
                                        <Text style={date.largedate}>{day}</Text>
                                        <Text style={date.smalldate}>days</Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center', height: 64, paddingTop: 16, paddingBottom: 16 }}>
                                        <View style={{ width: 3, height: 3, backgroundColor: '#FFFFFF' }} />
                                        <View style={{ width: 3, height: 3, backgroundColor: '#FFFFFF' }} />
                                    </View>
                                    <View style={date.viewcontainer}>
                                        <Text style={date.largedate}>{hour}</Text>
                                        <Text style={date.smalldate}>hours</Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center', height: 64, paddingTop: 16, paddingBottom: 16 }}>
                                        <View style={{ width: 3, height: 3, backgroundColor: '#FFFFFF' }} />
                                        <View style={{ width: 3, height: 3, backgroundColor: '#FFFFFF' }} />
                                    </View>
                                    <View style={date.viewcontainer}>
                                        <Text style={date.largedate}>{minu}</Text>
                                        <Text style={date.smalldate}>minutes</Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center', height: 64, paddingTop: 16, paddingBottom: 16 }}>
                                        <View style={{ width: 3, height: 3, backgroundColor: '#FFFFFF' }} />
                                        <View style={{ width: 3, height: 3, backgroundColor: '#FFFFFF' }} />
                                    </View>
                                    <View style={date.viewcontainer}>
                                        <Text style={date.largedate}>{sec}</Text>
                                        <Text style={date.smalldate}>seconds</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 48, marginBottom: 32 }}>
                                <View style={resource.container}>
                                    <Text style={resource.smallText}>얼마나 안폈지?</Text>
                                    <Text style={resource.largeText}>{smokingShow}대</Text>
                                </View>
                                <View style={resource.container}>
                                    <Text style={resource.smallText}>얼마나 아꼈지?</Text>
                                    <Text style={resource.largeText}>{smokingMoney}원</Text>
                                </View>
                            </View>
                        </>
                    }
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: "12%", paddingRight: "12%" }}>
                        <ImageBackground style={{ width: 25, height: 15, marginRight: 8, alignItems: "center", justifyContent: "center" }} resizeMode="stretch" source={require('./icon/tipbox.png')} >
                            <Text style={{ fontSize: 9, fontFamily: 'NunitoSans-Bold', color: "#ffffff" }}>TIP</Text>
                        </ImageBackground>
                        <Text style={{ alignSelf: 'center', fontSize: 14, fontFamily: 'NunitoSans-Regular', color: '#303030' }}>물을 많이 마시면 니코틴 배출이 빨라집니다!</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginTop: 32,
                    }}>
                        <TouchableOpacity style={{
                            alignItems: "center",
                        }} onPress={login ?
                            () => { navigation.navigate('Calendar') }
                            :
                            () => { loginview() }}>
                            <MaterialCommunityIcons size={60} color="#5cc27b" name="calendar-blank" />
                            <Text style={{ fontSize: 14, fontFamily: "NunitoSans-Regular", color: "#303030", marginTop: 8 }}>금연달력</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: "center",
                        }} onPress={login ?
                            () => { navigation.navigate('ChatbotMain') }
                            :
                            () => { loginview() }}>
                            <FontAwesome5 name="robot" size={50} color="#5cc27b" />
                            <Text style={{ fontSize: 14, fontFamily: "NunitoSans-Regular", color: "#303030", marginTop: 18 }}>금연 리포트 & 정보</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: "center",
                        }} onPress={login ?
                            () => { navigation.navigate('SmokeAlertOne') }
                            :
                            () => { loginview() }}>
                            <Ionicons name="alert-circle-outline" size={60} color="#FF0000" />
                            <Text style={{fontSize: 14, fontFamily: "NunitoSans-Regular", color: "#ff0000", marginTop: 4}}>흡연 경보</Text>
                        </TouchableOpacity>
                    </View>
                    {smoker ?
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 40,
                            marginLeft: "10%",
                            marginRight: "10%"
                        }}>
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    justifyContent: 'flex-start',
                                    paddingBottom: 16,
                                    paddingLeft: 14,
                                    paddingRight: 14
                                }}>
                                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#5cc27b' }} />
                                    <Text style={{ fontSize: 16, fontFamily: 'NunitoSans-Bold', marginLeft: 8, color: '#303030' }}>챌린지 시작하기</Text>
                                </View>
                                <Text style={{ marginLeft: 32 }}>
                                    <Text style={{ fontSize: 16, color: '#303030', fontFamily: 'NunitoSans-Regular' }}>금연을 시작해 보세요!</Text>
                                </Text>
                            </View>
                            <TouchableOpacity onPress={login ? smoker ? () => ChallengeParticipate() : () => { navigation.navigate('ChallengeRegister') } : () => { setUserlogin(true) }} style={{
                                    width: 100,
                                    height: 35,
                                    borderRadius: 18,
                                    borderWidth: 2,
                                    borderColor: "#5cc27b",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <Text style={{
                                    fontFamily: "NunitoSans-Bold",
                                    fontSize: 16,
                                    color: "#303030"
                                }}>시작하기</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={login ?
                            () => { navigation.navigate('DiaryWrite') }
                            :
                            () => { loginview() }} style={{
                                alignItems: "flex-start",
                                marginTop: 40,
                                marginLeft: "10%",
                                marginRight: "10%"
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',
                                paddingBottom: 16,
                                paddingLeft: 14,
                                paddingRight: 14
                            }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#5cc27b' }} />
                                <Text style={{ fontSize: 16, fontFamily: 'NunitoSans-Bold', marginLeft: 8, color: '#303030' }}>금연일기</Text>
                            </View>
                            <Text style={{ marginLeft: 32 }}>
                                <Text style={{ fontSize: 16, color: '#303030', fontFamily: 'NunitoSans-Regular' }}>오늘의 금연 일기를 작성해보세요.</Text>
                            </Text>
                        </TouchableOpacity>
                    }
          
      
         
                    {/* <TouchableOpacity style={{
                        width: "100%",
                        height: 90,
                        backgroundColor: "#303030",
                        paddingVertical: 16,
                        paddingHorizontal: 32,
                        marginTop: 24,
                        
                    }}>
                        <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 21,
                            color: "#ffffff",
                            marginBottom: 8
                        }}>Blockers 챌린지는 무엇인가요?</Text>
                        <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 16,
                            color: "#ffffff"
                        }}>실천형 금연 서비스 알아보기</Text>
                    </TouchableOpacity> */}
                </ScrollView>
                <View
         style={{
            flexDirection:"row",
        alignItems:"center",
    justifyContent:"center",
}}
         >

         
<BannerAd
      unitId={adUnitId}  
      size={BannerAdSize.SMART_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={(error) => {
        console.error('Advert failed to load: ', error);
      }}
    />
    
         </View> 
            </SafeAreaView>
        </>
    )
}