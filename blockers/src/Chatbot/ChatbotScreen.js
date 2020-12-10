import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    SafeAreaView,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    Linking,
    ActivityIndicator,  
    Alert 
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LinearGradient from "react-native-linear-gradient";
import { ProgressCircle } from "react-native-progress/Circle";
import BarChart from 'react-native-chart-kit/dist/BarChart';
import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { AdEventType, InterstitialAd, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
// import link from "react-native-kakao-links";
import { useScreens } from "react-native-screens";
const adUnitId = __DEV__ ? TestIds.BANNER :(Platform.OS==='ios' ? "ca-app-pub-8771472802759230/9484403934":'ca-app-pub-8771472802759230/7951846321' ) ;


const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const style = StyleSheet.create({
    box: {
        marginTop: 16,
        width: "75%",
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderColor: "#5cc27b"
    },
    bold: {
        fontFamily: "NunitoSans-Bold",
        fontSize: 18,
    },
    shadowbox: {
        height: 100,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
        marginBottom: 16,
        backgroundColor: "#ffffff",
        shadowColor: "#303030",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    }
})

const Header = ({ navigation, title }) => {
    return (
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
                    <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>{title}</Text>
                </Text>
            </View>
        </View>
    )
}

export default function ChatbotMain({ navigation }) {
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);
    const onOne = () => {
        setOne(true);
        setTimeout(() => {
            navigation.navigate("ChatbotOne");
            setOne(false);
        }, 200)
    }
    const onTwo = () => {
        setTwo(true);
        setTimeout(() => {
            navigation.navigate("ChatbotTwo")
            setTwo(false);
        }, 200)
    }
    const onThree = () => {
        setThree(true);
        setTimeout(() => {
            navigation.navigate("ChatbotThree")
            setThree(false);
        }, 200)
    }
    const onFour = () => {
        setFour(true);
        setTimeout(() => {
            navigation.navigate("ChatbotFour")
            setFour(false);
        }, 200)
    }
 
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Header navigation={navigation} title="금연정보" />
                <ScrollView>
                    <TouchableOpacity onPress={onOne} style={[
                        style.box, {
                            backgroundColor: one ? "#5cc27b" : "#ffffff",
                            borderWidth: one ? 0 : 1,
                        }
                    ]}>
                        <Text style={[
                            style.bold, {
                                color: one ? "#ffffff" : "#303030"
                            }
                        ]}>금연 지원사업 정보</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onTwo} style={[
                        style.box, {
                            backgroundColor: two ? "#5cc27b" : "#ffffff",
                            borderWidth: two ? 0 : 1,
                        }
                    ]}>
                        <Text style={[
                            style.bold, {
                                color: two ? "#ffffff" : "#303030"
                            }
                        ]}>금연 정보</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onThree} style={[
                        style.box, {
                            backgroundColor: three ? "#5cc27b" : "#ffffff",
                            borderWidth: three ? 0 : 1,
                        }
                    ]}>
                        <Text style={[
                            style.bold, {
                                color: three ? "#ffffff" : "#303030"
                            }
                        ]}>금연 리포트</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onFour} style={[
                        style.box, {
                            backgroundColor: four ? "#5cc27b" : "#ffffff",
                            borderWidth: four ? 0 : 1,
                        }
                    ]}>
                        <Text style={[
                            style.bold, {
                                color: four ? "#ffffff" : "#303030"
                            }
                        ]}>복약관리</Text>
                    </TouchableOpacity>
                </ScrollView>
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
    
            </SafeAreaView>
        </>
    )
}

export function ChatbotOne({ navigation }) {
    function link(){
        var url="https://nosmk.khealth.or.kr/nsk/user/extra/ntcc/service/service/jsp/Page.do?siteMenuIdx=65"
        Linking.canOpenURL(url)
.then(supported => {
  if (!supported) {
    console.log('Unsupported URL: ' + url)
  } else {
    return Linking.openURL(url)
  }
}).catch(err => console.error('An error occurred ', err))
    }
    const Information = [
        {
            id: 1,
            title: "1. 보건소 금연클리닉",
            content: " 지역사회 흡연자 누구나 참여가능한 금연 클리닉, 6개월 동안 금연 상담 서비스, CO/코티닌  측정, 금연보조제 지급, 행동요법, 금연치료서비스 등을 제공 받을 수 있다. 전국 보건소에서 이용 가능하며, 평일 오전9시~오후6시 사이 운영한다. 이용금액은 무료이다."
        },
        {
            id: 2,
            title: "2. 치료형 캠프",
            content: " 전문치료형과 입원환자 대상형으로 구성되어 있다. 전문치료형은 4박 5일 동안 캠프 형식으로 진행되며 참가비는 10만원, 캠프 수료 후 인센티브를 제공받는다. 입원환자 대상형은 환자들의 건강상태에 따른 금연동기 강화와 맞춤형 금연프로그램을 제공해주고 6개월 간 사후관리를 제공한다. 이용금액은 무료이다."
        },
        {
            id: 3,
            title: "3. 찾아가는 금연 서비스",
            content: " 주로 금연 사업 소회 계층을 대상으로 진행되며 청소년, 대학생, 여성, 장애인, 소규모 사업장 근로자를 대상으로 직접 방문하여 금연 상담을 6개월 동안 제공한다. 이용금액은 무료이다."
        },
        {
            id: 4,
            title: "4. 금연 상담 전화",
            content: " 문의 번호는 1544-9030이며 월~금 오전 9시~오후 10시 / 토~일 오전 9시~오후6시 사이 운영한다. 금연을 원하는 사람이 성공적으로 금연할 수 있도록 30일 동안 정해진 프로그램에 따라 상담을 해주는 프로그램으로 예약 상담제로 운영하고 있으며 상담 외에 금연지침서와 SMS 문자 서비스를 제공한다. 이용금액은 무료이다."
        },
        {
            id: 5,
            title: "5. 병의원 금연 치료",
            content: " 문의 번호는 1577 - 1000이며 금연치료를 희망하는 모든 국민들이 사용 가능하며, 1년에 3회만 이용할 수 있다. 금연 진료 및 상담을 진행하며 이용금액은 3회 방문부터 본인 부담금을 면제해주며 최종 치료 완료 시 전액 환불 받는다. "
        },
    ]
    
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Header navigation={navigation} title="금연 지원사업 정보" />
                <ScrollView>
                    <View style={{ paddingHorizontal: "8%" }}>
                        <FlatList
                            data={Information}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <>
                                    <Text style={{
                                        fontFamily: "NunitoSans-Bold",
                                        fontSize: 16,
                                        color: "#303030",
                                        marginTop: 32,
                                        marginBottom: 16
                                    }}>{item.title}</Text>
                                    <Text style={{
                                        fontSize: 14,
                                        fontFamily: "NunitoSans-Regular",
                                        color: "#303030"
                                    }}>{item.content}</Text>
                                </>
                            )}
                        />
                        <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 16,
                            color: "#303030",
                            marginTop: 32,
                            marginBottom: 16
                        }}>더 자세한 정보는 아래 링크에서 확인하세요.</Text>
                        <TouchableOpacity onPress={link}>
                        <Text style={{
                            fontFamily: "NunitoSans-Regular",
                            fontSize: 14,
                            color: "#5cc27b",
                            textDecorationLine: "underline",
                            marginBottom: 32
                        }}>바로가기</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    
            </SafeAreaView>
        </>
    )
}

