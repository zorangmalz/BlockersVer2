import React, { useState, useEffect, useRef } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Keyboard,
    Dimensions,
    TouchableOpacity,
    Alert,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import moment from "moment";
import storage from '@react-native-firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const community = StyleSheet.create({
    title: {
        fontSize: 18,
        width: WIDTH * 0.8,
        fontFamily: 'NunitoSans-Bold',
        color: '#707070'
    },
    author: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Bold',
        color: '#707070'
    },
    image: {
        width: WIDTH * 0.95,
        height: WIDTH * 0.9,
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    content: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#707070'
    },
    warning: {
        width: 24,
        height: 24
    },
    icon: {
        width: 26,
        height: 26,
        borderRadius: 13,
        marginRight: 8
    },
    dateandrepair: {
        fontSize: 12,
        fontFamily: 'NunitoSans-Regular',
        color: '#707070'
    },
    timethumbreply: {
        fontSize: 12,
        fontFamily: 'NunitoSans-Regular',
    },
    lowerbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    thumbandreply: {
        width: 15,
        height: 15,
    },
})

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function NotificationContents({ route, navigation }) {
    const [comment, setComment] = useState('');
    const [islogined, setIslogined] = useState(true);
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [createdate, setCreateDate] = useState();
    const [content, setContent] = useState();
    const [docName, setDocName] = useState();
    const [like, setLike] = useState();
    const [items, setItems] = useState([]);
    const ref = firestore().collection('Community2');
    const [nick, setNick] = useState();
    const [state, setState] = useState();
    const [meLike, setMeLike] = useState(false);
    const [likeList, setLikeList] = useState([]);
    const [param, setParam] = useState()
    const [likeState, setLikeState] = useState()
    const [replynum, setReplyNum] = useState(0)
    const { docID } = route.params
    const { Uid } = route.params
    const [imageSource, setImageSource] = useState(undefined);
    const [time, setTime] = useState();
    const [realWriterUid, setRealWriterUid] = useState();
    const [alertList, setAlertList] = useState([]);
    const [vmtk, setVmtk] = useState();
    const [revmtk, setRevmtk] = useState();
    const textbox = useRef()
    const [loading, setLoading] = useState(false);
    const [del, setDel] = useState(false);
    //for Reply
    const [relikeState, setReLikeState] = useState()
    const [reMelike, setReMeLike] = useState()
    const [commentState, setCommentState] = useState()

    //로딩 화면
    const [userLoading, setUserLoading] = useState(false);
    const [textLoading, setTextLoading] = useState(false);
    const [picLoading, setPicLoading] = useState(false);
    const [replyLoading, setReplyLoading] = useState(false);

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    //댓글 작성하는 함수. 댓글 작성후에 reply collection에 추가를 하고 커멘트 숫자도 업로드한다
  

    //사용자 정보를 불러오는 함수. 불러온후에 사용자 닉네임을 설정한다(화면에 띄워줌)
    useEffect(() => {
        if (!del) {
            var a = [1, 2, 3, 4]
            console.log(a.splice(0, 0, 0), "alsekjfpwojfopwije")

            firestore().collection("UserInfo").doc(Uid).get().then(documentSnapshot => {
                console.log(documentSnapshot.data().nickname, "hihi")
                setNick(documentSnapshot.data().nickname)
                setRevmtk(documentSnapshot.data().profilePicture)
            }).then(() => {
                setUserLoading(true)
            })
            console.log("flvmtk", revmtk)
        }
    }, [replynum, del, refreshing])

    //화면에 텍스트 및 좋아요를 띄워주는 함수.
    async function load() {
        firestore().collection("Community2").doc(docID).get().then(doc => {
            setTitle(doc.data().title)
            setContent(doc.data().context)
            setAuthor(doc.data().nickname)
            setCreateDate(doc.data().day + " " + doc.data().time)
            setLike(doc.data().whoLike.length)
            setLikeList(doc.data().whoLike)
            setTime(doc.data().fullTime)
            setRealWriterUid(doc.data().writerUid)
            setAlertList(doc.data().whoAlert)
            setVmtk(doc.data().profilePicture)
            setDocName(doc.data().docName)
        })
    }

    useEffect(() => {
        if (!del) {
            console.log(Uid, "uiduidudiuidu")
            console.log(docID, "HIHI")
            console.log(alertList, likeList, time, author, "alertList")
            load().then(() => {
                setTextLoading(true)
            }).catch(() => {
                console.log("텍스트 및 좋아요가 안나옴")
                setTextLoading(true)
            })

            if (likeList.includes(Uid)) {
                setMeLike(true)
            }
        }
    }, [likeState, nick, del, refreshing])

    //사진 불러오는 함수
    const [exist, setExist] = useState(true)
    async function existPic() {
        if (!del) {
            console.log("comeins")
            console.log(author, time)
            const url = await storage()
                .refFromURL("gs://blockers-8a128.appspot.com/community2/" + String(title + author + time))
                .getDownloadURL()
                .catch(() => {
                    setExist(false)
                    console.log("사진이 없습니다.")
                })
            setImageSource(url)
            setExist(true)
        }
    }

    useEffect(() => {
        if (!del) {
            if (exist) {
                existPic().then(() => {
                    setPicLoading(true)
                }).catch(() => {
                    setExist(false)
                    console.log("사진이 없습니다.")
                    setPicLoading(true)
                })
            }
            if (Uid === realWriterUid) {
                setIslogined(true)
                console.log("yes ITs true")
            } else {
                setIslogined(false)
                console.log("no its not")
            }
        }
    }, [time, refreshing])

    //댓글을 보여주는 함수. 
    useEffect(() => {
        if (del === false) {
            setItems(items.splice(0, items.length))
            console.log(items, "??????")
            const { ID } = route.params
            setParam(ID)
            async function reply() {
                const USERUID = firebase.auth().currentUser.uid;
                firestore().collection('Community1').doc(ID).collection("Reply").orderBy("fullTime").get().then(querySnapshot => {
                    let list = [];
                    console.log("comd")
                    setReplyNum(querySnapshot.size);
                    querySnapshot.forEach(docs => {
                        console.log("check how many times")
                        if (docs.data().whoLike.includes(Uid)) {
                            setReMeLike(true)
                        } else {
                            setReMeLike(false)
                        }
                        if (USERUID === docs.data().writerUid) {
                            list.push({
                                reName: docs.data().fullTime + docs.data().content,
                                reNick: docs.data().nick,
                                reContent: docs.data().content,
                                reLike: docs.data().like,
                                reTime: docs.data().day + " " + docs.data().time,
                                reProfile: docs.data().profilePicture,
                                reUserUid: true,
                                reWhoLike: docs.data().whoLike.length,
                                reWhoLikeList: docs.data().whoLike,
                                reWhoAlert: docs.data().whoAlert,
                                reMeLike: reMelike
                            });
                        } else {
                            list.push({
                                reName: docs.data().fullTime + docs.data().content,
                                reNick: docs.data().nick,
                                reContent: docs.data().content,
                                reLike: docs.data().like,
                                reTime: docs.data().day + " " + docs.data().time,
                                reProfile: docs.data().profilePicture,
                                reUserUid: false,
                                reWhoLike: docs.data().whoLike.length,
                                reWhoLikeList: docs.data().whoLike,
                                reWhoAlert: docs.data().whoAlert,
                                reMeLike: reMelike
                            });
                        }
                    });
                    setItems(list);
                    console.log(list);
                })
            }
            reply().then(() => {
                setReplyLoading(true)
            }).catch(() => {
                console.log("댓글이 안불러옴")
                setReplyLoading(true)
            })
        }
    }, [state, vmtk, loading, commentState, del, refreshing])


    return (
        <>
            <StatusBar  />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                {userLoading && textLoading && picLoading && replyLoading ?
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
                        <ScrollView style={{ marginBottom: 50 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: 'center',
                                borderBottomColor: "#DDDDDD",
                                borderBottomWidth: 1,
                                padding: 16,
                                paddingRight: 20
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    {vmtk ?
                                        <Image resizeMode="cover" style={community.icon} source={{ uri: vmtk }} />
                                        :
                                        <Ionicons name="ios-person-circle" style={{ marginRight: 8 }} color="#E2E2E2" size={28} />
                                    }
                                    <Text style={community.author}>{author}</Text>
                                </View>
                                <Text style={community.dateandrepair}>{createdate}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: 'center',
                                borderBottomColor: "#DDDDDD",

                                padding: 16,
                                paddingRight: 24
                            }}>
                                <Text style={community.title}>{!title ? "" : title}</Text>
                            </View>
                            {imageSource && <Image style={community.image} resizeMode="cover" source={{ uri: imageSource }} />}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 16,
                                paddingBottom: 32,
                                borderBottomWidth: 1,
                                borderBottomColor: '#E2E2E2'
                            }}>
                                <Text style={community.content}>{content}</Text>
                             
                            </View>
                            <View style={{
                                paddingTop: 8,
                                paddingRight: 5,
                                paddingLeft: 5,
                                width: "100%"
                            }}>
                                
                            </View>
                        </ScrollView>
                       
                    </>
                    :
                    <ActivityIndicator size="large" color="#5cc27b" style={{ position: "absolute", top: HEIGHT / 2 - 20, left: WIDTH / 2 - 20, backgroundColor: "#ffffff" }} />
                }
            </SafeAreaView>
        </>
    )
}