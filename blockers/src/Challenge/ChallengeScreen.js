import React, { useState, useReducer, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import ProgressBar from 'react-native-progress/Bar';
import { AdEventType, InterstitialAd, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import RNKakaoLink from 'react-native-kakao-links';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-1011958477260123/9244108660';


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const main = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: "NunitoSans-Bold",
        color: "#303030"
    },
    underline: {
        fontFamily: "NunitoSans-Regular",
        fontSize: 14,
        color: "#303030",
        opacity: 0.6,
        textDecorationLine: "underline"
    },
    bold: {
        fontSize: 14,
        fontFamily: "NunitoSans-Bold",
        color: "#303030"
    }
})

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
export default function Challenge({ navigation }) {

    const MissionItem = ({ item }) => {
        return (
            <View style={{
                width: 254,
                height: 241,
                borderRadius: 10,
                justifyContent: "space-between",
                marginLeft: 16,
                marginBottom: 4,
                shadowOpacity: 0.24,
                shadowRadius: 2.22,
                shadowColor: "#303030",
                shadowOffset: {
                    width: 0,
                    height: 1
                },
                elevation: 3,
            }}>
                <View style={{
                    width: 254,
                    height: 187,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    backgroundColor: "#9d9c9c"
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 32,
                        marginLeft: 16,
                        marginRight: 16
                    }}>
                        {item.period === "monthly" ?

                            <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#fb5757",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            :

                            (item.period === "once" ?
                                <View style={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: "#ffb83d",
                                    borderRadius: 4,
                                    marginRight: 8
                                }} />
                                :
                                <View style={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: "#5cc27b",
                                    borderRadius: 4,
                                    marginRight: 8
                                }} />
                            )
                        }

                        <Text style={[main.title, { color: "#ffffff" }]}>{item.title}</Text>
                    </View>
                    <Text style={[main.title, { color: "#ffffff", fontFamily: "NunitoSans-Regular", marginTop: 16, marginRight: 32, marginLeft: 32 }]}>{item.content}</Text>
                </View>
                {item.doing === false ?
                    <TouchableOpacity
                        onPress={() => navigation.navigate(item.navigate, { docID: item.challengeDoc, UID: user.uid })}
                        style={{
                            width: 254,
                            height: 54,
                            backgroundColor: "#ffffff",
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text style={main.title}>참가하기</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{
                        width: 254,
                        height: 54,
                        backgroundColor: "#ffffff",
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={main.title}>진행하기</Text>
                    </TouchableOpacity>
                }

            </View>
        )
    }
    const MissionData = [
        {
            id: 1,
            title: "진행중인 미션이 없습니다.",
            content: "챌린지에 참가해보세요",
            doing: false
        },
        {
            id: 2,
            title: "진행중인 미션이 없습니다.",
            content: "챌린지에 참가해보세요",
            doing: false
        },
        {
            id: 3,
            title: "진행중인 미션이 없습니다.",
            content: "챌린지에 참가해보세요",
            doing: false
        }
    ]
    const [challenge, setChallenge] = useState(false);
    const [user, setUser] = useState();
    const [name, setName] = useState("");
    const [long, setLong] = useState("");
    const [mistake, setMistake] = useState("");
    const [title, setTitle] = useState("");
    const [progress, setProgress] = useState(0);
    const [change, setChange] = useState("")
    const [refreshing, setRefreshing] = React.useState(false);
    const [items, setItems] = useState([])
    const [ratio, setRatio] = useState(0)
    const [timeStamp, setTimeStamp] = useState([])
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })

    })

    async function hi() {
        var size
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            size = querySnapshot.size
        })
        if (size > 0) {
            console.log("im hi")
            var total = size - 1
            var time
            var weekFire
            var monthFire
            var long
            var progressFor
            await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).get().then(doc => {
                setChallenge(doc.data().ongoing)
                setName(doc.data().name)
                setMistake(doc.data().mistake)
                setTitle(doc.data().title)
                setLong(doc.data().long)
                setProgress(doc.data().progress)
                time = doc.data().challengePeriod
                weekFire = doc.data().week
                monthFire = doc.data().month
                long = doc.data().long
                progressFor = doc.data().progress
            })
            var a = moment().toArray()


            if (a[1] === 12) {
                a[1] = 1
            } else {
                a[1] = a[1] + 1
            }
            var x = moment(a)
            var y = moment(time)
            var durationWeek = moment.duration(x.diff(y)).asWeeks()
            var durationMonth = moment.duration(x.diff(y)).asMonths()

            // console.log(x)
            console.log(weekFire, monthFire)
            console.log(durationWeek, durationMonth)
            if (weekFire < durationWeek) {
                // console.log(parseInt(durationWeek,10))
                await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).update({
                    week: parseInt(durationWeek, 10) + 1
                })
                await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").update({
                    visible: true,
                    week: parseInt(durationWeek, 10) + 1
                })

            }
            if (monthFire < durationMonth) {
                console.log(parseInt(durationMonth, 10))
                await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).update({
                    month: parseInt(durationMonth, 10) + 1
                })
                await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").update({
                    visible: true,
                    month: parseInt(durationMonth, 10) + 1
                })
                await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").update({
                    visible: true,
                    month: parseInt(durationMonth, 10) + 1
                })
                await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알코올 평가(월1회)").update({
                    visible: true,
                    month: parseInt(durationMonth, 10) + 1
                })

            }
            if (durationMonth > long) {
                if (progressFor > 80) {
                    await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("성공 후기 작성하기").update({
                        visible: true
                    })
                    await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("나만의 금연 노하우 공유하기").update({
                        visible: true
                    })
                } else {
                    await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("성공 후기 작성하기").update({
                        visible: false
                    })
                    await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("나만의 금연 노하우 공유하기").update({
                        visible: false
                    })
                    await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).update({
                        ongoing: false,
                        success: 1
                    })
                }
            } else {
                if (progressFor < 80) {
                    await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("성공 후기 작성하기").update({
                        visible: false
                    })
                    await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("나만의 금연 노하우 공유하기").update({
                        visible: false
                    })
                }
            }
            const list = []
            await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").where("stats", "==", false).where("visible", "==", true).get().then(querySnapshot => {
                querySnapshot.forEach(function (doc) {
                    list.push({
                        title: doc.data().title,
                        content: doc.data().content,
                        period: doc.data().period,
                        doing: doc.data().stats,
                        id: doc.data().id,
                        navigate: doc.data().navigate,
                        challengeDoc: "challenge" + total
                    })
                })
                setItems(list)
            })

        } else {
            setChallenge(false)
        }
    }
    async function checkRate() {
        var total
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size - 1
        })
        var withoutVeri
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").where("stats", "==", true).get().then(querySnapshot => {
            withoutVeri = querySnapshot.size

        })

        var esteemcnt
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").where("stats", "==", true).get().then(querySnapshot => {
            esteemcnt = querySnapshot.size
        })
        var alcoholcnt
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").where("stats", "==", true).get().then(querySnapshot => {
            alcoholcnt = querySnapshot.size
        })
        var stresscnt
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").where("stats", "==", true).get().then(querySnapshot => {
            stresscnt = querySnapshot.size
        })
        var vericnt
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").where("stats", "==", true).get().then(querySnapshot => {
            vericnt = querySnapshot.size
        })
        setRatio(withoutVeri + esteemcnt + alcoholcnt + stresscnt + vericnt)
        if (long === 1) {

            await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).update({
                progress: (withoutVeri + esteemcnt + alcoholcnt + stresscnt + vericnt) * 9.1 - mistake * 5
            })
            setProgress((withoutVeri + esteemcnt + alcoholcnt + stresscnt + vericnt) * 9.1 - mistake * 5)
        } else if (long === 3) {
            await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).update({
                progress: (withoutVeri + esteemcnt + alcoholcnt + stresscnt + vericnt) * 4.76 - mistake * 5
            })
            setProgress((withoutVeri + esteemcnt + alcoholcnt + stresscnt + vericnt) * 4.76 - mistake * 5)
        } else {
            await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).update({
                progress: (withoutVeri + esteemcnt + alcoholcnt + stresscnt + vericnt) * 2.7 - mistake * 5
            })
            setProgress((withoutVeri + esteemcnt + alcoholcnt + stresscnt + vericnt) * 2.7 - mistake * 5)
        }
    }
    useEffect(() => {
        hi()
        if (challenge) {
            checkRate()
        }
    }, [user, change, refreshing, mistake, challenge])


    async function makeMistake() {
        Alert.alert(
            '흡연하셨나요?',
            '실수할 수 있습니다\n포기하지말고 끝까지 진행해보세요.',
            [
                {
                    text: 'No', onPress: () => console.log('CANCEL Pressed')
                },
                {
                    text: 'Yes', onPress: () => realMistake()
                }
            ]
        )

    }
    async function realMistake() {
        setChange(true)
        var total = 0
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size - 1
        })
        console.log(total)
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).update({
            mistake: mistake + 1,

        })
        setChange(false)
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
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
                        <Text style={{ fontSize: 24, fontFamily: 'NunitoSans-Bold', color: '#5CC27B' }}>Challenge</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image source={require('../icon/alram.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        marginRight: "4%",
                        marginLeft: "8%",
                        marginTop: 16,
                        marginBottom: HEIGHT * 0.025
                    }}>
                        <Text style={main.title}>챌린지 정보</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("ChallengeHistory", { UID: user.uid })}><Text style={main.underline}>챌린지 히스토리</Text></TouchableOpacity>
                    </View>
                    <View style={{
                        width: "92%",
                        borderRadius: 15,
                        borderWidth: 2,
                        borderColor: "#5cc27b",
                        height: 212,
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: challenge ? "flex-start" : "center",
                        backgroundColor: "#ffffff"
                    }}>
                        {challenge ?
                            <>
                                <Text style={{
                                    fontFamily: "NunitoSans-Bold",
                                    fontSize: 14,
                                    color: "#303030",
                                    marginVertical: 16
                                }}>{name}님의 챌린지</Text>
                                <ProgressBar
                                    progress={progress * 0.01}
                                    width={WIDTH * 0.8}
                                    height={20}
                                    borderRadius={36}
                                    color="#5cc27b"
                                    unfilledColor="#dbdbdb"
                                    borderWidth={0}
                                ><Text style={{
                                    position: "absolute",
                                    flex: 0,
                                    alignSelf: "center",
                                    fontSize: 12,
                                    color: "#ffffff",
                                    lineHeight: 20
                                }}>{progress}%</Text>
                                </ProgressBar>
                                <View style={{
                                    marginTop: 16,
                                    marginBottom: 16,
                                    paddingHorizontal: "7%",
                                    width: "100%"
                                }}>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: 16
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontFamily: "NunitoSans-Regular",
                                            color: "#303030"
                                        }}>챌린지 각오</Text>
                                        <Text style={{
                                            fontFamily: "NunitoSans-Bold",
                                            fontSize: 14,
                                            color: "#303030"
                                        }}>{title}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: 16
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontFamily: "NunitoSans-Regular",
                                            color: "#303030"
                                        }}>챌린지 기간</Text>
                                        <Text style={{
                                            fontFamily: "NunitoSans-Bold",
                                            fontSize: 14,
                                            color: "#303030"
                                        }}>{long}개월</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: 16
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontFamily: "NunitoSans-Regular",
                                            color: "#303030"
                                        }}>실수 횟수(진행도 - 5%)</Text>
                                        <Text style={{
                                            fontFamily: "NunitoSans-Bold",
                                            fontSize: 14,
                                            color: "#303030"
                                        }}>{mistake}회</Text>
                                    </View>
                                </View>
                            </>
                            :
                            <Text style={[main.title, { fontSize: 21 }]}>진행중인 챌린지가 없습니다.</Text>
                        }
                    </View>
                    {challenge ?
                        <>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-evenly"
                            }}>

                                <TouchableOpacity onPress={makeMistake} style={{
                                    width: "55%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    height: 35,
                                    backgroundColor: "#5cc27b",
                                    borderRadius: 5,
                                    marginTop: HEIGHT * 0.025
                                }}>
                                    <Text style={[main.title, { color: "#ffffff" }]}>실수 한 번</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        :
                        <TouchableOpacity onPress={() => navigation.navigate("ChallengeRegister")} style={{
                            width: "55%",
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                            height: 35,
                            backgroundColor: "#5cc27b",
                            borderRadius: 5,
                            marginTop: HEIGHT * 0.025
                        }}>
                            <Text style={[main.title, { color: "#ffffff" }]}>시작하기</Text>
                        </TouchableOpacity>
                    }

                    <View style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        marginRight: "4%",
                        marginLeft: "8%",
                        marginTop: HEIGHT * 0.025,
                        marginBottom: HEIGHT * 0.025
                    }}>
                        <Text style={main.title}>진행해야할 미션</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("ChallengeMission", { UID: user.uid })}><Text style={main.underline}>전체미션</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true}>
                        {challenge ?
                            <FlatList
                                horizontal={true}
                                data={items}
                                keyExtractor={(item) => item.id}
                                renderItem={MissionItem}
                                style={{ paddingBottom: 5 }}
                                showsHorizontalScrollIndicator={false}
                            />
                            :
                            <FlatList
                                horizontal={true}
                                data={MissionData}
                                keyExtractor={(item) => item.id}
                                renderItem={MissionItem}
                                style={{ paddingBottom: 5 }}
                                showsHorizontalScrollIndicator={false}
                            />
                        }

                    </ScrollView>
                </ScrollView>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
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

