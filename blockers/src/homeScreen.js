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
    Dimensions,
    RefreshControl,
    Alert,
    ImageBackground
} from 'react-native';
import Swiper from 'react-native-swiper';
import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Caver = require('caver-js')
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
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function HomeScreen({ navigation }) {
  
    const ref = firestore().collection("UserInfo");
    const DATA = [];
    const num = 1;
    const [smokingCount,setSmokingCount]=useState(0)
    const [smokeProof,setSmokeProof]=useState([0,0,0,0,0,0,0,0,0,0,])
    const [smokeProofTwo,setSmokeProofTwo]=useState([0,0,0,0,0,0,0,0,0,0,])
    const [smokeProofThree,setSmokeProofThree]=useState([0,0,0,0,0,0,0,0,0,0,])
    const [smokeProofFour,setSmokeProofFour]=useState([0,0,0,0,0,0,0,0,0,0,])
    const [month, setMonth] = useState('00');
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minu, setMinu] = useState(0);
    const [sec, setSec] = useState(0);
    const [timestart, setTimestart] = useState(false);
    const [viewopacity, setViewOpacity] = useState(true);
    const [startButton, setStartButton] = useState(false);
    const [user, setUser] = useState()
    const [initializing, setInitializing] = useState(true);
    const [fullTime, setfullTime] = useState()
    const [check, setcheck] = useState(false)
    const [smoker,setSmoker]=useState(false)
    const [smokeInfo,setSmokeInfo]=useState()
    const [smokingAmount,setSmokingAmount]=useState()
    const [smokingShow,setSmokingShow]=useState(0)
    const [smokingMoney,setSmokingMoney]=useState()
    const [smokingDaily,setSmokingDaily]=useState(0)
    const [stats,setStats]=useState()
    const [totals,setTotals]=useState()
    const [today,setToday]=useState()
    const [refreshing, setRefreshing] = React.useState(false);
    var total=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

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
    async function cutting(range){
        var a=moment().toArray()
        for(var i=0;i<range;i++){
            total[i]=1
        }
        for(var i=0;i<smokingDaily;i++){
            total[i]=2
        }
        setTotals(total)
        // console.log(total)
        setSmokeProof(total.slice(0,10))
        setSmokeProofTwo(total.slice(10,20))
        setSmokeProofThree(total.slice(20,30))
        setSmokeProofFour(total.slice(30,40))
        await ref.doc(user.uid).update({
            smokeToday:a[2]
        })
    }
    async function smokeClick(){
        // console.log(totals,"init")
        
        var smoke=smokingDaily
        console.log(smoke,stats,"compare")
        if (Number(smoke)===Number(stats)){
            Alert.alert("고마펴싀발")
        }
        setSmokingDaily(smoke+1)
        // console.log(smoke,smokingDaily)
        var total=totals
        for(var i=0;i<smoke+1;i++){
            total[i]=2
        }
        // console.log(total)
        setSmokeProof(total.slice(0,10))
        setSmokeProofTwo(total.slice(10,20))
        setSmokeProofThree(total.slice(20,30))
        setSmokeProofFour(total.slice(30,40))
        await ref.doc(user.uid).update({
            smokeDaily:smoke+1
        })
    }
    async function timeCheck(){
        var a=moment().toArray()
        console.log(a)
        await ref.doc(user.uid).get().then(documentSnapshot=>{
            if(a[2]===documentSnapshot.data().smokeToday){
                console.log("same")
            }else{
                console.log("different")
                ref.doc(user.uid).update({
                    smokeDaily:0,
                    smokeToday:a[2],
                    smokeStats:firebase.firestore.FieldValue.arrayUnion(a+"/흡연량 : "+smokingDaily)
                    
                })
                setToday(false)
            }
        })
        
    }
    useEffect(() => {
        var a =moment().toArray()
        console.log(a)
        // console.log(total)
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        // const caver = new Caver('https://api.baobab.klaytn.net:8651/')
        // async function testFunction() {
        //     const keyring = caver.wallet.keyring.generate()
        //     console.log(keyring)
        //     console.log(keyring._key._privateKey)
        // }
        // testFunction()
  
    }, [])
    useEffect(() => {
        if (user) {
            ref.doc(user.uid).get().then(documentSnapshot => {
                setSmoker(documentSnapshot.data().smoker)
                setSmokeInfo(documentSnapshot.data().smokeInfo)
                setStats(documentSnapshot.data().smokingAmount)
                setSmokingDaily(documentSnapshot.data().smokeDaily)
                cutting(documentSnapshot.data().smokingAmount)
                console.log("smokeInfo and stats",smokeInfo,stats,smokingDaily)
                
                if (!documentSnapshot.data().SmokingTime) {
                    setcheck(false)
                } else {

                    setfullTime(documentSnapshot.data().SmokingTime)
                    setcheck(true)

                    // console.log(fullTime)
                }
            })
            timeCheck()
        }
        if (!check) {
            setViewOpacity(true)
        } else {
            setViewOpacity(false)
        }
    }, [user, viewopacity, check,refreshing,today])
    useEffect(() => {
        console.log("s")
        var b = moment(fullTime)
        if(fullTime){
        const interval = setInterval(() => {
            var a = moment().toArray()
            var c = (b.diff(a, "seconds")) * -1
            timeCounter(c)
            setSmokingShow(parseInt(c/86400)*stats+parseInt(parseInt(c%86400/3600)*stats/24))
            setSmokingMoney(((parseInt(c/86400)*stats+parseInt(parseInt(c%86400/3600)*stats/24))*125).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
            
            var hi=100000
            
        }, 1000)
        return () => clearInterval(interval)
    }
        
    }, [fullTime])

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
                            <Ionicons name="sync" size={27} color="#5cc27b" style={{ marginRight: 16 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('./icon/alram.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <Swiper dotStyle={{ borderColor: '#5CC27B', borderWidth: 1, backgroundColor: '#FFFFFF' }} activeDotColor='#5CC27B' style={{ height: 250 }}>
                        <View>
                           
                            <View style={{ zIndex: 0 }}>
                                {smoker === true ?
                                    <>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 16, marginBottom: 16 }}>
                                            <View style={resource.container}>
                                                <Text style={resource.smallText}>얼마나 피웠지?</Text>
                                                <Text style={resource.largeText}>{smokingShow}대</Text>
                                            </View>
                                            <View style={resource.container}>
                                                <Text style={resource.smallText}>얼마나 썼지?</Text>
                                                
                                <Text style={resource.largeText}>{smokingMoney}원</Text>
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
                                    <Text style={resource.largeText}>{smokingShow}대</Text>
                                            </View>
                                            <View style={resource.container}>
                                                <Text style={resource.smallText}>얼마나 아꼈지?</Text>
                                    <Text style={resource.largeText}>{smokingMoney}원</Text>
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
                                                    <View style={{ width: 16, height: 16, borderRadius: 8, borderColor: '#cc9a67', borderWidth: 1, backgroundColor: backColor === 0 ? '#ffffff' : (backColor===2 ? '#ff0000':"#cc9a67")}}/>
                                                ))}
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "90%", alignSelf: 'center', marginTop: 8 }}>
                                                {smokeProofTwo.map((backColor) => (
                                                   <View style={{ width: 16, height: 16, borderRadius: 8, borderColor: '#cc9a67', borderWidth: 1, backgroundColor: backColor === 0 ? '#ffffff' : backColor===2 ? '#ff0000':"#cc9a67" }}/>
                                                ))}
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "90%", alignSelf: 'center', marginTop: 8 }}>
                                                {smokeProofThree.map((backColor) => (
                                                    <View style={{ width: 16, height: 16, borderRadius: 8, borderColor: '#cc9a67', borderWidth: 1, backgroundColor: backColor === 0 ? '#ffffff' : backColor===2 ? '#ff0000':"#cc9a67" }} />
                                                ))}
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "90%", alignSelf: 'center', marginTop: 8 }}>
                                                {smokeProofFour.map((backColor) => (
                                                    <View style={{ width: 16, height: 16, borderRadius: 8, borderColor: '#cc9a67', borderWidth: 1, backgroundColor: backColor === 0 ? '#ffffff' : backColor===2 ? '#ff0000':"#cc9a67" }} />
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
                        <ImageBackground style={{ width: 25, height: 15, marginRight: 8, alignItems: "center", justifyContent: "center" }} resizeMode="stretch" source={require('./icon/tipbox.png')} >
                            <Text style={{fontSize: 9, fontFamily: 'NunitoSans-Bold', color: "#ffffff" }}>TIP</Text>
                        </ImageBackground>
                        <Text style={{ alignSelf: 'center', fontSize: 16, fontFamily: 'NunitoSans-Regular', color: '#303030', opacity: 0.6 }}>물을 많이 마시면 니코틴 배출이 빨라집니다!</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginTop: 32,
                    }}>
                        <TouchableOpacity style={{
                            alignItems: "center",
                        }} onPress={() => navigation.navigate('Calendar')}>
                            <MaterialCommunityIcons size={60} color="#5cc27b" name="calendar-blank" />
                            <Text style={{fontSize: 14, fontFamily: "NunitoSans-Regular", color: "#303030", marginTop: 8}}>금연달력</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: "center",
                        }} onPress={() => navigation.navigate("AlcoholMain")}>
                            <FontAwesome5 name="robot" size={50} color="#5cc27b" />
                            <Text style={{fontSize: 14, fontFamily: "NunitoSans-Regular", color: "#303030", marginTop: 18}}>금연 리포트 & 정보</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: "center",
                        }} onPress={() => navigation.navigate("SelfEsteemMain")}>
                            <Ionicons name="alert-circle-outline" size={60} color="#FF0000" />
                            <Text style={{fontSize: 14, fontFamily: "NunitoSans-Regular", color: "#ff0000", marginTop: 4}}>흡연 경보</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{
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
                            <Text style={{ fontSize: 16, color: '#979797', fontFamily: 'NunitoSans-Regular' }}>오늘의 금연 일기를 작성해보세요.</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}