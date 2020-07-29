import React, { useState } from 'react';
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
    Dimensions
} from 'react-native';

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
        fontWeight: "bold"
    },
    content: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#707070',
        marginTop: 5,
        marginLeft: 16
    },
    timethumbreply: {
        fontSize: 12,
        fontWeight: 'normal',
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
        marginRight: 8
    }
})

export default function CommunityClick({ navigation }) {
    const [search, setSearch] = useState('');
    var thumbnum = 10,
        replynum = 5;
    
    var content = "흡연 10년차 입니다.... 저번주부터 금연을…."
    
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
                <ScrollView>
                    <View style={{
                        marginRight: 14,
                        marginTop: 16,
                        marginBottom: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                    }}>
                        <TextInput value={search} onChangeText={text => setSearch(text)} placeholder="검색어를 입력하세요" style={community.textinput} />
                        <Image style={{width: 24, height: 24}} source={require('./icon/search.png')} resizeMode="contain" />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('CommunityOtherPost')} style={[community.board, { marginTop: 2 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={community.circle} />
                            <Text style={community.title}>금연하기가 너무 힘드네요</Text>
                        </View>
                        <Text style={community.content}>{content}</Text>
                        <View style={community.lowerbox}>
                            <Text style={[community.timethumbreply, { color: '#707070' }]}>방금전</Text>
                            <Image resizeMode="contain" style={[community.thumbandreply, { marginLeft: "33%" }]} source={require("./icon/emptythumb.png")}></Image>
                            <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{thumbnum}</Text>
                            <Image resizeMode="contain" style={[community.thumbandreply, { marginLeft: 16 }]} source={require("./icon/reply.png")}></Image>
                            <Text style={[community.timethumbreply, { color: '#ffb83d', marginLeft: 4 }]}>{replynum}</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('작성하기')}
                    style={{
                    position: 'absolute',
                    top: topposition*1.3,
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