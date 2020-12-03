import React, { useState, useReducer, useEffect } from "react";
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
    FlatList,
    Alert,
    ActivityIndicator
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment"
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

export default function Header({ navigation, Create }) {
    return (
        <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", height: 50, paddingTop: 5, width: "100%", paddingLeft: "5%", paddingRight: "5%" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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

export function Create({ navigation }) {
    //TextInput 내용
    const [when, setWhen] = useState("");
    const [how, setHow] = useState("");
    const [advice, setAdvice] = useState("");
    const [user, setUser] = useState();

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
            // console.log(userAuth)
        })
    })

    async function writeDiary() {
        var a = moment().toArray()

        if (a[1] === 12) {
            a[1] = 1
            a[0]=a[0]+1
        } else {
            a[1] = a[1] + 1
        }

        if (state === 1) {
            var check = "있었다"
        } else {
            var check = "없었다"
        }
        if(a[1]<10){
            if(a[2]<10){
                 firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-0"+a[2]).update({
                    diary:"일기 작성"
                }).catch(()=>
                     firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-0"+a[2]).set({
                        diary:"일기 작성"
                    })
                )
            }else{
                 firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-"+a[2]).update({
                    diary:"일기 작성"
                }).catch(()=>
                     firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-0"+a[1]+"-"+a[2]).set({
                        diary:"일기 작성"
                    })
                )
            }
            
        }else{
            if(a[2]<10){
                 firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-0"+a[2]).update({
                    diary:"일기 작성"
                }).catch(()=>
                     firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-0"+a[2]).set({
                        diary:"일기 작성"
                    })
                )
            }else{
                 firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).update({
                    diary:"일기 작성"
                }).catch(()=>
                     firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).set({
                        diary:"일기 작성"
                    })
                )
            }
            
        }
        // firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0]+"-"+a[1]+"-"+a[2]).update({
        //     diary:"일기 작성"
        // }).catch(() =>
        //     firestore().collection("UserInfo").doc(user.uid).collection("Calendar").doc(a[0] + "-" + a[1] + "-" + a[2]).set({
        //         diary: "일기 작성"
        //     }))
        await firestore().collection("UserInfo").doc(user.uid).collection("Diary").doc(a + "diary").set({
            impulse: check,
            when: when,
            how: how,
            advice: advice,
            date: a[0] + "-" + a[1] + "-" + a[2]
        }).then(
            navigation.navigate("DiaryComplete")
        )
    }
    //흡연충동 여부
    const [state, dispatch] = useReducer(YesorNo, 0);
    const Yes = () => {
        dispatch({ type: "Yes" })
        // console.log(state)
    }
    const No = () => {
        dispatch({ type: "No" })
        // console.log(state)
    }
    const NotComplete = () => {
        Alert.alert(
            "일기를 입력해주세요",
            "",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
        );
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Header navigation={navigation} Create={true} />
                <KeyboardAwareScrollView>
                    <View style={{
                        marginLeft: "8%",
                        marginRight: "8%",
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            marginTop: HEIGHT * 0.05
                        }}>오늘의 금연은 어떠셨나요?{"\n"}짧게 오늘 하루를 말해주세요.</Text>
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
                                backgroundColor: state === 1 ? "#ffb83d" : "#ffffff",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 20,
                                borderWidth: state === 1 ? 0 : 1,
                                borderColor: state === 1 ? "#ffb83d" : "#303030"
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: state === 1 ? "NunitoSans-Bold" : "NunitoSans-Regular",
                                    color: state === 1 ? "#ffffff" : "#303030",
                                }}>있었다</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={No} style={{
                                width: 74,
                                height: 36,
                                borderRadius: 28,
                                backgroundColor: state === 2 ? "#ffb83d" : "#ffffff",
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: state === 2 ? 0 : 1,
                                borderColor: state === 2 ? "#ffb83d" : "#303030"
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: state === 2 ? "NunitoSans-Bold" : "NunitoSans-Regular",
                                    color: state === 2 ? "#ffffff" : "#303030",
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
                </KeyboardAwareScrollView>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                <TouchableOpacity onPress={when.length > 0 && how.length > 0 && advice.length > 0 && state > 0 ? writeDiary : state === 2 ? writeDiary : NotComplete}>
                    <View style={{
                        width: "100%",
                        height: 60,
                        backgroundColor: when.length > 0 && how.length > 0 && advice.length > 0 && state > 0 ? '#5cc27b' : state === 2 ? "#5cc27b" : "#c6c6c6",
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


//List Style 및 renderItem
const style = StyleSheet.create({
    DiaryText: {
        fontSize: 16,
        color: "#303030",
        opacity: 0.8,
        fontFamily: "NunitoSans-Regular"
    }
})

const renderItem = ({ item }) => {
    return (
        <View style={{
            alignSelf: "center",
            width: "92%",
            backgroundColor: "#ffffff",
            borderRadius: 15,
            padding: 16,
            alignItems: "flex-start",
            marginTop: 16,
            elevation: 3,
            shadowColor: "#303030",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            marginBottom: 16,
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
    const [user, setUser] = useState()
    const [items, setItems] = useState()
    const [exist, setExist] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
            // console.log(userAuth)
        })
        if (user) {
            load()
        }
    }, [user])

    async function load() {
        const list = [];
        firestore().collection("UserInfo").doc(user.uid).collection("Diary").onSnapshot(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                list.push({
                    date: doc.data().date,
                    impulse: doc.data().impulse,
                    when: doc.data().when,
                    how: doc.data().how,
                    advice: doc.data().advice
                });
            })
            if (list.length > 0) {
                setExist(true)
            }
            setItems(list);
            setLoading(false);
        })
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                {loading ?
                    <ActivityIndicator size="large" color="#5cc27b" style={{ position: "absolute", top: HEIGHT - 20, left: WIDTH - 20 }} />
                    :
                    <>
                        <Header navigation={navigation} Create={false} />
                        <ScrollView style={{ paddingTop: 16 }}>
                            {exist ?
                                < FlatList
                                    data={items}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderItem}
                                />
                                :
                                <Text style={{ fontFamily: "NunitoSans-Bold", fontSize: 16, alignSelf: "center" }}>아직 작정한 일기가 없습니다.</Text>
                            }
                        </ScrollView>
                    </>
                }
            </SafeAreaView>
        </>
    )
}
