import React, { useState } from "react";
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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export function ChatbotOne({ navigation }) {
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
                        <Text style={{
                            fontFamily: "NunitoSans-Regular",
                            fontSize: 14,
                            color: "#5cc27b",
                            textDecorationLine: "underline",
                            marginBottom: 32
                        }}>바로가기</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export function ChatbotTwo({ navigation }) {
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
                            }}>온라인에서 금연 실천을 도와주는 정부기관 금연 서비스 입니다. </Text>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 14,
                                color: "#5cc27b",
                                textDecorationLine: "underline"
                            }}>바로가기</Text>
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
                            }}>금연에 대한 정보들이 모여 있는 웹사이트 입니다. {"\n"}한국건강증진개발원에서 운영하고 있습니다. </Text>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 14,
                                color: "#5cc27b",
                                textDecorationLine: "underline"
                            }}>바로가기</Text>
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
                            }}>금연 관련 운동들을 하고 있는 민간단체 입니다. </Text>
                            <Text style={{
                                fontFamily: "NunitoSans-Regular",
                                fontSize: 14,
                                color: "#5cc27b",
                                textDecorationLine: "underline"
                            }}>바로가기</Text>
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}