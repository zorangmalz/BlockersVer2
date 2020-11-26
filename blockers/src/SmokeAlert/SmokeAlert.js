import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    BackHandler,
    Alert
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProgressBar from 'react-native-progress/Bar';
import ProgressCircle from "react-native-progress/Circle";
import { AdEventType, InterstitialAd, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-1011958477260123/9244108660';


const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const style = StyleSheet.create({
    box: {
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        height: 400,
        marginTop: 16,
        paddingTop: 16,
        paddingBottom: 32,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        marginBottom: 18,
        elevation: 3,
        shadowColor: "#303030",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    }
})

const Header = ({ navigation }) => {
    return (
        <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
            <TouchableOpacity onPress={()=>goBackWithAd(navigation)}>
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
                    <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>한번만 참아봐</Text>
                </Text>
            </View>
        </View>
    )
}
function goBackWithAd(navigation){
    const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
        requestNonPersonalizedAdsOnly: true,
    });
    interstitial.onAdEvent((type) => {
        if (type === AdEventType.LOADED) {
            interstitial.show();
        }
    });
    interstitial.load();
    console.log("AD")
    navigation.goBack()
}
// const Advertise = ({ navigation }) => {
//     return (
//         <TouchableOpacity>
//             <ImageBackground
//                 style={{
//                     width: "90%",
//                     height: 125,
//                     alignSelf: "center",
//                     elevation: 1,
//                     shadowColor: "#303030",
//                     shadowOffset: {
//                         width: 0,
//                         height: 1,
//                     },
//                     shadowOpacity: 0.18,
//                     shadowRadius: 1,
//                 }}
//                 imageStyle={{
//                     borderRadius: 20,
//                     width: "100%",
//                     height: 125
//                 }}
//                 source={require("../icon/sky.png")}
//             >
//                 <View style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     marginTop: 12
//                 }}>
//                     <View style={{
//                         alignItems: "center",
//                         justifyContent: "center",
//                         backgroundColor: "#5cc27b",
//                         width: 30,
//                         height: 18,
//                         marginLeft: 12,
//                         borderRadius: 15
//                     }}>
//                         <Text style={{
//                             fontSize: 12,
//                             fontFamily: "NunitoSans-Bold",
//                             color: "#ffffff"
//                         }}>AD</Text>
//                     </View>
//                     <Ionicons name="close-outline" size={16} style={{ marginRight: 16 }} color="#ffffff" />
//                 </View>
//                 <View style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     marginTop: 12,
//                     marginLeft: 12,
//                     marginRight: 16,
//                 }}>
//                     <Text style={{
//                         fontFamily: "NunitoSans-Bold",
//                         fontSize: 18,
//                         color: "#ffffff"
//                     }}>항공권 {"\n"}10% 할인</Text>
//                     <Text style={{
//                         fontFamily: "NunitoSans-Regular",
//                         fontSize: 14,
//                         color: "#ffffff"
//                     }}>Sungkyun Air</Text>
//                 </View>
//             </ImageBackground>
//         </TouchableOpacity>
//     )
// }

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}

export default function SmokeAlertOne({ navigation }) {

    function goBackWithAd(){
        const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
            requestNonPersonalizedAdsOnly: true,
        });
        interstitial.onAdEvent((type) => {
            if (type === AdEventType.LOADED) {
                interstitial.show();
            }
        });
        interstitial.load();
        console.log("AD")
        
    }
    useEffect(()=>{
        const backAction = () => {
            goBackWithAd()
          };
      
           BackHandler.addEventListener("hardwareBackPress", backAction);
      
          return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    },[])
    const [delay, setDelay] = useState(1000);
    const [second, setSecond] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    useInterval(() => {
        if (second >= 100) {
            setIsRunning(false);
        } else {
            setSecond(second + 1);
        }
    }, isRunning ? delay : null)

    useEffect(() => {
        if (second === 100) {
            navigation.navigate("SmokeAlertTwo");
        }
    }, [second])
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Header navigation={navigation} />
                <ScrollView>
                    <View style={style.box}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            width: "90%"
                        }}>
                            <View style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "#ffb83d",
                                marginRight: 8,
                                marginTop: 12
                            }} />
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 18,
                                color: "#303030"
                            }}>
                                <Text style={{ fontFamily: "NunitoSans-Bold" }}>100초 </Text>
                                동안 자리에 앉아
                                <Text style={{ fontFamily: "NunitoSans-Bold" }}> 심호흡</Text>
                                을 시작합니다.
                            </Text>
                        </View>
                        <ProgressCircle
                            style={{
                                marginTop: 56,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            size={160}
                            borderWidth={0}
                            thickness={10}
                            progress={second / 100}
                            color="#5cc27b"
                            unfilledColor="#ffffff"
                        >
                            <Text style={{ fontFamily: "NunitoSans-Bold", position: "absolute", flex: 1, fontSize: 30, color: "#5cc27b", textAlign: "center" }}>
                                <Text style={{ fontSize: 35 }}>{second}</Text>{"\n"}SEC
                            </Text>
                        </ProgressCircle>
                    </View>
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

export function SmokeAlertTwo({ navigation }) {
    function goBackWithAd(){
        const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
            requestNonPersonalizedAdsOnly: true,
        });
        interstitial.onAdEvent((type) => {
            if (type === AdEventType.LOADED) {
                interstitial.show();
            }
        });
        interstitial.load();
        console.log("AD")
        
    }
    useEffect(()=>{
        const backAction = () => {
            goBackWithAd()
          };
      
           BackHandler.addEventListener("hardwareBackPress", backAction);
      
          return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
    },[])
    const [Delay, setDelay] = useState(1000);
    const [Second, SetSecond] = useState(0);
    const [IsRunning, SetIsRunning] = useState(true);
    useInterval(() => {
        if (Second >= 20) {
            SetIsRunning(false);
        } else {
            SetSecond(Second + 1);
        }
    }, IsRunning ? Delay : null)

    useEffect(() => {
        if (Second === 20) {
            navigation.navigate("SmokeAlertThree");
        }
    }, [Second])
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Header navigation={navigation} />
                <ScrollView>
                    <View style={style.box}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <View style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "#ffb83d",
                                marginRight: 8
                            }} />
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 18,
                                color: "#303030"
                            }}>
                                <Text style={{ fontFamily: "NunitoSans-Bold" }}>물</Text>
                                을 마시거나
                                <Text style={{ fontFamily: "NunitoSans-Bold" }}> 간식</Text>
                                을 먹으세요.
                            </Text>
                        </View>
                        <Image
                            source={require("../icon/Alertone.png")}
                            style={{ marginTop: 72, marginBottom: 48 }}
                        />
                        <ProgressBar
                            progress={Second / 20}
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
                        }}>{Second}초</Text>
                        </ProgressBar>
                    </View>

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

