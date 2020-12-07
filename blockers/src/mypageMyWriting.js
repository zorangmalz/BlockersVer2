import React, { useState,useEffect } from 'react';
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
    FlatList
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from "moment";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { utils } from '@react-native-firebase/app';

const topposition = Dimensions.get('window').width;

const community = StyleSheet.create({
    board: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
        paddingBottom: 16,
        borderTopWidth: 1,
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
        color: '#303030'
    },
    content: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#707070',
        marginTop: 5,
        marginLeft: 16
    },
    timethumbreply: {
        fontSize: 12,
        fontFamily: 'NunitoSans-Regular',
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

export default function MypageMyWriting({ navigation }) {
    
    const ref = firestore().collection('Community1');
    const [ loading, setLoading ] = useState(true);
    const [ items, setItems ] = useState([]);
    const [user,setuser]=useState();
    useEffect(()=>{

        console.log(utils.FilePath.PICTURES_DIRECTORY);
                auth().onAuthStateChanged(userAuth=>{
                    setuser(userAuth)
                    
                })
                if(user){
                    load()
                   
                }
            },[user])
      
    async function load(){
        const list = [];
        var a=moment().toArray()
        if (a[1]===12){
            a[1]=1
            a[0]=a[0]+1
        }else{
            a[1]=a[1]+1
        }
        
      ref.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            
          if(doc.data().fullTime){ 
               console.log(doc.data().writerUid,user.uid)
              if(doc.data().writerUid===user.uid){
          if (a[0]===doc.data().fullTime[0]&&a[1]===doc.data().fullTime[1]&&a[2]===doc.data().fullTime[2]){
           
          list.push({
            title: doc.data().title,
            time:doc.data().time,
            context:doc.data().context,
            like:doc.data().whoLike.length,
            docname:doc.data().docName,
            replynum:doc.data().commentNum
          });}
          else{
            list.push({
                title: doc.data().title,
                time:doc.data().day,
                context:doc.data().context,
                like:doc.data().whoLike.length,
                docname:doc.data().docName,
                replynum:doc.data().commentNum
              });}
            }
        }
        });
    
        setItems(list);

          if (loading) {
              setLoading(false);
          }

      });
    }

    return (
        <>
            <StatusBar barStyle="default" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>내가 쓴 글</Text>
                        </Text>
                    </View>
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

                    </View>
                    <FlatList

                        data={items}
                        inverted={true}
                        keyExtractor={items.docname}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('CommunityOtherPost', { docID: item.docname, ID: item.docname,Uid:user.uid })} >
                                <View style={community.board}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <View style={community.circle} />
                                        <Text style={community.title}>{item.title}</Text>
                                    </View>
                                    <Text style={community.content}>{item.context}</Text>
                                    <View style={community.lowerbox}>
                                        <Text style={[community.timethumbreply, { color: '#707070' }]}>{item.time}</Text>
                                        <MaterialCommunityIcons name="thumb-up-outline" color="#5cc27b" size={15} style={{ marginLeft: "33%" }} />
                                        <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{item.like}</Text>
                                        <Ionicons name="chatbubble-ellipses-outline" color="#FFB83D" size={15} style={{ marginLeft: 16 }} />
                                        <Text style={[community.timethumbreply, { color: '#ffb83d', marginLeft: 4 }]}>{item.replynum}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                    
                </ScrollView>

            </SafeAreaView>
        </>
    )
}