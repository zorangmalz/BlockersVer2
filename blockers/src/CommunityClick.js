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
    ActivityIndicator, FlatList, RefreshControl
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from "moment";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const topposition = Dimensions.get('window').width;

const community = StyleSheet.create({
    board: {
        flex: 1,
        paddingTop: "5%",
        paddingLeft: "5%",
        paddingBottom: 16,

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

export default function CommunityClick({ navigation }) {
    const [search, setSearch] = useState('');
    const ref = firestore().collection('Community1').orderBy("fullTime");
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [replyNum, setReplyNum] = useState();
    const [timer, settimer] = useState();
    const [filtered, setFiltered] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [author, setAuthor] = useState();
    const [user, setUser] = useState();

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    
    //로그인 상태 확인
    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        console.log(user)
    }, [user])

    //글 가져오는 함수
    async function load() {
        const list = [];
        var a = moment().toArray()
        if (a[1] === 12) {
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }

        if (filtered) {
            const a = String(search)
            console.log(a.split(""))
            ref.orderBy("fullTime").onSnapshot(querySnapshot => {
                querySnapshot.forEach(function (doc) {

                    const check = doc.data().fullText
                    if (check.includes(a)) {
                        if (doc.data().fullTime) {
                            if (a[0] === doc.data().fullTime[0] && a[1] === doc.data().fullTime[1] && a[2] === doc.data().fullTime[2]) {
                                list.push({
                                    title: doc.data().title,
                                    time: doc.data().time,
                                    context: doc.data().context,
                                    like: doc.data().whoLike.length,
                                    docname: doc.data().docName,
                                    replynum: doc.data().commentNum,
                                    isPicture: doc.data().isPicture,
                                    fullTime: doc.data().fullTime
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
                                    isPicture: doc.data().isPicture,
                                    fullTime: doc.data().fullTime
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
        } else {
            ref.orderBy("fullTime").onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if (doc.data().fullTime) {
                        list.push({
                            title: doc.data().title,
                            time: doc.data().day,
                            context: doc.data().context,
                            like: doc.data().whoLike.length,
                            docname: doc.data().docName,
                            replynum: doc.data().commentNum,
                            isPicture: doc.data().isPicture,
                            fullTime: doc.data().fullTime
                        });
                    }
                });
                setItems(list);
                console.log("here@@@@@@@@@", list)
                if (loading) {
                    setLoading(false);
                }
            });
        }
    }

    //실시간으로 글 가져오기
    useEffect(() => {
        load()
    }, [filtered]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        load()
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50, paddingTop: 8, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={25} />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 18 }}>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>자유게시판</Text>
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Ionicons name="notifications" color="#666666" size={25} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{
                        marginRight: 14,
                        marginTop: 16,
                        marginBottom: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                    }}
                    >
                        <TextInput value={search} onChangeText={text => setSearch(text)} placeholder="검색어를 입력하세요" style={community.textinput} />
                        <TouchableOpacity onPress={() => setFiltered(true)}>
                            <Ionicons size={30} name="search" color="#666666" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        data={items}
                        inverted={true}

                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('CommunityOtherPost', { docID: item.docname, ID: item.docname, Uid: user.uid })} >
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
                </ScrollView>
                <TouchableOpacity
                    onPress={() => navigation.navigate('작성하기')}
                    style={{
                        position: 'absolute',
                        top: topposition * 1.3,
                        right: "10%"
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
            </SafeAreaView>
        </>
    )
}