export function SmokeAlertThree({ navigation }) {
    function goBackWithAd(){
        const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
            requestNonPersonalizedAdsOnly: true,
        });
        interstitial.onAdEvent((type) => {
            if (type === AdEventType.LOADED) {
                interstitial.show();
            }
        });
        interstitial.load();
        console.log("AD")
        
    }
    useEffect(()=>{
        const backAction = () => {
            goBackWithAd()
          };
      
           BackHandler.addEventListener("hardwareBackPress", backAction);
      
          return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    },[])
    const [delay, setDelay] = useState(1000);
    const [second, setSecond] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    useInterval(() => {
        if (second >= 20) {
            setIsRunning(false);
        } else {
            setSecond(second + 1);
        }
    }, isRunning ? delay : null)

    useEffect(() => {
        if (second === 20) {
            navigation.navigate("SmokeAlertFour");
        }
    }, [second])
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Header navigation={navigation} />
                <ScrollView>
                    <View style={style.box}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <View style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "#ffb83d",
                                marginRight: 8
                            }} />
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 18,
                                color: "#303030"
                            }}>
                                <Text style={{ fontFamily: "NunitoSans-Bold" }}>스트레칭</Text>
                                을 해보세요.
                            </Text>
                        </View>
                        <Image
                            source={require("../icon/Alerttwo.png")}
                            style={{ marginTop: 42, marginBottom: 16 }}
                        />
                        <ProgressBar
                            progress={second / 20}
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
                        }}>{second}초</Text>
                        </ProgressBar>
                    </View>

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

export function SmokeAlertFour({ navigation }) {
    const [user,setUser]=useState("")
    function goBackWithAd(){
        const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
            requestNonPersonalizedAdsOnly: true,
        });
        interstitial.onAdEvent((type) => {
            if (type === AdEventType.LOADED) {
                interstitial.show();
            }
        });
        interstitial.load();
        console.log("AD")
        
    }
    async function saveCalendar(){
        var a = moment().toArray()

        if (a[1] === 12) {
            a[1] = 1
            a[0]=a[0]+1
        } else {
            a[1] = a[1] + 1
        }
        await firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).update({
            endure:"참기에 성공하셨습니다"
        }).catch(() =>
            firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0] + "-" + a[1] + "-" + a[2]).set({
                endure: "참기에 성공하셨습니다"
            }))
            navigation.navigate("Home")
    }
    useEffect(()=>{
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        const backAction = () => {
            goBackWithAd()
          };
      
           BackHandler.addEventListener("hardwareBackPress", backAction);
      
          return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    },[])
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Header navigation={navigation} />
                <ScrollView>
                    <View style={style.box}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <View style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "#ffb83d",
                                marginRight: 8
                            }} />
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 18,
                                color: "#303030"
                            }}>
                                <Text style={{ fontFamily: "NunitoSans-Bold" }}>금연하는 이유</Text>
                                와
                                <Text style={{ fontFamily: "NunitoSans-Bold" }}> 목적</Text>
                                을 적어보세요.
                            </Text>
                        </View>
                        <Image
                            source={require("../icon/readerpen.png")}
                            style={{ marginTop: 58, marginBottom: 32 }}
                        />
                        <View style={{
                            width: WIDTH * 0.8,
                            height: 153,
                            borderWidth: 1,
                            borderColor: "#8D8D8D",
                            paddingTop: 8,
                            paddingBottom: 8,
                            paddingHorizontal: 17.5
                        }}>
                            <TextInput multiline={true} placeholder="텍스트 입력" style={{
                                width: "100%",
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 14,
                                color: "#303030"
                            }} />
                        </View>
                    </View>
                </ScrollView>
                <SafeAreaView style={{ flex: 0 }}>
                  <TouchableOpacity onPress={saveCalendar}>
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
            </SafeAreaView>
        </>
    )
}