import React, { useState } from 'react';
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
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const community = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#707070'
    },
    author: {
        fontSize: 14,
        fontWeight: 'bold',
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
        fontWeight: 'normal',
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
        fontWeight: 'normal',
        color: '#707070'
    },
    timethumbreply: {
        fontSize: 12,
        fontWeight: 'normal',
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

export default function CommunityOtherPost({ navigation }) {
    const title = "브로리 대학원 기원 1일차";
    const author = "브로리"
    const creacteddate = '2020.07.01';
    const content = "브로리 대학원 가즈아아아아아아";
    const [comment, setComment] = useState('');
    const [islogined, setIslogined] = useState(true);

    var thumbnum = 11,
        replynum = 5;
    const [numrep, setNumrep] = useState(0);
    const [numrerep, setNumrerep] = useState(0);

    const plusnumrep = () => {
        setNumrep(numrep + 1);
    }

    const plusnumrerep = () => {
        setNumrerep(numrerep + 1);
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
                            <Text style={[community.dateandrepair, {alignSelf: 'center'}]}>
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
                                                text: '삭제하기', onPress: () => Alert.alert(
                                                    '삭제완료',
                                                    '',
                                                    [
                                                        {
                                                            text: 'OK', onPress: () => navigation.navigate('자유게시판')
                                                        }
                                                    ]
                                                )
                                            }
                                        ]
                                    )
                                }>
                                    <Text style={community.dateandrepair}>삭제</Text>
                                </TouchableOpacity>
                            </Text>
                            :
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
                            <Image resizeMode="contain" style={community.icon} source={require("./icon/brori.png")} />
                            <Text style={community.author}>{author}</Text>
                        </View>
                        <Text style={community.dateandrepair}>{creacteddate}</Text>
                    </View>
                    <Image resizeMode="cover" style={community.image} source={require("./icon/brorigraduate.png")} />
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
                            <Image resizeMode="contain" style={community.thumbandreply} source={require("./icon/greenThumb.png")}></Image>
                            <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{thumbnum}</Text>
                            <Image resizeMode="contain" style={[community.thumbandreply, { marginLeft: 16 }]} source={require("./icon/reply.png")}></Image>
                            <Text style={[community.timethumbreply, { color: '#ffb83d', marginLeft: 4 }]}>{replynum}</Text>
                        </View>
                    </View>
                    <View style={{
                        paddingTop: 8,
                        paddingRight: 20,
                        paddingLeft: 20,
                        width: "100%"
                    }}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Image resizeMode="contain" style={community.icon} source={require('./icon/blackcircle.png')} />
                                    <Text style={community.author}>익명</Text>
                                    <Text style={[community.date, { fontSize: 12, marginLeft: 8 }]}>{creacteddate}</Text>
                                    <Image resizeMode="contain" style={[community.thumbandreply, { marginLeft: 8 }]} source={require("./icon/emptythumb.png")}></Image>
                                    <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{numrep}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                                    {islogined === true ?
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
                                        :
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <TouchableOpacity onPress={plusnumrep} style={{ marginRight: 8 }}>
                                                <Image resizeMode="contain" style={community.thumbandreply} source={require("./icon/greyThumb.png")} />
                                            </TouchableOpacity>
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
                            <View style={{ marginTop: 8 }}>
                                <Text>%%%대박정보%%%</Text>
                                <Text>Blocker.com</Text>
                                <Text>&&&&접속시&&&&</Text>
                                <Text>금연키트 무료증정</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Image source={require('./icon/rereply.png')} resizeMode="contain" style={{ marginLeft: 5, width: 16, height: 16 }} />
                            <View style={{ alignSelf: 'flex-end', backgroundColor: '#E5E5E5', width: "90%", minHeight: 84, borderRadius: 5, paddingTop: 4, paddingLeft: 8, paddingRight: 8 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Image resizeMode="contain" style={community.icon} source={require('./icon/blackcircle.png')} />
                                        <Text style={community.author}>익명</Text>
                                        <Text style={[community.date, { fontSize: 12, marginLeft: 8 }]}>{creacteddate}</Text>
                                        <Image resizeMode="contain" style={[community.thumbandreply, { marginLeft: 8 }]} source={require("./icon/emptythumb.png")}></Image>
                                        <Text style={[community.timethumbreply, { color: '#7cce95', marginLeft: 4 }]} >{numrerep}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                                        <TouchableOpacity onPress={plusnumrerep} style={{ marginRight: 8 }}>
                                            <Image resizeMode="contain" style={community.thumbandreply} source={require("./icon/greyThumb.png")} />
                                        </TouchableOpacity>
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
                                </View>
                                <View style={{ marginTop: 8 }}>
                                    <Text>매너 채팅 부탁드려요</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
                        onSubmitEditing={Keyboard.dismiss}
                        style={{
                            width: "90%",
                            marginRight: 5,
                            fontSize: 15,
                            borderRadius: 30,
                        }}
                    />
                    <TouchableOpacity onPress={() => {
                        comment.length > 0 ?
                            true
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
            </SafeAreaView>
        </>
    )
}