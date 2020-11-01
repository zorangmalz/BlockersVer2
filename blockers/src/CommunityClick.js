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
import Modal from 'react-native-modal';

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

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function CommunityHome({ navigation }) {
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

    //로그인 모달 폼
    const [userlogin, setUserlogin] = useState(false);
    const loginview = () => {
        setTimeout(()=>{
            setUserlogin(true)
        }, 200)
    }

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
            ref.onSnapshot(querySnapshot => {
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
        } else {
            ref.onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
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
                });
                setItems(list);
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

    //검색어 입력
    const [searchWord, setSearchWord] = useState("");

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
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
                        alignSelf: "flex-end" ,
                        marginTop: 8
                    }}>
                        <TextInput value={searchWord} onChangeText={text => setSearchWord(text)} placeholder="검색어를 입력해주세요." />
                        <Ionicons name="search" size={24} />
                    </View>
                </View>
                <Modal
                    animationType="none"
                    transparent={true}
                    isVisible={userlogin}
                    backdropOpacity={0.4}
                    onBackdropPress={() => setUserlogin(false)}
                    onRequestClose={() => setUserlogin(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            width: 280,
                            height: 180,
                            borderRadius: 20,
                            backgroundColor: '#ffffff',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{
                                fontFamily: 'NunitoSans-Bold',
                                fontSize: 16,
                                color: '#303030',
                                opacity: 0.8,
                                marginTop: 20
                            }}>로그인이 필요한서비스입니다.</Text>
                            <Text style={{
                                fontFamily: 'NunitoSans-Regular',
                                fontSize: 14,
                                color: '#303030',
                                opacity: 0.6,
                                textAlign: 'center'
                            }}>로그인하고 다양한 혜택을 만나보세요</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 15
                            }}>
                                <TouchableOpacity onPress={() => setUserlogin(false)} style={{
                                    width: 140,
                                    height: 55,
                                    borderBottomLeftRadius: 20,
                                    backgroundColor: '#999999',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#ffffff',
                                        fontFamily: 'NunitoSans-Regular'
                                    }}>둘러보기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('회원가입')
                                    setUserlogin(false)
                                }}
                                    style={{
                                        width: 140,
                                        height: 55,
                                        borderBottomRightRadius: 20,
                                        backgroundColor: '#5cc27b',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#ffffff',
                                        fontFamily: 'NunitoSans-Regular'
                                    }}>로그인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <FlatList
                        data={items}
                        inverted={true}
                        keyExtractor={items.docname}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={userlogined===true ? () => navigation.navigate('CommunityOtherPost', { docID: item.docname, ID: item.docname, Uid: user.uid }) : loginview} >
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
            </SafeAreaView>
        </>
    )
}