function MonthDispatcher(state, action) {
    switch (action.type) {
        case "ONE":
            return 1;
        case "THREE":
            return 3;
        case "SIX":
            return 6;
    }
}

export function ChallengeRegister({ navigation }) {
    const [resolution, setResolution] = useState("");
    const [month, dispatch] = useReducer(MonthDispatcher, 0);
    const [name, setName] = useState("")
    const [user, setUser] = useState()

    const OneMonth = () => {
        dispatch({
            type: "ONE"
        })
    }
    const ThreeMonth = () => {
        dispatch({
            type: "THREE"
        })
    }
    const SixMonth = () => {
        dispatch({
            type: "SIX"
        })
    }

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        console.log(month)
    })
    useEffect(() => {
        if (user) {
            firestore().collection("UserInfo").doc(user.uid).get().then(doc => {
                setName(doc.data().name)
            })
        }
    }, [user])

    async function uploadChallenge() {
        var total = 0
        var a = moment().toArray()
        console.log(a)

        if (a[1] === 12) {
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size
        })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).set(
            {
                title: resolution,
                long: month,
                ongoing: true,
                mistake: 0,
                name: name,
                progress: 0,
                challengePeriod: a,
                success:0,
                number:total,
                week:1,
                month:1
            }
        )
        if(month===1){
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").set({
            title: "금연활동 인증하기 (주1회)",
            content: "금연방법은 다양합니다. 하지만 하나를 꾸준히 하면서 실천하는것이 어렵죠. 다양한 금연 방법을 알아보고 본인의 방법으로 인증을 실천해 보세요",
            stats: false,
            period: "once",
            id: 10,
            navigate: "ChallengeVeri",
            visible:true,
            week:1,
            resNavi:"ChallengeVeriResult"
        })    
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").set({
            title: "스트레스 평가(월1회)",
            content: "스트레스와 금연의 밀접한 관계, 나의 스트레스를 체크하고 금연 성공하세요",
            stats: false,
            period: "monthly",
            id: 1,
            navigate: "StressMain",
            visible:true,
            month:1,
            resNavi:"StressResult"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").set({
            title: "자기 효능감 평가(월1회)",
            content: "자기 효능감과 금연의 밀접한 관계, 나의 자기 효능감을체크하고 금연 성공하세요",
            stats: false,
            period: "monthly",
            id: 2,
            navigate: "SelfEsteemMain",
            visible:true,
            month:1,
            resNavi:"SelfEsteemResult"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").set({
            title: "알콜중독 평가(월1회)",
            content: "알콜중독과 금연의 밀접한 관계, 나의 알콜중독을 체크하고 금연 성공하세요",
            stats: false,
            period: "monthly",
            id: 3,
            navigate: "AlcoholMain",
            visible:true,
            month:1,
            resNavi:"AlcoholResult"
        })
    }else if(month===3){
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").set({
            title: "금연활동 인증하기 (주1회)",
            content: "금연방법은 다양합니다. 하지만 하나를 꾸준히 하면서 실천하는것이 어렵죠. 다양한 금연 방법을 알아보고 본인의 방법으로 인증을 실천해 보세요",
            stats: false,
            period: "once",
            id: 10,
            navigate: "ChallengeVeri",
            visible:true,
            week:1,
            resNavi:"ChallengeVeriResult"
        })


        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("1").set({
           stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("2").set({
            stats:false
         })
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("3").set({
            stats:false
         })
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("4").set({
            stats:false
         })
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("5").set({
            stats:false
         })
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("6").set({
            stats:false
         })
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("7").set({
            stats:false
         })
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("8").set({
            stats:false
         })
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("9").set({
            stats:false
         })
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("10").set({
            stats:false
         })
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("11").set({
            stats:false
         })
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("12").set({
            stats:false
         })

        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").set({
            title: "스트레스 평가(월1회)",
            content: "스트레스와 금연의 밀접한 관계, 나의 스트레스를 체크하고 금연 성공하세요",
            stats: false,
            period: "monthly",
            id: 1,
            navigate: "StressMain",
            visible:true,
            month:1,
            resNavi:"StressResult"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").doc("1").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").doc("2").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").doc("3").set({
            stats:false
        })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").set({
            title: "자기 효능감 평가(월1회)",
            content: "자기 효능감과 금연의 밀접한 관계, 나의 자기 효능감을체크하고 금연 성공하세요",
            stats: false,
            period: "monthly",
            id: 2,
            navigate: "SelfEsteemMain",
            visible:true,
            month:1,
            resNavi:"SelfEsteemResult"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc("1").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc("2").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc("3").set({
            stats:false
        })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").set({
            title: "알콜중독 평가(월1회)",
            content: "알콜중독과 금연의 밀접한 관계, 나의 알콜중독을 체크하고 금연 성공하세요",
            stats: false,
            period: "monthly",
            id: 3,
            navigate: "AlcoholMain",
            visible:true,
            month:1,
            resNavi:"AlcoholResult"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").doc("1").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").doc("2").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").doc("3").set({
            stats:false
        })
    }else if(month===6){
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").set({
            title: "금연활동 인증하기 (주1회)",
            content: "금연방법은 다양합니다. 하지만 하나를 꾸준히 하면서 실천하는것이 어렵죠. 다양한 금연 방법을 알아보고 본인의 방법으로 인증을 실천해 보세요",
            stats: false,
            period: "once",
            id: 10,
            navigate: "ChallengeVeri",
            visible:true,
            week:1,
            resNavi:"ChallengeVeriResult"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("1").set({
            stats:false
         })
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("2").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("3").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("4").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("5").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("6").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("7").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("8").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("9").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("10").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("11").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("12").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("13").set({
            stats:false
         })
         firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("14").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("15").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("16").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("17").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("18").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("19").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("20").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("21").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("22").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("23").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("24").set({
             stats:false
          })
          firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc("25").set({
            stats:false
         })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").set({
            title: "스트레스 평가(월1회)",
            content: "스트레스와 금연의 밀접한 관계, 나의 스트레스를 체크하고 금연 성공하세요",
            stats: false,
            period: "monthly",
            id: 1,
            navigate: "StressMain",
            visible:true,
            month:1,
            resNavi:"StressResult"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").doc("1").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").doc("2").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").doc("3").set({
            stats:false
        }) 
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").doc("4").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").doc("5").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").doc("6").set({
            stats:false
        })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").set({
            title: "자기 효능감 평가(월1회)",
            content: "자기 효능감과 금연의 밀접한 관계, 나의 자기 효능감을체크하고 금연 성공하세요",
            stats: false,
            period: "monthly",
            id: 2,
            navigate: "SelfEsteemMain",
            visible:true,
            month:1,
            resNavi:"SelfEsteemResult"
        })

        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc("1").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc("2").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc("3").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc("4").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc("5").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc("6").set({
            stats:false
        })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").set({
            title: "알콜중독 평가(월1회)",
            content: "알콜중독과 금연의 밀접한 관계, 나의 알콜중독을 체크하고 금연 성공하세요",
            stats: false,
            period: "monthly",
            id: 3,
            navigate: "AlcoholMain",
            visible:true,
            month:1,
            resNavi:"AlcoholResult"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").doc("1").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").doc("2").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").doc("3").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").doc("4").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").doc("5").set({
            stats:false
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").doc("6").set({
            stats:false
        })
    }
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연 동기 설정하기").set({
            title: "금연 동기 설정하기",
            content: "금연을 하는 이유가 무엇인가요? 금연 동기는 앞으로 금연을 이어가는 가장 큰 힘이 될 수 있습니다",
            stats: false,
            period: "once",
            id: 4,
            navigate: "ChallengeMotivation",
            visible:true,
            resNavi:"ChallengeMotivationResult"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("니코틴 중독 평가하기").set({
            title: "니코틴 중독 평가하기",
            content: "나는 니코틴에 얼마나 의존할까?",
            stats: false,
            period: "once",
            id: 5,
            navigate: "SolutionMain",
            visible:true,
            resNavi:"NicotineResult"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연 서약서 쓰기").set({
            title: "금연 서약서 쓰기",
            content: "금연을 서약서로 본인의 의지를 표현해 보세요.",
            stats: false,
            period: "once",
            id: 6,
            navigate: "ChallengeSwear",
            visible:true,
            resNavi:"ChallengeSwearResult"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연 지지자 정하기").set({
            title: "금연 지지자 정하기",
            content: "앞으로 힘든 금연에 힘이될 사람들에게 금연 응원을 요청해보세요",
            stats: false,
            period: "once",
            id: 7,
            navigate: "ChallengeSupport",
            visible:true,
            resNavi:"ChallengeSupport"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("내 흡연유형 파악하기").set({
            title: "내 흡연유형 파악하기",
            content: "나는 언제 담배를 필까? MBTI대신 흡BTI! 유형별 대처 전략을 알아봅시다.",
            stats: false,
            period: "once",
            id: 8,
            navigate: "SolutionAOne",
            visible:true,
            resNavi:"SolutionResult"
        })
       
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금단증상 확인하기").set({
            title: "금단증상 확인하기",
            content: "금연을 하면서 피할 수 없는 금단증상! 나의 금단 증상을 파악하고 해결책을 찾아보세요.",
            stats: false,
            period: "once",
            id: 11,
            navigate: "ChallengeGD",
            visible:true,
            resNavi:"ChallengeGDResult"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("나만의 금연 노하우 공유하기").set({
            title: "나만의 금연 노하우 공유하기",
            content: "스트레스와 금연의 밀접한 관계\n나의 스트레스를 체크하고 금연성공하세요.",
            period: "final",
            id: 12,
            navigate: "ChallengeKnowhow",
            visible:false,
            stats:false,
            resNavi:"ChallengeKnowhow"
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("성공 후기 작성하기").set({
            title: "성공 후기 작성하기",
            content: "금연 성공한 후 느낀점, 다른사람에게 하고싶은말, 지지자에게 고마움을 표현해 보세요",
            period: "final",
            id: 13,
            navigate: "ChallengeSuccess",
            visible:false,
            stats:false,
            resNavi:"ChallengeSuccess"
        })
        navigation.navigate("ChallengeTab")
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", height: 50, paddingTop: 5, width: "100%", paddingLeft: "5%", paddingRight: "5%" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={25} />
                        </TouchableOpacity>
                        <View
                            style={{
                                height: 50,
                                flexDirection: 'row',
                                justifyContent: "flex-start",
                                alignItems: 'center',
                                marginLeft: 24
                            }}
                        >
                            <Text style={{ fontSize: 18 }}>
                                <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>개설하기</Text>
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("자주묻는 질문")} >
                        <Text style={{
                            fontSize: 14,
                            color: "#303030",
                            opacity: 0.6,
                            textDecorationLine: "underline",
                        }}>챌린지는 무엇인가요?</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{
                        width: "90%",
                        paddingLeft: "5%",
                        paddingRight: "5%",
                        alignSelf: "center",
                        borderRadius: 10,
                        backgroundColor: "#ffffff",
                        elevation: Platform.OS === "android" ? 3 : 0,
                        shadowColor: "#303030",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        marginTop: 16,
                        paddingTop: HEIGHT * 0.025,
                        paddingBottom: HEIGHT * 0.02
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            alignSelf: "center",
                            marginBottom: HEIGHT * 0.05
                        }}>{name}님의 금연 챌린지</Text>
                        <Text style={[main.bold, { marginBottom: HEIGHT * 0.025 }]}>챌린지 제목</Text>
                        <TextInput
                            value={resolution}
                            onChangeText={(text) => setResolution(text)}
                            placeholder="금연에 임하는 각오를 적어주세요" style={{
                                width: WIDTH * 0.5,
                                borderBottomColor: "#E5E5E5",
                                borderBottomWidth: 1,
                                paddingBottom: 8,
                                marginBottom: HEIGHT * 0.05
                            }} />
                        <Text style={[main.bold, { marginBottom: HEIGHT * 0.025 }]}>기간 설정</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: HEIGHT * 0.05
                        }}>
                            <TouchableOpacity onPress={OneMonth} style={{
                                width: 16,
                                height: 16,
                                borderRadius: 8,
                                borderWidth: 0.5,
                                borderColor: "#5cc27b",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: month === 1 ? "#5cc27b" : "#ffffff" }} />
                            </TouchableOpacity>
                            <Text style={{
                                marginLeft: 4,
                                marginRight: 8,
                                fontSize: 14,
                                color: "#303030",
                                opacity: month === 1 ? 1 : 0.6,
                                fontFamily: month === 1 ? "NunitoSans-Bold" : "NunitoSans-Regular"
                            }}>1개월</Text>
                            <TouchableOpacity onPress={ThreeMonth} style={{
                                width: 16,
                                height: 16,
                                borderRadius: 8,
                                borderWidth: 0.5,
                                borderColor: "#5cc27b",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: month === 3 ? "#5cc27b" : "#ffffff" }} />
                            </TouchableOpacity>
                            <Text style={{
                                marginLeft: 4,
                                marginRight: 8,
                                fontSize: 14,
                                color: "#303030",
                                opacity: month === 3 ? 1 : 0.6,
                                fontFamily: month === 3 ? "NunitoSans-Bold" : "NunitoSans-Regular"
                            }}>3개월</Text>
                            <TouchableOpacity onPress={SixMonth} style={{
                                width: 16,
                                height: 16,
                                borderRadius: 8,
                                borderWidth: 0.5,
                                borderColor: "#5cc27b",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: month === 6 ? "#5cc27b" : "#ffffff" }} />
                            </TouchableOpacity>
                            <Text style={{
                                marginLeft: 4,
                                marginRight: 8,
                                fontSize: 14,
                                color: "#303030",
                                opacity: month === 6 ? 1 : 0.6,
                                fontFamily: month === 6 ? "NunitoSans-Bold" : "NunitoSans-Regular"
                            }}>6개월(금연성공카드 증정)</Text>
                        </View>
                        <Text style={[main.bold, { marginBottom: HEIGHT * 0.025 }]}>챌린지 3컷 설명</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <View style={{
                                alignItems: "center",
                            }}>
                                <View style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 80,
                                    height: 80,
                                    borderWidth: 1,
                                    borderColor: "#707070",
                                    backgroundColor: "#ffffff"
                                }}>
                                    <Image source={require("../icon/missionone.png")} />
                                </View>
                                <Text style={[main.bold, { marginTop: 8 }]}>1. 미션진행</Text>
                            </View>
                            <View style={{
                                alignItems: "center",
                            }}>
                                <View style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 80,
                                    height: 80,
                                    borderWidth: 1,
                                    borderColor: "#707070",
                                    backgroundColor: "#ffffff"
                                }}>
                                    <Image source={require("../icon/missiontwo.png")} />
                                </View>
                                <Text style={[main.bold, { marginTop: 8 }]}>2. 금연 인증</Text>
                            </View>
                            <View style={{
                                alignItems: "center",
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    width: 80,
                                    height: 80,
                                    borderWidth: 1,
                                    borderColor: "#707070",
                                    backgroundColor: "#ffffff"
                                }}>
                                    <Image source={require("../icon/missionthree.png")} />
                                </View>
                                <Text style={[main.bold, { marginTop: 8 }]}>3. 금연 성공!</Text>
                            </View>
                        </View>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: "NunitoSans-Regular",
                            color: "#303030",
                            opacity: 0.4,
                            alignSelf: "center",
                            textAlign: "center",
                            marginTop: HEIGHT * 0.05
                        }}>Blockers
                            <Text style={{ textDecorationLine: "underline" }}>개인정보 처리약관</Text>
                            과{"\n"}
                            <Text style={{ textDecorationLine: "underline" }}>이용약관</Text>
                            에 동의하게 됩니다.(마케팅 정보 수신동의 포함)
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                {resolution.length > 0 && month > 0 ?
                    <TouchableOpacity onPress={uploadChallenge}>
                        <View style={{
                            width: "100%",
                            height: 60,
                            backgroundColor: '#5cc27b',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>다음</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <View style={{
                            width: "100%",
                            height: 60,
                            backgroundColor: "#c6c6c6",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>다음</Text>
                        </View>
                    </TouchableOpacity>
                }
            </SafeAreaView>
        </>
    )
}

export function ChallengeHeader({ navigation, Title }) {
    return (
        <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: "center", height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%", backgroundColor: '#ffffff' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={25} />
            </TouchableOpacity>
            <View
                style={{
                    height: 44,
                    flexDirection: 'row',
                    justifyContent: "flex-start",
                    alignItems: 'center',
                    marginLeft: 20
                }}
            >
                <Text style={{ fontSize: 18 }}>
                    <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>{Title}</Text>
                </Text>
            </View>
        </View>
    )
}

const history = StyleSheet.create({
    text: {
        fontSize: 16,
        fontFamily: "NunitoSans-Regular",
        color: "#303030"
    }
})

export function ChallengeHistory({ navigation,route }) {
    const [items,setItems]=useState([])
    const {UID}=route.params
    const title = "Challenge History";
   
    useEffect(()=>{
        
        getData()
    },[])
    async function getData(){
        const list=[]
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").onSnapshot(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                list.push({
                    ChallengeStep:doc.data().name+"님의 챌린지 ("+doc.data().long+"개월)",
                    participationDate:doc.data().challengePeriod[0]+"/"+doc.data().challengePeriod[1]+"/"+doc.data().challengePeriod[2],
                    rate:doc.data().progress+"%",
                    success:doc.data().success,
                    challengeNumber:doc.data().number
                })

        })
        setItems(list)
        })
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ChallengeHeader navigation={navigation} Title={title} />
                <ScrollView>
                    <FlatList
                        data={items}
                        keyExtractor={item => item.challengeNumber}
                        renderItem={({ item }) => (
                            <View style={{
                                width: "90%",
                                borderWidth: 2,
                                borderColor: "#5cc27b",
                                alignSelf: "center",
                                borderRadius: 10,
                                marginTop: 16,
                                paddingTop: 16,
                                paddingLeft: 16,
                                paddingRight: 20,
                                paddingBottom: 16,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <View>
                                    <Text style={{
                                        fontFamily: "NunitoSans-Bold",
                                        fontSize: 16,
                                        color: "#303030",
                                        marginBottom: 16
                                    }} >{item.ChallengeStep}</Text>
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 8, height: 8, backgroundColor: '#303030', borderRadius: 4, marginRight: 8 }} />
                                            <Text style={history.text}>참가 : {item.participationDate}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                            <View style={{ width: 8, height: 8, backgroundColor: '#303030', borderRadius: 4, marginRight: 8 }} />
                                            <Text style={history.text}>{item.rate}</Text>
                                        </View>
                                    </View>
                                </View>
                                {item.success === 0 ?
                                    <View style={{ width: 80, height: 30, backgroundColor: '#5cc27b', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16, color: '#ffffff' }}>진행중</Text>
                                    </View>
                                    :(item.success===1?
                                        <>
                                        <View style={{ width: 80, height: 30, backgroundColor: '#ff0000', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16, color: '#ffffff' }}>실패</Text>
                                    </View>
                                        </>
                                        :
                                        <>
                                        <View style={{ width: 80, height: 30, backgroundColor: '#5cc27b', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16, color: '#ffffff' }}>성공</Text>
                                    </View>
                                        </>
                                        )
                                    
                                }
                            </View>
                        )}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const mission = StyleSheet.create({
    bold: {
        fontSize: 14,
        fontFamily: "NunitoSans-Bold",
        color: "#303030"
    },
    regular: {
        fontSize: 14,
        fontFamily: "NunitoSans-Regular",
        color: "#303030",
        lineHeight: 22,
        opacity: 0.6,
        marginLeft: WIDTH * 0.08,
        marginRight: WIDTH * 0.08
    },
    underline: {
        fontSize: 12,
        fontFamily: "NunitoSans-Regular",
        color: "#303030",
        opacity: 0.6,
        textDecorationLine: "underline"
    },
    box: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        elevation: Platform.OS === "android" ? 5 : 0,
        shadowColor: "#303030",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    }
})

