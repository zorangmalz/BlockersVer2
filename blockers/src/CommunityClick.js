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
import moment from "moment"

const topposition = Dimensions.get('window').width;

const community = StyleSheet.create({
    board: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
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
        
        height:16,
        
        width:topposition*0.7
            

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
        justifyContent: 'flex-start',
        marginLeft: 16,
        marginTop: 8
    },
    thumbandreply: {
        width: 15,
        height: 15,
    },
    textinput: {
        width: "45%",
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
    const ref = firestore().collection('Community1');
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
  useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        console.log(user)
    },[user])
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
                                    isPicture:doc.data().isPicture
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
                                    isPicture:doc.data().isPicture
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
                                isPicture:doc.data().isPicture
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
                                isPicture:doc.data().isPicture
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
                            <Image style={{ width: 24, height: 24 }} source={require('./icon/search.png')} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        data={items}
                        inverted={true}
                        keyExtractor={items.docname}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('CommunityOtherPost', { docID: item.docname, ID: item.docname, Uid:user.uid })} >
                                <View style={community.board}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <View style={community.circle} />
                                        <Text ellipsizeMode="tail" numberOfLines={1}  style={community.title}>{item.title}</Text>
                                    </View>
                                    <Text ellipsizeMode="tail" numberOfLines={2} style={community.content}>{item.context}</Text>
                                    <View style={community.lowerbox}>
                                        
                                        <Text style={[community.timethumbreply, { color: '#707070' }]}>{item.time}</Text>
                                         {item.isPicture === true ?
                                        <Image style={[community.thumbandreply,{ marginLeft: "60%" }]} source={require("./icon/picture.png")}></Image>    
                                         :
                                         <></>
                                        }
                                     
                                        <Image resizeMode="contain" style={[community.thumbandreply, {marginLeft:9}]} source={require("./icon/emptythumb.png")}></Image>
                                        <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{item.like}</Text>
                                        <Image resizeMode="contain" style={[community.thumbandreply, { marginLeft: 16 }]} source={require("./icon/reply.png")}></Image>
                                        <Text style={[community.timethumbreply, { color: '#ffb83d', marginLeft: 4 }]}>{item.replynum}</Text>
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
                        borderColor: '#333333',
                        borderWidth: 1,
                        borderRadius: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Image resizeMode="contain" source={require('./icon/pen.png')} />
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}
//아이콘 제작자 <a href="https://www.flaticon.com/kr/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/kr/" title="Flaticon"> www.flaticon.com</a>