export function ChatbotTwo({ navigation }) {
    function linkA(){
        var url="https://www.nosmokeguide.go.kr/index.do"
        Linking.canOpenURL(url)
.then(supported => {
  if (!supported) {
    console.log('Unsupported URL: ' + url)
  } else {
    return Linking.openURL(url)
  }
}).catch(err => console.error('An error occurred ', err))
    }
    function linkB(){
        var url="https://nosmk.khealth.or.kr/nsk/"
        Linking.canOpenURL(url)
.then(supported => {
  if (!supported) {
    console.log('Unsupported URL: ' + url)
  } else {
    return Linking.openURL(url)
  }
}).catch(err => console.error('An error occurred ', err))
    }
    function linkC(){
        var url="http://www.kash.or.kr/user_new/main.asp"
        Linking.canOpenURL(url)
.then(supported => {
  if (!supported) {
    console.log('Unsupported URL: ' + url)
  } else {
    return Linking.openURL(url)
  }
}).catch(err => console.error('An error occurred ', err))
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Header navigation={navigation} title="금연 정보" />
                <ScrollView>
                    <View style={{ paddingHorizontal: "13%" }}>
                        <View style={style.shadowbox}>
                            <Image width={100} height={100} resizeMode="contain" source={require("../icon/smokeroad.png")} />
                        </View>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginBottom: 16
                        }}>1. 금연 길라잡이 - 온라인 금연 서비스</Text>
                        <Text style={{ marginBottom: 16 }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 14,
                                color: "#303030",
                                lineHeight: 19
                            }}>온라인에서 금연 실천을 도와주는 정부기관 금연 서비스 입니다.{`\n`} </Text>
                            <TouchableOpacity onPress={linkA}>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 14,
                                color: "#5cc27b",
                                textDecorationLine: "underline"
                            }}>바로가기</Text>
                            </TouchableOpacity>
                        </Text>
                        <View style={style.shadowbox}>
                            <Image width={100} height={60} resizeMode="contain" source={require("../icon/smokeknock.png")} />
                        </View>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginBottom: 16
                        }}>2. 금연두드림</Text>
                        <Text style={{ marginBottom: 16 }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 14,
                                color: "#303030",
                                lineHeight: 19
                            }}>금연에 대한 정보들이 모여 있는 웹사이트 입니다. {"\n"}한국건강증진개발원에서 운영하고 있습니다.{`\n`} </Text>
                           <TouchableOpacity onPress={linkB}>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 14,
                                
                                color: "#5cc27b",
                                textDecorationLine: "underline"
                            }}>바로가기</Text>
                            </TouchableOpacity>
                        </Text>
                        <View style={style.shadowbox}>
                            <Image width={200} height={30} resizeMode="contain" source={require("../icon/smokeexercise.png")} />
                        </View>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginBottom: 16
                        }}>3. 한국금연운동협의회</Text>
                        <Text style={{ marginBottom: 16 }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 14,
                                color: "#303030",
                                lineHeight: 19
                            }}>금연 관련 운동들을 하고 있는 민간단체 입니다.{`\n`} </Text>
                            <TouchableOpacity onPress={linkC}>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 14,
                                color: "#5cc27b",
                                textDecorationLine: "underline"
                            }}>바로가기</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </ScrollView>
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
    
            </SafeAreaView>
        </>
    )
}

