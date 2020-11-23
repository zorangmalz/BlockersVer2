import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator, 
    FlatList, 
    RefreshControl,
    Modal,
    Alert
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from "moment";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '@react-native-firebase/storage';
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

export default function CommunityHome({ navigation, route }) {
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
            return () => {}
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
            a[0]=a[0]+1
        } else {
            a[1] = a[1] + 1
        }
        if (!filtered) {
            console.log("나 여기")
            await firestore().collection('Community1').orderBy("fullTime", "desc").limit(Limit.current).get().then(querySnapshot => {
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
            const ref = firestore().collection('Community1').orderBy("fullTime", "desc").limit(Limit.current)
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
                    <>
                        <View accessibilityRole="header" style={{
                            height: 100,
                            width: "100%",
                            paddingLeft: "5%",
                            paddingRight: "5%",
                            borderBottomColor: "#3B3B3B",
                            borderBottomWidth: 1
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <View
                                    style={{
                                        height: 44,
                                        flexDirection: 'row',
                                        paddingTop: 4,
                                        justifyContent: "flex-start",
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ fontSize: 24 }}>
                                        <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#5CC27B' }}>Community</Text>
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ marginLeft: 8 }}>
                                        <Image source={require('./icon/alram.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{
                                width: "60%",
                                height: 40,
                                backgroundColor: "#DBDBDB",
                                borderRadius: 18,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingLeft: 12,
                                paddingRight: 12,
                                alignSelf: "flex-end",
                                marginTop: 8
                            }}>
                                <TextInput value={searchWord} onChangeText={text => setSearchWord(text)} placeholder="검색어를 입력해주세요." />
                                <TouchableOpacity onPress={() => setFiltered(true)}>
                                    <Ionicons name="search" size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList
                            data={items}
                            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                            onEndReached={onEndReached}
                            onEndReachedThreshold={0.8}
                            keyExtractor={items.docname}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={userlogined === true ? () => navigation.navigate('CommunityOtherPost', { docID: item.docname, ID: item.docname, Uid: user.uid }) : loginview} >
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
                        <TouchableOpacity
                            onPress={() => navigation.navigate('작성하기')}
                            style={{
                                position: 'absolute',
                                top: topposition * 1.3,
                                right: "10%",
                                backgroundColor: "white"
                            }}>
                            <View style={{
                                width: 36,
                                height: 36,
                                borderColor: '#5cc27b',
                                borderWidth: 1,
                                borderRadius: 18,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <MaterialCommunityIcons name="pencil" color="#5cc27b" size={25} />
                            </View>
                        </TouchableOpacity>
                    </>
            </SafeAreaView>
        </>
    )
}