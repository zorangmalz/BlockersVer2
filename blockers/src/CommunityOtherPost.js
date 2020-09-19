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
import moment from "moment"
import { useScreens } from 'react-native-screens';
import storage from '@react-native-firebase/storage';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const community = StyleSheet.create({
    title: {
        fontSize: 16,
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
    const [reIsLogined,setReIsLogined]=useState()
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [createdate, setCreateDate] = useState();
    const [content, setContent] = useState();
    const [user, setUser] = useState();
    const [like, setLike] = useState();
    const [items, setItems] = useState([]);
    const [itemss,setItemss]=useState([]);
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
    const [numrep, setNumrep] = useState(0);
    const [numrerep, setNumrerep] = useState(0);
    const [imageSource, setImageSource] = useState(undefined);
    const [time, setTime] = useState();
    const [realWriterUid, setRealWriterUid] = useState();
    const [alertList, setAlertList] = useState([]);
    const [vmtk, setVmtk] = useState();
    const [revmtk, setRevmtk] = useState();
    const [reComment,setReComment]=useState();
    const [reHave,setReHave]=useState();
    const textbox=useRef()
    
    

    const plusnumrep = () => {
        setNumrep(numrep + 1);
    }

    const plusnumrerep = () => {
        setNumrerep(numrerep + 1);
    }
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
        if(reComment){
            var a = moment().toArray()
            console.log(b)
            if (a[1] === 12) {
                a[1] = 1
            } else {
                a[1] = a[1] + 1
            }
            console.log(docID)
            
            await ref.doc(docID).collection("Reply").doc(reComment).collection("ReReply").doc(a + b).set({
                content: b,
                nick: nick,
                fullTime: a,
                time: a[3] + ":" + a[4],
                day: a[1] + "/" + a[2],
                writerUid: user.uid,
                profilePicture:revmtk
            })
            await ref.doc(docID).update({
                commentNum: replynum + 1
            })
            await ref.doc(docID).collection("Reply").doc(reComment).update({
                rereply:true
            })
            setState(true)
            setComment("")
        }else{
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
            writerUid: user.uid,
            profilePicture:revmtk,
            rereply:false
        })
        await ref.doc(docID).update({
            commentNum: replynum + 1
        })
        setState(true)
        setComment("")
    }
    }

    //사용자 정보를 불러오는 함수. 불러온후에 사용자 닉네임을 설정한다(화면에 띄워줌)
    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        if (user) {
            firestore().collection("UserInfo").doc(user.uid).get().then(documentSnapshot => {
                console.log(documentSnapshot.data().nickname, "hihi")
                setNick(documentSnapshot.data().nickname)
                setRevmtk(documentSnapshot.data().profilePicture)
            })
            console.log("flvmtk",revmtk)
        }
    }, [user, replynum])

    //화면에 텍스트 및 좋아요를 띄워주는 함수.
    useEffect(() => {

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

            })
        }
        console.log(alertList, likeList, time, "alertList")
        load()
        if (user) {
            console.log("This is the main point")
            if (likeList.includes(user.uid)) {
                console.log("great!!!!!!!!!!")
                setMeLike(true)

                // setImageSource(url)
            } if (user.uid === realWriterUid) {
                setIslogined(true)
            } else {
                setIslogined(false)
            }
            profilePicture()
            hi()

        }
    }, [likeState, user, nick])

    async function profilePicture() {

        const url1 = await storage()
            .refFromURL("gs://blockers-8a128.appspot.com/User/" + author + "/" + "프로필사진" + author)
            .getDownloadURL();

        setVmtk(url1)
    }
    //사진 불러오는 함수
    async function hi() {

        const url = await storage()
            .refFromURL("gs://blockers-8a128.appspot.com/community1/" + String(title + author + time))
            .getDownloadURL();

        setImageSource(url)
    }
    //댓글을 보여주는 함수. 

    useEffect(() => {
        const { ID } = route.params
        setParam(ID)
        async function reply(){
            ref.doc(ID).collection("Reply").onSnapshot(querySnapshot => {
                const list = [];
                
                setReplyNum(querySnapshot.size)
                querySnapshot.forEach(docs => {   
                    
                
                console.log(docs.data().rereply,"rerererere")
                    
                    if(docs.data().rereply){
                        
                          var reName=docs.data().fullTime+docs.data().content
                          var  reNick=docs.data().nick
                          var reContent= docs.data().content
                          var reLike= docs.data().like
                            var reTime= docs.data().day + " " + docs.data().time
                            var reProfile=docs.data().profilePicture
                            var reUserUid=docs.data().writerUid
                        
                        console.log("push",docs.data().fullTime+docs.data().content,)
                        ref.doc(ID).collection("Reply").doc(docs.data().fullTime+docs.data().content).collection("ReReply").onSnapshot(querySnapshot=>{
                            
                            querySnapshot.forEach(docs=>{
                                list.push({
                                    reName:reName,
                                    reNick:reNick,
                                    reContent:reContent,
                                    reLike:reLike,
                                    reTime:reTime,
                                    reProfile:reProfile,
                                    reUserUid:reUserUid,
                                    rereName:docs.data().fullTime+docs.data().content,
                                    rereNick: docs.data().nick,
                                    rereContent: docs.data().content,
                                    rereLike: docs.data().like,
                                    rereTime: docs.data().day + " " + docs.data().time,
                                    rereProfile:docs.data().profilePicture,
                                    rereUserUid:docs.data().writerUid,
                                
                                });
                            })
                        })
                    }else{
                        list.push({
                            reName:docs.data().fullTime+docs.data().content,
                            reNick: docs.data().nick,
                            reContent: docs.data().content,
                            reLike: docs.data().like,
                            reTime: docs.data().day + " " + docs.data().time,
                            reProfile:docs.data().profilePicture,
                            reUserUid:docs.data().writerUid,
                            
                        });
                    }

                })
                setItems(list);
                
               
    
    
            })
            console.log("this is the final list",items)
        }
       reply()
       
    }, [state,vmtk])

    
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
        const userUID = user.uid
        console.log(user.uid, "user.uid")
        console.log(likeList, "when pressed")
        if (likeList.includes(user.uid)) {

            setLikeList(likeList.splice(likeList.indexOf(user.uid), 1))
            console.log(likeList, "should be empty or user.uid is deleted")
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
        const userID = user.uid
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
    function focusing(a){
        setReComment(a)
        console.log(reComment)
        textbox.current.focus()
    }
    function unfocusing(){
        Keyboard.dismiss

    }
    return (
        <>
        
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            
                <ScrollView style={{ marginBottom: 50 }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: 'center',
                        borderBottomColor: "#DDDDDD",
                        borderBottomWidth: 1,
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
                                <Image resizeMode="contain" style={community.warning} source={require("./icon/blackwarning.png")}></Image>
                            </TouchableOpacity>
                        }
                    </View>
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
                    {imageSource && <Image style={community.image} resizeMode="cover" source={{ uri: imageSource }} />}

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 16,
                        paddingBottom: 32,
                        borderBottomWidth: 1,
                        borderBottomColor: '#E2E2E2'
                    }}>
                        <Text style={community.content}>{content}</Text>
                        <View style={community.lowerbox}>
                            {meLike === true ?
                                <TouchableOpacity onPress={pressLike}>
                                    <Image resizeMode="contain" style={community.thumbandreply} source={require("./icon/greenThumb.png")}></Image>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={pressLike}>
                                    <Image resizeMode="contain" style={community.thumbandreply} source={require("./icon/emptythumb.png")}></Image>
                                </TouchableOpacity>
                            }

                            <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{like}</Text>
                            <Image resizeMode="contain" style={[community.thumbandreply, { marginLeft: 16 }]} source={require("./icon/reply.png")}></Image>
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
                            keyExtractor={items.ID}
                            renderItem={({ item }) => (
                                <View style={{ borderBottomWidth: 1, borderColor: '#E2E2E2', paddingTop: 5, paddingBottom: 5 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Image resizeMode="contain" style={community.icon} source={{ uri: item.reProfile }} />
                                            <Text style={community.author}>{item.reNick}</Text>
                                            <Text style={[community.date, { fontSize: 12, marginLeft: 8 }]}>{item.reTime}</Text>
                                            <Image resizeMode="contain" style={[community.thumbandreply, { marginLeft: 8 }]} source={require("./icon/emptythumb.png")}></Image>
                                            <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{numrep}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                                           
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                         

                                            {/* 대댓글 다는 버튼 */}
                                            <TouchableOpacity onPress={()=>{focusing(item.reName)}}> 
                                            <View style={{borderWidth:0.5,width:30,height:20}}>

                                            </View>
                                            </TouchableOpacity>
                                            {/* 좋아요 누르는 버튼 */}

                                            <TouchableOpacity onPress={plusnumrep} >
                                            
                                            <View style={{color: "#DDDDDD",borderWidth:0.5,width:30,height:20}}>
                                            <Image resizeMode="contain" style={community.thumbandreply} source={require("./icon/greyThumb.png")} />
                                            </View>
                                            </TouchableOpacity>  
                                            {item.reUserUid === user.uid ?

                                            // {/* 신고 및 삭제 누르는 버튼 */}
                                                <View style={{borderWidth:0.5,width:30,height:20}}>
                                                <TouchableOpacity onPress={() =>
                                                    Alert.alert(
                                                        '삭제하시겠습니까?',
                                                        '삭제된 게시물은 되돌릴 수 없습니다.',
                                                        [
                                                            {
                                                                text: 'CANCEL', onPress: () => console.log('CANCEL Pressed')
                                                            },
                                                            {
                                                                text: '삭제하기', onPress: () => Alert.alert(
                                                                    '삭제완료',
                                                                    '',
                                                                    [
                                                                        {
                                                                            text: 'OK', onPress: () => console.log('삭제가 완료되었습니다.')
                                                                        }
                                                                    ]
                                                                )
                                                            }
                                                        ]
                                                    )
                                                }>
                                                    <Text style={community.dateandrepair}>삭제</Text>
                                                </TouchableOpacity>
                                                </View>
                                                :
                                                <View style={{borderWidth:0.5,width:30,height:20}}>
                                                        <TouchableOpacity onPress={() =>
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
                                                    }>
                                                        <Image resizeMode="contain" style={community.thumbandreply} source={require("./icon/greyAlert.png")} />
                                                    </TouchableOpacity>
                                                        </View>
                            }
                                            
                                            
                                         
                                        </View>
                                               
                                               
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 8 }}>
                                        <Text>{item.reContent}</Text>

                                    </View>
                                    {item.rereContent ?
                                <FlatList
                                data={items}
                                keyExtractor={items.rereContent}
                                renderItem={({ item }) => (
                                    <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Image source={require('./icon/rereply.png')} resizeMode="contain" style={{ marginLeft: 5, width: 16, height: 16 }} />
                                <View style={{ alignSelf: 'flex-end', backgroundColor: '#E5E5E5', width: "90%", minHeight: 84, borderRadius: 5, paddingTop: 4, paddingLeft: 8, paddingRight: 8 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <Image resizeMode="contain" style={community.icon} source={{ uri: item.rereProfile }} />
                                                <Text style={community.author}>{item.rereNick}</Text>
                                                <Text style={[community.date, { fontSize: 12, marginLeft: 8 }]}>{item.rereTime}</Text>
                                                <Image resizeMode="contain" style={[community.thumbandreply, { marginLeft: 8 }]} source={require("./icon/emptythumb.png")}></Image>
                                                <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{numrep}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                                               
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    
                                             
    
                                                {/* 대댓글 다는 버튼 */}
                                                
                                                {/* 좋아요 누르는 버튼 */}
    
                                                <TouchableOpacity onPress={plusnumrep} >
                                                
                                                <View style={{color: "#DDDDDD",borderWidth:0.5,width:30,height:20}}>
                                                <Image resizeMode="contain" style={community.thumbandreply} source={require("./icon/greyThumb.png")} />
                                                </View>
                                                </TouchableOpacity>  
                                                {item.rereUserUid === user.uid ?
    
                                                // {/* 신고 및 삭제 누르는 버튼 */}
                                                    <View style={{borderWidth:0.5,width:30,height:20}}>
                                                    <TouchableOpacity onPress={() =>
                                                        Alert.alert(
                                                            '삭제하시겠습니까?',
                                                            '삭제된 게시물은 되돌릴 수 없습니다.',
                                                            [
                                                                {
                                                                    text: 'CANCEL', onPress: () => console.log('CANCEL Pressed')
                                                                },
                                                                {
                                                                    text: '삭제하기', onPress: () => Alert.alert(
                                                                        '삭제완료',
                                                                        '',
                                                                        [
                                                                            {
                                                                                text: 'OK', onPress: () => console.log('삭제가 완료되었습니다.')
                                                                            }
                                                                        ]
                                                                    )
                                                                }
                                                            ]
                                                        )
                                                    }>
                                                        <Text style={community.dateandrepair}>삭제</Text>
                                                    </TouchableOpacity>
                                                    </View>
                                                    :
                                                    <View style={{borderWidth:0.5,width:30,height:20}}>
                                                            <TouchableOpacity onPress={() =>
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
                                                        }>
                                                            <Image resizeMode="contain" style={community.thumbandreply} source={require("./icon/greyAlert.png")} />
                                                        </TouchableOpacity>
                                                            </View>
                                }
                                                
                                                
                                             
                                            </View>
                                                   
                                                   
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 8 }}>
                                            <Text>{item.rereContent}</Text>
    
                                        </View>
                                        
                                    </View>
                                    </View>
                                )}
                                
                            />
                            :
                            <></>
                                }
                                    
                                
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
                            <Image style={{ width: 16, height: 16 }} resizeMode="contain" source={require("./icon/send.png")}></Image>
                        </TouchableOpacity>
                        
                    </View>
                 
                        
                       
                       
               
            </View>
            </SafeAreaView>
            
        </>
    )
}