const MissionBox = ({ color, name, data, navigation }) => {
    const [fold, setFold] = useState(true);
    function noAnswer(){
        Alert.alert("응답기록이 없습니다.")
    }
    return (
        <View style={[
            mission.box, {
                paddingTop: fold ? 32 : 8,
                paddingBottom: fold ? 32 : 8,
                marginBottom: fold ? 16 : 8
            }]}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginRight: WIDTH * 0.08,
                marginLeft: WIDTH * 0.04,
                marginBottom: fold ? 16 : 0
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <View style={{ width: 8, height: 8, backgroundColor: color, borderRadius: 4, marginRight: WIDTH * 0.02 }} />
                    <Text style={[mission.bold, { fontSize: 16 }]}>{name}</Text>
                </View>
                <TouchableOpacity onPress={() => setFold(!fold)}>
                    <Text style={mission.underline}>{fold ? "접기" : "펴기"}</Text>
                </TouchableOpacity>
            </View>
            {fold ?
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.number}
                    renderItem={({ item }) => (
                        (item.visible===false ? 
                            <TouchableOpacity onPress={() => navigation.navigate(item.navigation,{UID:item.uid})}>
                            <Text style={[mission.bold, { marginTop: 16, marginBottom: 16, marginLeft: WIDTH * 0.08, marginRight: WIDTH * 0.08 }]}>{item.title}</Text>
                            <Text style={mission.regular}>{item.content}</Text>
                        </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={noAnswer}>
                            <Text style={[mission.bold, { marginTop: 16, marginBottom: 16, marginLeft: WIDTH * 0.08, marginRight: WIDTH * 0.08 }]}>{item.title}</Text>
                            <Text style={mission.regular}>{item.content}</Text>
                        </TouchableOpacity>
                            )
                        
                    )}
                />
                :
                <View />
            }
        </View>
    )
}

