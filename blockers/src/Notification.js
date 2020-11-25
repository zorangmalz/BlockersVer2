// import React from 'react';
// import {
//     SafeAreaView,
//     ScrollView,
//     View,
//     Text,
//     StatusBar,
//     StyleSheet,
//     TouchableOpacity
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const notice = StyleSheet.create({
//     title: {
//         fontSize: 16,
//         fontFamily: 'NunitoSans-Bold',
//         opacity: 0.8,
//         color: '#303030',
//         marginLeft: 8
//     },
//     box: {
//         width: "100%",
//         height: 120,
//         paddingTop: 25,
//         paddingBottom: 39,
//         paddingLeft: 22
//     },
//     content: {
//         fontSize: 14,
//         fontFamily: 'NunitoSans-Regular',
//         color: '#000000',
//         opacity: 0.6,
//         marginTop: 8,
//         marginLeft: 20
//     }
// })

// export default function Notification({ navigation }) {
//     return (
//         <>
//             <StatusBar barStyle="light-content" />
//             <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
//                 <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         <Ionicons name="chevron-back" size={25} />
//                     </TouchableOpacity>
//                     <View
//                         style={{
//                             height: 44,
//                             flexDirection: 'row',
//                             justifyContent: "flex-start",
//                             alignItems: 'center',
//                             marginLeft: 24
//                         }}
//                     >
//                         <Text style={{ fontSize: 18 }}>
//                             <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>공지사항</Text>
//                         </Text>
//                     </View>
//                 </View>
//                 <ScrollView>
//                     <View style={notice.box}>
//                         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
//                             <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#5cc27b' }} />
//                             <Text style={notice.title}>Blockers 3월 기부내역 공지</Text>
//                         </View>
//                         <Text style={notice.content}>여러분들의 소중한 기부금 사용내역입니다.</Text>
//                     </View>
//                     <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
//                 </ScrollView>
//             </SafeAreaView>
//         </>
//     )
// } 

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from "moment";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const topposition = Dimensions.get('window').width;

const community = StyleSheet.create({
    board: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: "5%",
        paddingBottom: "5%",

        borderBottomWidth: 1,
        borderColor: "#E5E5E5",
    },
    circle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#5cc27b',
        marginRight: 8
    },
    title: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: "#000000",
        height: 22,
        width: topposition * 0.7
    },
    content: {
        fontSize: 14,
        color: '#707070',
        marginTop: 5,
        marginLeft: 16,
        fontFamily: 'NunitoSans-Regular'
    },
    timethumbreply: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular'
    },
    lowerbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginLeft: 16,
        marginRight: "10%",
        marginTop: 8
    },
    thumbandreply: {
        width: 15,
        height: 15,
    },
    textinput: {
        width: "45%",
        minWidth: 170,
        height: 40,
        paddingLeft: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#707070',
        fontSize: 12,
        marginRight: 8,
        fontFamily: 'NunitoSans-Regular'
    }
})

