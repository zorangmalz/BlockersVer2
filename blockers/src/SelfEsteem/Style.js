import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { LineChart } from "react-native-chart-kit";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const solution = StyleSheet.create({
    largeText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        marginLeft: 24,
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

export default function SelfEsteem({ navigation, Nextpage, Title }) {
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
    var count = 4;

    const pushone = () => {
        setSelect(select.concat(quesone));
        setTimeout(() => {
            navigation.navigate(Nextpage);
        }, 200)
    }

    const filterone = () => {
        setSelect(select.filter(info => info !== quesone))
    }

    const pushtwo = () => {
        setSelect(select.concat(questwo));
        setTimeout(() => {
            navigation.navigate(Nextpage);
        }, 200)
    }

    const filtertwo = () => {
        setSelect(select.filter(info => info !== questwo))
    }

    const pushthree = () => {
        setSelect(select.concat(questhree));
        setTimeout(() => {
            navigation.navigate(Nextpage);
        }, 200)
    }

    const filterthree = () => {
        setSelect(select.filter(info => info !== questhree))
    }

    const pushfour = () => {
        setSelect(select.concat(quesfour));
        setTimeout(() => {
            navigation.navigate(Nextpage);
        }, 200)
    }

    const filterfour = () => {
        setSelect(select.filter(info => info !== quesfour))
    }

    const pushfive = () => {
        setSelect(select.concat(quesfive));
        setTimeout(() => {
            navigation.navigate(Nextpage);
        }, 200)
    }

    const filterfive = () => {
        setSelect(select.filter(info => info !== quesfive))
    }

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
            </SafeAreaView>
        </>
    )
}

export function SelfEsteemMain({ navigation }) {
    const title = "자기효능감은 금연과 밀접한 관계가 있습니다. 자기 효능감을 체크해 보세요."
    const User = auth().currentUser.displayName;

    //차트 데이터 및 디자인
    const data = {
        labels: ["1회", "2회", "3회", "4회", "5회", "6회"],
        datasets: [
            {
                data: [ 2, 4, 6, 8, 8, 10],
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2 // optional
            }
        ],
        legend: ["자기효능감"] // optional
    };

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#ffffff",
        backgroundGradientToOpacity: 0,
        fillShadowGradient: "#5cc27b",
        fillShadowGradientOpacity: 0.5,
        color: (opacity = 1) => `rgba(48, 48, 48, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
        propsForDots: {
            r: "3",
            strokeWidth: "1.5",
            stroke: "#5cc27b"
        },
        propsForBackgroundLines: {
            strokeWidth: "1"
        },
        propsForVerticalLabels: {
            
        }
    };
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
                        alignSelf: "center",
                        fontFamily: "NunitoSans-Bold",
                        fontSize: 18,
                        color: "#5cc27b",
                        marginBottom: HEIGHT * 0.07
                    }}>{User} 님의 자기 효능감 평가</Text>
                    <LineChart 
                        width={WIDTH * 0.9}
                        height={HEIGHT * 0.3}
                        data={data}
                        chartConfig={chartConfig}
                        style={{alignSelf: "center"}}
                        withInnerLines={false}
                    />
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                <TouchableOpacity onPress={() => navigation.navigate("SelfEsteemOne")}>
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