export function ChallengeMission({ navigation,route }) {
    const {UID}=route.params
    const [monthItem,setMonthItem]=useState([])
    const [normalItem,setNormalItem]=useState([])
    const [finalItem,setFinalItem]=useState([])

    async function giveup(){
        Alert.alert(
            '이번 챌린지를 포기하시겠습니까?',
            '',
            [
                {
                    text: 'No', onPress: () => console.log('CANCEL Pressed')
                },
                {
                    text: 'Yes', onPress: ()=> realGiveUp()
                }
            ]
        )
    }
    async function realGiveUp(){
        var total
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size-1
        })
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge"+total).update({
            ongoing:false,
            success:1
        })
        navigation.navigate("Home")
    }
    async function getInfo(){
        var total
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size-1
        })
        const list=[]
        const list2=[]
        const list3=[]
        firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge"+total).collection("ChallengeDetail").orderBy("id","asc").get().then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
              
                list.push({
                    number:doc.data().id,
                    title:doc.data().id+". "+doc.data().title,
                    content:doc.data().content,
                    navigation:doc.data().resNavi,
                    uid:UID,
                    stats:doc.data().stats,
                    visible:doc.data().visible
                })
        
            })
           console.log(list)
            const arr1=list.slice(0,3)
            const arr2=list.slice(3,10)
            const arr3=list.slice(10)
            setMonthItem(arr1)
            setNormalItem(arr2)
            setFinalItem(arr3)
        })
      
    }
    useEffect(()=>{
        getInfo()

    },[])
    // const Month = [
    //     {
    //         number: 1,
    //         title: "1. 스트레스 평가",
    //         content: "스트레스와 금연의 밀접한 관계\n나의 스트레스를 체크하고 금연성공하세요.",
    //         navigation: "StressResult",
    //         uid:UID
    //     },
    //     {
    //         number: 2,
    //         title: "2. 자기 효능감 평가",
    //         content: "자기 효능감과 금연의 밀접한 관계\n나의 자기 효능감을 체크하고 금연성공하세요.",
    //         navigation: "SelfEsteemResult",
    //         uid:UID

    //     },
    //     {
    //         number: 3,
    //         title: "3. 알콜중독 평가",
    //         content: "알콜중독과 금연의 밀접한 관계\n나의 알콜중독을 체크하고 금연성공하세요.",
    //         navigation: "AlcoholResult",
    //         uid:UID
    //     },
    // ]
    // const Normal = [
    //     {
    //         number: 1,
    //         title: "1. 금연 동기 설정하기",
    //         content: "금연을 하는 이유가 무엇인가요? \n금연 동기는 앞으로 금연을 이어가는 가장 큰 힘이 될 수 있습니다.",
    //         navigation:"ChallengeMotivationResult",
    //         uid:UID
    //     },
    //     {
    //         number: 2,
    //         title: "2. 니코틴 중독 평가하기",
    //         content: "나는 니코틴에 얼마나 의존할까?",
    //         navigation:"",
    //         uid:UID
    //     },
    //     {
    //         number: 3,
    //         title: "3. 금연 서약서 쓰기",
    //         content: "금연을 서약서로 본인의 의지를 표현해 보세요.",
    //         navigation:"ChallengeSwearResult",
    //         uid:UID
    //     },
    //     {
    //         number: 4,
    //         title: "4. 금연 지지자 정하기",
    //         content: "앞으로 힘든 금연에 힘이될 사람들에게\n금연 응원을 요청해보세요",
    //         navigation:"ChallengeSupport",
    //         uid:UID
    //     },
    //     {
    //         number: 5,
    //         title: "5. 내 흡연유형 파악하기",
    //         content: "나는 언제 담배를 필까? MBTI대신 흡BTI!\n유형별 대처 전략을 알아봅시다.",
    //         navigation:"SolutionResult",
    //         uid:UID
            
    //     },
    //     {
    //         number: 6,
    //         title: "6. 금연활동 인증하기 (주 1회)",
    //         content: "금연방법은 다양합니다. 하지만 하나를 꾸준히 하면서 실천하는것이 어렵죠. 다양한 금연 방법을 알아보고 본인의 방법으로 인증을 실천해 보세요",
    //         navigation:"ChallengeVeriResult",
    //         uid:UID
    //     },
    //     {
    //         number: 7,
    //         title: "7. 금단증상 확인하기",
    //         content: "금연을 하면서 피할 수 없는 금단증상!\n나의 금단 증상을 파악하고 해결책을 찾아보세요.",
    //         navigation:"ChallengeGDResult",
    //         uid:UID
    //     },
    // ]
    // const Final = [
    //     {
    //         number: 1,
    //         title: "1. 나만의 금연 노하우 공유하기",
    //         content: "스트레스와 금연의 밀접한 관계\n나의 스트레스를 체크하고 금연성공하세요.",
    //         navigation:"",
    //         uid:UID
    //     },
    //     {
    //         number: 2,
    //         title: "2. 성공 후기 작성하기",
    //         content: "금연 성공한 후 느낀점, 다른사람에게 하고싶은말, 지지자에게 고마움을 표현해 보세요",
    //         navigation:"",
    //         uid:UID
    //     },
    // ]
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
           
        <View accessibilityRole="header" style={{ justifyContent:"space-between",flexDirection: 'row', alignItems: "center", height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%", backgroundColor: '#ffffff' }}>
            
            <View
                style={{
                    height: 44,
                    flexDirection: 'row',
                    justifyContent: "flex-start",
                    alignItems: 'center',
                    
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={25} />
            </TouchableOpacity>
                <Text style={{ fontSize: 18, marginLeft:20 }}>
                    <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>전체미션</Text>
                </Text>
            </View>
            <View>
                <TouchableOpacity onPress={giveup}>
                <Text style={{fontSize: 12,
        fontFamily: "NunitoSans-Regular",
        color: "#303030",
        opacity: 0.6,
        textDecorationLine: "underline",
        marginRight:10}}>
                    포기하기
                </Text>
                </TouchableOpacity>
            </View>
            
        </View>

                <ScrollView>
                    <View style={{ paddingLeft: "6%", paddingRight: "6%", alignItems: "center" }}>
                        <Text style={[mission.bold, { marginTop: 16, marginBottom: 32 }]}>미션을 클릭하면 응답내역을 볼 수 있습니다.</Text>
                        <MissionBox color="#fb5757" name="월간 미션 (월 1회)" data={monthItem} navigation={navigation} />
                        <MissionBox color="#ffb83d" name="일반미션" data={normalItem} navigation={navigation} />
                        <MissionBox color="#5cc27b" name="파이널미션" data={finalItem} navigation={navigation} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export function ChallengeSupport({ navigation }) {
    const title = "금연지지자 정하기";
    const [name, setName] = useState("");
    const [help, setHelp] = useState("");
    const [user,setUser]=useState("");
    const [nick,setNick]=useState("")
    const [day,setDay]=useState([])
    const [link,setLink]=useState(false);

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
            
        })
    })
    var total
    async function uploadData(){
        await firestore().collection("UserInfo").doc(user.uid).get().then(doc=>{
            setNick(doc.data().name)
        })
        var a = moment().toArray()
        
        console.log(a)

        if (a[1] === 12) {
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }
        setDay(a)
        if(link){
            console.log(user.uid)
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size - 1
        })
        console.log(total)
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연 지지자 정하기").update({
            supporter:name,
            content:help,
            day:day,
            stats:true
        })
        navigation.navigate("Home")}
        else{
            Alert.alert("링크를 공유해보세요")
        }
    }
    async function kakao(){
        const LinkObject={
            webURL:"https://developers.kakao.com"
        }
        const contentObject={
            title: "나의 금연 지지자가 되어줘!", //required
            link: LinkObject, //required
            desc : nick+"님이"+name+"님께 보낸 메세지입니다\n"+help,
            imageURL: 'https://drive.google.com/file/d/1C3XJ2i_zOLA_vpfgfePdoSgvTNNpa-ML/view?usp=sharing',
        }
        
        try {
            const options = {
                objectType: "feed", //required
                content: contentObject, //required
            };
            const response = await RNKakaoLink.link(options);
            console.log(response);
          } catch (e) {
            console.warn(e);
          }
setLink(true)
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ChallengeHeader navigation={navigation} Title={title} />
                <ScrollView>
                    <View style={{
                        paddingLeft: "8%",
                        paddingRight: "8%"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginTop: 32,
                        }}>
                            금연지지자를 정해보세요.
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginTop: 8,
                        }}>
                            금연 할 때 나를 지지해주는 사람이 있다는 것은
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginTop: 8,
                        }}>
                            정신적으로 많은 도움을 줍니다.
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginTop: 8,
                        }}>
                            금연은 혼자만의 싸움이 아닙니다!
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Regular",
                            color: "#303030",
                            marginTop: 16,
                        }}>
                            나의 지지자는 누구지?
                        </Text>
                        <KeyboardAvoidingView>
                            <TextInput
                                value={name}
                                onChangeText={text => setName(text)}
                                style={{
                                    paddingBottom: 8,
                                    marginTop: 20,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#5cc27b",
                                    width: 150,
                                    fontSize: 16,
                                    color: "#303030",
                                    fontFamily: "NunitoSans-Regular"
                                }}
                                placeholder="이름"
                            />
                        </KeyboardAvoidingView>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Regular",
                            color: "#303030",
                            marginTop: 48,
                        }}>
                            나에게 어떤 도움을 줬으면 좋겠나요?
                        </Text>
                        <KeyboardAvoidingView>
                            <TextInput
                                value={help}
                                onChangeText={text => setHelp(text)}
                                style={{
                                    paddingBottom: 8,
                                    marginTop: 20,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#5cc27b",
                                    width: 300,
                                    fontSize: 16,
                                    color: "#303030",
                                    fontFamily: "NunitoSans-Regular"
                                }}
                                placeholder="예시: 담배생각이 날때 말려줘!"
                            />
                        </KeyboardAvoidingView>
                        <Text style={{
                            fontSize: 18,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginTop: 50,
                            alignSelf: "center"
                        }}>
                            공유하기
                        </Text>
                        
                        <TouchableOpacity onPress={kakao}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 18 }}>
                           
                            <Image source={require('../icon/kakao.png')} resizeMode="contain" style={{ width: 60, height: 60 }} />
                        </View>
                        </TouchableOpacity>
                        
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                {name.length > 0 && help.length > 0 ?
                    <TouchableOpacity onPress={uploadData}>
                        <View style={{
                            width: "100%",
                            height: 60,
                            backgroundColor: '#5cc27b',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>완료</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <View style={{
                            width: "100%",
                            height: 60,
                            backgroundColor: "#c6c6c6",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>완료</Text>
                        </View>
                    </TouchableOpacity>
                }
            </SafeAreaView>
        </>
    )
}

export function ChallengeSwear({ navigation }) {
    const [user,setUser]=useState("");
    const [nick,setNick]=useState("")
    const [day,setDay]=useState([])
    const [comment1,setComment1]=useState("")
    const [comment2,setComment2]=useState("")
    const [comment3,setComment3]=useState("")

    useEffect(() => {

        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        console.log(comment1,comment2,comment3)
    })
    var total
    async function uploadData(){
        
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size - 1
        })
        console.log(total)
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연 서약서 쓰기").update({
            commentTotal:comment1+comment2+comment3,
            comment1:comment1,
            comment2:comment2,
            comment3:comment3,
            day:day,
            stats:true
        })
        navigation.navigate("Home")
    }
    
    useEffect(()=>{
        firestore().collection("UserInfo").doc(user.uid).get().then(doc=>{
            setNick(doc.data().name)
        })
        var a = moment().toArray()
        
        console.log(a)

        if (a[1] === 12) {
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }
        setDay(a)
    },[user])
    const title = "금연 서약하기"
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ChallengeHeader navigation={navigation} Title={title} />
                <ScrollView>
                    <View style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                        <Text style={{
                            fontSize: 31,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginTop: 32,
                            alignSelf: "center"
                        }}>
                            금연서약서
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            marginTop: 32,
                        }}>
                            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#303030", marginRight: 8, marginTop: 4 }} />
                            <Text style={{ fontSize: 14, color: "#303030", width: "80%", fontFamily: "NunitoSans-Regular" }}>
                    나<Text style={{ fontFamily: "NunitoSans-Bold" }}> {nick}</Text> 오늘부터 다음과 같은 이유로 금연할 것을 약속합니다.
                            </Text>
                        </View>
                        <KeyboardAvoidingView>
                            <TextInput
                                placeholder="텍스트 입력"
                                placeholderTextColor="#ffffff"
                                multiline={true}
                                value={comment1}
                                onChangeText={text => setComment1(text)}
                                style={{
                                    width: "100%",
                                    height: 64,
                                    borderRadius: 10,
                                    backgroundColor: "#e9e9e9",
                                    marginTop: 16,
                                    padding: 8,
                                    fontSize: 12,
                                    color: "#303030",
                                    fontFamily: "NunitoSans-Regular"
                                }}
                            />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <TextInput
                                placeholder="텍스트 입력"
                                placeholderTextColor="#ffffff"
                                multiline={true}
                                value={comment2}
                            onChangeText={text => setComment2(text)}
                                style={{
                                    width: "100%",
                                    height: 64,
                                    borderRadius: 10,
                                    backgroundColor: "#e9e9e9",
                                    marginTop: 24,
                                    padding: 8,
                                    fontSize: 12,
                                    color: "#303030",
                                    fontFamily: "NunitoSans-Regular"
                                }}
                            />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <TextInput
                                placeholder="텍스트 입력"
                                placeholderTextColor="#ffffff"
                                multiline={true}
                                value={comment3}
                            onChangeText={text => setComment3(text)}
                                style={{
                                    width: "100%",
                                    height: 64,
                                    borderRadius: 10,
                                    backgroundColor: "#e9e9e9",
                                    marginTop: 24,
                                    padding: 8,
                                    fontSize: 12,
                                    color: "#303030",
                                    fontFamily: "NunitoSans-Regular"
                                }}
                            />
                        </KeyboardAvoidingView>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 16,
                        }}>
                            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#303030", marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: "#303030", width: "80%", fontFamily: "NunitoSans-Regular" }}>
                                작성일자: {day[0]}.{day[1]}.{day[2]}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginTop: 16,
                        }}>
                            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#303030", marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: "#303030", width: "80%", fontFamily: "NunitoSans-Regular" }}>
                                작성자:<Text style={{ fontFamily: "NunitoSans-Bold" }}>{nick}</Text>
                            </Text>
                        </View>
                        {/* <View style={{
                            flexDirection: "row",
                            marginTop: 16,
                        }}>
                            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#303030", marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: "#303030", width: "80%", fontFamily: "NunitoSans-Regular" }}>
                                지지자:<Text style={{ fontFamily: "NunitoSans-Bold" }}> 김진성</Text>
                            </Text>
                        </View> */}
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                {comment1.length > 0 && comment2.length > 0 &&comment3.length ?
                    <TouchableOpacity onPress={uploadData}>
                        <View style={{
                            width: "100%",
                            height: 60,
                            backgroundColor: '#5cc27b',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>완료</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <View style={{
                            width: "100%",
                            height: 60,
                            backgroundColor: "#c6c6c6",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>완료</Text>
                        </View>
                    </TouchableOpacity>
                }
            </SafeAreaView>
        </>
    )
}
export function ChallengeSwearResult({ navigation }) {
    const [user,setUser]=useState("");
    const [nick,setNick]=useState("")
    const [day,setDay]=useState([])
    const [comment1,setComment1]=useState("")
    const [comment2,setComment2]=useState("")
    const [comment3,setComment3]=useState("")

    useEffect(() => {

        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        console.log(comment1,comment2,comment3)
    })
    var total
    async function getData(){
        
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size - 1
        })
        console.log(total)
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연 서약서 쓰기").get().then(doc=>{
        setComment1(doc.data().comment1)
        setComment2(doc.data().comment2)
        setComment3(doc.data().comment3)
        setDay(doc.data().day)
        })
    }
    
    useEffect(()=>{
        firestore().collection("UserInfo").doc(user.uid).get().then(doc=>{
            setNick(doc.data().name)
        })
        var a = moment().toArray()
        
        console.log(a)

        if (a[1] === 12) {
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }
        setDay(a)
        if(user){
            getData()
        }
    },[user])
    const title = "금연 서약하기"
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ChallengeHeader navigation={navigation} Title={title} />
                <ScrollView>
                    <View style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                        <Text style={{
                            fontSize: 31,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginTop: 32,
                            alignSelf: "center"
                        }}>
                            금연서약서
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            marginTop: 32,
                        }}>
                            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#303030", marginRight: 8, marginTop: 4 }} />
                            <Text style={{ fontSize: 14, color: "#303030", width: "80%", fontFamily: "NunitoSans-Regular" }}>
                    나<Text style={{ fontFamily: "NunitoSans-Bold" }}> {nick}</Text> 오늘부터 다음과 같은 이유로 금연할 것을 약속합니다.
                            </Text>
                        </View>
                        <KeyboardAvoidingView>
                            <TextInput
                                placeholder="텍스트 입력"
                                placeholderTextColor="#ffffff"
                                multiline={true}
                                value={comment1}
                                onChangeText={text => setComment1(text)}
                                style={{
                                    width: "100%",
                                    height: 64,
                                    borderRadius: 10,
                                    backgroundColor: "#e9e9e9",
                                    marginTop: 16,
                                    padding: 8,
                                    fontSize: 12,
                                    color: "#303030",
                                    fontFamily: "NunitoSans-Regular"
                                }}
                            />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <TextInput
                                placeholder="텍스트 입력"
                                placeholderTextColor="#ffffff"
                                multiline={true}
                                value={comment2}
                            onChangeText={text => setComment2(text)}
                                style={{
                                    width: "100%",
                                    height: 64,
                                    borderRadius: 10,
                                    backgroundColor: "#e9e9e9",
                                    marginTop: 24,
                                    padding: 8,
                                    fontSize: 12,
                                    color: "#303030",
                                    fontFamily: "NunitoSans-Regular"
                                }}
                            />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <TextInput
                                placeholder="텍스트 입력"
                                placeholderTextColor="#ffffff"
                                multiline={true}
                                value={comment3}
                            onChangeText={text => setComment3(text)}
                                style={{
                                    width: "100%",
                                    height: 64,
                                    borderRadius: 10,
                                    backgroundColor: "#e9e9e9",
                                    marginTop: 24,
                                    padding: 8,
                                    fontSize: 12,
                                    color: "#303030",
                                    fontFamily: "NunitoSans-Regular"
                                }}
                            />
                        </KeyboardAvoidingView>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 16,
                        }}>
                            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#303030", marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: "#303030", width: "80%", fontFamily: "NunitoSans-Regular" }}>
                                작성일자: {day[0]}.{day[1]}.{day[2]}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginTop: 16,
                        }}>
                            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#303030", marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: "#303030", width: "80%", fontFamily: "NunitoSans-Regular" }}>
                                작성자:<Text style={{ fontFamily: "NunitoSans-Bold" }}>{nick}</Text>
                            </Text>
                        </View>
                        {/* <View style={{
                            flexDirection: "row",
                            marginTop: 16,
                        }}>
                            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#303030", marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: "#303030", width: "80%", fontFamily: "NunitoSans-Regular" }}>
                                지지자:<Text style={{ fontFamily: "NunitoSans-Bold" }}> 김진성</Text>
                            </Text>
                        </View> */}
                    </View>
                </ScrollView>
            </SafeAreaView>
           
        </>
    )
}

