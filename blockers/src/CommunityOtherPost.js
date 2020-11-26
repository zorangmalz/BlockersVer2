import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import firebase, { utils } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from "moment";
import storage from '@react-native-firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from "@react-navigation/native";
import ImagePicker from 'react-native-image-picker';

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
    buttonbox: {
        width: 52,
        height: 24,
        borderRadius: 5,
        backgroundColor: '#5cc27b',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        margin: 16
    },
    buttontext: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Bold',
        color: '#ffffff'
    },
    titlebox: {
        paddingLeft: 32,
        borderWidth: 0.5,
        borderColor: '#707070',
        alignItems: 'flex-start',
        justifyContent: "center",
        height: 50,
        paddingRight: 32
    },
    titleandcontent: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#666666',
        width: "100%"
    },
    contentbox: {
        paddingLeft: 32,
        alignItems: 'flex-start',
        height: WIDTH * 1.2,
        borderBottomWidth: 0.5,
        borderColor: '#707070',
        paddingTop: 8,
        paddingRight: 32
    },
    picturetext: {
        fontSize: 14,
        color: '#ffffff',
        fontFamily: 'NunitoSans-Regular'
    }
})

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function CommunityOtherPost({ route, navigation }) {
    const [comment, setComment] = useState('');
    const [islogined, setIslogined] = useState(true);
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [createdate, setCreateDate] = useState();
    const [content, setContent] = useState();
    const [docName,setDocName]=useState();
    const [like, setLike] = useState();
    const [items, setItems] = useState([]);
    const ref = firestore().collection('Community1');
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
    const [commentState,setCommentState]=useState()

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
    async function writepost(b) {
        var a = moment().toArray()
        console.log(b)
        if (a[1] === 12) {
            a[1] = 1
            a[0]=a[0]+1
        } else {
            a[1] = a[1] + 1
        }
        console.log(docID,"docid")

        await ref.doc(docID).collection("Reply").doc(a + b).set({
            content: b,
            nick: nick,
            fullTime: a,
            time: a[3] + ":" + a[4],
            day: a[1] + "/" + a[2],
            writerUid: Uid,
            profilePicture: revmtk,
            rereply: false,
            whoLike: [],
            whoAlert: []
        })
        await ref.doc(docID).update({
            commentNum: replynum + 1
        })
        var writer
        await firestore().collection("Community1").doc(docID).get().then(doc => {
            writer=doc.data().writerUid
        })
        console.log(writer)
        await firestore().collection("UserInfo").doc(writer).collection("Alarm").add({
            type:"community",
            date:a[0]+"/"+a[1]+"/"+a[2],
            realDate:a,
            stats:false,
            title:"댓글 알림",
            content:"회원님의 글에 누군가 댓글을 남겼습니다",
            docID:docID
        })
        await firestore().collection("UserInfo").doc(writer).update({
            alarm:true
        })
        setState(true)
        setComment("")
    }

    async function deletePost() {
        // ref.doc(param).delete()
        const filename = title + nick + time
        var desertRef = storage().ref("community1/" + filename);
        setDel(true)
        navigation.navigate("Home")
        // // Delete the file
        desertRef.delete().catch(function (error) {
            // Uh-oh, an error occurred!
            console.log("오류")
        })
        async function DeletePost() {
            await firestore().collection("Community1").doc(docID).delete()
        }
        DeletePost()
    }

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
    var realTitle
    async function load() {
        
        firestore().collection("Community1").doc(docID).get().then(doc => {
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
            realTitle=String(doc.data().title)+String(doc.data().nickname)+String(doc.data().time)
        })  
        console.log(realTitle,"rekjwfpoiqwejofi")
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
        }
    }, [likeState, nick, del, refreshing])

    useFocusEffect(
        useCallback(() => {
            if (likeList.includes(Uid)) {
                setMeLike(true)
            } else {
                setMeLike(false)
            }
            return () => {}
        }, [])
    )

    //사진 불러오는 함수
    const [exist, setExist] = useState(true)
    async function existPic() {
        if (!del) {
            console.log("comeins")
            console.log(author, time)
            const url = await storage()
                .refFromURL("gs://blockers-8a128.appspot.com/community1/" + String(title + author + time))
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
            
            setParam(Uid)
            async function reply() {
                
                firestore().collection('Community1').doc(docID).collection("Reply").orderBy("fullTime").get().then(querySnapshot => {
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
                        if (Uid === docs.data().writerUid) {
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

    //게시글 좋아요 및 좋아요 취소
    async function likeMinus(a) {
        return ref.doc(docID).update({
            whoLike: a,
        }).then(() => {
            console.log("minus success")
            setLikeState(true)
        });
    }
    async function likePlus(a) {
        console.log(docID)
        return ref.doc(docID).update({
            whoLike: a,
        }).then(() => {
            console.log("plus success")
            setLikeState(true)
        });
    }

    async function pressLike() {
        const userUID = Uid
        console.log(Uid, "Uid")
        console.log(likeList, "when pressed")
        var list=[]
        list=likeList
        const INCLUDE = likeList.includes(Uid)
        if (INCLUDE) {
            setLikeList(likeList.splice(likeList.indexOf(Uid), 1))
            console.log(likeList, "should be empty or Uid is deleted")
            setMeLike(false)
            likeMinus(likeList)
        } else {
            setLikeList(likeList.push(userUID));
            console.log(likeList, "likelist updated");
            setMeLike(true);
            likePlus(likeList);
        }
    }
    
    async function alertPost() {
        console.log(alertList, "fucking here")
        const userID = Uid
        if (alertList.includes(userID)) {
            console.log("include!!!!!!!!")
            Alert.alert(
                '신고하시겠습니까?',
                '신고가 누적되면 자동 삭제 됩니다.',
                [
                    {
                        text: '취소', onPress: () => console.log('CANCEL Pressed')
                    },
                    {
                        text: '확인', onPress: () => Alert.alert(
                            '이미 신고하셨습니다',
                            ""
                            [
                            {
                                text: '확인', onPress: () => console.log('OK Pressed')
                            }
                            ]
                        )
                    }
                ]
            )
        } else {
            console.log("damn why not")
            Alert.alert(
                '신고하시겠습니까?',
                '신고가 누적되면 자동 삭제 됩니다.',
                [
                    {
                        text: '취소', onPress: () => console.log('CANCEL Pressed')
                    },
                    {
                        text: '확인', onPress: () => Alert.alert(
                            '신고완료',
                            '검토 후 조치하겠습니다.',
                            [
                                {
                                    text: '확인', onPress: () => console.log('OK Pressed')
                                }
                            ]
                        )
                    }
                ]
            )
            setAlertList(alertList.push(userID))
            alertUpdate(alertList)
        }

    }
    async function alertUpdate(a) {
        return ref.doc(docID).update({
            whoAlert: a,
        }).then(() => {
            console.log("alert success")
        });
    }

    //댓글 좋아요 및 좋아요 취소, 댓글 삭제
    async function relikeMinus(a, b) {
        console.log(docID,"docID")
        return ref.doc(docID).collection("Reply").doc(b).update({
            whoLike: a,
        }).then(() => {
            console.log("minus success")
            setReLikeState(true)
            setState(true)
        });
    }
    async function relikePlus(a, b) {
        return ref.doc(docID).collection("Reply").doc(b).update({
            whoLike: a
        }).then(() => {
            console.log("plus success")
            setReLikeState(true)
            setCommentState(true)
        });
    }

    async function pressReLike(relikeList, name) {
        console.log(name)
        const userUID = Uid
        console.log(Uid, "Uid")
        console.log(relikeList, "when pressed")
        if (relikeList.includes(Uid)) {
            relikeList.splice(relikeList.indexOf(Uid), 1)
            console.log(relikeList, "should be empty or Uid is deleted")
            relikeMinus(relikeList, name)
        } else {
            relikeList.push(userUID)
            console.log(relikeList, "likelist updated");
            relikePlus(relikeList, name);
        }
    }
    async function redeletePost(a) {
        await ref.doc(docID).collection("Reply").doc(a).delete()
        setCommentState(true)
        await ref.doc(docID).update({
            commentNum: replynum - 1
        })
    }
    async function realertPost(a) {
        console.log(alertList, "fucking here")
        const userID = Uid
        if (alertList.includes(userID)) {
            console.log("include!!!!!!!!")
            Alert.alert(
                '신고하시겠습니까?',
                '신고가 누적되면 자동 삭제 됩니다.',
                [
                    {
                        text: '취소', onPress: () => console.log('CANCEL Pressed')
                    },
                    {
                        text: '확인', onPress: () => Alert.alert(
                            '이미 신고하셨습니다',
                            ""
                            [
                            {
                                text: '확인', onPress: () => console.log('OK Pressed')
                            }
                            ]
                        )
                    }
                ]
            )
        } else {
            console.log("damn why not")
            Alert.alert(
                '신고하시겠습니까?',
                '신고가 누적되면 자동 삭제 됩니다.',
                [
                    {
                        text: '취소', onPress: () => console.log('CANCEL Pressed')
                    },
                    {
                        text: '확인', onPress: () => Alert.alert(
                            '신고완료',
                            '검토 후 조치하겠습니다.',
                            [
                                {
                                    text: '확인', onPress: () => console.log('OK Pressed')
                                }
                            ]
                        )
                    }
                ]
            )
            setAlertList(alertList.push(userID))
            realertUpdate(a, alertList)
        }

    }
    async function realertUpdate(a, b) {
        return ref.doc(docID).collection("Reply").doc(a).update({
            whoAlert: b,
        }).then(() => {
            console.log("alert success")
        });
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
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
                                    <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>자유게시판</Text>
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
                                {islogined === true ?
                                    <Text style={[community.dateandrepair, { alignSelf: 'center' }]}>
                                        <TouchableOpacity onPress={() => navigation.navigate('CommunityReWrite', {docID : docID,titles:realTitle})}>
                                            <Text style={community.dateandrepair}>수정 | </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() =>
                                            Alert.alert(
                                                '삭제하시겠습니까?',
                                                '삭제된 게시물은 되돌릴 수 없습니다.',
                                                [
                                                    {
                                                        text: '취소', onPress: () => console.log('CANCEL Pressed')
                                                    },
                                                    {
                                                        text: '확안', onPress: () => deletePost()

                                                    }
                                                ]
                                            )
                                        }>
                                            <Text style={community.dateandrepair}>삭제</Text>
                                        </TouchableOpacity>
                                    </Text>
                                    :
                                    <TouchableOpacity onPress={alertPost
                                    }>
                                        <Ionicons name="warning-outline" color="#666666" size={25} />
                                    </TouchableOpacity>
                                }
                            </View>
                            {imageSource && <Image style={community.image} resizeMode="contain" source={{ uri: imageSource }} />}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 16,
                                paddingBottom: 32,
                                borderBottomWidth: 1,
                                borderBottomColor: '#E2E2E2'
                            }}>
                                <Text style={community.content}>{content}</Text>
                                <View style={[community.lowerbox, { alignSelf: "flex-end" }]}>
                                    <TouchableOpacity onPress={pressLike}>
                                        <MaterialCommunityIcons name={meLike ? "thumb-up" : "thumb-up-outline"} color="#5cc27b" size={15} />
                                    </TouchableOpacity>
                                    <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{like}</Text>
                                    <Ionicons name="chatbubble-ellipses-outline" color="#FFB83D" size={15} style={{ marginLeft: 16 }} />
                                    <Text style={[community.timethumbreply, { color: '#ffb83d', marginLeft: 4 }]}>{replynum}</Text>
                                </View>
                            </View>
                            <View style={{
                                paddingTop: 8,
                                paddingRight: 5,
                                paddingLeft: 5,
                                width: "100%"
                            }}>
                                <FlatList
                                    data={items}
                                    refreshing={true}
                                    extraData={items}
                                    renderItem={({ item }) => (
                                        <View style={{ borderBottomWidth: 1, borderColor: '#E2E2E2', paddingTop: 5, paddingBottom: 5 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                    {item.reProfile ? <Image resizeMode="cover" style={community.icon} source={{ uri: item.reProfile }} /> : <Ionicons name="ios-person-circle" style={{ marginRight: 4 }} color="#E2E2E2" size={28} />}
                                                    <Text style={community.author}>{item.reNick}</Text>
                                                    <Text style={[community.date, { fontSize: 12, marginLeft: 8 }]}>{item.reTime}</Text>
                                                    {item.reMelike === true ?
                                                        <View style={{ flexDirection: "row" }}>
                                                            <MaterialCommunityIcons name="thumb-up" color="#5cc27b" size={15} style={{ marginLeft: 8 }} />
                                                            <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{item.reWhoLike}</Text>
                                                        </View>
                                                        :
                                                        <View style={{ flexDirection: "row" }}>
                                                            <MaterialCommunityIcons name="thumb-up-outline" color="#5cc27b" size={15} style={{ marginLeft: 8 }} />
                                                            <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{item.reWhoLike}</Text>
                                                        </View>
                                                    }
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        {/* 댓글 좋아요 */}
                                                        <TouchableOpacity onPress={() => pressReLike(item.reWhoLikeList, item.reName)} >
                                                            <View style={{ color: "#DDDDDD", borderWidth: 0.5, width: 30, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                                <MaterialCommunityIcons name="thumb-up-outline" color="#8A8A8A" size={15} />
                                                            </View>
                                                        </TouchableOpacity>
                                                        {/* 신고 및 삭제 누르는 버튼 */}
                                                        {item.reUserUid === true ?
                                                            <View style={{ borderWidth: 0.5, width: 30, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                                <TouchableOpacity onPress={() =>
                                                                    Alert.alert(
                                                                        '삭제하시겠습니까?',
                                                                        '삭제된 게시물은 되돌릴 수 없습니다.',
                                                                        [
                                                                            {
                                                                                text: '취소', onPress: () => console.log('CANCEL Pressed')
                                                                            },
                                                                            {
                                                                                text: '확인', onPress: () => {
                                                                                    redeletePost(item.reName), Alert.alert(
                                                                                        '삭제완료',
                                                                                        '',
                                                                                        [
                                                                                            {
                                                                                                text: '확인', onPress: () => console.log('삭제가 완료되었습니다.')
                                                                                            }
                                                                                        ]
                                                                                    )
                                                                                }
                                                                            }
                                                                        ]
                                                                    )
                                                                }>
                                                                    <Text style={community.dateandrepair}>삭제</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            :
                                                            <View style={{ borderWidth: 0.5, width: 30, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                                <TouchableOpacity onPress={() =>
                                                                    realertPost(item.reName)
                                                                }>
                                                                    <Ionicons name="warning-outline" color="#8A8A8A" size={15} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        }
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 8, marginLeft: 16, marginRight: 16 }}>
                                                <Text style={{
                                                    fontFamily: "NunitoSans-Regular",
                                                    fontSize: 14,
                                                    color: "#707070",
                                                }}>{item.reContent}</Text>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>
                        </ScrollView>
                        <View>
                            <View style={{
                                position: "absolute",
                                bottom: 0, height: 40, right: 0, left: 0, flexDirection: "row",
                                borderRadius: 10,
                                backgroundColor: '#E5E5E5',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingLeft: 16,
                                paddingRight: 8,
                                margin: 8
                            }}>
                                <TextInput
                                    value={comment}
                                    onChangeText={text => setComment(text)}

                                    placeholder="댓글을 입력하세요."
                                    placeholderTextColor="#707070"
                                    textAlign="left"
                                    ref={textbox}

                                    onSubmitEditing={Keyboard.dismiss}
                                    style={{
                                        width: "90%",
                                        marginRight: 5,
                                        fontSize: 15,
                                        borderRadius: 30,
                                        fontFamily: 'NunitoSans-Regular'
                                    }}
                                />
                                <TouchableOpacity onPress={() => {
                                    comment.length > 0 ?
                                        writepost(comment)
                                        :
                                        Alert.alert(
                                            '작성 오류',
                                            '두글자 이상 작성해주세요.',
                                            [
                                                {
                                                    text: 'OK', onPress: () => console.log('OK Pressed')
                                                }
                                            ]
                                        )
                                }}>
                                    <Ionicons name="send" size={15} color="#5cc27b" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                    :
                    <ActivityIndicator size="large" color="#5cc27b" style={{ position: "absolute", top: HEIGHT/2 - 20, left: WIDTH/2 - 20, backgroundColor: "#ffffff" }} />
                }
            </SafeAreaView>
        </>
    )
}

export function CommunityReWrite({ navigation, route }) {
    const ref = firestore().collection("Community1");
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageOne, setImageOne] = useState(undefined);
    const [picone, setPicone] = useState(true);
    const [user, setuser] = useState()
    const [nick, setNick] = useState()
    const [filename, setFilename] = useState()
    const [vmtkfldzm, setvmtkfldzm] = useState()
    const [picture, setPicture] = useState()
    const [isPicture, setIsPicture] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const { docID } = route.params
    const { titles } = route.params

    const [imageSource,setImageSource]=useState("")

    async function existPic(title) {
            console.log(title,"title")
            console.log("comeins")
            
            const url = await storage()
                .refFromURL("gs://blockers-8a128.appspot.com/community1/" + String(title))
                .getDownloadURL()
                .catch(() => {
                    
                    console.log("사진이 없습니다.")
                })
            setImageSource(url)
            
        
    }
    useEffect(() => {
        console.log(utils.FilePath.PICTURES_DIRECTORY);
        auth().onAuthStateChanged(userAuth => {
            setuser(userAuth)
        })
        if (user) {
            existPic(titles)
            console.log(user)
            firestore().collection("UserInfo").doc(user.uid).get().then(documentSnapshot => {
                console.log(documentSnapshot.data().nickname, "hihi")
                setNick(documentSnapshot.data().nickname)
                setvmtkfldzm(documentSnapshot.data().profilePicture)
            })
            firestore().collection("Community1").doc(docID).get().then(doc => {
                setTitle(doc.data().title)
                setContent(doc.data().context)
            })
        }
    }, [user])

    async function uploadImage(a) {
        const uri = imageOne;
        setFilename(title + nick + a)

        const reference = storage().ref("community1/" + title + nick + a);
        const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri;

        await reference.putFile(uploadUri);
        setPicture(true)
    }

    async function writePost() {
        setIsLoading(true)

        var a = moment().toArray()


        if (a[1] === 12) {
            a[1] = 1
            a[0] = a[0] + 1
        } else {
            a[1] = a[1] + 1
        }
        console.log("is picture", isPicture)
        if (isPicture) {
            await uploadImage(a)
        }
        await ref.doc(docID).update({
            context: content,
            title: title,
            fullText: title + content,
            profilePicture: vmtkfldzm,
            isRepair: true
        })
        setIsLoading(false)
        Alert.alert(
            '수정 완료',
            '',
            [
                {
                    text: '확인', onPress: () => navigation.navigate("Home")
                }
            ]
        )

    }

    const options = {
        title: '사진가져오기',
        customButtons: [
            { name: 'button_id_1', title: 'CustomButton 1' },
            { name: 'button_id_2', title: 'CustomButton 2' }
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        quality: 0.3
    };

    const showCameraRoll1 = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.error) {
                console.log('LaunchImageLibrary Error: ', response.error);
            }
            else {
                setImageOne(response.uri);
                setPicone(false);
            }
        });
        setIsPicture(true)
    };

    const errorview = () => {
        Alert.alert(
            "작성 오류",
            "제목 본문 한글자 이상 작성해주세요",
            [
                {
                    text: "확인",
                    onPress: () => console.log("확인")
                }
            ]
        )
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            {isLoading === true ?
                <ActivityIndicator size="large" color="#5cc27b" style={{ position: "absolute", top: HEIGHT / 2 - 20, left: WIDTH / 2 - 20 }} />
                :
                <>
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                        <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50, paddingTop: 8, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="chevron-back" size={25} />
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>
                                    <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>작성하기</Text>
                                </Text>
                            </View>
                            {/* 중앙 맞추기 */}
                            <View style={{ width: "4%" }} />
                        </View>
                        <ScrollView>
                            <View style={community.titlebox}>
                                <TextInput value={title} onChangeText={text => setTitle(text)} style={community.titleandcontent} placeholder={title} placeholderTextColor="#707070" />
                            </View>
                            <View style={community.contentbox}>
                                <TextInput value={content} onChangeText={text => setContent(text)} style={community.titleandcontent} multiline={true} placeholder={content} placeholderTextColor="#707070" />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                padding: 16,
                                alignItems: 'center',
                                justifyContent: 'flex-start'
                            }}>
                                <TouchableOpacity onPress={showCameraRoll1} style={{
                                    width: 92,
                                    height: 92,
                                    backgroundColor: '#E5E5E5',
                                    marginRight: 16,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {imageSource ? 
                                    <>
                                    {imageSource && <Image resizeMode="stretch" source={{ uri: imageSource }} style={{ width: 92, height: 92 }} />}
                                    {picone === true ? <Text style={community.picturetext}>Picture 1</Text> : <View />}
                                    </>
                                    :
                                    <>
                                    {imageOne && <Image resizeMode="stretch" source={{ uri: imageOne }} style={{ width: 92, height: 92 }} />}
                                    {picone === true ? <Text style={community.picturetext}>Picture 1</Text> : <View />}
                                    </>
                                    }
                                    
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                    <SafeAreaView style={{ flex: 0 }}>
                        <TouchableOpacity onPress={
                            (title.length > 0) && (content.length > 0) ? () => writePost() : errorview}>
                            <View style={{ width: "100%", height: 60, backgroundColor: (title.length > 0) && (content.length > 0) ? '#5cc27b' : "#c6c6c6", justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>작성완료</Text>
                            </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                </>
            }
        </>
    )
}