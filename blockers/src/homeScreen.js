import React, { useState, useEffect } from 'react';
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
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useScreens } from 'react-native-screens';
import { FlatList } from 'react-native-gesture-handler';


const WIDTH = Dimensions.get('window').width;

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

export default function HomeScreen({ navigation }) {
    //금연자인지 흡연자인지 구분
    const smoker = true;

    //흡연자일 경우 담배 색깔
    const smokeProof = [true, false, false, false, false, false, false, false, false, false]
    const smokeProofTwo = [false, false, false, false, false, false, false, false, false, false]
    const smokeProofThree = [false, false, false, false, false, false, false, false, false, false]
    const smokeProofFour = [false, false, false, false, false, false, false, false, false, false]

    const ref = firestore().collection("UserInfo");

    const DATA = [];
    const num = 1;
    const [month, setMonth] = useState('00');
    const [day, setDay] = useState();
    const [hour, setHour] = useState();
    const [minu, setMinu] = useState();
    const [sec, setSec] = useState();
    const [timestart, setTimestart] = useState(false);
    const [viewopacity, setViewOpacity] = useState(true);
    const [startButton, setStartButton] = useState(false);
    const [user, setUser] = useState()
    const [initializing, setInitializing] = useState(true);
    const [fullTime, setfullTime] = useState()
    const [check, setcheck] = useState(false)

    async function updateInfo(code) {
        var a = moment().toArray()
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

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })

    }, [])
    useEffect(() => {
        if (user) {
            ref.doc(user.uid).get().then(documentSnapshot => {

                if (!documentSnapshot.data().SmokingTime) {
                    setcheck(false)
                } else {

                    setfullTime(documentSnapshot.data().SmokingTime)
                    setcheck(true)

                    // console.log(fullTime)
                }
            })
        }
        if (!check) {
            setViewOpacity(true)
        } else {
            setViewOpacity(false)
        }
    }, [user, viewopacity, check])
    useEffect(() => {
        //    auth().onAuthStateChanged(onAuthStateChanged);
        //    console.log(user)

        var b = moment(fullTime)

        const interval = setInterval(() => {

            var a = moment().toArray()


            var c = (b.diff(a, "seconds")) * -1

            timeCounter(c)
        }, 1000)
        return () => clearInterval(interval)
    }, [fullTime, user])

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
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
                        <TouchableOpacity>
                            <Image source={require('./icon/alram.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <Swiper dotStyle={{ borderColor: '#5CC27B', borderWidth: 1, backgroundColor: '#FFFFFF' }} activeDotColor='#5CC27B' style={{ height: 250 }}>
                        <View>
                            {viewopacity === true ?
                                <TouchableWithoutFeedback style={{ flexDirection: 'row' }} onPress={() => {
                                    setViewOpacity(false);
                                    setTimestart(true);
                                    updateInfo(user.uid)
                                    console.log(timestart);
                                }}>
                                    <View style={{
                                        width: "100%",
                                        zIndex: 1,
                                        position: 'absolute',
                                        height: 210,
                                        backgroundColor: '#000000',
                                        opacity: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }} >
                                        <Text style={{ color: '#FFFFFF', fontSize: 24, fontFamily: 'NunitoSans-Bold' }}>터치해서 금연 시작하기</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                :
                                <View />
                            }
                            <View style={{ zIndex: 0 }}>
                                {smoker === true ?
                                    <>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 16, marginBottom: 16 }}>
                                            <View style={resource.container}>
                                                <Text style={resource.smallText}>얼마나 안폈지?</Text>
                                                <Text style={resource.largeText}>1,000 대</Text>
                                            </View>
                                            <View style={resource.container}>
                                                <Text style={resource.smallText}>얼마나 아꼈지?</Text>
                                                <Text style={resource.largeText}>225,000원</Text>
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
                                        <TouchableOpacity style={{
                                            width: 100,
                                            height: 35,
                                            borderRadius: 18,
                                            backgroundColor: '#5cc27b',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 12,
                                            alignSelf: 'center'
                                        }}>
                                            <Text style={{
                                                fontFamily: 'NunitoSans-Bold',
                                                fontSize: 16,
                                                color: '#ffffff',
                                            }}>금연하기</Text>
                                        </TouchableOpacity>
                                    </>
                                    :
                                    <>
                                        <View style={{
                                            backgroundColor: '#5CC27B',
                                            marginRight: 33,
                                            marginLeft: 33,
                                            height: 64,
                                            borderRadius: 29,
                                            marginTop: 30
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
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 48 }}>
                                            <View style={resource.container}>
                                                <Text style={resource.smallText}>얼마나 안폈지?</Text>
                                                <Text style={resource.largeText}>1,000 대</Text>
                                            </View>
                                            <View style={resource.container}>
                                                <Text style={resource.smallText}>얼마나 아꼈지?</Text>
                                                <Text style={resource.largeText}>225,000원</Text>
                                            </View>
                                        </View>
                                    </>
                                }
                            </View>
                        </View>
                        {startButton ?
                            <View style={{ width: "100%" }}>
                                {smoker === true ?
                                    <>
                                        <View style={{ marginTop: 24 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "90%", alignSelf: 'center' }}>
                                                {smokeProof.map((backColor) => (
                                                    <View style={{ width: 16, height: 16, borderRadius: 8, borderColor: '#cc9a67', borderWidth: 1, backgroundColor: backColor === true ? '#ff0000' : '#cc9a67' }} />
                                                ))}
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "90%", alignSelf: 'center', marginTop: 8 }}>
                                                {smokeProofTwo.map((backColor) => (
                                                    <View style={{ width: 16, height: 16, borderRadius: 8, borderColor: '#cc9a67', borderWidth: 1, backgroundColor: backColor === true ? '#ffffff' : '#cc9a67' }} />
                                                ))}
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "90%", alignSelf: 'center', marginTop: 8 }}>
                                                {smokeProofThree.map((backColor) => (
                                                    <View style={{ width: 16, height: 16, borderRadius: 8, borderColor: '#cc9a67', borderWidth: 1, backgroundColor: backColor === true ? '#cc9a67' : '#ffffff' }} />
                                                ))}
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "90%", alignSelf: 'center', marginTop: 8 }}>
                                                {smokeProofFour.map((backColor) => (
                                                    <View style={{ width: 16, height: 16, borderRadius: 8, borderColor: '#cc9a67', borderWidth: 1, backgroundColor: backColor === true ? '#cc9a67' : '#ffffff' }} />
                                                ))}
                                            </View>
                                        </View>
                                        <Text style={{
                                            fontFamily: 'NunitoSans-Bold',
                                            color: '#5cc27b',
                                            fontSize: 24,
                                            alignSelf: 'center',
                                            marginTop: 10
                                        }}>1/10</Text>
                                        <TouchableOpacity style={{
                                            width: 100,
                                            height: 35,
                                            borderRadius: 18,
                                            backgroundColor: '#5cc27b',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 8,
                                            alignSelf: 'center'
                                        }}>
                                            <Text style={{
                                                fontFamily: 'NunitoSans-Bold',
                                                fontSize: 16,
                                                color: '#ffffff',
                                            }}>담배 +1</Text>
                                        </TouchableOpacity>
                                    </>
                                    :
                                    <>
                                        <Text style={{ alignSelf: 'center', fontSize: 16, fontFamily: 'NunitoSans-Bold', marginTop: 16, marginBottom: 32, color: '#303030' }}>Verification Period({month}/{day}~{month}/{day + 2})</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ borderWidth: 2, width: WIDTH / 7, height: WIDTH / 7, borderColor: '#5CC27B', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image resizeMode="contain" source={require('./icon/checkred.png')} />
                                                </View>
                                                <Text style={{ marginTop: 4, fontSize: 14, fontFamily: 'NunitoSans-Regular', color: '#303030', opacity: 0.8 }}>1st</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ borderWidth: 2, width: WIDTH / 7, height: WIDTH / 7, borderColor: '#5CC27B', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image resizeMode="contain" source={require('./icon/checkred.png')} />
                                                </View>
                                                <Text style={{ marginTop: 4, fontSize: 14, fontFamily: 'NunitoSans-Regular', color: '#303030', opacity: 0.8 }}>2nd</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ borderWidth: 2, width: WIDTH / 7, height: WIDTH / 7, borderColor: '#5CC27B' }} />
                                                <Text style={{ marginTop: 4, fontSize: 14, fontFamily: 'NunitoSans-Regular', color: '#303030', opacity: 0.8 }}>3rd</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ borderWidth: 2, width: WIDTH / 7, height: WIDTH / 7, borderColor: '#5CC27B' }} />
                                                <Text style={{ marginTop: 4, fontSize: 14, fontFamily: 'NunitoSans-Regular', color: '#303030', opacity: 0.8 }}>Final</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={{ marginTop: 8, alignSelf: 'center' }} onPress={() => { navigation.navigate('Verification') }}>
                                            <View style={{ backgroundColor: '#5CC27B', width: 100, borderRadius: 20, height: 35, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>인증하기</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                }
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 33 }}>
                                <Text style={{ fontSize: 24, textAlign: 'center' }}>
                                    <Text style={{ fontFamily: 'NunitoSans-ExtraBold', color: '#303030', opacity: 0.8 }}>Start your Smoking Cessation With </Text>
                                    <Text style={{ fontFamily: 'NunitoSans-ExtraBold', color: '#5CC27B' }}>Blockers</Text>
                                </Text>
                                <TouchableOpacity style={{ marginTop: 32 }} onPress={() => setStartButton(true)}>
                                    <View style={{ backgroundColor: '#5CC27B', width: 100, borderRadius: 18, height: 35, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>시작하기</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    </Swiper>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: "12%" }}>
                        <Image style={{ width: 15, height: 20, marginRight: 8 }} resizeMode="stretch" source={require('./icon/lightbulb.png')} />
                        <Text style={{ fontSize: 16, fontFamily: 'NunitoSans-Bold', color: '#303030', opacity: 0.6 }}>오늘의 팁</Text>
                    </View>
                    <Text style={{ alignSelf: 'center', fontSize: 16, fontFamily: 'NunitoSans-Regular', color: '#303030', opacity: 0.6, marginTop: 8 }}>물을 많이 마시면 니코틴 배출이 빨라집니다!</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginTop: 32,
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
                            <Image style={{ width: 48, height: 45.8 }} resizeMode="stretch" source={require('./icon/Iconcalendar.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={{ width: 48, height: 48 }} resizeMode="stretch" source={require('./icon/alertcircle.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center', marginTop: 16 }} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingTop: 17,
                        paddingLeft: 14,
                        paddingRight: 14,
                    }}>
                        <View style={{ maxWidth: 300 }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingBottom: 16,
                                paddingLeft: 14,
                                paddingRight: 14
                            }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFB83D' }} />
                                <Text style={{ fontSize: 16, fontFamily: 'NunitoSans-Bold', marginLeft: 10, color: '#303030' }}>Challenge {num}</Text>
                            </View>
                            <Text style={{ marginLeft: 32 }}>
                                <Text style={{ fontSize: 14, color: '#979797', fontFamily: 'NunitoSans-Regular' }}>180 days Smoking Cessation Challenge with</Text>
                                <Text style={{ fontSize: 14, color: '#303030', fontFamily: 'NunitoSans-Bold' }}> Blockers</Text>
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: 40, marginRight: 20 }} onPress={()=> navigation.navigate('Challenge')}>
                            <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontFamily: 'NunitoSans-Regular', color: '#303030' }}>Start</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center', marginTop: 16}} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingTop: 16,
                        paddingLeft: 14,
                        paddingRight: 14,
                    }}>
                        <View style={{maxWidth: 300}}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingBottom: 16,
                                paddingLeft: 14,
                                paddingRight: 14,
                            }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFB83D' }} />
                                <Text style={{ fontSize: 16, fontFamily: 'NunitoSans-Bold', marginLeft: 10, color: '#303030' }}>Mission {num}</Text>
                            </View>
                            <Text style={{ marginLeft: 32 }}>
                                <Text style={{ fontSize: 14, color: '#979797', fontFamily: 'NunitoSans-Regular' }}>180 days Smoking Cessation Challenge with</Text>
                                <Text style={{ fontSize: 14, color: '#303030', fontFamily: 'NunitoSans-Bold' }}> Blockers</Text>
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: 40, marginRight: 20 }} onPress={()=> navigation.navigate('Mission')}>
                            <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontFamily: 'NunitoSans-Regular', color: '#303030' }}>Start</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}