//금연동기와 금단증상 버튼
const MotiveButton = ({ width, include, content, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            width: width,
            height: 38,
            borderRadius: 28,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginRight: 8,
            borderWidth: include ? 0 : 1,
            borderColor: content === "없음" ? "#fb5757" : "#5cc27b",
            backgroundColor: include ? content === "없음" ? "#fb5757" : "#5cc27b" : "#ffffff"
        }}>
            <Text style={{
                fontFamily: "NunitoSans-Bold",
                color: include ? "#ffffff" : "#303030",
                fontSize: 16
            }}>{content}</Text>
        </TouchableOpacity>
    )
}

export function ChallengeMotivation({ navigation }) {
    const [Motivation, setMotivation] = useState([]);
    const countMotive = useRef(0);
    const [input, setInput] = useState("");
    const [health, setHealth] = useState(false);
    const [user,setUser]=useState("");
    const onHealth = () => {
        if (health) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "건강을 위해서"
            }))
            countMotive.current -= 1;
            setHealth(false);
        } else {
            setMotivation(Motivation.concat("건강을 위해서"))
            countMotive.current += 1;
            setHealth(true);
        }
    }
    const [confidence, setConfidence] = useState(false);
    const onConfidence = () => {
        if (confidence) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "자신감 확보"
            }))
            countMotive.current -= 1;
            setConfidence(false);
        } else {
            setMotivation(Motivation.concat("자신감 확보"))
            countMotive.current += 1;
            setConfidence(true);
        }
    }
    const [money, setMoney] = useState(false);
    const onMoney = () => {
        if (money) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "담배값 절약"
            }))
            countMotive.current -= 1;
            setMoney(false);
        } else {
            setMotivation(Motivation.concat("담배값 절약"))
            countMotive.current += 1;
            setMoney(true);
        }
    }
    const [social, setSocial] = useState(false);
    const onSocial = () => {
        if (social) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "사회적 시선"
            }))
            countMotive.current -= 1;
            setSocial(false);
        } else {
            setMotivation(Motivation.concat("사회적 시선"))
            countMotive.current += 1;
            setSocial(true);
        }
    }
    const [hate, setHate] = useState(false);
    const onHate = () => {
        if (hate) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "담배냄새가 싫어서"
            }))
            countMotive.current -= 1;
            setHate(false);
        } else {
            setMotivation(Motivation.concat("담배냄새가 싫어서"))
            countMotive.current += 1;
            setHate(true);
        }
    }
    const [around, setAround] = useState(false);
    const onAround = () => {
        if (around) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "주변의 시선"
            }))
            countMotive.current -= 1;
            setAround(false);
        } else {
            setMotivation(Motivation.concat("주변의 시선"))
            countMotive.current += 1;
            setAround(true);
        }
    }
    const [advice, setAdvice] = useState(false);
    const onAdvice = () => {
        if (advice) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "주변의 권유"
            }))
            countMotive.current -= 1;
            setAdvice(false);
        } else {
            setMotivation(Motivation.concat("주변의 권유"))
            countMotive.current += 1;
            setAdvice(true);
        }
    }
    useEffect(() => {
        console.log(Motivation);
        console.log(countMotive);
        if (countMotive.current > 3) {
            if (Motivation[0] === "건강을 위해서") setHealth(false);
            if (Motivation[0] === "자신감 확보") setConfidence(false);
            if (Motivation[0] === "담배값 절약") setMoney(false);
            if (Motivation[0] === "사회적 시선") setSocial(false);
            if (Motivation[0] === "담배냄새가 싫어서") setHate(false);
            if (Motivation[0] === "주변의 시선") setAround(false);
            if (Motivation[0] === "주변의 권유") setAdvice(false);
            setMotivation(Motivation.splice(1, Motivation.length - 1));
            countMotive.current -= 1;
        }
    }, [Motivation, countMotive])
    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })

    })
    var total
    async function uploadInfo() {
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size - 1
        })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연 동기 설정하기").update({
            motivation:Motivation,
            stats:true
        })
        navigation.navigate("Home")
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ChallengeHeader navigation={navigation} Title="금연동기 설정하기" />
                <ScrollView style={{ padding: 32 }}>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: "NunitoSans-Bold",
                        color: "#303030",
                        marginBottom: HEIGHT * 0.05
                    }}>금연을 결심한 이유가 무엇인가요?(최대 3개)</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                        <MotiveButton onPress={onHealth} width={120} include={health} content="건강을 위해서" />
                        <MotiveButton onPress={onConfidence} width={106} include={confidence} content="자신감 확보" />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                        <MotiveButton onPress={onMoney} width={106} include={money} content="담배값 절약" />
                        <MotiveButton onPress={onSocial} width={106} include={social} content="사회적 시선" />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                        <MotiveButton onPress={onHate} width={148} include={hate} content="담배냄새가 싫어서" />
                        <MotiveButton onPress={onAround} width={106} include={around} content="주변의 시선" />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                        <MotiveButton onPress={onAdvice} width={106} include={advice} content="주변의 권유" />
                        <TextInput value={input} onChangeText={(text) => setInput(text)}
                            onSubmitEditing={() => setMotivation(Motivation.concat(input))}
                            placeholder="기타" style={{
                                width: 158,
                                borderBottomWidth: 2,
                                borderBottomColor: "#5cc27b",
                                paddingBottom: 8,
                                fontSize: 16,
                                fontFamily: "NunitoSans-Bold",
                                color: "#303030",
                            }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                {
                    countMotive.current > 0 ?
                        <TouchableOpacity onPress={uploadInfo}>
                            <View style={{
                                width: "100%",
                                height: 60,
                                backgroundColor: '#5cc27b',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>완료</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        input.length > 0 ?
                            <TouchableOpacity onPress={uploadInfo}>
                                <View style={{
                                    width: "100%",
                                    height: 60,
                                    backgroundColor: '#5cc27b',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>완료</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity>
                                <View style={{
                                    width: "100%",
                                    height: 60,
                                    backgroundColor: '#c6c6c6',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>완료</Text>
                                </View>
                            </TouchableOpacity>
                }
            </SafeAreaView>
        </>
    )
}

export function ChallengeMotivationResult({ navigation,route }) {
    const {UID}=route.params
    const [Motivation, setMotivation] = useState([]);
    const countMotive = useRef(0);
    const [input, setInput] = useState("");
    const [health, setHealth] = useState(false);
    const [user,setUser]=useState("");
    const [motive1,setMotive1]=useState("")
    const [motive2,setMotive2]=useState("")
    const [motive3,setMotive3]=useState("")

    const onHealth = () => {
        if (health) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "건강을 위해서"
            }))
            countMotive.current -= 1;
            setHealth(false);
        } else {
            setMotivation(Motivation.concat("건강을 위해서"))
            countMotive.current += 1;
            setHealth(true);
        }
    }
    const [confidence, setConfidence] = useState(false);
    const onConfidence = () => {
        if (confidence) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "자신감 확보"
            }))
            countMotive.current -= 1;
            setConfidence(false);
        } else {
            setMotivation(Motivation.concat("자신감 확보"))
            countMotive.current += 1;
            setConfidence(true);
        }
    }
    const [money, setMoney] = useState(false);
    const onMoney = () => {
        if (money) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "담배값 절약"
            }))
            countMotive.current -= 1;
            setMoney(false);
        } else {
            setMotivation(Motivation.concat("담배값 절약"))
            countMotive.current += 1;
            setMoney(true);
        }
    }
    const [social, setSocial] = useState(false);
    const onSocial = () => {
        if (social) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "사회적 시선"
            }))
            countMotive.current -= 1;
            setSocial(false);
        } else {
            setMotivation(Motivation.concat("사회적 시선"))
            countMotive.current += 1;
            setSocial(true);
        }
    }
    const [hate, setHate] = useState(false);
    const onHate = () => {
        if (hate) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "담배냄새가 싫어서"
            }))
            countMotive.current -= 1;
            setHate(false);
        } else {
            setMotivation(Motivation.concat("담배냄새가 싫어서"))
            countMotive.current += 1;
            setHate(true);
        }
    }
    const [around, setAround] = useState(false);
    const onAround = () => {
        if (around) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "주변의 시선"
            }))
            countMotive.current -= 1;
            setAround(false);
        } else {
            setMotivation(Motivation.concat("주변의 시선"))
            countMotive.current += 1;
            setAround(true);
        }
    }
    const [advice, setAdvice] = useState(false);
    const onAdvice = () => {
        if (advice) {
            setMotivation(Motivation.filter(doc => {
                return doc !== "주변의 권유"
            }))
            countMotive.current -= 1;
            setAdvice(false);
        } else {
            setMotivation(Motivation.concat("주변의 권유"))
            countMotive.current += 1;
            setAdvice(true);
        }
    }
    useEffect(() => {
        console.log(Motivation);
        console.log(countMotive);
        if (countMotive.current > 3) {
            if (Motivation[0] === "건강을 위해서") setHealth(false);
            if (Motivation[0] === "자신감 확보") setConfidence(false);
            if (Motivation[0] === "담배값 절약") setMoney(false);
            if (Motivation[0] === "사회적 시선") setSocial(false);
            if (Motivation[0] === "담배냄새가 싫어서") setHate(false);
            if (Motivation[0] === "주변의 시선") setAround(false);
            if (Motivation[0] === "주변의 권유") setAdvice(false);
            setMotivation(Motivation.splice(1, Motivation.length - 1));
            countMotive.current -= 1;
        }
    }, [Motivation, countMotive])
    useEffect(() => {
        getInfo()
        console.log(motive1,motive2,motive3,Motivation,"her")
        if(Motivation){
            var i
        for(i=0;i<3;i++){
            if(Motivation[i]==="건강을 위해서"){
                setHealth(true)
            }else if (Motivation[i] === "자신감 확보") {
                setConfidence(true);
            }else if (Motivation[i] === "담배값 절약") {
                setMoney(true);
            }else if (Motivation[i] === "사회적 시선") {
                setSocial(true);
            }else if (Motivation[i] === "담배냄새가 싫어서") {
                setHate(true);
            }else if (Motivation[i] === "주변의 시선") {
                setAround(true);
            }else if (Motivation[i] === "주변의 권유") {
                setAdvice(true);
            }
        } }
    },[user,Motivation])
    var total
    async function getInfo() {
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size - 1
        })
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금연 동기 설정하기").get().then(doc=>{
            setMotivation(doc.data().motivation)
        })
        
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ChallengeHeader navigation={navigation} Title="금연동기 설정하기" />
                <ScrollView style={{ padding: 32 }}>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: "NunitoSans-Bold",
                        color: "#303030",
                        marginBottom: HEIGHT * 0.05
                    }}>금연을 결심한 이유가 무엇인가요?(최대 3개)</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                        <MotiveButton onPress={onHealth} width={120} include={health} content="건강을 위해서" />
                        <MotiveButton onPress={onConfidence} width={106} include={confidence} content="자신감 확보" />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                        <MotiveButton onPress={onMoney} width={106} include={money} content="담배값 절약" />
                        <MotiveButton onPress={onSocial} width={106} include={social} content="사회적 시선" />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                        <MotiveButton onPress={onHate} width={148} include={hate} content="담배냄새가 싫어서" />
                        <MotiveButton onPress={onAround} width={106} include={around} content="주변의 시선" />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                        <MotiveButton onPress={onAdvice} width={106} include={advice} content="주변의 권유" />
                        <TextInput value={input} onChangeText={(text) => setInput(text)}
                            onSubmitEditing={() => setMotivation(Motivation.concat(input))}
                            placeholder="기타" style={{
                                width: 158,
                                borderBottomWidth: 2,
                                borderBottomColor: "#5cc27b",
                                paddingBottom: 8,
                                fontSize: 16,
                                fontFamily: "NunitoSans-Bold",
                                color: "#303030",
                            }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
            
        </>
    )
}

