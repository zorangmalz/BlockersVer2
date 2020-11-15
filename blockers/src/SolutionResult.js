import React, { useEffect,useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const HEIGHT = Dimensions.get("screen").height;

export default function SolutionResult({navigation,route}) {
const sa="•	흡연은 자신에게 좀더 많은 에너지를 준다는 유형이다. \n •	피곤함을 느낄 때 깨어나기 위해, 계속적으로 활동하기 위해 담배를 이용한다.\n•	담배의 니코틴은 자극제 구실을 한다. 이런 사람은 힘을 얻기 위해 다른 방법을 찾아야 한다.\n•	충분한 숙면ㆍ휴식을 취하고 규칙적인 운동을 하면 금연에 큰 도움이 된다.\n•	나른할 때는 흡연 대신 산책을 한다.\n•	시원한 물을 많이 마시면 몸 속 니코틴 제거에 효과적이다.\n"
const sb="•	손 안에 아무것도 가지고 있지 않다는 단순한 느낌 때문에 흡연하는 사람들로 다른 유형보다 금연이 쉽다.\n•	담배를 원할 때는 연필이나 볼펜을 손에 잡아 낙서를 하든지 금연하는 이유를 써본다.\n•	동전으로 장난을 하거나 손가락을 비틀어 보는 것도 도움이 된다.\n•	플라스틱 담배를 손에 들어 담배 대용으로 이용하는 것도 방법이다.\n•	뜨개질이나 목공일, 그림, 요리 등 손으로 바쁘게 할 수 있는 취미를 가져 흡연욕구를 줄인다.\n"
const sc="•	흡연자 3명 중 2명은 단지 흡연을 즐기기 위해서라고 말한다.\n•	담배 없이 즐거움을 찾는 데 중점을 둔다면 금연은 쉬워질 수 있다.\n•	지금 음식이 얼마나 맛있는지, 담배를 피우지 않을 때 자신이 얼마나 신선하게 보이는지를 생각한다.\n•	금연 후 폐기능이 좋아져 걷고 뛰고 계단 오르기가 얼마나 쉬워졌는지 머릿속에 떠올린다.\n"
const sd="•	흡연이 긴장과 스트레스를 풀어준다는 유형이다.\n•	담배 이외의 다른 방법으로 화가 나고 흥분됐을 때 안정을 찾는다.\n•	깊은 심호흡 운동, 근육이완, 명상 등은 큰 도움이 된다.\n•	운동을 규칙적으로 하면 긴장이 이완되고 기분이 좋아진다.\n•	따뜻한 목욕을 하고 마사지를 받거나 부드러운 음악을 들으면서 긴장을 푸는 것도 방법이다.\n"
const se="•	담배에 대해 갈증을 느낀다는 유형이다.\n•	이 때는 냉정하게 단번에 금연하는 것이 중요하다.\n•	흡연량을 점차 줄여 나간다는 것은 실행에 옮기기 힘들고 더 깊이 들이마시게 된다.\n•	육체적 금단증상은 2주 정도만 지속된다는 사실을 명심하고 인내심을 갖는다.\n•	금단증상 극복이 어려우면 니코틴 패치 사용을 의사와 상의할 수 있다.\n"
const sf="•	흡연이 습관으로 굳어진 유형이다.\n•	이런 유형의 흡연자는 더 이상 담배에서 만족감을 찾지 못한다.\n•	흡연 형태를 바꾸는 게 중요하다.\n•	이를 위해 평소와 다른 장소에서 흡연하거나 담배를 평상시 흡연하는 손의 반대 손으로 피워본다.\n•	매번 피우는 담배에 대해 '내가 진실로 담배를 원하는가'라고 자문한다.\n•	금연날을 정해서 그날까지 노력한다.\n"
const sg="타인이 담배를 권하거나 흡연하면 당신도 담배를 피우는 유형이다.\n금연한다는 것을 다른 사람들에게 알리는 것이 중요하다. 가급적 흡연을 유혹/자극 하는 모임은 피하는 것이 좋다.\n"
const {UID}=route.params
const [item,setItem]=useState([])
const [main,setMain]=useState("")
const [mainstr,setMainStr]=useState("")
const [sub,setSub]=useState("")
const [sub2,setSub2]=useState("")
const [substr,setSubStr]=useState("")
const [sub2str,setSub2Str]=useState("")
const [day,setDay]=useState("")
async function load(){
    const list=[]
    await firestore()
  .collection('UserInfo').doc(UID).collection("Solution")
  // Order results
  .orderBy('answer', 'desc').limit(7)
  .onSnapshot(querySnapshot => {  
        querySnapshot.forEach(function (doc) {
            list.push({first:doc.id})
      })
      setItem(list)
    //   console.log(list)
    /* ... */
  });
  
  
  
}
var total
async function uploadInfo(){
    var a = moment().toArray()
    if (a[1] === 12) {
        a[1] = 1
    } else {
        a[1] = a[1] + 1
    }
    setDay(a)
    await firestore().collection("UserInfo").doc(UID).collection("Challenge").get().then(querySnapshot => {
        total = querySnapshot.size - 1
    })
    console.log(total)
    await firestore().collection("UserInfo").doc(UID).collection("Challenge").doc("challenge" + total).collection("ChallengeDetail").doc("내 흡연유형 파악하기").update({
        
        day:day,
        stats:true
    })
    navigation.navigate("Home")}
   

useEffect(()=>{
   load()
},[])
useEffect(()=>{

console.log(item,"hi")
check()
},[item])
function check(){
  if(item[0]){  
        if(item[0].first==="sa"){
            setMain("자극형")
            setMainStr(sa)
        }else if(item[0].first==="sb"){
            setMain("손장난형")
            setMainStr(sb)
        }else if(item[0].first==="sc"){
            setMain("즐거움형")
            setMainStr(sc)
        }else if(item[0].first==="sd"){
setMain("스트레스 해소형")
setMainStr(sd)             
        }else if(item[0].first==="se"){
            setMain("중독형")
            setMainStr(se)
        }else if(item[0].first==="sf"){
setMain("습관형")
setMainStr(sf)
        }else if(item[0].first==="sg"){
setMain("사회성 추구형")
setMainStr(sg)
        }
    
    
        if(item[1].first==="sa"){
            setSub("자극형")
            setSubStr(sa)
        }else if(item[1].first==="sb"){
            setSub("손장난형")
            setSubStr(sb)
        }else if(item[1].first==="sc"){
            setSub("즐거움형")
            setSubStr(sc)
        }else if(item[1].first==="sd"){
setSub("스트레스 해소형")
setSubStr(sd)                  
        }else if(item[1].first==="se"){
            setSub("중독형")
            setSubStr(se)
        }else if(item[1].first==="sf"){
setSub("습관형")
setSubStr(sf)
        }else if(item[1].first==="sg"){
setSub("사회성 추구형")
setSubStr(sg)
        }

        if(item[2].first==="sa"){
            setSub2("자극형")
            setSub2Str(sa)
        }else if(item[2].first==="sb"){
            setSub2("손장난형")
            setSub2Str(sb)
        }else if(item[2].first==="sc"){
            setSub2("즐거움형")
            setSub2Str(sc)
        }else if(item[2].first==="sd"){
setSub2("스트레스 해소형")
setSub2Str(sd)            
        }else if(item[2].first==="se"){
            setSub2("중독형")
            setSub2Str(se)
        }else if(item[2].first==="sf"){
setSub2("습관형")
setSub2Str(sf)
        }else if(item[2].first==="sg"){
setSub2("사회성 추구형")
setSub2Str(sg)
        }
    } 
}
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
                <ScrollView>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>흡연유형 알아보기</Text>
                        </Text>
                    </View>
                </View>
                <View style={{
                    marginHorizontal: "9%"
                }}>
                    <Text style={{
                        fontFamily: "NunitoSans-Bold",
                        fontSize: 18,
                        marginTop: HEIGHT * 0.1
                    }}>
                        <Text style={{color: "#303030"}}>주요 흡연 요인:</Text>
                <Text style={{color: "#5cc27b"}}> {main}</Text>
                    </Text>
                    <Text style={{
                        fontFamily: "NunitoSans-Regular",
                        marginTop: HEIGHT * 0.025,
                        fontSize: 16
                    }}>{mainstr}</Text>
                    <Text style={{
                        fontFamily: "NunitoSans-Bold",
                        fontSize: 18,
                        marginTop: HEIGHT * 0.07
                    }}>
                        <Text style={{color: "#303030"}}>보조 흡연 요인:</Text>
                        <Text style={{color: "#FFB83D"}}> {sub}, {sub2}</Text>
                    </Text>
                    <Text style={{
                        fontFamily: "NunitoSans-Regular",
                        marginTop: HEIGHT * 0.025,
                        fontSize: 16
                    }}>{substr}</Text>
                    <Text style={{
                        fontFamily: "NunitoSans-Regular",
                        marginTop: HEIGHT * 0.025,
                        fontSize: 16
                    }}>{sub2str}</Text>
                </View>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView  style={{flex: 0}}>
                <TouchableOpacity onPress={uploadInfo}
                style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "#5cc27b",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontFamily: "NunitoSans-Bold",
                        fontSize: 18,
                        color: "#ffffff"
                    }}>완료</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}