const Tab = createMaterialTopTabNavigator();
const states = [
    {
        id: "금연 직후",
        stats: "-입냄새가 나지 않습니다\n-음식 맛이 좋아집니다\n-치아가 하얗고 건강해집니다\n-후각이 돌아옵니다\n-옷과 머리에 나쁜 냄새가 사라집니다\n-계단을 오를 때 숨이 덜 차게 됩니다\n-손가락의 착색이 사라집니다"
    },
    {
        id: "금연한지 20분 경과",
        stats: "-혈압과 맥박이 정상으로 떨어집니다\n -손발의 체온이 정상으로 증가합니다"
    },
    {
        id: "금연한지 8시간 경과",
        stats: "-혈액 속 일산화탄소 양이 정상으로 떨어집니다\n -혈액 속 산소량이 정상치로 올라갑니다"
    },
    {
        id: "금연한지 한달 경과",
        stats: "-혈액순환이 좋아지고 폐기능이 증가합니다"
    },
    {
        id: "금연한지 1~9개월",
        stats: "-기침, 호흡곤란 등이 감소합니다\n -폐의 섬모가 정상기능을 회복하여 점액 배출이 증가하고, 폐가 깨끗해지며 감염위험이 감소합니다"
    },
    {
        id: "금연한지 1년 경과",
        stats: "-관상동맥질환(심장병)에 걸릴 위험이 흡연자의 절반으로 감소합니다"
    },
    {
        id: "금연한지 5년 경과",
        stats: "-구강암, 후두암, 식도암, 방광암 위험이 절반으로 감소합니다\n -자궁경부암 발병 위험은 비흡연자 수준으로 감소합니다"
    }

]
export function ChatbotThree({ navigation }) {

    return (
        <>
            <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
                <StatusBar barStyle="dark-content" />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Header navigation={navigation} title="금연 리포트" />
                <Tab.Navigator
                    initialRouteName="status"
                    style={{
                        justifyContent: "center",
                    }}
                    sceneContainerStyle={{
                        borderTopColor: "#cccccc",
                        borderTopWidth: 1
                    }}
                    tabBarOptions={{
                        activeTintColor: "#303030",
                        labelStyle: { fontSize: 16, fontFamily: "NunitoSans-Bold" },
                        indicatorStyle: { height: 1.5, backgroundColor: "#5cc27b" },
                    }}
                >
                    <Tab.Screen
                        name="status"
                        component={TabOne}
                        options={{ tabBarLabel: "건강 상태" }}
                    />
                    <Tab.Screen
                        name="failure"
                        component={TabTwo}
                        options={{ tabBarLabel: "평과 결과 분석" }}
                    />
                </Tab.Navigator>
            </SafeAreaView>
        </>
    )
}
const nicoData = [
    {

        content: "현재 니코틴 의존도가 아주 낮은 수준입니다.\n니코틴 의존도는 흡연량이 많아지거나 흡연한 시간이 길면 길수록 더 높아지게 되어 있습니다.\n‘지금은 좀 피우고 나중에 완전 끊어야지’, ‘나는 하루에 얼마 피지 않으니깐 괜찮아’라고 생각할 수 있는데,\n이렇게 지속적으로 늘리다보면 나중에 완전 금연하는 것이 지금보다 훨씬 더 힘들 것입니다.\n그래서 가장 쉽게 금연할 수 있는 때가 바로 지금입니다.\n점점 니코틴 의존도가 늘어가기 전에 지금 바로 완전 금연하세요!\n"
    },
    {

        content: "현재 니코틴 중독으로 인한 구체적인 증상은 나타나지 않습니다.\n아직은 큰 고통 없이 담배를 끊을 수 있으리라 생각됩니다.\n대신 쉽게 다시 담배를 피우게 되어 결국 금연에 실패하는 경우도 많겠습니다.\n장기간 담배를 피우다 보면 누구라도 심리적, 신체적 의존을 일으키게 됩니다. 일단 의존에 빠지게 되면 자신을 조절하기 힘들어지므로 담배를 끊는 것은 쉽지 않은 일이 되어 버립니다.\n잠재적인 중독의 위험성과 건강에 해가 된다는 점을 생각하면 지금이 바로 금연을 시작해야 할 시기인 것입니다\n"
    },
    {

        content: "정도의 차이는 있겠으나 심리적, 신체적으로 니코틴에 대한 의존이 생긴 상태입니다.\n니코틴은 뇌에 흡수되어 여러 가지 약리 작용을 일으키는 물질입니다.\n하지만, 신경에 작용하는 약물 중에는 중독을 일으키기 쉬운 것들이 있으며,\n니코틴도 예외는 아닙니다. 니코틴이 몸에서 빠져나가 혈중 농도가 떨어지면 금단증상을 경험하게 됩니다.\n‘한 대만 피웠으면…’ 하는 조바심도 금단 증상의 한 모습일 뿐입니다.\n담배를 끊기 어려운 이유는 이처럼 금단증상과 내 마음이 뒤섞여 버려 생활의 일부가 되어버리기 때문입니다.\n갑자기 담배를 중단하면, 금단증상으로 금연을 지속하기 어려워질 수 있으므로,\n니코틴 패치 등을 적절히 사용하는 것이 도움이 됩니다.\n"
    },
    {
        content: ""
    }
]
function TabOne({ navigation }) {

    const [user, setUser] = useState("");
    const [num, setNum] = useState(0);
    const [nicotine, setNicotine] = useState(0)
    const [word, setWord] = useState("")
    const [challengenicotine, setchallengenicotine] = useState(false)

    const [main, setMain] = useState("")
    const [mainStr, setMainStr] = useState("")
    const [sub, setSub] = useState("")
    const [subStr, setSubStr] = useState("")
    const [sub2, setSub2] = useState("")
    const [sub2Str, setSub2Str] = useState("")
    const [challengesmoke, setchallengesmoke] = useState(false)
    const [smokingOrNot,setSmokingOrNot]=useState(false)
    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        if (user) {
            getSmokeInfo()
            getNicotineInfo()
            getSolutionInfo()
        }
    }, [user])

    async function getSmokeInfo() {
        var smokingTime
        await firestore().collection("UserInfo").doc(user.uid).get().then(doc => {
            smokingTime = doc.data().SmokingTime
            setSmokingOrNot(doc.data().smoker)
        })
        if(smokingTime[1]===1){
            smokingTime[0]=smokingTime[0]-1
            smokingTime[1]=12
        }else{
            smokingTime[1]=smokingTime[1]-1
        }
        console.log(smokingTime,"this")
        
        var a = moment()

        
        var y = moment(smokingTime)
        var durationMinute = moment.duration(a.diff(y)).asMinutes()

        console.log(durationMinute,"dfqoiwefjpqwofjeo")
        if (durationMinute < 20) {
            setNum(0)
        } else if (durationMinute < 480) {
            setNum(1)
        } else if (durationMinute < 43200) {
            setNum(2)
        } else if (durationMinute < 388800) {
            setNum(3)
        } else if (durationMinute < 525600) {
            setNum(4)
        } else if (durationMinute < 2628000) {
            setNum(5)
        } else {
            setNum(6)
        }
    }
    async function getNicotineInfo() {
        var totals
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            totals = querySnapshot.size - 1
        })
        var total
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + totals).collection("ChallengeDetail").doc("니코틴 중독 평가하기").get().then(doc => {
            if (doc.data().stats == false) {
                setchallengenicotine(false),
                    console.log("false")
            } else {
                setchallengenicotine(true)
                total = doc.data().resNum
                var nico
                if (total >= 7) {
                    setNicotine(2)
                    setWord("Addicted")
                    nico = 2
                } else if (total >= 4) {
                    setNicotine(1)
                    setWord("Danger")
                    nico = 1
                } else {
                    setNicotine(0)
                    setWord("Low")
                    nico = 0
                }
                console.log(nicotine)
            }
        })

    }
    async function getSolutionInfo() {
        var totals
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            totals = querySnapshot.size - 1
        })

        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + totals).collection("ChallengeDetail").doc("내 흡연유형 파악하기").get().then(doc => {
            if (doc.data().stats === false) {
                setchallengesmoke(false)
            } else {
                setchallengesmoke(true)
                setMain(doc.data().main)
                setMainStr(doc.data().mainStr)
                setSub(doc.data().sub)
                setSubStr(doc.data().subStr)
                setSub2(doc.data().sub2)
                setSub2Str(doc.data().sub2Str)
            }
        })
    }
    const data = {
        labels: [main, sub, sub2],
        datasets: [
            {
                data: [85, 60, 32]
            }
        ]
    };
    return (
        <>
            <ScrollView style={{ backgroundColor: "#ffffff" }}>
                <View style={{ marginLeft: 32, marginRight: 32 }}>
                {smokingOrNot ? 
                <>
                <Image style={{ alignSelf: "center", marginTop: 32 }} source={require("../icon/badLung.png")} />
                <View style={{
                    marginTop: 28,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginBottom: 16
                }}>
                    <View style={{ width: 8, height: 8, backgroundColor: "#303030", borderRadius: 4, marginRight: 8 }} />
                    <Text style={{ fontFamily: "NunitoSans-Bold", fontSize: 14, color: "#303030" }}>흡연중 입니다</Text>
                </View>
                <View style={{
                        marginTop: 16,
                        marginBottom: 16
                    }}>
                        <Text style={{
                            fontFamily: "NunitoSans-Regular",
                            fontSize: 16,
                            color: "#303030",
                            opacity: 0.7,
                            lineHeight: 26
                        }}>건강이 나빠집니다 {`\n`}{`\n`}- 심혈관 질환 증가{`\n`}- 뇌졸증 위험 증가 {`\n`}- 호흡기 문제 {`\n`}- 임신 합병증 {`\n`}- 생식 건강 문제</Text>
                    </View>
                </>
                :
                <>
                <Image style={{ alignSelf: "center", marginTop: 32 }} source={require("../icon/lung.png")} />
                    <View style={{
                        marginTop: 28,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        marginBottom: 16
                    }}>
                        <View style={{ width: 8, height: 8, backgroundColor: "#303030", borderRadius: 4, marginRight: 8 }} />
                        <Text style={{ fontFamily: "NunitoSans-Bold", fontSize: 14, color: "#303030" }}>{states[num].id}</Text>
                    </View>
                    <View style={{
                        marginTop: 16,
                        marginBottom: 16
                    }}>
                        <Text style={{
                            fontFamily: "NunitoSans-Regular",
                            fontSize: 16,
                            color: "#303030",
                            opacity: 0.7,
                            lineHeight: 26
                        }}>{states[num].stats}</Text>
                    </View>
                    </>

                }
                    

              
                </View>
                <View style={{zIndex: 0}}>
                    <View style={{ height: 1, backgroundColor: "#cccccc", width: WIDTH }} />
                    {challengenicotine ?
                        <></>
                        :
                        <View style={{ width: WIDTH, height: "100%", position: "absolute", left: 0, top: 0, backgroundColor: "#000000", opacity: 0.7, alignItems: "center", zIndex: 1, justifyContent: "center" }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Bold",
                                color: "#ffffff"
                            }}>챌린지를 참여해야 확인할 수 있습니다.</Text>
                        </View>
                    }
                    <View style={{ marginTop: 16, marginLeft: 32, marginRight: 32, zIndex: 0 }}>
                        <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 18
                        }}>
                            <Text style={{ color: "#303030" }}>니코틴 중독 정도: </Text>
                            <Text style={{ color: nicotine === 0 ? "#5cc27b" : (nicotine === 1 ? "#f6f600" : "#ff0400") }}>{word}</Text>
                        </Text>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#5CC27B', '#F6F600', '#FF0400']} style={{ width: "100%", height: 19, borderRadius: 28, marginTop: 16 }} />
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingLeft: 4,
                            paddingRight: 4,
                            marginTop: 8
                        }}>
                            <Text style={{
                                fontSize: 14,
                                width: 60,
                                fontFamily: nicotine === 0 ? "NunitoSans-Bold" : "NunitoSans-Regular",
                                color: nicotine === 0 ? "#5cc27b" : "#303030"
                            }}>Low</Text>
                            <Text style={{
                                fontSize: 14,
                                width: 60,
                                fontFamily: nicotine === 1 ? "NunitoSans-Bold" : "NunitoSans-Regular",
                                color: nicotine === 1 ? "#f6f600" : "#303030"
                            }}>Danger</Text>
                            <Text style={{
                                fontSize: 14,
                                width: 60,
                                fontFamily: nicotine === 2 ? "NunitoSans-Bold" : "NunitoSans-Regular",
                                color: nicotine === 2 ? "#ff0400" : "#303030"
                            }}>Addicted</Text>
                        </View>
                        <View style={{
                            marginTop: 16,
                            marginBottom: 16
                        }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 16,
                                color: "#303030",
                                opacity: 0.7,
                                lineHeight: 26
                            }}>{nicoData[nicotine].content}</Text>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: "#cccccc", width: WIDTH }} />
                </View>
                <View style={{ zIndex: 0 }}>
                    {challengesmoke ?
                        <></>
                        :
                        <View style={{ position: "absolute", width: WIDTH, height: "100%", left: 0, top: 0, backgroundColor: "#000000", opacity: 0.7, alignItems: "center", zIndex: 1, justifyContent: "center" }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Bold",
                                color: "#ffffff"
                            }}>챌린지를 참여해야 확인할 수 있습니다.</Text>
                        </View>
                    }
                    <BarChart
                        style={{
                            marginTop: HEIGHT * 0.03,
                            alignSelf: "center",
                            borderWidth: 1,
                            borderColor: "#5cc27b",
                            padding: 12
                        }}
                        width={WIDTH * 0.8}
                        height={180}
                        data={data}
                        chartConfig={{
                            backgroundColor: "#ffffff",
                            backgroundGradientFrom: "#ffffff",
                            backgroundGradientTo: "#ffffff",
                            fillShadowGradient: "#5cc27b",
                            fillShadowGradientOpacity: 1,
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                        }}
                        showBarTops={false}
                        withInnerLines={false}
                        fromZero={true}
                    />
                    <View style={{ marginRight: 32, marginLeft: 32, marginTop: 16 }}>
                        <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 18
                        }}>
                            <Text style={{ color: "#303030" }}>주요 흡연 요인: </Text>
                            <Text style={{ color: "#5cc27b" }}>{main}</Text>
                        </Text>
                        <View style={{
                            marginTop: 16,
                            marginBottom: 16
                        }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 16,
                                color: "#303030",
                                opacity: 0.7,
                                lineHeight: 26
                            }}>{mainStr}</Text>
                        </View>
                        <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 18
                        }}>
                            <Text style={{ color: "#303030" }}>보조 흡연 요인: </Text>
                            <Text style={{ color: "#FFB83D" }}>{sub} {sub2}</Text>
                        </Text>
                        <View style={{
                            marginTop: 16,
                            marginBottom: 16
                        }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                marginTop: HEIGHT * 0.025,
                                fontSize: 16
                            }}>{subStr}</Text>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                marginTop: HEIGHT * 0.025,
                                fontSize: 16
                            }}>{sub2Str}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