export function ChallengeGD({ navigation }) {
    const [GD, setGD] = useState([]);
    const countGD = useRef(0);
    const [input, setInput] = useState("");
    const [zero, setZero] = useState(false);
    const [user, setUser] = useState("");
    const onZero = () => {
        if (!zero) {
            setZero(true);
            countGD.current = 0;
            setGD([]);
        } else {
            setZero(false);
            setGD([]);
            countGD.current = 0;
        }
    }
    const [one, setOne] = useState(false);
    const onOne = () => {
        if (one) {
            setGD(GD.filter(doc => {
                return doc !== "신경과민"
            }))
            countGD.current -= 1;
            setOne(false);
        } else {
            setGD(GD.concat("신경과민"))
            countGD.current += 1;
            setOne(true);
        }
    }
    const [two, setTwo] = useState(false);
    const onTwo = () => {
        if (two) {
            setGD(GD.filter(doc => {
                return doc !== "소화장애"
            }))
            countGD.current -= 1;
            setTwo(false);
        } else {
            setGD(GD.concat("소화장애"))
            countGD.current += 1;
            setTwo(true);
        }
    }
    const [three, setThree] = useState(false);
    const onThree = () => {
        if (three) {
            setGD(GD.filter(doc => {
                return doc !== "두통"
            }))
            countGD.current -= 1;
            setThree(false);
        } else {
            setGD(GD.concat("두통"))
            countGD.current += 1;
            setThree(true);
        }
    }
    const [four, setFour] = useState(false);
    const onFour = () => {
        if (four) {
            setGD(GD.filter(doc => {
                return doc !== "불면"
            }))
            countGD.current -= 1;
            setFour(false);
        } else {
            setGD(GD.concat("불면"))
            countGD.current += 1;
            setFour(true);
        }
    }
    const [five, setFive] = useState(false);
    const onFive = () => {
        if (five) {
            setGD(GD.filter(doc => {
                return doc !== "현기증"
            }))
            countGD.current -= 1;
            setFive(false);
        } else {
            setGD(GD.concat("현기증"))
            countGD.current += 1;
            setFive(true);
        }
    }
    const [six, setSix] = useState(false);
    const onSix = () => {
        if (six) {
            setGD(GD.filter(doc => {
                return doc !== "우울감"
            }))
            countGD.current -= 1;
            setSix(false);
        } else {
            setGD(GD.concat("우울감"))
            countGD.current += 1;
            setSix(true);
        }
    }
    const [seven, setSeven] = useState(false);
    const onSeven = () => {
        if (seven) {
            setGD(GD.filter(doc => {
                return doc !== "피로감"
            }))
            countGD.current -= 1;
            setSeven(false);
        } else {
            setGD(GD.concat("피로감"))
            countGD.current += 1;
            setSeven(true);
        }
    }
    const [eight, setEight] = useState(false);
    const onEight = () => {
        if (eight) {
            setGD(GD.filter(doc => {
                return doc !== "기침"
            }))
            countGD.current -= 1;
            setEight(false);
        } else {
            setGD(GD.concat("기침"))
            countGD.current += 1;
            setEight(true);
        }
    }
    const [nine, setNine] = useState(false);
    const onNine = () => {
        if (nine) {
            setGD(GD.filter(doc => {
                return doc !== "불안감"
            }))
            countGD.current -= 1;
            setNine(false);
        } else {
            setGD(GD.concat("불안감"))
            countGD.current += 1;
            setNine(true);
        }
    }
    const [ten, setTen] = useState(false);
    const onTen = () => {
        if (ten) {
            setGD(GD.filter(doc => {
                return doc !== "집중력 감소"
            }))
            countGD.current -= 1;
            setTen(false);
        } else {
            setGD(GD.concat("집중력 감소"))
            countGD.current += 1;
            setTen(true);
        }
    }
    const [eleven, setEleven] = useState(false);
    const onEleven = () => {
        if (eleven) {
            setGD(GD.filter(doc => {
                return doc !== "배고픔"
            }))
            countGD.current -= 1;
            setEleven(false);
        } else {
            setGD(GD.concat("배고픔"))
            countGD.current += 1;
            setEleven(true);
        }
    }
    const [twelve, setTwelve] = useState(false);
    const onTwelve = () => {
        if (twelve) {
            setGD(GD.filter(doc => {
                return doc !== "입안의 통증"
            }))
            countGD.current -= 1;
            setTwelve(false);
        } else {
            setGD(GD.concat("입안의 통증"))
            countGD.current += 1;
            setTwelve(true);
        }
    }
    const [thirteen, setThirteen] = useState(false);
    const onThirteen = () => {
        if (thirteen) {
            setGD(GD.filter(doc => {
                return doc !== "쑤시는 느낌"
            }))
            countGD.current -= 1;
            setThirteen(false);
        } else {
            setGD(GD.concat("쑤시는 느낌"))
            countGD.current += 1;
            setThirteen(true);
        }
    }
    const [fourteen, setFourteen] = useState(false);
    const onFourteen = () => {
        if (fourteen) {
            setGD(GD.filter(doc => {
                return doc !== "갈증"
            }))
            countGD.current -= 1;
            setFourteen(false);
        } else {
            setGD(GD.concat("갈증"))
            countGD.current += 1;
            setFourteen(true);
        }
    }

    useEffect(() => {
        console.log(GD);
        console.log(countGD);
        if (zero) {
            setOne(false);
            setTwo(false);
            setThree(false);
            setFour(false);
            setFive(false);
            setSix(false);
            setSeven(false);
            setEight(false);
            setNine(false);
            setTen(false);
            setEleven(false);
            setTwelve(false);
            setThirteen(false);
            setFourteen(false);
        }
        else if (countGD.current > 3 && zero === false) {
            if (GD[0] === "신경과민") setOne(false);
            if (GD[0] === "소화장애") setTwo(false);
            if (GD[0] === "두통") setThree(false);
            if (GD[0] === "불면") setFour(false);
            if (GD[0] === "현기증") setFive(false);
            if (GD[0] === "우울감") setSix(false);
            if (GD[0] === "피로감") setSeven(false);
            if (GD[0] === "기침") setEight(false);
            if (GD[0] === "불안감") setNine(false);
            if (GD[0] === "집중력 감소") setTen(false);
            if (GD[0] === "배고픔") setEleven(false);
            if (GD[0] === "입안의 통증") setTwelve(false);
            if (GD[0] === "쑤시는 느낌") setThirteen(false);
            if (GD[0] === "갈증") setFourteen(false);
            setGD(GD.splice(1, GD.length - 1));
            countGD.current -= 1;
        }
    }, [zero, GD, countGD])
    var total
    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })

    })
    async function uploadInfo() {
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size - 1
        })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금단증상 확인하기").update({
            detail: GD
        })
        navigation.navigate("ChallengeGDResult")
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ChallengeHeader navigation={navigation} Title="나의 금단증상은?" />
                <ScrollView>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: "NunitoSans-Bold",
                        lineHeight: 26,
                        color: "#303030",
                        marginLeft: "8%",
                        marginTop: HEIGHT * 0.05
                    }}>어떤 금단증상을 겪고 있나요? (최대 3개)</Text>
                    <View style={{ paddingLeft: "5%", paddingRight: "5%", marginTop: HEIGHT * 0.08 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                            <MotiveButton width={88} content="신경과민" include={one} onPress={onOne} />
                            <MotiveButton width={88} content="소화장애" include={two} onPress={onTwo} />
                            <MotiveButton width={60} content="두통" include={three} onPress={onThree} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                            <MotiveButton width={60} content="불면" include={four} onPress={onFour} />
                            <MotiveButton width={74} content="현기증" include={five} onPress={onFive} />
                            <MotiveButton width={74} content="우울감" include={six} onPress={onSix} />
                            <MotiveButton width={74} content="피로감" include={seven} onPress={onSeven} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                            <MotiveButton width={60} content="기침" include={eight} onPress={onEight} />
                            <MotiveButton width={74} content="불안감" include={nine} onPress={onNine} />
                            <MotiveButton width={106} content="집중력 감소" include={ten} onPress={onTen} />
                            <MotiveButton width={74} content="배고픔" include={eleven} onPress={onEleven} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                            <MotiveButton width={106} content="입안의 통증" include={twelve} onPress={onTwelve} />
                            <MotiveButton width={106} content="쑤시는 느낌" include={thirteen} onPress={onThirteen} />
                            <MotiveButton width={60} content="갈증" include={fourteen} onPress={onFourteen} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                            <MotiveButton width={60} content="없음" include={zero} onPress={onZero} />
                            <TextInput value={input} onChangeText={(text) => setInput(text)}
                                onSubmitEditing={() => setGD(GD.concat(input))}
                                placeholder="기타" style={{
                                    width: 156,
                                    borderBottomWidth: 2,
                                    borderBottomColor: "#5cc27b",
                                    paddingBottom: 8,
                                    marginLeft: 12,
                                    fontSize: 16,
                                    fontFamily: "NunitoSans-Bold",
                                    color: "#303030",
                                }} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                {zero ?
                    <TouchableOpacity onPress={() => {
                        setGD([]);
                        uploadInfo
                    }}>
                        <View style={{
                            width: "100%",
                            height: 60,
                            backgroundColor: '#5cc27b',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>다음</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <>
                        {
                            countGD.current > 0 ?
                                <TouchableOpacity onPress={uploadInfo}>
                                    <View style={{
                                        width: "100%",
                                        height: 60,
                                        backgroundColor: '#5cc27b',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>다음</Text>
                                    </View>
                                </TouchableOpacity>
                                :
                                input.length > 0 ?
                                    <TouchableOpacity onPress={uploadInfo}>
                                        <View style={{
                                            width: "100%",
                                            height: 60,
                                            backgroundColor: '#5cc27b',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>다음</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity>
                                        <View style={{
                                            width: "100%",
                                            height: 60,
                                            backgroundColor: '#c6c6c6',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>다음</Text>
                                        </View>
                                    </TouchableOpacity>
                        }
                    </>
                }
            </SafeAreaView>
        </>
    )
}

export function ChallengeGDResult({ navigation }) {
    const [user, setUser] = useState("")
    const [detail, setDetail] = useState([])
    var total
    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        if (user) {
            getInfo()
        }
    }, [user])
    
    async function getInfo() {
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size - 1
        })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금단증상 확인하기").get().then(doc => {
            setDetail(doc.data().detail)
        })
        console.log(detail.length, "hh")
       
    }
    async function uploadInfo(){
        var total = 0
        var a = moment().toArray()
        console.log(a)

        if (a[1] === 12) {
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size - 1
        })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("금단증상 확인하기").update( {
            stats:true,
            date:a
        })
        navigation.navigate("Home")
    }
    const data=[
        {
            id:1,
            symptom:"갈증",
            content:"얼음물 또는 주스를 한 모금씩 마시기,껌을 씹어 입마름을 해소하기,짜게 먹지 않기,양치질 하기,"
        },
        {
            id:2,
            symptom:"소화장애",
            content:"고지방 음식, 단 음식, 카페인 함량이 많은 음식을 피하기,자극적인 음식을 피하기,섬유소가 많은 음식 섭취하기,"
        },
        {
            id:3,
            symptom:"기침",
            content:"물을 많이 마셔 기관지 점막을 부드럽게 하기,항생제를 사용하지 않을 것,가능한 기침을 약하게 하기,"
        },
        {
            id:4,
            symptom:"두통",
            content:"물을 많이 마시고, 커피를 줄인다,가벼운 운동하기,따뜻한 물로 샤워하기,신선한 공기를 위해 창문을 열거나 가벼운 산책하기,5분 간 누워서 휴식 취하기,"
        },
        {
            id:5,
            symptom:"배고픔",
            content:"평소 세 끼의 식사를 적당한 양으로 규칙적으로 하기,칼로리가 낮은 스낵이나 음료 마시기 (물, 해바라기씨, 당근, 오이, 무가당 껌 등) ,체중관리를 위해 적당한 운동 병행하기,"
        },
        {
            id:6,
            symptom:"불면",
            content:"이완운동하기,자기 전 무리한 운동하지 않기,명상하기,카페인 줄이기,	"
        },
        {
            id:7,
            symptom:"불안감",
            content:"온수로 목욕 또는 샤워, 가벼운 산책 또는 운동,누워서 쉬기,경험했던 조용하고 평화로운 장면 생각하기,"
        },
        {
            id:8,
            symptom:"우울감",
            content:"운동을 하여 땀을 흘리고, 물 많이 마시기,몸을 편하게 눕히는 이완 운동하기,따뜻한 물로 샤워하기,과일 쥬스 마시기,즐거운 생각하기,"
        },
        {
            id:9,
            symptom:"신경과민",
            content:"휴식을 취하고 신선한 공기를 마시며 산책하기,운동을 시작하거나 손으로 하는 다른 일에 집중하기,심호흡을 함으로써 긴장을 이완시키기,경험했던 조용하고 평화로운 장면 생각하기,"
        },
        {
            id:10,
            symptom:"쑤시는 느낌",
            content:"따뜻한 물로 목욕하기,따끔거리는 곳을 마사지 해주기,가벼운 산책하기,	"
        },
        {
            id:11,
            symptom:"입안의 통증",
            content:"얼음물 또는 주스를 한 모금씩 마시기,껌을 씹어 입마름을 해소하기,짜게 먹지 않기,양치질 하기,"
        },
        {
            id:12,
            symptom:"집중력 감소",
            content:"휴식을 취하고 마음을 편히 갖고 심호흡을 하기,많이 힘들면 일을 중단하고 잠깐 눈 붙이기,명상을 통해 집중력 향상시키기,"
        },
        {
            id:13,
            symptom:"피로감",
            content:"금단 증상이 심한 2주간은 무리한 일을 피하기,낮에 잠깐씩 눈을 붙이거나 밤에는 평소보다 숙면하도록 하기,미리 주변에 양해를 구하고 금단 증상과 함께 피로감이 올 수 있음을 알릴 것,"
        },
        {
            id:14,
            symptom:"현기증",
            content:"현기증 나는 순간을 잠시 쉬면서 넘기기,야외로 나가서 바람쐬기,천천히 일어나고 앉기,평소에 간단한 운동하기,"
        },
    ]
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ChallengeHeader navigation={navigation} Title="금단증상 대처방안" />
                <ScrollView>
                    <View style={{
                        width: "90%",
                        marginHorizontal: 32,
                        marginTop: 32
                    }}>
                        <Text style={{  marginBottom:32,fontSize: 18, color: "#303030", fontFamily: 'NunitoSans-Bold' }}>
                            금연을 시작하게 되면 평균 4주 정도 금단증상을 겪게 됩니다! 갑작스러운 신체변화에 두려워하지마시고 Blockers와 함께 이겨내보도록 합시다!
                      </Text>
                        <FlatList
                            data={data}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <>
                                {detail.includes(item.symptom)?
                                <>
                                    <Text style={{
                                        fontFamily: "NunitoSans-Bold",
                                        fontSize: 18,
                                        marginBottom: 16,
                                        color: "#303030"
                                    }}>금단증상 {item.id} : {item.symptom}</Text>
                                    <Text style={{
                                        fontFamily: "NuitoSans-Regular",
                                        fontSize: 16,
                                        color: "#303030",
                                        lineHeight: 33,
                                        marginBottom: 16
                                    }}>{item.content}</Text>
                                </>
                                :
                                <></>
                                }
                                </>
                            )}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                <TouchableOpacity onPress={uploadInfo}>
                    <View style={{
                        width: "100%",
                        height: 60,
                        backgroundColor: '#5cc27b',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>완료</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}

const veri = StyleSheet.create({
    largeText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        marginLeft: 24,
        marginBottom: 50,
        marginTop: 28
    },
    mediumText: {
        fontSize: 18,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
        opacity: 0.8
    },
    buttonBox: {
        width: "90%",
        height: 56,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#5CC27B',
        alignSelf: "center",
        marginBottom: HEIGHT * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        width: "90%",
        height: 56,
        borderRadius: 28,
        backgroundColor: '#5CC27B',
        alignSelf: "center",
        marginBottom: HEIGHT * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export function ChallengeVeri({ navigation }) {
    
    const quesone = "혼자 참기"
    const questwo = "금연약 복용"
    const questhree = "니코틴 대체용품 사용"
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [select, setSelect] = useState([]);
    var count = 4;

    const pushone = () => {
        setSelect(select.concat(quesone));
        setTimeout(() => {
            navigation.navigate('ChallengeVeriImage',{selects:quesone});
        }, 200)
    }

    const filterone = () => {
        setSelect(select.filter(info => info !== quesone))
    }

    const pushtwo = () => {
        setSelect(select.concat(questwo));
        setTimeout(() => {
            navigation.navigate('ChallengeVeriImage',{selects:questwo});
        }, 200)
    }

    const filtertwo = () => {
        setSelect(select.filter(info => info !== questwo))
    }

    const pushthree = () => {
        setSelect(select.concat(questhree));
        setTimeout(() => {
            navigation.navigate('ChallengeVeriImage',{selects:questhree});
        }, 200)
    }

    const filterthree = () => {
        setSelect(select.filter(info => info !== questhree))
    }

    useEffect(() => {
        one === true ? count = count + 1 : count = count - 1;
        two === true ? count = count + 1 : count = count - 1;
        three === true ? count = count + 1 : count = count - 1;
        if ((count <= 2) && (count >= 0)) {
            console.log(select)
        } else {
            if (select[0] === "혼자 참기") setOne(false);
            if (select[0] === "금연약 복용") setTwo(false);
            if (select[0] === "니코틴 대체용품 사용") setThree(false);
            setSelect(select.slice(1, select.length));
            console.log(select);
        }
    }, [one, two, three]);
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ChallengeHeader navigation={navigation} Title="금연활동 인증하기" />
                <ScrollView style={{ padding: 32 }}>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: "NunitoSans-Bold",
                        color: "#303030",
                        marginBottom: HEIGHT * 0.05
                    }}>어떻게 금연을 시도하고 있나요?</Text>
                    {one === false ?
                        <TouchableOpacity onPressIn={pushone} onPress={() => setOne(!one)}>
                            <View style={veri.buttonBox}>
                                <Text style={[veri.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>{quesone}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterone} onPress={() => setOne(!one)}>
                            <View style={veri.activeButton}>
                                <Text style={[veri.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>{quesone}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {two === false ?
                        <TouchableOpacity onPressIn={pushtwo} onPress={() => setTwo(!two)}>
                            <View style={veri.buttonBox}>
                                <Text style={[veri.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>{questwo}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filtertwo} onPress={() => setTwo(!two)}>
                            <View style={veri.activeButton}>
                                <Text style={[veri.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>{questwo}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {three === false ?
                        <TouchableOpacity onPressIn={pushthree} onPress={() => setThree(!three)}>
                            <View style={veri.buttonBox}>
                                <Text style={[veri.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>{questhree}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterthree} onPress={() => setThree(!three)}>
                            <View style={veri.activeButton}>
                                <Text style={[veri.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>{questhree}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export function ChallengeVeriImage({ navigation,route}) {
    const {selects}=route.params
    
    const [imagebool, setImageBool] = useState(false)
    const [imageOne, setImageOne] = useState(undefined);

    const [user,setUser]=useState("")
    const options = {
        title: '사진가져오기',
        customButtons: [
            { name: 'button_id_1', title: 'CustomButton 1' },
            { name: 'button_id_2', title: 'CustomButton 2' }
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        quality:0.1
    };
    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        console.log(selects)
    },[])
    async function uploadImage(){
        var name
        await firestore().collection("UserInfo").doc(user.uid).get().then(documentSnapshot=>{
            name=documentSnapshot.data().name
        })
        var a=moment().toArray()
        console.log(a)

        if(a[1]===12){
            a[1]=1
        }else{
            a[1]=a[1]+1
        }

        const uri=imageOne;
        const reference = storage().ref("User/"+name+"/"+a+name);
        const uploadUri =  Platform.OS === 'android' ? uri.replace('file://', '') : uri;
        
        await reference.putFile(uploadUri);
        
        var url1 = await storage()
            .refFromURL("gs://blockers-8a128.appspot.com/User/" +name+"/"+a+name)
            .getDownloadURL();

        var size
            await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
                size = querySnapshot.size-1
            })
            var week
            await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge"+size).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").get().then(doc => {
                week=doc.data().week
            })
            await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge"+size).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").update({
                week:week+1,
                visible:false
            })
            await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge"+size).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").doc(String(week)).update({
                pic:url1,
                stats:true,
                how:selects
            })
            navigation.navigate("Home")
    }
    const showCamera1 = () => {
        ImagePicker.launchCamera(options, (response) => {
            if (response.error) {
                console.log('LaunchCamera Error: ', response.error);
            }
            else {
                setImageOne(response.uri);
                setImageBool(true);
            }
        });
    };
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ChallengeHeader navigation={navigation} Title="금연활동 인증하기" />
                <ScrollView style={{ paddingLeft: "8%", paddingRight: "8%" }}>
                    <TouchableOpacity onPress={showCamera1} style={{
                        marginTop: HEIGHT * 0.03,
                        width: 160,
                        height: 160,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: "#5cc27b",
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center"
                    }}>
                        {imagebool ?
                            <>
                                {imageOne && <Image resizeMode="stretch" source={{ uri: imageOne }} style={{ width: 160, height: 160, borderRadius: 14, borderWidth: 1 }} />}
                            </>
                            :
                            <MaterialCommunityIcons name="plus" color="#5cc27b" size={120} />
                        }
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: "NunitoSans-Bold",
                        color: "#303030",
                        alignSelf: "center",
                        marginTop: 8
                    }}>사진 등록</Text>
                    <Text style={{
                        fontSize: 21,
                        fontFamily: "NunitoSans-Bold",
                        color: "#5cc27b",
                        alignSelf: "center",
                        marginTop: HEIGHT * 0.05
                    }}>인증방법</Text>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: "NunitoSans-Regular",
                        color: "#303030",
                        alignSelf: "center",
                        marginTop: HEIGHT * 0.05
                    }}>다음중 하나의 활동 사진을 첨부해주세요{"\n\n"}1. 취미 생활(운동, 동호회 등){"\n\n"}2. 금연 간식{"\n\n"}3. 흡연 관련 용품 버린 사진(ex 담배 부시기){"\n\n"}4. 본인만의 금연 비법</Text>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                {imagebool ?
                    <TouchableOpacity onPress={uploadImage}>
                        <View style={{
                            width: "100%",
                            height: 60,
                            backgroundColor: '#5cc27b',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>인증하기</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <View style={{
                            width: "100%",
                            height: 60,
                            backgroundColor: "#c6c6c6",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>인증하기</Text>
                        </View>
                    </TouchableOpacity>
                }
            </SafeAreaView>
        </>
    )
}

function ChallengeFinal({ navigation, Title, Content, onPress }) {
    const [value, setValue] = useState("");
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ChallengeHeader navigation={navigation} Title={Title} />
                <ScrollView>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: "NunitoSans-Bold",
                        color: "#303030",
                        alignSelf: "center",
                        marginTop: HEIGHT * 0.04,
                        marginBottom: HEIGHT * 0.07,
                        paddingHorizontal: "8%",
                        lineHeight: 26
                    }}>{Content}</Text>
                    <Image style={{ alignSelf: "center" }} source={require('../icon/readerpen.png')} />
                    <TextInput
                        value={value}
                        onChangeText={(text) => setValue(text)}
                        multiline={true}
                        placeholder="텍스트 입력" style={{
                            width: "85%",
                            minHeight: HEIGHT * 0.3,
                            borderColor: "#8D8D8D",
                            borderWidth: 1,
                            paddingTop: 16,
                            paddingBottom: 16,
                            paddingHorizontal: 17.5,
                            marginTop: HEIGHT * 0.05,
                            alignSelf: "center",
                            alignItems: "flex-start",
                            justifyContent: "flex-start"
                        }} />
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                {value.length ?
                    <TouchableOpacity onPress={onPress}>
                        <View style={{
                            width: "100%",
                            height: 60,
                            backgroundColor: '#5cc27b',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>완료</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <View style={{
                            width: "100%",
                            height: 60,
                            backgroundColor: "#c6c6c6",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>완료</Text>
                        </View>
                    </TouchableOpacity>
                }
            </SafeAreaView>
        </>
    )
}

export function ChallengeReview({ navigation }) {
    const Content = "금연에 성공하신것을 축하드립니다.\n성공한 기분은 어떠신가요? 앞으로의 다짐은?"
    return (
        <>
            <ChallengeFinal
                navigation={navigation}
                Title="성공 후기와 다짐"
                Content={Content}
                onPress={() => navigation.navigate("ChallengeSuccess")}
            />
        </>
    )
}

export function ChallengeKnowHow({ navigation }) {
    return (
        <>
            <ChallengeFinal
                navigation={navigation}
                Title="나만의 금연비법 공유하기"
                Content="여러분의 금연비법을 공유해주세요."
                onPress={() => navigation.navigate("Home")}
            />
        </>
    )
}

export function ChallengeSuccess({ navigation }) {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center" }}>
                <Image style={{ width: 150, height: 150, marginBottom: HEIGHT * 0.075 }} source={require('../icon/resetcheck.png')} />
                <Text style={{
                    fontSize: 24,
                    color: "#303030",
                    fontFamily: "NunitoSans-Bold",
                    marginBottom: HEIGHT * 0.0125
                }}>금연성공을 축하합니다!</Text>
                <Text style={{
                    fontSize: 16,
                    color: "#303030",
                    fontFamily: "NunitoSans-Regular",
                    marginBottom: HEIGHT * 0.075
                }}>주변사람들에게 성공을 알려보세요.</Text>
                <Text style={{
                    fontSize: 18,
                    color: "#303030",
                    fontFamily: "NunitoSans-Bold",
                    marginBottom: HEIGHT * 0.025
                }}>공유하기</Text>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <View style={{
                        width: "100%",
                        height: 60,
                        backgroundColor: '#5cc27b',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>완료</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}
export function ChallengeVeriResult({navigation,route}){
    const {UID}=route.params
    const [items,setItems]=useState([])
    async function loadInfo(){
        var size
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").get().then(querySnapshot=>{
            size=querySnapshot.size-1
        })
        const list=[]
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge"+size).collection("ChallengeDetail").doc("금연활동 인증하기 (주1회)").collection("veri").where("stats","==",true).get().then(querySnapshot=>{
            querySnapshot.forEach(function (doc) {
                list.push({
                    pic:doc.data().pic,
                    how:doc.data().how,
                    idx:Number(doc.id)
                })
            })
            setItems(list)
            console.log(list)
        })
    }
    useEffect(()=>{
        
        loadInfo()
    },[])
    return(
        <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center" }}>
            <ScrollView>
                <View>
        <FlatList data={items}
                        keyExtractor={item => item.idx}
                        renderItem={({ item }) => (
                            <>
<Image resizeMode="contain" style={{width:300,height:200}} source={{ uri: item.pic }}/>
<Text>{item.idx}주차 </Text>
<Text>{item.how}</Text>
                            </>
                        )}
        />
            
            </View>
            </ScrollView>
        </SafeAreaView>
        </>
    )
}