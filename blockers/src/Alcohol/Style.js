import React, { useState, useEffect } from 'react';
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

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const solution = StyleSheet.create({
    largeText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        marginLeft: "8%",
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

export default function Alcohol({ navigation, Nextpage, Title, Kind }) {
    const quesone = Kind ? "전혀 아니다" : "전혀 없다"
    const questwo = "월 1회 미만"
    const questhree = "월 1회"
    const quesfour = Kind ? "1주일에 2~3회" : "1주일에 1회"
    const quesfive = Kind ? "1주일에 4회 이상" : "매일같이"
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
            if (select[0] === Kind ? "전혀 아니다" : "전혀 없다") setOne(false);
            if (select[0] === "아니다") setTwo(false);
            if (select[0] === "보통이다") setThree(false);
            if (select[0] === Kind ? "1주일에 2~3회" : "1주일에 1회") setFour(false);
            if (select[0] === Kind ? "1주일에 4회 이상" : "매일같이") setFive(false);
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>알콜중독 평가</Text>
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

export function AlcoholThree({ navigation, Nextpage, Title }) {
    const quesone = "없었다"
    const questwo = "있지만 지난 1년간 없었다"
    const questhree = "지난 1년내 있었다"
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [select, setSelect] = useState([]);
    const [clear, setClear] = useState(false);
    var count = 3;

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

    useEffect(() => {
        one === true ? count = count + 1 : count = count - 1;
        two === true ? count = count + 1 : count = count - 1;
        three === true ? count = count + 1 : count = count - 1;
        if ((count <= 2) && (count >= 0)) {
            setClear(true);
            console.log(select)
        } else {
            if (select[0] === "없었다") setOne(false);
            if (select[0] === "있지만 지난 1년간 없었다") setTwo(false);
            if (select[0] === "지난 1년내 있었다") setThree(false);
            setSelect(select.slice(1, select.length));
            console.log(select);
            setClear(false);
        }
    }, [one, two, three]);

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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>알콜중독 평가</Text>
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
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export function AlcoholMain({ navigation }) {
    const title = "알콜 중독은 흡연 실패에 큰 영향을 미칩니다. \n검사를 통해 본인의 알콜 중독정도를 파악해보세요";

    const data = [
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>알콜중독 평가</Text>
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
                        data={data}
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
                                    <Text style={{
                                        fontFamily: "NunitoSans-Bold",
                                        fontSize: 14,
                                        color: "#5cc27b"
                                    }}>{item.degree}</Text>
                                </View>
                            </View>
                            </>
                        )}
                    />
                    <View style={{width: "70.9%", height: 2, backgroundColor: "#5cc27b", marginLeft: "8%"}} />
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                <TouchableOpacity onPress={() => navigation.navigate("AlcoholOne")}>
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

export function AlcoholFinal({navigation}) {
    const result = "Good";
    const resultcontent = "높은 자기효능감을 가지고있군요! \n금연을 성공할 수 있는 자신감이있는 상태입니다. \n챗봇 & 건강리포트에서 내 상태 변화와 \n다양한 정보를 알아보세요!"
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
                    }}>김현명님의 알콜중독 평가 결과</Text>
                    <ProgressCircle
                        style={{
                            marginTop: 20,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        size={160}
                        borderWidth={0}
                        thickness={10}
                        progress={0.75}
                        color={result === "Good" ? "#5cc27b" : result="Normal" ? "#ffb83d" : "#fb5757"}
                        unfilledColor="#E0E5EC"
                    >
                        <Text style={{ position: "absolute", flex: 1, color: "#303030", textAlign: "center" }}>
                            <Text style={{ fontSize: 36, fontFamily: "NunitoSans-Bold" }}>{result}</Text>
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