function TabTwo({ navigation }) {
    const selfesteem = [
        {
            num: 1,
            degree: "높음"
        },
        {
            num: 2,
            degree: "높음"
        },
        {
            num: 3,
            degree: "높음"
        },
    ]
    const stress = [
        {
            num: 1,
            degree: "높음"
        },
        {
            num: 2,
            degree: "높음"
        },
        {
            num: 3,
            degree: "높음"
        },
    ]
    const alcohol = [
        {
            num: 1,
            degree: "높음"
        },
        {
            num: 2,
            degree: "높음"
        },
        {
            num: 3,
            degree: "높음"
        },
    ]
    const [user, setUser] = useState("")
    const [resultsA, setResultsA] = useState("-")
    const [resultA, setResultA] = useState(0)
    const [resultAcontent, setResultAcontent] = useState("-")
    const [resultsS, setResultsS] = useState("-")
    const [resultS, setResultS] = useState(0)
    const [resultScontent, setResultScontent] = useState("-")
    const [resultsE, setResultsE] = useState("-")
    const [resultE, setResultE] = useState(0)
    const [resultEcontent, setResultEcontent] = useState("-")
    const [itemA, setItemA] = useState([])
    const [itemE, setItemE] = useState([])
    const [itemS, setItemS] = useState([])
    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        if (user) {
            getMonthTotal()
        }
        console.log(resultA)
    }, [user])

    async function getMonthTotal() {
        var total
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot => {
            total = querySnapshot.size - 1
        })
        console.log(total)
        var month
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).get().then(doc => {
            month = doc.data().month
        })
        console.log(month,"month")
        var checkA
        var checkS
        var checkE
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").doc(String(month)).get().then(doc => {
            checkA=doc.data().stats
        })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").doc(String(month)).get().then(doc => {
            checkS=doc.data().stats
        })
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc(String(month)).get().then(doc => {
            checkE=doc.data().stats
        })
        console.log(checkA,checkE,checkS)
        if(checkA){
            getInfoAlcohol(total, month)
        }
        if(checkE){
            getInfoEsteem(total, month)
        }
        if(checkS){
            getInfoStress(total, month)
        }
       
    }
    var RA=0
    var RS=0
    var RE=0
    async function getInfoAlcohol(total, month) {
        
        console.log(month, total)
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").doc(String(month)).get().then(doc => {
            setResultA(doc.data().resultNum)
            setResultsA(doc.data().resultWord)
            setResultAcontent(doc.data().result)
            RA=doc.data().resultNum
        })
        if(RA===0){
            setResultA(0)
        }else{
            setResultA(RA*0.025)
        }
        const list = []
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("알콜중독 평가(월1회)").collection("alcohol").onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                list.push({
                    degree: doc.data().stats,
                    num: doc.id
                })
            })
            setItemA(list)
        })
        console.log("Complete")
    }
    async function getInfoStress(total, month) {

        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").doc(String(month)).get().then(doc => {
            // setResultS(doc.data().resultNum)
            setResultsS(doc.data().resultWord)
            setResultScontent(doc.data().result)
            RS=doc.data().resultNum
        })
        const list = []
        if(RS===0){
            setResultS(0)
            console.log("why?",RS)
        }else{
            setResultS(RS*0.01538)
            console.log(RS*0.01538,"RS")
        }
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("스트레스 평가(월1회)").collection("stress").onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                list.push({
                    degree: doc.data().stats,
                    num: doc.id
                })
            })
            setItemS(list)
        })
    }
    async function getInfoEsteem(total, month) {

        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc(String(month)).get().then(doc => {
            // setResultE(doc.data().resultNum)
            setResultsE(doc.data().resultWord)
            setResultEcontent(doc.data().result)
            RE=doc.data().resultNum
        })
        if(RE===0){
            setResultE(0)
        }else{
            setResultE(RE*0.02)
        }
        const list = []
        console.log(resultE)
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                list.push({
                    degree: doc.data().stats,
                    num: doc.id
                })
            })
            setItemE(list)
        })
    }
    return (
        <>
            <ScrollView style={{ backgroundColor: "#ffffff", flex: 1 }}>
                <View>
                    {resultsA === "-" && resultsE === "-" && resultsS === "-" ?
                        <View style={{ width: WIDTH, height: "100%", position: "absolute", left: 0, top: 0, backgroundColor: "#000000", opacity: 0.7, alignItems: "center", zIndex: 1, justifyContent: "center" }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Bold",
                                color: "#ffffff"
                            }}>챌린지를 참여해야 확인할 수 있습니다.</Text>
                        </View>
                        :
                        <></>
                    }
                    <View style={{ marginLeft: 32, marginRight: 32 }}>
                        <Text style={{
                            marginTop: 32,
                            fontSize: 18,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030"
                        }}>이번달 평가결과 요약</Text>
                        <View style={{
                            marginTop: 16,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingLeft: 16,
                            paddingRight: 16,
                            marginBottom: 32
                        }}>
                            <ProgressCircle size={72} color={resultsE === "Good" ? "#5cc27b" : resultsE == "Normal" ? "#ffb83d" : "#fb5757"} borderWidth={0} thickness={5} unfilledColor="#E0E5EC" progress={resultE}>
                                <Text style={{
                                    flex: 0,
                                    position: "absolute",
                                    alignSelf: "center",
                                    top: 24,
                                    fontFamily: "NunitoSans-Bold",
                                    fontSize: 16
                                }}>{resultsE}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: "NunitoSans-Regular",
                                    color: "#303030",
                                    alignSelf: "center",
                                    marginTop: 8
                                }}>자기 효능감</Text>
                            </ProgressCircle>
                            <ProgressCircle size={72} color={resultsS === "Good" ? "#5cc27b" : resultsS == "Normal" ? "#ffb83d" : "#fb5757"} borderWidth={0} thickness={5} unfilledColor="#E0E5EC" progress={resultS}>
                                <Text style={{
                                    flex: 0,
                                    position: "absolute",
                                    alignSelf: "center",
                                    top: 24,
                                    fontFamily: "NunitoSans-Bold",
                                    fontSize: 16
                                }}>{resultsS}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: "NunitoSans-Regular",
                                    color: "#303030",
                                    alignSelf: "center",
                                    marginTop: 8
                                }}>스트레스</Text>
                            </ProgressCircle>
                            <ProgressCircle
                                size={72}
                                borderWidth={0}
                                thickness={5}
                                progress={resultA}
                                color={resultsA === "Good" ? "#5cc27b" : resultsA == "Normal" ? "#ffb83d" : "#fb5757"}
                                unfilledColor="#E0E5EC"
                            >
                                <Text style={{
                                    flex: 0,
                                    position: "absolute",
                                    alignSelf: "center",
                                    top: 24,
                                    fontFamily: "NunitoSans-Bold",
                                    fontSize: 16
                                }}>{resultsA}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: "NunitoSans-Regular",
                                    color: "#303030",
                                    alignSelf: "center",
                                    marginTop: 8
                                }}>알콜중독</Text>

                            </ProgressCircle>
                        </View>
                    </View>
                </View>
                <View>
                    {itemE.length >0 ?
                        <></>
                        :
                        <View style={{ width: WIDTH, height: "100%", position: "absolute", left: 0, top: 0, backgroundColor: "#000000", opacity: 0.7, alignItems: "center", zIndex: 1, justifyContent: "center" }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Bold",
                                color: "#ffffff"
                            }}>챌린지를 참여해야 확인할 수 있습니다.</Text>
                        </View>
                    }
                    <Text style={{
                        marginTop: 8,
                        marginBottom: 16,
                        marginLeft: 32,
                        fontSize: 18,
                        fontFamily: "NunitoSans-Bold",
                        color: "#303030"
                    }}>자기 효능감 평가</Text>
                    <FlatList
                        style={{
                            marginLeft: 32,
                        }}
                        data={itemE}
                        renderItem={({ item }) => (
                            <>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start"
                                }}>
                                    <View style={{
                                        width: "22%",
                                        height: 30,
                                        borderColor: "#77bf81",
                                        borderLeftWidth: 2,
                                        borderRightWidth: 2,
                                        borderTopWidth: 2,
                                        backgroundColor: "#ffffff",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "NunitoSans-Bold",
                                            fontSize: 14,
                                            color: "#303030"
                                        }}>{item.num}회</Text>
                                    </View>
                                    <View style={{
                                        width: "55%",
                                        height: 30,
                                        borderColor: "#77bf81",
                                        borderRightWidth: 2,
                                        borderTopWidth: 2,
                                        backgroundColor: "#ffffff",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        {item.degree === false ?
                                            <Text style={{
                                                fontFamily: "NunitoSans-Bold",
                                                fontSize: 14,
                                                color: "#5cc27b",
                                            }}>-</Text>
                                            :
                                            <Text style={{
                                                fontFamily: "NunitoSans-Bold",
                                                fontSize: 14,
                                                color: "#5cc27b"
                                            }}>성공</Text>
                                        }
                                    </View>
                                </View>
                            </>
                        )}
                    />
                    {itemE.length > 0 ? <View style={{ width: "70.9%", height: 2, backgroundColor: "#5cc27b", marginLeft: 32 }} /> : <></>}
                    <View style={{
                        marginTop: 32,
                        marginBottom: 32,
                        marginLeft: 32,
                        marginRight: 32
                    }}>
                        <Text style={{
                            fontFamily: "NunitoSans-Regular",
                            fontSize: 16,
                            color: "#303030",
                            opacity: 0.7,
                            lineHeight: 26
                        }}>{resultEcontent}</Text>
                    </View>
                </View>
                <View>
                    {itemS.length > 0 ?
                        <></>
                        :
                        <View style={{ width: WIDTH, height: "100%", position: "absolute", left: 0, top: 0, backgroundColor: "#000000", opacity: 0.7, alignItems: "center", zIndex: 1, justifyContent: "center" }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Bold",
                                color: "#ffffff"
                            }}>챌린지를 참여해야 확인할 수 있습니다.</Text>
                        </View>
                    }
                    <Text style={{
                        marginTop: 8,
                        marginBottom: 16,
                        marginLeft: 32,
                        fontSize: 18,
                        fontFamily: "NunitoSans-Bold",
                        color: "#303030"
                    }}>스트레스 평가</Text>
                    <FlatList
                        style={{
                            marginLeft: 32,
                        }}
                        data={itemS}
                        renderItem={({ item }) => (
                            <>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start"
                                }}>
                                    <View style={{
                                        width: "22%",
                                        height: 30,
                                        borderColor: "#77bf81",
                                        borderLeftWidth: 2,
                                        borderRightWidth: 2,
                                        borderTopWidth: 2,
                                        backgroundColor: "#ffffff",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "NunitoSans-Bold",
                                            fontSize: 14,
                                            color: "#303030"
                                        }}>{item.num}회</Text>
                                    </View>
                                    <View style={{
                                        width: "55%",
                                        height: 30,
                                        borderColor: "#77bf81",
                                        borderRightWidth: 2,
                                        borderTopWidth: 2,
                                        backgroundColor: "#ffffff",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        {item.degree === false ?
                                            <Text style={{
                                                fontFamily: "NunitoSans-Bold",
                                                fontSize: 14,
                                                color: "#5cc27b"
                                            }}>-</Text>
                                            :
                                            <Text style={{
                                                fontFamily: "NunitoSans-Bold",
                                                fontSize: 14,
                                                color: "#5cc27b"
                                            }}>성공</Text>
                                        }
                                    </View>
                                </View>
                            </>
                        )}
                    />
                    {itemS.length > 0 ? <View style={{ width: "70.9%", height: 2, backgroundColor: "#5cc27b", marginLeft: 32 }} /> : <></>}
                    <View style={{
                        marginTop: 32,
                        marginBottom: 32,
                        marginLeft: 32,
                        marginRight: 32
                    }}>
                        <Text style={{
                            fontFamily: "NunitoSans-Regular",
                            fontSize: 16,
                            color: "#303030",
                            opacity: 0.7,
                            lineHeight: 26
                        }}>{resultScontent}</Text>
                    </View>
                </View>
                <View>
                    {itemA.length > 0 ?
                        <></>
                        :
                        <View style={{ width: WIDTH, height: "100%", position: "absolute", left: 0, top: 0, backgroundColor: "#000000", opacity: 0.7, alignItems: "center", zIndex: 1, justifyContent: "center" }}>
                            <Text style={{
                                fontFamily: "NunitoSans-Bold",
                                color: "#ffffff"
                            }}>챌린지를 참여해야 확인할 수 있습니다.</Text>
                        </View>
                    }
                    <Text style={{
                        marginTop: 8,
                        marginBottom: 16,
                        marginLeft: 32,
                        fontSize: 18,
                        fontFamily: "NunitoSans-Bold",
                        color: "#303030"
                    }}>알콜중독 평가</Text>
                    <FlatList
                        style={{
                            marginLeft: 32,
                        }}
                        data={itemA}
                        renderItem={({ item }) => (
                            <>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start"
                                }}>
                                    <View style={{
                                        width: "22%",
                                        height: 30,
                                        borderColor: "#77bf81",
                                        borderLeftWidth: 2,
                                        borderRightWidth: 2,
                                        borderTopWidth: 2,
                                        backgroundColor: "#ffffff",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "NunitoSans-Bold",
                                            fontSize: 14,
                                            color: "#303030"
                                        }}>{item.num}회</Text>
                                    </View>
                                    <View style={{
                                        width: "55%",
                                        height: 30,
                                        borderColor: "#77bf81",
                                        borderRightWidth: 2,
                                        borderTopWidth: 2,
                                        backgroundColor: "#ffffff",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        {item.degree === false ?
                                            <Text style={{
                                                fontFamily: "NunitoSans-Bold",
                                                fontSize: 14,
                                                color: "#5cc27b"
                                            }}>-</Text>
                                            :
                                            <Text style={{
                                                fontFamily: "NunitoSans-Bold",
                                                fontSize: 14,
                                                color: "#5cc27b"
                                            }}>성공</Text>
                                        }
                                    </View>
                                </View>
                            </>
                        )}
                    />
                    {itemA.length > 0 ? <View style={{ width: "70.9%", height: 2, backgroundColor: "#5cc27b", marginLeft: 32 }} /> : <></>}
                    <View style={{
                        marginTop: 32,
                        marginBottom: 32,
                        marginLeft: 32,
                        marginRight: 32
                    }}>
                        <Text style={{
                            fontFamily: "NunitoSans-Regular",
                            fontSize: 16,
                            color: "#303030",
                            opacity: 0.7,
                            lineHeight: 26
                        }}>{resultAcontent}</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export function ChatbotFour({ navigation }) {
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const onOne = () => {
        setOne(true);
        setTimeout(() => {
            navigation.navigate("ChatbotWell");
            setOne(false);
        }, 200)
    }
    const onTwo = () => {
        setTwo(true);
        setTimeout(() => {
            navigation.navigate("ChatbotCham")
            setTwo(false);
        }, 200)
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Header navigation={navigation} title="금연정보" />
                <ScrollView>
                    <TouchableOpacity onPress={onOne} style={[
                        style.box, {
                            backgroundColor: one ? "#5cc27b" : "#ffffff",
                            borderWidth: one ? 0 : 1,
                        }
                    ]}>
                        <Text style={[
                            style.bold, {
                                color: one ? "#ffffff" : "#303030"
                            }
                        ]}>웰부트린</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onTwo} style={[
                        style.box, {
                            backgroundColor: two ? "#5cc27b" : "#ffffff",
                            borderWidth: two ? 0 : 1,
                        }
                    ]}>
                        <Text style={[
                            style.bold, {
                                color: two ? "#ffffff" : "#303030"
                            }
                        ]}>챔픽스</Text>
                    </TouchableOpacity>
                </ScrollView>
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
    
            </SafeAreaView>
        </>
    )
}
export function ChatbotWell({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const onOne = () => {
        setOne(true);
        setTimeout(() => {
            drugCheckOn()
            setOne(false);
        }, 200)
    }
    const onTwo = () => {
        setTwo(true);
        setTimeout(() => {
            drugCheckOff()
            setTwo(false);
        }, 200)
    }
    async function drugCheckOn(){
        const USER = await firebase.auth().currentUser
        console.log(USER.uid)
        var check
        await firestore().collection("UserInfo").doc(USER.uid).get().then(doc=>{
            check=doc.data().drug
        })
        if(check==="well"||check==="cham"){
            Alert.alert(
                '기존 복약 정보가 있습니다.',
                '새로운 복약 정보를 등록하면 \n기존 정보가 사라집니다.',
                [
                    {
                        text: '취소', onPress: () => console.log('CANCEL Pressed')
                    },
                    {
                        text: '등록하기', onPress: () => drugOn(USER)
                    }
                ]
            )
        }else{
            drugOn(USER)
        }
    }
    async function drugOn(USER){
        setLoading(true)
        firestore().collection("UserInfo").doc(USER.uid).update({
            drug:"well"
        })
        var a = moment().toArray()

        if (a[1] === 12) {
            a[0]=a[0]+1
            a[1] = 1
            
        } else {
            a[1] = a[1] + 1
        }
        console.log(a)
        var i
        for(i=0;i<a[2]+84;i++){
            
            a=moment().add(i,"days")
            
            a=a.toArray()
            if (a[1] === 12) {
                a[0]=a[0]+1
                a[1] = 1
            } else {
                a[1] = a[1] + 1
            }
            
            console.log(a,"ㄹㄹㄹㄹ")
            if(a[1]<10){
                if(a[2]<10){
                    console.log("first")
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-0"+a[2]).update({
                        drugA:"복용일입니다. 복용법에 따라 섭취해 주세요."
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-0"+a[2]).set({
                            drugA:"복용일입니다. 복용법에 따라 섭취해 주세요."
                        })
                    )
                }else{
                    console.log("se")
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-"+a[2]).update({
                        drugA:"복용일입니다. 복용법에 따라 섭취해 주세요."
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-"+a[2]).set({
                            drugA:"복용일입니다. 복용법에 따라 섭취해 주세요."
                        })
                    )
                }
                
            }else{
                if(a[2]<10){
                    console.log("th")
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-0"+a[2]).update({
                        drugA:"복용일입니다. 복용법에 따라 섭취해 주세요."
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-0"+a[2]).set({
                            drugA:"복용일입니다. 복용법에 따라 섭취해 주세요."
                        })
                    )
                }else{
                    console.log("firsfft")
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).update({
                        drugA:"복용일입니다. 복용법에 따라 섭취해 주세요."
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).set({
                            drugA:"복용일입니다. 복용법에 따라 섭취해 주세요."
                        })
                    )
                }
                
            }
            
        }
        setLoading(false)
        
        
        Alert.alert("복약 등록되었습니다.")
        // navigation.navigate("Home")
    }
    async function drugCheckOff(){
        const USER = await firebase.auth().currentUser
        console.log(USER.uid)
        var check
        await firestore().collection("UserInfo").doc(USER.uid).get().then(doc=>{
            check=doc.data().drug
        })
        if(check==="cham"){
            Alert.alert("챔픽스를 복용중입니다.")
        }else{
            drugOff(USER)
        }
        
    }
    async function drugOff(USER){
        
        var a = moment().toArray()

        if (a[1] === 12) {
            a[0]=a[0]+1
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }
        firestore().collection("UserInfo").doc(USER.uid).update({
            drug:false
        })
        var i
        for(i=0;i<a[2]+84;i++){
            
            a=moment().add(i,"days")
              
            a=a.toArray()
            if (a[1] === 12) {
                a[0]=a[0]+1
                a[1] = 1
            } else {
                a[1] = a[1] + 1
            }
            

            if(a[1]<10){
                if(a[2]<10){
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-0"+a[2]).update({
                        drugA:""
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-0"+a[2]).set({
                            drugA:""
                        })
                    )
                }else{
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-"+a[2]).update({
                        drugA:""
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-"+a[2]).set({
                            drugA:""
                        })
                    )
                }
                
            }else{
                if(a[2]<10){
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-0"+a[2]).update({
                        drugA:""
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-0"+a[2]).set({
                            drugA:""
                        })
                    )
                }else{
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).update({
                        drugA:""
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).set({
                            drugA:""
                        })
                    )
                }
                
            }
            
        }
        
        
        Alert.alert("복약 등록 취소되었습니다.")
        // navigation.navigate("Home")
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <Header navigation={navigation} title="웰부트린" />
                {loading ? 
                <ActivityIndicator style={{ marginVertical: 15 }} size="large" color="#5cc27b" /> 
                :
                <ScrollView>
                    <View style={{ paddingHorizontal: "8%" }}>
                    <Text style={{
                                        fontFamily: "NunitoSans-Bold",
                                        fontSize: 16,
                                        color: "#303030",
                                        marginTop: 32,
                                        marginBottom: 16
                                    }}>1. 부프로피온 (Bupropion) 웰부트린서방정®</Text>
                                     <Image source={require('../icon/well.png')}  alignItems= "center"
                            justifyContent= "center"
                            alignSelf= "center" resizeMode="contain" style={{ width: 200, height: 95 }} />
                                    <Text style={{
                                        fontSize: 14,
                                        fontFamily: "NunitoSans-Regular",
                                        color: "#303030"
                                    }}> 처음 6일간은 150mg을 1일 1회 투여한 후, 7일 이후에는 150mg씩 1일 2회 투여한다. 투여간격은 최소 8시 간이며, 투여기간은 최소 7주다. 1회 투여량은 150mg, 1일 투여량은 300mg을 초과해서는 안 된다. 약물이 장시간에 걸쳐 서서히 방출되는 서방정이므로 씹거나 분할해서 복용하면 안 된다.</Text>
                        <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 14,
                            color: "#5cc27b",
                            marginTop: 32,
                            marginBottom: 16
                        }}>복용방법</Text>
               <Text style={{
                                        fontSize: 14,
                                        fontFamily: "NunitoSans-Regular",
                                        color: "#303030"
                                    }}>  니코틴 의존을 치료하기 위한 단기간의 보조요법으로 금연 일주일 전부터 복용 시작하여 7~12주간 복용합니다 그 이상 복용할 경우에는 전문의와 상담을 통해 결정합니다.
                                    </Text>
                                    <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 14,
                            color: "#5cc27b",
                            marginTop: 32,
                            marginBottom: 16
                        }}>부작용</Text>
                         <Text style={{
                                        fontSize: 14,
                                        fontFamily: "NunitoSans-Regular",
                                        color: "#303030"
                                    }}>   두통, 오심, 구강건조 및 갈증, 변비, 수면장애, 구토, 식욕변화, 초조 등

                                    </Text>
                        <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 14,
                            color: "#5cc27b",
                            marginTop: 32,
                            marginBottom: 16
                        }}>금기증</Text>
                         <Text style={{
                                        fontSize: 14,
                                        fontFamily: "NunitoSans-Regular",
                                        color: "#303030"
                                    }}>자살성향 증가보고 {`\n`}
                                    임산부 및 수유부{`\n`}
                                    18세 미만 소아 및 청소년{`\n`}
                                    약 성분에 과민증이 있는 환자{`\n`}
                                    발작병력 환자{`\n`}
                                    중추신경계에 종양이 있는 환자{`\n`}
                                    알콜 또는 진정약물을 갑자기 중단한자{`\n`}
                                    대식증 또는 신경성 식욕부진 환자{`\n`}
                                    MAO 억제제 투여중인 환자{`\n`}
                                    </Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:32}}>
                    <TouchableOpacity onPress={onOne} style={
                        {width:100,height:35, borderRadius: 28,
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                            borderColor: "#5cc27b",
                            backgroundColor: one ? "#5cc27b" : "#ffffff",
                            borderWidth: one ? 0 : 1,
                        }
                    }>
                        <Text style={[
                            style.bold, {
                                color: one ? "#ffffff" : "#303030"
                            }
                        ]}>복약등록</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onTwo} style={
                        {width:100,height:35, borderRadius: 28,
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                            borderColor: "#FB5757",
                            backgroundColor: two ? "#FB5757" : "#ffffff",
                            borderWidth: two ? 0 : 1,
                        }
                    }>
                        <Text style={[
                            style.bold, {
                                color: two ? "#ffffff" : "#303030"
                            }
                        ]}>복약 취소</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
                }
                
                
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
    
            </SafeAreaView>
        </>
    )
}
export function ChatbotCham({ navigation }) {
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    // const [user,setUser]=useState("");
    // useEffect(() => {
    //         auth().onAuthStateChanged(userAuth => {
    //             setUser(userAuth)
    //         })
    //     })
    const onOne = () => {
        setOne(true);
        setTimeout(() => {
            drugCheckOn()
            setOne(false);
        }, 200)
    }
    const onTwo = () => {
        setTwo(true);
        setTimeout(() => {
            drugCheckOff()
            setTwo(false);
        }, 200)
    }
    async function drugCheckOn(){
        const USER = await firebase.auth().currentUser
        console.log(USER.uid)
        var check
        await firestore().collection("UserInfo").doc(USER.uid).get().then(doc=>{
            check=doc.data().drug
        })
        if(check==="well"||check==="cham"){
            Alert.alert(
                '기존 복약 정보가 있습니다?',
                '새로운 복약 정보를 등록하면 \n기존 정보가 사라집니다',
                [
                    {
                        text: '취소', onPress: () => console.log('CANCEL Pressed')
                    },
                    {
                        text: '등록하기', onPress: () => drugOn(USER)
                    }
                ]
            )
        }else{
            drugOn(USER)
        }
    }
    async function drugOn(USER){
        var a = moment().toArray()
        firestore().collection("UserInfo").doc(USER.uid).update({
            drug:"cham"
        })
        if (a[1] === 12) {
            a[0]=a[0]+1
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }
        var i
        console.log(USER.uid)
        for(i=0;i<a[2]+84;i++){
            
            a=moment().add(i,"days")
              
            a=a.toArray()
            if (a[1] === 12) {
                a[0]=a[0]+1
                a[1] = 1
            } else {
                a[1] = a[1] + 1
            }
            
            console.log(a[0]+"-"+a[1]+"-"+a[2])
            if(a[1]<10){
                if(a[2]<10){
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-0"+a[2]).update({
                        drugB:"복용일입니다. 복용법에 따라 섭취해 주세요."
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-0"+a[2]).set({
                            drugB:"복용일입니다. 복용법에 따라 섭취해 주세요."
                        })
                    )
                }else{
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-"+a[2]).update({
                        drugB:"복용일입니다. 복용법에 따라 섭취해 주세요."
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-"+a[2]).set({
                            drugB:"복용일입니다. 복용법에 따라 섭취해 주세요."
                        })
                    )
                }
                
            }else{
                if(a[2]<10){
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-0"+a[2]).update({
                        drugB:"복용일입니다. 복용법에 따라 섭취해 주세요."
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-0"+a[2]).set({
                            drugB:"복용일입니다. 복용법에 따라 섭취해 주세요."
                        })
                    )
                }else{
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).update({
                        drugB:"복용일입니다. 복용법에 따라 섭취해 주세요."
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).set({
                            drugB:"복용일입니다. 복용법에 따라 섭취해 주세요."
                        })
                    )
                }
                
            }
            
        }
        
        
        Alert.alert("복약 등록되었습니다.")
        // navigation.navigate("Home")
    }
    async function drugCheckOff(){
        const USER = await firebase.auth().currentUser
        console.log(USER.uid)
        var check
        await firestore().collection("UserInfo").doc(USER.uid).get().then(doc=>{
            check=doc.data().drug
        })
        if(check==="well"){
            Alert.alert("웰부트린서방정을 복용중입니다.")
        }else{
            drugOff(USER)
        }
    
    }
    async function drugOff(USER){
        var a = moment().toArray()

        if (a[1] === 12) {
            a[0]=a[0]+1
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }
        firestore().collection("UserInfo").doc(USER.uid).update({
            drug:false
        })
        var i
        for(i=0;i<a[2]+84;i++){
            
            a=moment().add(i,"days")
              
            a=a.toArray()
            if (a[1] === 12) {
                a[0]=a[0]+1
                a[1] = 1
            } else {
                a[1] = a[1] + 1
            }
            
            console.log(a[0]+"-"+a[1]+"-"+a[2])
            if(a[1]<10){
                if(a[2]<10){
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-0"+a[2]).update({
                        drugB:""
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-0"+a[2]).set({
                            drugB:""
                        })
                    )
                }else{
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-"+a[2]).update({
                        drugB:""
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-"+a[2]).set({
                            drugB:""
                        })
                    )
                }
                
            }else{
                if(a[2]<10){
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-0"+a[2]).update({
                        drugB:""
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-0"+a[2]).set({
                            drugB:""
                        })
                    )
                }else{
                    firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).update({
                        drugB:""
                    }).catch(
                        firestore().collection("UserInfo").doc(USER.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).set({
                            drugB:""
                        })
                    )
                }
                
            }
            
        }
        
        
        Alert.alert("복약 등록 취소되었습니다.")
        // navigation.navigate("Home")
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Header navigation={navigation} title="챔픽스" />
                <ScrollView>
                    <View style={{ paddingHorizontal: "8%" }}>
                    <Text style={{
                                        fontFamily: "NunitoSans-Bold",
                                        fontSize: 16,
                                        color: "#303030",
                                        marginTop: 32,
                                        marginBottom: 16
                                    }}>2. 바레니클린 (Varenicline) 챔픽스®</Text>
                                      <Image source={require('../icon/cham.png')}  alignItems= "center"
                            justifyContent= "center"
                            alignSelf= "center" resizeMode="contain" style={{ width: 200, height: 95 }} />
                                    <Text style={{
                                        fontSize: 14,
                                        fontFamily: "NunitoSans-Regular",
                                        color: "#303030"
                                    }}>  권장 용량은 1~3일째에는 0.5mg씩 1일 1회, 4~7일째에는 0.5mg씩 1일 2회, 8일~투여 종료 시까지는 1mg 씩 1일 2회로 증량하면서 투여한다. 투여기간은 12주이며, 필요에 따라 12주간 더 투여할 수 있다.</Text>
                        <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 14,
                            color: "#5cc27b",
                            marginTop: 32,
                            marginBottom: 16
                        }}>복용방법</Text>
               <Text style={{
                                        fontSize: 14,
                                        fontFamily: "NunitoSans-Regular",
                                        color: "#303030"
                                    }}>  투여기간은 12 주 이며, 그 이상 복용할 경우에는 전문의와 상담을 통해 결정합니다. 첫 3-4일은 구역반응이 나타날 수 있기 때문에 식후에 충분한 양의 물과 함께 복용합니다.

                                    </Text>
                                    <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 14,
                            color: "#5cc27b",
                            marginTop: 32,
                            marginBottom: 16
                        }}>부작용</Text>
                         <Text style={{
                                        fontSize: 14,
                                        fontFamily: "NunitoSans-Regular",
                                        color: "#303030"
                                    }}>    구역, 구토, 수면 장애, 변비(복부팽만), 매스꺼움, 울렁거림, 특이한 꿈, 미각변화 등.


                                    </Text>
                        <Text style={{
                            fontFamily: "NunitoSans-Bold",
                            fontSize: 14,
                            color: "#5cc27b",
                            marginTop: 32,
                            marginBottom: 16
                        }}>금기증</Text>
                         <Text style={{
                                        fontSize: 14,
                                        fontFamily: "NunitoSans-Regular",
                                        color: "#303030"
                                    }}>임산부 및 수유중인 여성{`\n`}
18세 미만 소아 및 청소년{`\n`}
심장질환자{`\n`}
노인환자{`\n`}
심근경색{`\n`}
우울증 및 신경정신과 환자{`\n`}
행동변화, 초조, 우울증, 자살관념, 자살행동을 포함한 신경정신과 증상 악화 가능{`\n`}
                                    </Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:32}}>
                    <TouchableOpacity onPress={onOne} style={
                        {width:100,height:35, borderRadius: 28,
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                            borderColor: "#5cc27b",
                            backgroundColor: one ? "#5cc27b" : "#ffffff",
                            borderWidth: one ? 0 : 1,
                        }
                    }>
                        <Text style={[
                            style.bold, {
                                color: one ? "#ffffff" : "#303030"
                            }
                        ]}>복약등록</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onTwo} style={
                        {width:100,height:35, borderRadius: 28,
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                            borderColor: "#FB5757",
                            backgroundColor: two ? "#FB5757" : "#ffffff",
                            borderWidth: two ? 0 : 1,
                        }
                    }>
                        <Text style={[
                            style.bold, {
                                color: two ? "#ffffff" : "#303030"
                            }
                        ]}>복약 취소</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
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
    
            </SafeAreaView>
        </>
    )
}