//Refresh 하는 시간 설정
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Notification({ navigation, route }) {
    const Limit = useRef(10);
    //Render 수 더하기
    const onEndReached = () => {
        Limit.current += 10;
        console.log(Limit.current);
        console.log("Limit")
        setRefreshing(true);
        setTimeout(() => {
            load()
            setRefreshing(false);
        }, 2000)
    }
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [user, setUser] = useState();

    //Flatlist Refreshing Control
    const onRefresh = useCallback(() => {
        setRefresh(true);
        wait(2000).then(() => setRefresh(false));
    }, []);

    //로그인 띄울때 사용
    const loginview = () => {
        Alert.alert(
            "로그인이 필요한 서비스입니다.",
            "로그인하고 다양한 혜택을 만나보세요",
            [
                {
                    text: "취소",
                    onPress: () => console.log("둘러보기")
                },
                {
                    text: "확인",
                    onPress: () => navigation.navigate('로그인')
                }
            ]
        )
    }

    useFocusEffect(
        useCallback(() => {
            load()
            return () => { }
        }, [filtered, refresh])
    )

    //로그인 상태 확인
    const [userlogined, setUserlogined] = useState(false);
    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
            if (user) {
                setUserlogined(true)
            } else {
                setUserlogined(false)
            }
        })
        console.log(user)
    }, [user])

    //검색어 입력
    const [searchWord, setSearchWord] = useState("");

    //글 가져오는 함수
    async function load() {
        const list = [];
        var a = moment().toArray()
        if (a[1] === 12) {
            a[1] = 1
            a[0] = a[0] + 1
        } else {
            a[1] = a[1] + 1
        }
        if (!filtered) {
            console.log("나 여기")
            await firestore().collection('Community2').orderBy("fullTime", "desc").limit(Limit.current).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if (doc.data().fullTime) {
                        if (a[0] === doc.data().fullTime[0] && a[1] === doc.data().fullTime[1] && a[2] === doc.data().fullTime[2]) {
                            console.log("여기 들어옴")
                            list.push({
                                title: doc.data().title,
                                time: doc.data().time,
                                context: doc.data().context,
                                like: doc.data().whoLike.length,
                                docname: doc.data().docName,
                                replynum: doc.data().commentNum,
                                isPicture: doc.data().isPicture
                            });
                        } else {
                            console.log("3")
                            list.push({
                                title: doc.data().title,
                                time: doc.data().day,
                                context: doc.data().context,
                                like: doc.data().whoLike.length,
                                docname: doc.data().docName,
                                replynum: doc.data().commentNum,
                                isPicture: doc.data().isPicture
                            });
                        }
                    }
                });
                setItems(list)
                if (loading) {
                    setLoading(false);
                }
            });
        } else if (filtered) {
            console.log("1")
            const ref = firestore().collection('Community2').orderBy("fullTime", "desc").limit(Limit.current)
            const b = String(searchWord)
            console.log(b.split(""))
            ref.get().then(querySnapshot => {
                querySnapshot.forEach(function (doc) {
                    const check = doc.data().fullText
                    if (check.includes(b)) {
                        if (doc.data().fullTime) {
                            if (a[0] === doc.data().fullTime[0] && a[1] === doc.data().fullTime[1] && a[2] === doc.data().fullTime[2]) {
                                list.push({
                                    title: doc.data().title,
                                    time: doc.data().time,
                                    context: doc.data().context,
                                    like: doc.data().whoLike.length,
                                    docname: doc.data().docName,
                                    replynum: doc.data().commentNum,
                                    isPicture: doc.data().isPicture
                                });
                            }
                            else {
                                list.push({
                                    title: doc.data().title,
                                    time: doc.data().day,
                                    context: doc.data().context,
                                    like: doc.data().whoLike.length,
                                    docname: doc.data().docName,
                                    replynum: doc.data().commentNum,
                                    isPicture: doc.data().isPicture
                                });
                            }
                        }
                    }
                })
                setItems(list);
                if (loading) {
                    setLoading(false);
                }
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        }
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                {loading ?
                    <ActivityIndicator size="large" color="#5cc27b" style={{ position: "absolute", top: HEIGHT / 2 - 20, left: WIDTH / 2 - 20 }} />
                    :
                    <>
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
                                    <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>공지사항</Text>
                                </Text>
                            </View>
                        </View>
                        <FlatList
                            data={items}
                            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                            onEndReached={onEndReached}
                            onEndReachedThreshold={0.8}
                            keyExtractor={items.docname}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => navigation.navigate('NotificationContents', { docID: item.docname, ID: item.docname, Uid: user.uid })} >
                                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                                    <View style={community.board}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <View style={community.circle} />
                                            <Text ellipsizeMode="tail" numberOfLines={1} style={community.title}>{item.title}</Text>
                                        </View>
                                        <Text ellipsizeMode="tail" numberOfLines={2} style={community.content}>{item.context}</Text>
                                        <View style={community.lowerbox}>
                                            <Text style={[community.timethumbreply, { color: '#707070' }]}>{item.time}</Text>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                {item.isPicture === true ?
                                                    <Ionicons name="image-outline" size={15} />
                                                    :
                                                    <></>
                                                }
                                                <MaterialCommunityIcons name="thumb-up-outline" color="#5cc27b" size={15} style={{ marginLeft: 16 }} />
                                                <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{item.like}</Text>
                                                <Ionicons name="chatbubble-ellipses-outline" color="#FFB83D" size={15} style={{ marginLeft: 16 }} />
                                                <Text style={[community.timethumbreply, { color: '#ffb83d', marginLeft: 4 }]}>{item.replynum}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        {refreshing ? <ActivityIndicator style={{ marginVertical: 15 }} size="large" color="#5cc27b" /> : <></>}
                    </>
                }
            </SafeAreaView>
        </>
    )
}