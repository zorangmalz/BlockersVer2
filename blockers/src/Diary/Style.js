import React, { useState, useReducer } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ScrollView,
    Dimensions,
    FlatList
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const HEIGHT = Dimensions.get("window").height;

export default function Header({ navigation, Create }) {
    return (
        <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", height: 50, paddingTop: 5, width: "100%", paddingLeft: "5%", paddingRight: "5%" }}>
            <View style={{ flexDirection: "row", alignItems: "center"}}>
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>금연일기</Text>
                    </Text>
                </View>
            </View>
            {Create ?
                <TouchableOpacity onPress={() => navigation.navigate("DiaryList")}>
                    <Text style={{
                        fontSize: 14,
                        color: "#303030",
                        opacity: 0.6,
                        textDecorationLine: "underline",
                    }}>내가 쓴 일기</Text>
                </TouchableOpacity>
                :
                <>
                </>
            }
        </View>
    )
}

//흡연충동 여부
function YesorNo(state, action) {
    switch (action.type) {
        case "Yes":
            return 1;
        case "No":
            return 2;
    }
}

export function Create({navigation}) {
    //TextInput 내용
    const [when, setWhen] = useState("");
    const [how, setHow] = useState("");
    const [advice, setAdvice] = useState("");

    //흡연충동 여부
    const [state, dispatch] = useReducer(YesorNo, 0);
    const Yes = () => {
        dispatch({type : "Yes"})
    }
    const No = () => {
        dispatch({type : "No"})
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
                <Header navigation={navigation} Create={true} />
                <ScrollView>
                    <View style={{
                        marginLeft: "8%",
                        marginRight: "8%",
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginTop: HEIGHT * 0.05
                        }}>오늘의 금연은 어떠셨나요?</Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginTop: 4
                        }}>짧게 오늘 하루를 말해주세요.</Text>
                        <Text style={{
                            fontFamily: "NunitoSans-Regular",
                            fontSize: 16,
                            color: "#303030",
                            marginTop: HEIGHT * 0.05
                        }}>오늘 흡연충동이 있었나요?</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: HEIGHT * 0.025
                        }}>
                            <TouchableOpacity onPress={Yes} style={{
                                width: 74,
                                height: 36,
                                borderRadius: 28,
                                backgroundColor: state===1 ? "#ffb83d" : "#ffffff",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 20,
                                borderWidth: state===1 ? 0 : 1,
                                borderColor: state===1 ? "#ffb83d" : "#303030"
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: state===1 ? "NunitoSans-Bold" : "NunitoSans-Regular",
                                    color: state===1 ? "#ffffff" : "#303030",
                                }}>있었다</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={No} style={{
                                width: 74,
                                height: 36,
                                borderRadius: 28,
                                backgroundColor: state===2 ? "#ffb83d" : "#ffffff",
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: state===2 ? 0 : 1,
                                borderColor: state===2 ? "#ffb83d" : "#303030"
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: state===2 ? "NunitoSans-Bold" : "NunitoSans-Regular",
                                    color: state===2 ? "#ffffff" : "#303030",
                                }}>없었다</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{
                            fontFamily: "NunitoSans-Regular",
                            fontSize: 16,
                            color: "#303030",
                            marginTop: HEIGHT * 0.025
                        }}>언제 있었나요?</Text>
                        <TextInput
                            value={when}
                            onChangeText={text => setWhen(text)}
                            placeholder="예시: 점심먹고 상사에게 혼났을 때"
                            style={{
                                fontSize: 16,
                                color: "#303030",
                                width: "100%",
                                marginTop: HEIGHT * 0.025,
                                borderBottomColor: "#5cc27b",
                                borderBottomWidth: 1,
                                paddingBottom: 8
                            }} />
                        <Text style={{
                            fontFamily: "NunitoSans-Regular",
                            fontSize: 16,
                            color: "#303030",
                            marginTop: HEIGHT * 0.025
                        }}>어떻게 극복했나요?</Text>
                        <TextInput
                            value={how}
                            onChangeText={text => setHow(text)}
                            placeholder="예시: 물을 마셨다."
                            style={{
                                fontSize: 16,
                                color: "#303030",
                                width: "100%",
                                marginTop: HEIGHT * 0.025,
                                borderBottomColor: "#5cc27b",
                                borderBottomWidth: 1,
                                paddingBottom: 8
                            }} />
                        <Text style={{
                            fontFamily: "NunitoSans-Regular",
                            fontSize: 16,
                            color: "#303030",
                            marginTop: HEIGHT * 0.025
                        }}>참아낸 나에게 한마디!</Text>
                        <TextInput
                            value={advice}
                            onChangeText={text => setAdvice(text)}
                            placeholder="예시: 고생했다!"
                            style={{
                                fontSize: 16,
                                color: "#303030",
                                width: "100%",
                                marginTop: HEIGHT * 0.025,
                                borderBottomColor: "#5cc27b",
                                borderBottomWidth: 1,
                                paddingBottom: 8
                            }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                <TouchableOpacity>
                    <View style={{
                        width: "100%",
                        height: 60,
                        backgroundColor: when.length > 0 && how.length > 0 && advice.length > 0 && state > 0 ? '#5cc27b' : "#c6c6c6",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>완료</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}


//List Style 및 renderItem
const style = StyleSheet.create({
    DiaryText: {
        fontSize: 16,
        color: "#303030",
        opacity: 0.8,
        fontFamily: "NunitoSans-Regular"
    }
})

const renderItem = ({item}) => {
    return (
        <View style={{
            alignSelf: "center",
            width: "92%",
            backgroundColor: "#ffffff",
            borderColor: "#c6c6c6",
            borderWidth: 1,
            borderRadius: 15,
            padding: 16,
            alignItems: "flex-start",
            marginTop: 32
        }}>
            <Text style={{
                fontFamily: "NunitoSans-Bold",
                color: "#303030",
                opacity: 0.8,
                fontSize: 16
            }}>{item.date}</Text>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 16
            }}>
                <View style={{ width: 8, height: 8, backgroundColor: "#5cc27b", borderRadius: 4, marginRight: 8 }} />
                <Text style={style.DiaryText}>흡연충동 : {item.impulse}</Text>
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 8
            }}>
                <View style={{ width: 8, height: 8, backgroundColor: "#5cc27b", borderRadius: 4, marginRight: 8 }} />
                <Text style={style.DiaryText}>언제? : {item.when}</Text>
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 8
            }}>
                <View style={{ width: 8, height: 8, backgroundColor: "#5cc27b", borderRadius: 4, marginRight: 8 }} />
                <Text style={style.DiaryText}>어떻게 극복했나요? : {item.how}</Text>
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 8
            }}>
                <View style={{ width: 8, height: 8, backgroundColor: "#5cc27b", borderRadius: 4, marginRight: 8 }} />
                <Text style={style.DiaryText}>참아낸 나에게 한마디 : {item.advice}</Text>
            </View>
        </View>
    )
}

export function List({ navigation }) {
    const DiaryData = [
        {
            id: 1,
            date: "10/1",
            impulse: 1,
            when: "점심먹고 나서",
            how: "물을 마시고 스트레칭을 했다",
            advice: "고생했고 내일도 화이팅"
        }
    ]
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Header navigation={navigation} Create={false} />
                <ScrollView>
                    <FlatList
                        data={DiaryData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    )
}