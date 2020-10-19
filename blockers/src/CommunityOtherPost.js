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
    Alert, FlatList,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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
export default function CommunityOtherPost({ route, navigation }) {
    const [comment, setComment] = useState('');
    const [islogined, setIslogined] = useState(true);
    const [reIsLogined, setReIsLogined] = useState()
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [user, setUser] = useState();
    const [createdate, setCreateDate] = useState();
    const [content, setContent] = useState();
    const [docName,setDocName]=useState();
    const [like, setLike] = useState();
    const [items, setItems] = useState([]);
    const [itemss, setItemss] = useState([]);
    const [likeButton, setLikeButton] = useState(false);
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

    const [reHave, setReHave] = useState();
    const textbox = useRef()
    const [loading, setLoading] = useState(false);
    //for Reply
    const [relikeState, setReLikeState] = useState()
    const [reMelike, setReMeLike] = useState()
    const [reLike, setReLike] = useState()
    const [commentState,setCommentState]=useState()

    // async function reProfilePicture(a) {
    //     console.log(a)
    //     const url2 = await storage()
    //         .refFromURL("gs://blockers-8a128.appspot.com/User/" + a + "/" + "프로필사진" + a)
    //         .getDownloadURL();
    //     console.log("revmtkdlqslek", url2)
    //     setRevmtk(url2)

    // }
    //댓글 작성하는 함수. 댓글 작성후에 reply collection에 추가를 하고 커멘트 숫자도 업로드한다
    async function writepost(b) {
        
        var a = moment().toArray()
        console.log(b)
        if (a[1] === 12) {
            a[1] = 1
        } else {
            a[1] = a[1] + 1
        }
        console.log(docID)

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
        setState(true)
        setComment("")
    }


    //사용자 정보를 불러오는 함수. 불러온후에 사용자 닉네임을 설정한다(화면에 띄워줌)
    useEffect(() => {
        var a = [1, 2, 3, 4]
        console.log(a.splice(0, 0, 0), "alsekjfpwojfopwije")

        firestore().collection("UserInfo").doc(Uid).get().then(documentSnapshot => {
            console.log(documentSnapshot.data().nickname, "hihi")
            setNick(documentSnapshot.data().nickname)
            setRevmtk(documentSnapshot.data().profilePicture)
        })
        console.log("flvmtk", revmtk)

    }, [replynum])

    //화면에 텍스트 및 좋아요를 띄워주는 함수.
    useEffect(() => {
        console.log(Uid, "uiduidudiuidu")
        console.log(docID, "HIHI")
        async function load() {
            firestore().collection("Community1").doc(docID).onSnapshot(doc => {
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
        console.log(alertList, likeList, time, author, "alertList")
        load()


        if (likeList.includes(Uid)) {

            setMeLike(true)
        }
    }, [likeState, nick, title])
    useEffect(() => {
        hi()
        if (Uid === realWriterUid) {
            setIslogined(true)
            console.log("yes ITs true")
        } else {
            setIslogined(false)
            console.log("no its not")
        }
    }, [time])

    //사진 불러오는 함수
    async function hi() {
        console.log("comeins")
        console.log(title, author, time)
        const url = await storage()
            .refFromURL("gs://blockers-8a128.appspot.com/community1/" + String(title + author + time))
            .getDownloadURL();

        setImageSource(url)

    }
    //댓글을 보여주는 함수. 

    useEffect(() => {
        setItems(items.splice(0, items.length))
        console.log(items, "??????")
        const { ID } = route.params
        setParam(ID)

        async function reply() {
            
            
            firestore().collection('Community1').doc(ID).collection("Reply").onSnapshot(querySnapshot => {
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
                        setReIsLogined(true)
                    } else {
                        setReIsLogined(false)
                    }
                    list.push({
                        reName: docs.data().fullTime + docs.data().content,
                        reNick: docs.data().nick,
                        reContent: docs.data().content,
                        reLike: docs.data().like,
                        reTime: docs.data().day + " " + docs.data().time,
                        reProfile: docs.data().profilePicture,
                        reUserUid: reIsLogined,
                        reWhoLike: docs.data().whoLike.length,
                        reWhoLikeList: docs.data().whoLike,
                        reWhoAlert: docs.data().whoAlert,
                        reMeLike: reMelike
                        
                    });

                });

                setItems(list);
                console.log(list)
            })

            // console.log("this is the final list",items)
        }

        reply()
    }, [state, vmtk, loading,commentState])

    //게시글 좋아요 및 좋아요 취소
    function likeMinus(a) {

        return ref.doc(param).update({
            whoLike: a,
        }).then(() => {
            console.log("minus success")
            setLikeState(true)
        });
    }
    function likePlus(a) {
        return ref.doc(param).update({
            whoLike: a,
        }).then(() => {
            console.log("plus success")
            setLikeState(true)


        });
    }

    function pressLike() {
        const userUID = Uid
        console.log(Uid, "Uid")
        console.log(likeList, "when pressed")
        if (likeList.includes(Uid)) {
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
    function deletePost() {
        return ref.doc(param).delete().then(() => {
            const filename = title + nick + time
            var desertRef = storage().ref("community1/" + filename);

            // Delete the file
            desertRef.delete().then(function () {
                navigation.goBack()
            }).catch(function (error) {
                // Uh-oh, an error occurred!
            });

        })
    }
    function alertPost() {
        console.log(alertList, "fucking here")
        const userID = Uid
        if (alertList.includes(userID)) {
            console.log("include!!!!!!!!")
            Alert.alert(
                '신고하시겠습니까?',
                '신고가 누적되면 자동 삭제 됩니다.',
                [
                    {
                        text: 'CANCEL', onPress: () => console.log('CANCEL Pressed')
                    },
                    {
                        text: '신고하기', onPress: () => Alert.alert(
                            '이미 신고하셨습니다',
                            "ㅅㅂ"
                            [
                            {
                                text: 'OK', onPress: () => console.log('OK Pressed')
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
                        text: 'CANCEL', onPress: () => console.log('CANCEL Pressed')
                    },
                    {
                        text: '신고하기', onPress: () => Alert.alert(
                            '신고완료',
                            '검토후 조치하겠습니다.',
                            [
                                {
                                    text: 'OK', onPress: () => console.log('OK Pressed')
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
    function alertUpdate(a) {
        return ref.doc(param).update({
            whoAlert: a,
        }).then(() => {
            console.log("alert success")



        });
    }

    // function focusing(){
    //     // console.log(a)
    //     Alert.alert(
    //         '대댓글을 작성하시겠습니까?',
    //         "대댓글",
    //         [
    //             {
    //                 text: '네', onPress: () => realfocusing()
    //             },
    //             {
    //                 text: '아니오', onPress: () => unfocusing()

    //             }
    //         ]
    //     )

    // }
    // function focusing(a){
    //     setReComment(a)
    //     console.log(reComment)
    //     textbox.current.focus()
    // }
    function unfocusing() {
        Keyboard.dismiss

    }

    //댓글 좋아요 및 좋아요 취소, 댓글 삭제-----------------------------------------------------------
    function relikeMinus(a, b) {

        return ref.doc(param).collection("Reply").doc(b).update({
            whoLike: a,
        }).then(() => {
            console.log("minus success")
            setReLikeState(true)
            setState(true)
        });
    }
    function relikePlus(a, b) {
        return ref.doc(param).collection("Reply").doc(b).update({
            whoLike: a
        }).then(() => {
            console.log("plus success")
            setReLikeState(true)
            setCommentState(true)
        });
    }

    function pressReLike(relikeList, name) {
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
    function redeletePost(a) {
        ref.doc(param).collection("Reply").doc(a).delete()
        setCommentState(true)
        
    }
    function realertPost(a) {
        console.log(alertList, "fucking here")
        const userID = Uid
        if (alertList.includes(userID)) {
            console.log("include!!!!!!!!")
            Alert.alert(
                '신고하시겠습니까?',
                '신고가 누적되면 자동 삭제 됩니다.',
                [
                    {
                        text: 'CANCEL', onPress: () => console.log('CANCEL Pressed')
                    },
                    {
                        text: '신고하기', onPress: () => Alert.alert(
                            '이미 신고하셨습니다',
                            "ㅅㅂ"
                            [
                            {
                                text: 'OK', onPress: () => console.log('OK Pressed')
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
                        text: 'CANCEL', onPress: () => console.log('CANCEL Pressed')
                    },
                    {
                        text: '신고하기', onPress: () => Alert.alert(
                            '신고완료',
                            '검토후 조치하겠습니다.',
                            [
                                {
                                    text: 'OK', onPress: () => console.log('OK Pressed')
                                }
                            ]
                        )
                    }
                ]
            )
            setAlertList(alertList.push(userID))
            realertUpdate(a,alertList)
        }

    }
    function realertUpdate(a,b) {
        return ref.doc(param).collection("Reply").doc(a).update({
            whoAlert: b,
        }).then(() => {
            console.log("alert success")



        });
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
                <ScrollView style={{ marginBottom: 50 }}>
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

                            <Image resizeMode="contain" style={community.icon} source={{ uri: vmtk }} />
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
                        <Text style={community.title}>{title}</Text>
                        {islogined === true ?
                            <Text style={[community.dateandrepair, { alignSelf: 'center' }]}>
                                <TouchableOpacity onPress={() => navigation.navigate('작성하기')}>
                                    <Text style={community.dateandrepair}>수정 | </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>
                                    Alert.alert(
                                        '삭제하시겠습니까?',
                                        '삭제된 게시물은 되돌릴 수 없습니다.',
                                        [
                                            {
                                                text: 'CANCEL', onPress: () => console.log('CANCEL Pressed')
                                            },
                                            {
                                                text: '삭제하기', onPress: () => deletePost()

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
                        <View style={[community.lowerbox, {alignSelf: "flex-end"}]}>
                            {meLike === true ?
                                <TouchableOpacity onPress={pressLike}>
                                    <MaterialCommunityIcons name="thumb-up" color="#5cc27b" size={15} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={pressLike}>
                                    <MaterialCommunityIcons name="thumb-up-outline" color="#5cc27b" size={15} />
                                </TouchableOpacity>
                            }

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
                                            {item.reProfile ? <Image resizeMode="contain" style={community.icon} source={{ uri: item.reProfile }} /> : <Ionicons name="ios-person-circle" style={{marginRight: 4}} size={20} /> }
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
                                                {/* 대댓글 다는 버튼 */}
                                                {/* <TouchableOpacity onPress={()=>{focusing(item.reName)}}> 
                                            <View style={{borderWidth:0.5,width:30,height:20}}>

                                            </View>
                                            </TouchableOpacity> */}
                                                {/* 좋아요 누르는 버튼 */}

                                                <TouchableOpacity onPress={() => pressReLike(item.reWhoLikeList, item.reName)} >
                                                    <View style={{ color: "#DDDDDD", borderWidth: 0.5, width: 30, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                        <MaterialCommunityIcons name="thumb-up-outline" color="#8A8A8A" size={15} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <View style={{ color: "#DDDDDD", borderWidth: 0.5, width: 30, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Ionicons name="chatbubble-ellipses-outline" color="#8A8A8A" size={15} />
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
                                                                        text: 'CANCEL', onPress: () => console.log('CANCEL Pressed')
                                                                    },
                                                                    {
                                                                        text: '삭제하기', onPress: () => {redeletePost(item.reName),Alert.alert(
                                                                            '삭제완료',
                                                                            '',
                                                                            [
                                                                                {
                                                                                    text: 'OK', onPress: () => console.log('삭제가 완료되었습니다.')
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
                                    <View style={{ marginTop: 8 }}>
                                        <Text>{item.reContent}</Text>
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
            </SafeAreaView>
        </>
    )
}