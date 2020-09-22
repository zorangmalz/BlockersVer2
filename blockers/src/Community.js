
import React, { useLayoutEffect, useEffect } from 'react';
import {
    StyleSheet,
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

const community = StyleSheet.create({
    image: {
        width: "100%",
        height: 134
    },
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
        fontFamily: 'NunitoSans-Bold'
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
    }
})

export default function CommunityHome({ navigation }) {
    var thumbnum = 10,
        replynum = 5;

    var content = "흡연 10년차 입니다.... 저번주부터 금연을…."
    useEffect(()=>{
        
        const data =[{title: 'Node 1', items: [{title: 'Node 1.1'}, {title: 'Node 1.2'}]}]
        var list=[]
        var lists=[]
        lists.push({
            hh:"hhh",
            sef:"sefe"
        })
        lists=JSON.stringify(lists)
        var dict={}
        dict["re"]="hi"
        list.push(dict)
        console.log(list)
        dict["gh"]=lists
        console.log(list)
        // console.log(JSON.stringify(data))
    })
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, width: "100%", paddingLeft: "5%", paddingRight: "5%" }}>
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
                <ScrollView>
                    <Image resizeMode="cover" style={community.image} source={require("./icon/noti.png")} />
                    <TouchableOpacity onPress={() => navigation.navigate('자유게시판')} style={[community.board, { marginTop: 2 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={community.circle} />
                            <Text style={community.title}>자유게시판</Text>
                        </View>
                        <Text style={community.content}>{content}</Text>
                        <View style={community.lowerbox}>
                            <Text style={[community.timethumbreply, {color: '#707070'}]}>방금전</Text>
                            <Image resizeMode="contain" style={[community.thumbandreply, {marginLeft: "33%"}]} source={require("./icon/emptythumb.png")}></Image>
                            <Text style={[community.timethumbreply, {color: '#7cce95', marginLeft: 4}]} >{thumbnum}</Text>
                            <Image resizeMode="contain" style={[community.thumbandreply, {marginLeft: 16}]} source={require("./icon/reply.png")}></Image>
                            <Text style={[community.timethumbreply, {color: '#ffb83d', marginLeft: 4}]}>{replynum}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={community.board}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={community.circle} />
                            <Text style={community.title}>HOT 게시판</Text>
                        </View>
                        <Text style={community.content}>{content}</Text>
                        <View style={community.lowerbox}>
                            <Text style={[community.timethumbreply, {color: '#707070'}]}>방금전</Text>
                            <Image resizeMode="contain" style={[community.thumbandreply, {marginLeft: "33%"}]} source={require("./icon/emptythumb.png")}></Image>
                            <Text style={[community.timethumbreply, {color: '#7cce95', marginLeft: 4}]} >{thumbnum}</Text>
                            <Image resizeMode="contain" style={[community.thumbandreply, {marginLeft: 16}]} source={require("./icon/reply.png")}></Image>
                            <Text style={[community.timethumbreply, {color: '#ffb83d', marginLeft: 4}]}>{replynum}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={community.board}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={community.circle} />
                            <Text style={community.title}>정보게시판</Text>
                        </View>
                        <Text style={community.content}>{content}</Text>
                        <View style={community.lowerbox}>
                            <Text style={[community.timethumbreply, {color: '#707070'}]}>방금전</Text>
                            <Image resizeMode="contain" style={[community.thumbandreply, {marginLeft: "33%"}]} source={require("./icon/emptythumb.png")}></Image>
                            <Text style={[community.timethumbreply, {color: '#7cce95', marginLeft: 4}]} >{thumbnum}</Text>
                            <Image resizeMode="contain" style={[community.thumbandreply, {marginLeft: 16}]} source={require("./icon/reply.png")}></Image>
                            <Text style={[community.timethumbreply, {color: '#ffb83d', marginLeft: 4}]}>{replynum}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={community.board}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={community.circle} />
                            <Text style={community.title}>성공게시판</Text>
                        </View>
                        <Text style={community.content}>{content}</Text>
                        <View style={community.lowerbox}>
                            <Text style={[community.timethumbreply, {color: '#707070'}]}>방금전</Text>
                            <Image resizeMode="contain" style={[community.thumbandreply, {marginLeft: "33%"}]} source={require("./icon/emptythumb.png")}></Image>
                            <Text style={[community.timethumbreply, {color: '#7cce95', marginLeft: 4}]} >{thumbnum}</Text>
                            <Image resizeMode="contain" style={[community.thumbandreply, {marginLeft: 16}]} source={require("./icon/reply.png")}></Image>
                            <Text style={[community.timethumbreply, {color: '#ffb83d', marginLeft: 4}]}>{replynum}</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}