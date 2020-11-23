import React, { useState, useEffect ,createContext,useContext} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    SafeAreaView,
    ScrollView,
    FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressCircle from "react-native-progress/Circle";
import {AdEventType,InterstitialAd,BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';


const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-1011958477260123/9244108660';


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const solution = StyleSheet.create({
    largeText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        marginLeft: "7%",
        marginBottom: 50,
        marginTop: 28,
        marginRight: 24
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
        borderColor: '#5CC27B',
        marginLeft: 38,
        marginRight: 38,
        marginBottom: HEIGHT * 0.024,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        width: "80%",
        height: 50,
        borderRadius: 28,
        backgroundColor: '#5CC27B',
        marginLeft: 38,
        marginRight: 38,
        marginBottom: HEIGHT * 0.024,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default function SelfEsteem({ navigation, Nextpage, Title,total,name}) {
    const quesone = "전혀 아니다"
    const questwo = "아니다"
    const questhree = "보통이다"
    const quesfour = "그렇다"
    const quesfive = "매우 그렇다"
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);
    const [five, setFive] = useState(false);
    const [select, setSelect] = useState([]);
    const [clear, setClear] = useState(false);
    const [result,setResult]=useState(0);


    const [user,setUser]=useState("")

    var count = 4;

    const pushone = () => {
        setSelect(select.concat(quesone));
        setTimeout(() => {
            navigation.navigate(Nextpage,{result:total+1});
        }, 200)
    }

    const filterone = () => {
        setSelect(select.filter(info => info !== quesone))
    }

    const pushtwo = () => {
        setSelect(select.concat(questwo));
        setTimeout(() => {
            navigation.navigate(Nextpage,{result:total+2,});
        }, 200)
    }

    const filtertwo = () => {
        setSelect(select.filter(info => info !== questwo))
    }

    const pushthree = () => {
        setSelect(select.concat(questhree));
        setTimeout(() => {
            navigation.navigate(Nextpage,{result:total+3,});
        }, 200)
    }

    const filterthree = () => {
        setSelect(select.filter(info => info !== questhree))
    }

    const pushfour = () => {
        setSelect(select.concat(quesfour));
        setTimeout(() => {
            navigation.navigate(Nextpage,{result:total+4,});
        }, 200)
    }

    const filterfour = () => {
        setSelect(select.filter(info => info !== quesfour))
    }

    const pushfive = () => {
        setSelect(select.concat(quesfive));
        setTimeout(() => {
            navigation.navigate(Nextpage,{result:total+5,});
        }, 200)
    }

    const filterfive = () => {
        setSelect(select.filter(info => info !== quesfive))
    }

    useEffect(()=>{
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        setResult(total)
        console.log(total,"Total")
    },[result])
    
    useEffect(() => {
        one === true ? count = count + 1 : count = count - 1;
        two === true ? count = count + 1 : count = count - 1;
        three === true ? count = count + 1 : count = count - 1;
        four === true ? count = count + 1 : count = count - 1;
        five === true ? count = count + 1 : count = count - 1;
        if ((count <= 2) && (count >= 0)) {
            setClear(true);
            console.log(select)
        } else {
            if (select[0] === "전혀 아니다") setOne(false);
            if (select[0] === "아니다") setTwo(false);
            if (select[0] === "보통이다") setThree(false);
            if (select[0] === "그렇다") setFour(false);
            if (select[0] === "매우 그렇다") setFive(false);
            setSelect(select.slice(1, select.length));
            console.log(select);
            setClear(false);
        }
    }, [one, two, three, four, five]);

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>자기효능감 평가</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={solution.largeText}>{Title}</Text>
                    {one === false ?
                        <TouchableOpacity onPressIn={pushone} onPress={() => setOne(!one)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>{quesone}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterone} onPress={() => setOne(!one)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>{quesone}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {two === false ?
                        <TouchableOpacity onPressIn={pushtwo} onPress={() => setTwo(!two)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>{questwo}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filtertwo} onPress={() => setTwo(!two)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>{questwo}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {three === false ?
                        <TouchableOpacity onPressIn={pushthree} onPress={() => setThree(!three)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>{questhree}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterthree} onPress={() => setThree(!three)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>{questhree}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {four === false ?
                        <TouchableOpacity onPressIn={pushfour} onPress={() => setFour(!four)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>{quesfour}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterfour} onPress={() => setFour(!four)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>{quesfour}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {five === false ?
                        <TouchableOpacity onPressIn={pushfive} onPress={() => setFive(!five)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>{quesfive}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterfive} onPress={() => setFive(!five)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>{quesfive}</Text>
                            </View>
                        </TouchableOpacity>
                    }
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

export function SelfEsteemMain({ navigation,route }) {
    const {UID}=route.params
    
    const [items,setItems]=useState([])
    async function getInfo(){
        var total
        await firestore().collection("UserInfo").doc(UID).collection("Challenge").get().then(querySnapshot=>{
            total=querySnapshot.size-1
        })
        const list=[]
        firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge"+total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").onSnapshot(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                list.push({
                    degree:doc.data().stats,
                    num:doc.id
                })
            })
            setItems(list)
        })
        console.log(items)
    }

    useEffect(()=>{
        getInfo()
    },[])
    
    const title = "자기효능감은 금연과 밀접한 관계가 있습니다. \n자기 효능감을 체크해 보세요."
    const data = [
        {
            num: 1,
            degree: "진행중"
        },
        {
            num: 2,
            degree: "진행중"
        },
        {
            num: 3,
            degree: "진행중"
        },
    ]
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>자기효능감 평가</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={[solution.largeText, {marginBottom: HEIGHT * 0.07, lineHeight: 30}]}>{title}</Text>
                    <Text style={{
                        marginLeft: "8%",
                        fontFamily: "NunitoSans-Bold",
                        fontSize: 16,
                        color: "#5cc27b",
                        marginBottom: HEIGHT * 0.025
                    }}>평가기록</Text>
                    <FlatList
                        style={{
                            marginLeft: "8%"
                        }}
                        data={items}
                        renderItem={({item}) => (
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
                                    {item.degree===false ?
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
                    {items.length >0 ? <View style={{width: "70.9%", height: 2, backgroundColor: "#5cc27b", marginLeft: "8%"}} /> : <></>}
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                <TouchableOpacity onPress={() => navigation.navigate("SelfEsteemZero")}>
                    <View style={{
                        width: "100%",
                        height: 60,
                        backgroundColor: '#5cc27b',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>시작하기</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}

export function SelfEsteemFinal({navigation,route}) {
    const [user,setUser]=useState()
    const [results,setResults]=useState(0)
    const [resultcontent,setResultcontent]=useState("")
    const result=route.params;
    const [name,setName]=useState("");
    var total=0
    
    
    useEffect(()=>{
        
      
        if(user){
         uploadInfo()   
        }
    },[user])
    async function uploadInfo(){
        var resultWord
        var content
        console.log(result.result,"final Score")
        if(Number(result.result)>=45){
            resultWord="Good"
            setResults("Good")
            content= "높은 자기효능감을 가지고있군요! \n금연을 성공할 수 있는 자신감이있는 상태입니다. \n챗봇 & 건강리포트에서 내 상태 변화와 \n다양한 정보를 알아보세요!"
            setResultcontent( "높은 자기효능감을 가지고있군요! \n금연을 성공할 수 있는 자신감이있는 상태입니다. \n챗봇 & 건강리포트에서 내 상태 변화와 \n다양한 정보를 알아보세요!")
        }else if(35<=Number( result.result)){
            resultWord="Normal"
            setResults("Normal")
            content="보통 수준의 자아 효능감을 가지고 있습니다. \n 이를 좀 더 높일 수 있도록 모든 일에 자신감을 가지시기 바랍니다."
            setResultcontent("보통 수준의 자아 효능감을 가지고 있습니다. \n 이를 좀 더 높일 수 있도록 모든 일에 자신감을 가지시기 바랍니다.")
            
        }else{
            resultWord="Bad"
            setResults("Bad")      
            content="낮은 자아 효능감을 가지고 있습니다. \n 항상 자신감 있는 생각과 행동이 필요합니다.\n 내적인 자신감의 강화와 더불어 세심한 생활관리가 필요합니다."
            setResultcontent("낮은 자아 효능감을 가지고 있습니다. \n 항상 자신감 있는 생각과 행동이 필요합니다.\n 내적인 자신감의 강화와 더불어 세심한 생활관리가 필요합니다.")
        }
        var a=moment().toArray()
        console.log(a)
        
        if(a[1]===12){
            a[1]=1
            a[0]=a[0]+1
        }else{
            a[1]=a[1]+1
        }
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").get().then(querySnapshot=>{
            total=querySnapshot.size-1
        })
        await firestore().collection("UserInfo").doc(user.uid).get().then(doc=>{
            setName(doc.data().name)
        })
        var thisMonth
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge"+total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").get().then(doc=>{
            thisMonth=doc.data().month
        })
        console.log(total)

        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge"+total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc(String(thisMonth)).update({
            stats:true,
            result:content,
            resultNum:result.result,
            resultWord:resultWord
        }).catch(()=>{
            firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge"+total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").collection("esteem").doc(String(thisMonth)).set({
                stats:true,
                result:content,
                
                resultNum:result.result,
                resultWord:resultWord
            })
        })

        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").doc("challenge"+total).collection("ChallengeDetail").doc("자기 효능감 평가(월1회)").update({
            visible:false,
            month:thisMonth+1
        })
        firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).update({
            challenge:"미션 진행"
        }).catch(()=>
        firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).set({
            challenge:"미션 진행"
        }))
    }
    useEffect(()=>{
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
    })
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>평가 결과</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={{
                        fontFamily: "NunitoSans-Bold",
                        fontSize: 18,
                        color: "#5cc27b",
                        alignSelf: "center",
                        marginTop: 20
                    }}>{name}님의 자기효능감 평가 결과</Text>
                    <ProgressCircle
                        style={{
                            marginTop: 20,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        size={160}
                        borderWidth={0}
                        thickness={10}
                        progress={Number(result.result)*0.02}
                        color={results === "Good" ? "#5cc27b" : results=="Normal" ? "#ffb83d" : "#fb5757"}
                        unfilledColor="#E0E5EC"
                    >
                        <Text style={{ position: "absolute", flex: 1, color: "#303030", textAlign: "center" }}>
                            <Text style={{ fontSize: 36, fontFamily: "NunitoSans-Bold" }}>{results}</Text>
                        </Text>
                    </ProgressCircle>
                    <Text style={{
                        fontFamily: "NunitoSans-Bold",
                        fontSize: 16,
                        color: "#303030",
                        lineHeight: 30,
                        alignSelf: "center",
                        textAlign: "center",
                        marginTop: 20
                    }}>{resultcontent}</Text>
                </ScrollView>
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